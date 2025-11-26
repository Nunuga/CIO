"use client";

import { useRef, useState } from "react";

function AppleToast({
  open,
  title = "Письмо отправлено",
  subtitle = "Спасибо! Я скоро отвечу.",
}: {
  open: boolean;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      className={[
        "fixed inset-0 z-[60]",
        "grid place-items-center",
        "transition duration-300 ease-out",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      {/* карточка уведомления */}
      <div
        className={[
          "rounded-2xl border border-white/12 bg-black/55 backdrop-blur-xl",
          "shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
          "px-5 py-4",
          "w-[min(92vw,420px)]",
          "transition-all duration-300 ease-out",
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-2",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-10 w-10 rounded-full bg-white/10 grid place-items-center border border-white/10">
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
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-white/95 leading-6">
              {title}
            </div>
            <div className="text-sm text-white/70 leading-6 mt-0.5">
              {subtitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const showToast = () => {
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 2200);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // антиспам (honeypot). Если бот заполнил — не отправляем.
      const honey = formData.get("_honey");
      if (typeof honey === "string" && honey.trim().length > 0) {
        form.reset();
        setSending(false);
        return;
      }

      const res = await fetch("https://formsubmit.co/ajax/kovtun.k.s.nun@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Submit failed");

      showToast();
      form.reset(); // очистить форму до пустой
    } catch (err) {
      // если хочешь — можно показывать отдельный toast ошибки
      alert("Не удалось отправить сообщение. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <AppleToast open={toastOpen} />

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-4 pt-6 sm:pt-8 border-t border-white/15 text-white"
      >
        {/* FormSubmit settings */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Заявка с сайта (cio-chi.vercel.app)" />

        {/* honeypot */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

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
        </div>

        <textarea
          name="message"
          placeholder="Ваше сообщение"
          required
          className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg h-28 sm:h-32 text-sm sm:text-base outline-none focus:ring-2 focus:ring-white/40"
        />

        <button
          type="submit"
          disabled={sending}
          className={[
            "self-start px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition",
            sending ? "bg-white/70 text-black cursor-not-allowed" : "bg-white text-black hover:bg-white/80",
          ].join(" ")}
        >
          {sending ? "Отправка…" : "Отправить"}
        </button>
      </form>
    </>
  );
}
