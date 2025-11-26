"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { HeroStats } from "./HeroStats";
import { ContactForm } from "./ContactForm";

const MAIN_SLIDE_ID = "header";

type SlideCtx = {
  goToContacts: () => void;
  tgLink: string;
  leadMagnetHref: string;
};

type Slide = {
  id: string;
  render: (ctx: SlideCtx) => ReactNode;
};

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
    </svg>
  );
}

export function BiographyHorizontal() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // ✅ Быстрый контакт + “созвон” через Telegram (с автотекстом)
  const tgLink =
    "https://t.me/Kovtun_Kirill?text=" +
    encodeURIComponent(
      "Здравствуйте! Хочу созвон на 20–30 минут. Коротко: (1) сфера/компания, (2) что болит, (3) сроки."
    );

  // ✅ Лид-магнит (положи файл в /public/docs/it-audit-checklist.pdf)
  const leadMagnetHref = "/docs/it-audit-checklist.pdf";

  // ✅ ВАЖНО: типизируем useMemo, чтобы ctx в render НЕ был any
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "header",
        render: () => (
          <div className="flex flex-col gap-3 sm:gap-4 items-start">
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-white/70">
              CIO / Архитектор АИС / CRM
            </div>
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">
              Ковтун Кирилл
            </div>
          </div>
        ),
      },

      {
        id: "hero",
        render: ({ goToContacts, tgLink, leadMagnetHref }) => (
          <div className="flex flex-col gap-4 sm:gap-4 max-w-3xl">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl md:text-4xl font-semibold leading-snug">
                Партнёр по архитектуре и управлению сложными ИТ-системами
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Помогаю компаниям и государственным заказчикам создавать устойчивые
                цифровые решения — от анализа потребностей и процессов разработки до
                интеграций и эксплуатации. Опыт построения федеральных АИС,
                работающих для 89 субъектов РФ.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
                <span className="bg-white text-black px-2 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
                  CI/CD и DevSecOps
                </span>
                <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
                  Проектирование масштабируемых АИС
                </span>
                <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
                  Архитектурный консалтинг и аудит
                </span>
                <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
                  Управление командами разработки
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={goToContacts}
                  className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                >
                  Созвон 20–30 минут
                </button>

                <a
                  href={tgLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition"
                >
                  Написать в Telegram
                </a>

                {/* <a
                  href={leadMagnetHref}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm hover:bg-white/10 transition"
                >
                  Скачать чек-лист IT-аудита (PDF)
                </a> */}
              </div>
            </div>

            <HeroStats />
          </div>
        ),
      },

      {
        id: "why",
        render: () => (
          <div className="space-y-1 sm:space-y-2 max-w-2xl">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
                Почему со мной работают
              </div>
            </div>

            <div className="flex flex-col divide-y divide-white/45 text-sm sm:text-base md:text-lg">
              <div className="py-1 sm:py-2">
                <div className="font-semibold">Глубокий опыт федеральных АИС</div>
                <p className="text-white/70 max-w-xl">
                  Более шести лет проектирую и развиваю государственные
                  информационные системы. Понимаю, как соединить интересы бизнеса,
                  государства и реальных команд разработки.
                </p>
              </div>
              <div className="py-1 sm:py-2">
                <div className="font-semibold">Архитектор и управленец в одном лице</div>
                <p className="text-white/70 max-w-xl">
                  Умею проектировать сложные системы, выстраивать процессы,
                  управлять командами и приводить проекты к промышленной
                  эксплуатации.
                </p>
              </div>
              <div className="py-1 sm:py-2">
                <div className="font-semibold">Работаю со сложными кейсами</div>
                <p className="text-white/70 max-w-xl">
                  Интеграции, высокая нагрузка, множества стейкхолдеров, строгие
                  регуляторные требования — там, где «типовые решения» не подходят.
                </p>
              </div>
              <div className="py-1 sm:py-2">
                <div className="font-semibold">Фокус на измеримом эффекте</div>
                <p className="text-white/70 max-w-xl">
                  Опираюсь на результаты: снижение инцидентов, повышение скорости
                  релизов, прозрачность процессов, экономия времени и ресурсов.
                </p>
              </div>
              <div className="py-1 sm:py-2">
                <div className="font-semibold">Честная и ясная коммуникация</div>
                <p className="text-white/70 max-w-xl">
                  Говорю простым языком, объясняю риски, формирую реалистичные
                  ожидания — без магии и завышенных обещаний.
                </p>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "services",
        render: ({ goToContacts }) => (
          <div className="max-w-3xl space-y-8 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
                Комплексные IT-решения и услуги
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Работаю как внешний CIO, руководитель разработки и консультант.
                Помогаю выстроить зрелую IT-функцию, повысить устойчивость систем и
                получить понятный roadmap развития.
              </p>
            </div>

            <div className="text-sm sm:text-base md:text-lg text-white/85">
              <div className="flex flex-col divide-y divide-white/45">
                {[
                  {
                    title: "CIO / руководитель разработки (part-time)",
                    text: "Выстраиваю управляемое развитие продуктов и решений: задаю приоритеты, координирую команду разработки, контролирую релизы и обеспечиваю прозрачную коммуникацию с бизнесом.",
                  },
                  {
                    title: "Архитектурный и технологический аудит",
                    text: "Провожу анализ системы, интеграций и процесса разработки. Фиксирую риски, узкие места и формирую план развития на 3–6 месяцев с рекомендациями и quick-wins.",
                  },
                  {
                    title: "Проектирование АИС и платформ",
                    text: "Формирую устойчивые решения: модули, данные, масштабирование, отказоустойчивость, очереди и событийные процессы.",
                  },
                  {
                    title: "Интеграции с гос-ИС и внешними системами",
                    text: "Проектирую надёжные контуры: адаптеры, анти-коррупционный слой, идемпотентность, механики повторов и мониторинг с соблюдением SLA и полной наблюдаемостью.",
                  },
                  {
                    title: "Процессы разработки, DevSecOps и CI/CD",
                    text: "Выстраиваю цикл разработки: конвейер CI/CD, регламенты, код-ревью, тестирование, автоматизация, контроль качества релизов и мониторинг на всех этапах.",
                  },
                ].map((s) => (
                  <div key={s.title} className="py-1 sm:py-2">
                    <div className="font-semibold text-base sm:text-lg md:text-2xl mb-1 sm:mb-1">
                      {s.title}
                    </div>
                    <p className="text-white/70 max-w-2xl">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-5">
                <button
                  type="button"
                  onClick={goToContacts}
                  className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                >
                  Обсудить задачу (созвон 20–30 минут)
                </button>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "pricing",
        render: ({ goToContacts, leadMagnetHref }) => (
          <div className="max-w-3xl space-y-5">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
                Форматы работы и стоимость
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Обычно начинаем с короткого созвона и выбираем формат под вашу ситуацию.
                Точная оценка — после уточнения контекста.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-white/70">
                  Быстрый старт
                </div>
                <div className="mt-1 text-lg font-semibold">Экспресс-аудит (7–10 дней)</div>
                <div className="mt-1 text-white/80 text-sm">80–150k ₽</div>
                <ul className="mt-3 space-y-1 text-sm text-white/70">
                  <li>— архитектура / интеграции / релизный процесс</li>
                  <li>— риски и узкие места</li>
                  <li>— quick-wins + план на 90 дней</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-white/70">
                  Системно
                </div>
                <div className="mt-1 text-lg font-semibold">
                  Roadmap / проектирование (3–6 недель)
                </div>
                <div className="mt-1 text-white/80 text-sm">150–350k ₽</div>
                <ul className="mt-3 space-y-1 text-sm text-white/70">
                  <li>— модель данных и контуры взаимодействия</li>
                  <li>— масштабирование и отказоустойчивость</li>
                  <li>— интеграции, SLA, наблюдаемость</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:col-span-2">
                <div className="text-xs uppercase tracking-[0.25em] text-white/70">
                  Поддержка
                </div>
                <div className="mt-1 text-lg font-semibold">
                  CIO / Руководитель разработки (part-time)
                </div>
                <div className="mt-1 text-white/80 text-sm">от 200к ₽ / месяц</div>
                <ul className="mt-3 space-y-1 text-sm text-white/70">
                  <li>— приоритизация, постановка системного управления</li>
                  <li>— контроль качества релизов и процессов</li>
                  <li>— помощь команде и коммуникация со стейкхолдерами</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={goToContacts}
                className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                Записаться на созвон
              </button>
              {/* <a
                href={leadMagnetHref}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition"
              >
                Скачать чек-лист (PDF)
              </a> */}
            </div>
          </div>
        ),
      },

      {
        id: "projects",
        render: () => (
          <div className="w-full max-w-[min(100vw-2.5rem,52rem)] space-y-4 md:space-y-4">
            <div className="space-y-1 md:space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold">
                Примеры реализованных проектов
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Несколько задач, в которых я выступал как архитектор и руководитель разработки.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-white/45 text-sm sm:text-base">
              {[
                {
                  tag: "Госсектор",
                  title: "АИС для взаимодействия ФОИВ и субъектов РФ",
                  text: "Система обмена данными и документами между федеральным уровнем и 89 субъектами РФ, заменившая Excel и почту.",
                  effect:
                    "Эффект: сокращение ручного труда ≈ на 80%, прозрачные статусы и аналитика для руководства.",
                },
                {
                  tag: "Госсектор",
                  title: "Платформа контроля исполнения поручений",
                  text: "Система контроля поручений с дедлайнами, уведомлениями и аналитикой по статусам исполнения.",
                  effect:
                    "Эффект: снижение просроченных поручений, прозрачная отчётность для руководства.",
                },
                {
                  tag: "Мобильные решения",
                  title: "Мобильное аналитическое приложение",
                  text: "Приложение для руководителей, агрегирующее ключевые показатели из разных систем в одном интерфейсе.",
                  effect: "Эффект: быстрый доступ к метрикам и статусу проектов 24/7.",
                },
                {
                  tag: "Интеграции",
                  title: "Интеграционный контур с внешними АИС",
                  text: "Проектирование и реализация интеграционного контура с государственными системами и смежными платформами.",
                  effect:
                    "Эффект: меньше ручной синхронизации и ошибок, предсказуемая работа интеграций.",
                },
              ].map((p) => (
                <div key={p.title} className="py-3 sm:py-4 space-y-1">
                  <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/80">
                    {p.tag}
                  </div>
                  <div className="font-semibold text-base sm:text-lg md:text-xl">
                    {p.title}
                  </div>
                  <p className="text-white/75 leading-relaxed">{p.text}</p>
                  <p className="text-white/80 text-[11px] sm:text-xs mt-1">{p.effect}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },

      {
        id: "testimonials",
        render: () => (
          <div className="space-y-5 max-w-xl">
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
              Отзывы и рекомендации
            </div>
            <p className="text-sm sm:text-base text-white/80">
              Короткие выдержки из отзывов коллег и стейкхолдеров, с которыми мы запускали сложные проекты.
            </p>
            <div className="space-y-3 text-sm md:text-base">
              <div>
                <p className="italic text-white/85">
                  «Кирилл держит в фокусе и бизнес-задачу, и техническую сторону. С ним легче реализовывать проекты с госрегулированием и высокими требованиями к качеству».
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Руководитель направления цифровизации (госсектор)
                </p>
              </div>
              <div>
                <p className="italic text-white/85">
                  «Умеет выстроить коммуникацию между разработчиками, аналитиками и заказчиком. Решения аргументированы и реалистичны по срокам и ресурсам».
                </p>
                <p className="text-white/60 text-xs mt-1">Тимлид разработки</p>
              </div>
              <div>
                <p className="italic text-white/85">
                  «После внедрения системы количество ручной работы и ошибок в отчётности заметно снизилось. Эффект можно посчитать в цифрах».
                </p>
                <p className="text-white/60 text-xs mt-1">Представитель заказчика</p>
              </div>
            </div>
          </div>
        ),
      },

      {
        id: "contacts",
        render: ({ tgLink }) => (
          <div className="space-y-8 sm:space-y-10 max-w-xl">
            <div className="space-y-4 sm:space-y-5">
              <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
                Свяжитесь со мной
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Напишите, если вам нужен аудит, проектирование системы или внешний CIO.
                Обсудим контекст, цели и возможные форматы сотрудничества.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/75">
                Часто начинаем с короткого онлайн-созвона на 20–30 минут.
              </p>

              <a
                href={tgLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                Написать в Telegram и согласовать созвон
              </a>
            </div>

            <div className="space-y-3 text-sm md:text-base">
              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60">
                  Email
                </div>
                <a
                  href="mailto:kovtun.k.s.nun@gmail.com"
                  className="underline underline-offset-4"
                >
                  kovtun.k.s.nun@gmail.com
                </a>
              </div>

              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60">
                  Telegram
                </div>
                <a
                  href="https://t.me/Kovtun_Kirill"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  @Kovtun_Kirill
                </a>
              </div>

              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60">
                  Локация
                </div>
                <div className="text-white/80">
                  Москва, работа с заказчиками по всей России и онлайн
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        ),
      },
    ],
    []
  );

  const CONTACTS_INDEX = slides.findIndex((s) => s.id === "contacts");

  const clampIndex = (i: number) => Math.max(0, Math.min(slides.length - 1, i));

  const goTo = (nextIndex: number) => {
    const clamped = clampIndex(nextIndex);
    if (clamped === activeIndexRef.current) return;

    isAnimatingRef.current = true;
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);

    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 650);
  };

  const goToContacts = () => {
    if (CONTACTS_INDEX >= 0) goTo(CONTACTS_INDEX);
  };

  // wheel → смена слайда
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 20) return;

      const direction = delta > 0 ? 1 : -1;
      goTo(activeIndexRef.current + direction);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  // touch → свайп
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX.current;
      const dy = t.clientY - touchStartY.current;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (isAnimatingRef.current) return;
        const direction = dx < 0 ? 1 : -1;
        goTo(activeIndexRef.current + direction);
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart as any);
      el.removeEventListener("touchend", handleTouchEnd as any);
    };
  }, []);

  // keyboard ←/→
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (e.key === "ArrowRight") goTo(activeIndexRef.current + 1);
      if (e.key === "ArrowLeft") goTo(activeIndexRef.current - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeItem = slides[activeIndex];
  const isRightSlide = !!activeItem && activeItem.id !== MAIN_SLIDE_ID;
  const isOnContacts = CONTACTS_INDEX >= 0 && activeIndex === CONTACTS_INDEX;

  return (
    <div className="relative min-h-screen">
      {/* Градиент справа — под текстом */}
      <div
        className={`
          pointer-events-none
          fixed inset-y-0 right-0
          w-[70%] sm:w-[60%]
          bg-gradient-to-l from-black/80 via-black/55 to-transparent
          transition-opacity duration-700
          ${isRightSlide ? "opacity-100" : "opacity-0"}
          z-0
        `}
      />

      {/* Контент */}
      <div ref={scrollRef} className="relative z-10 overflow-hidden h-screen">
        <article
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ transform: `translate3d(${-activeIndex * 100}vw, 0, 0)` }}
        >
          {slides.map((slide, index) => {
            const isMain = slide.id === MAIN_SLIDE_ID;

            // header: мобилка — вверх/влево, десктоп — центр по вертикали, слева по горизонтали
            const alignClass = isMain
              ? "items-start justify-start md:items-center md:justify-start"
              : "items-center justify-center md:justify-end";

            const isActive = index === activeIndex;

            return (
              <section
                key={slide.id}
                className={`
                  relative flex-none w-screen h-screen
                  flex px-4 sm:px-6 md:px-16 lg:px-24
                  ${isMain ? "pt-14 sm:pt-16 md:py-0" : "py-10 sm:py-12 md:py-0"}
                  overflow-y-auto
                  ${alignClass}
                `}
              >
                <div
                  className={`
                    relative max-w-3xl
                    text-base md:text-lg leading-relaxed
                    transition-all duration-700
                    ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
                  `}
                >
                  {slide.render({ goToContacts, tgLink, leadMagnetHref })}
                </div>
              </section>
            );
          })}
        </article>
      </div>

      {/* Стрелки + Contacts (сверху справа) */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-10 z-30 flex items-center gap-2">
        {!isOnContacts && CONTACTS_INDEX >= 0 && (
          <button
            type="button"
            aria-label="Перейти к контактам"
            onClick={goToContacts}
            className={`
              h-9 w-9 rounded-full border border-white/15
              bg-white/5 backdrop-blur-md
              grid place-items-center text-white/90
              transition
              hover:bg-white/10 hover:border-white/25
              focus:outline-none focus:ring-2 focus:ring-white/30
            `}
          >
            <ContactIcon />
          </button>
        )}

        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={() => goTo(activeIndexRef.current - 1)}
          disabled={activeIndex === 0}
          className={`
            h-9 w-9 rounded-full border border-white/15
            bg-white/5 backdrop-blur-md
            grid place-items-center text-white/90
            transition
            hover:bg-white/10 hover:border-white/25
            disabled:opacity-30 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-white/30
          `}
        >
          <ArrowIcon dir="left" />
        </button>

        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={() => goTo(activeIndexRef.current + 1)}
          disabled={activeIndex === slides.length - 1}
          className={`
            h-9 w-9 rounded-full border border-white/15
            bg-white/5 backdrop-blur-md
            grid place-items-center text-white/90
            transition
            hover:bg-white/10 hover:border-white/25
            disabled:opacity-30 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-white/30
          `}
        >
          <ArrowIcon dir="right" />
        </button>
      </div>

      {/* Пагинация */}
      <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-10 z-20 flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] uppercase">
        {slides.map((slide, index) => {
          const label = String(index + 1).padStart(2, "0");
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={`transition-colors ${
                isActive ? "text-white" : "text-white/40 hover:text-white/80"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
