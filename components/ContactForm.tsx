"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error";

function AppleToast({
  open,
  type = "success",
  title,
  subtitle,
}: {
  open: boolean;
  type?: ToastType;
  title: string;
  subtitle?: string;
}) {
  const isSuccess = type === "success";

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] grid place-items-center",
        "transition duration-300 ease-out",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          "w-[min(92vw,420px)] rounded-2xl px-5 py-4",
          "border border-white/12 bg-black/55 backdrop-blur-xl",
          "shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
          "transition-all duration-300 ease-out",
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-2",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-10 w-10 rounded-full bg-white/10 grid place-items-center border border-white/10">
            {isSuccess ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.3 3.1h3.4L22 21H2L10.3 3.1z" />
              </svg>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-white/95 leading-6">
              {title}
            </div>
            {subtitle ? (
              <div className="text-sm text-white/70 leading-6 mt-0.5">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function pickUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;

  const utm: Record<string, string> = {};
  for (const k of keys) {
    const v = p.get(k);
    if (v) utm[k] = v;
  }
  return utm;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [sending, setSending] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastTitle, setToastTitle] = useState("Письмо отправлено");
  const [toastSubtitle, setToastSubtitle] = useState("Спасибо! Я скоро отвечу.");

  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    setUtm(pickUtm());
  }, []);

  const showToast = (type: ToastType, title: string, subtitle?: string) => {
    setToastType(type);
    setToastTitle(title);
    setToastSubtitle(subtitle ?? "");
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 2400);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // антиспам (honeypot)
      const honey = formData.get("_honey");
      if (typeof honey === "string" && honey.trim().length > 0) {
        form.reset();
        showToast("success", "Спасибо!", "Сообщение принято.");
        return;
      }

      const payload: Record<string, any> = Object.fromEntries(formData.entries());

      // добавляем UTM в payload (если есть)
      Object.assign(payload, utm);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Submit failed: ${res.status}`);
      }

      showToast("success", "Заявка отправлена", "Спасибо! Я скоро отвечу.");
      form.reset();
    } catch (err) {
      showToast(
        "error",
        "Не удалось отправить",
        "Попробуйте ещё раз или напишите в Telegram."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {mounted &&
        createPortal(
          <AppleToast
            open={toastOpen}
            type={toastType}
            title={toastTitle}
            subtitle={toastSubtitle}
          />,
          document.body
        )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 pt-6 sm:pt-8 border-t border-white/15 text-white"
      >
        {/* honeypot: лучше не hidden, чтобы боты попадались */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
        >
          <label>
            Leave empty
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
          />

          {/* можно оставить только 2 поля, но B2B лучше конвертит с компанией/ролью */}
          <input
            type="text"
            name="company"
            placeholder="Компания (необязательно)"
            className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
          />

          <input
            type="text"
            name="role"
            placeholder="Роль (CEO/CTO/PM — необязательно)"
            className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
          />
        </div>

        <textarea
          name="message"
          placeholder="Коротко: что болит и какой результат нужен?"
          required
          className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg h-28 sm:h-32 text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
        />

        <button
          type="submit"
          disabled={sending}
          className={[
            "self-start px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition",
            sending
              ? "bg-white/70 text-black cursor-not-allowed"
              : "bg-white text-black hover:bg-white/80",
          ].join(" ")}
        >
          {sending ? "Отправка…" : "Отправить"}
        </button>
      </form>
    </>
  );
}
