"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroStats } from "./HeroStats";

const MAIN_SLIDE_ID = "header"; // главный слева

const items = [
  {
    id: "header",
    content: (
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
    content: (
      <div className="flex flex-col gap-8 sm:gap-10 max-w-3xl">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold leading-snug">
            Партнёр по архитектуре и управлению сложными ИТ-системами
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Помогаю компаниям и государственным заказчикам строить устойчивые
            информационные системы: от архитектуры и процессов разработки до
            интеграций и эксплуатации. Опыт федеральных проектов, работающих для
            89 субъектов РФ.
          </p>

          <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
            <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
              CI/CD и DevSecOps
            </span>
            <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
              Интеграции с ФОИВ и регионами
            </span>
            <span className="bg-white text-black px-3 py-1 rounded-full shadow-sm hover:bg-white/90 transition">
              Патентованные архитектуры
            </span>
          </div>
        </div>

        <div>
          <HeroStats />
        </div>
      </div>
    ),
  },
  {
    id: "why",
    content: (
      <div className="space-y-1 sm:space-y-2 max-w-2xl">
        <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Почему со мной работают
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Более 6 лет занимаюсь разработкой и архитектурой государственных
            информационных систем. Знаю, как соединить требования бизнеса,
            государства и реальных команд разработки.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Руководил разработкой и запуском крупных АИС, интегрированных с
            федеральными органами власти и регионами. Вёл проекты от аналитики и
            архитектуры до промышленной эксплуатации и сопровождения.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Работаю там, где стандартных решений уже недостаточно: сложные
            интеграции, высокая нагрузка, строгие регуляторные требования,
            несколько стейкхолдеров с разными интересами.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-white/45 text-sm sm:text-base md:text-lg">
          <div className="py-1 sm:py-2">
            <div className="font-semibold">Опыт гос-АИС</div>
            <p className="text-white/70 max-w-xl">
              Федеральный уровень, внедрения во всех регионах страны, учёт
              требований регуляторов и ИБ.
            </p>
          </div>

          <div className="py-1 sm:py-2">
            <div className="font-semibold">Архитектор и управленец</div>
            <p className="text-white/70 max-w-xl">
              Комбинирую техническую глубину с управлением командами и
              приоритизацией задач.
            </p>
          </div>

          <div className="py-1 sm:py-2">
            <div className="font-semibold">Фокус на эффекте</div>
            <p className="text-white/70 max-w-xl">
              Считаем результат в цифрах: снижение ручного труда, меньше
              инцидентов, быстрее релизы.
            </p>
          </div>

          <div className="py-1 sm:py-2">
            <div className="font-semibold">Честная коммуникация</div>
            <p className="text-white/70 max-w-xl">
              Объясняю риски и ограничения простым языком, без «магии» и
              завышенных обещаний.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "services",
    content: (
      <div className="max-w-3xl space-y-8 sm:space-y-10">
        <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Комплексные IT-решения и услуги
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Работаю как внешний CIO / руководитель разработки или архитектурный
            консультант — помогаю выстроить устойчивую IT-функцию и понятный
            roadmap развития.
          </p>
        </div>

        <div className="text-sm sm:text-base md:text-lg text-white/85">
          <div className="flex flex-col divide-y divide-white/45">
            {[
              {
                title: "CIO / руководитель разработки (part-time)",
                text: "Архитектурные решения, приоритизация задач, организация разработки и взаимодействие с бизнесом.",
              },
              {
                title: "Архитектурный и технологический аудит",
                text: "Анализ архитектуры, узких мест, интеграций и процессов. План развития на 3–6 месяцев с оценкой рисков и набором quick-wins.",
              },
              {
                title: "Проектирование АИС и платформ",
                text: "Архитектура государственных и корпоративных систем: модель данных, контуры интеграций, отказоустойчивость и масштабирование.",
              },
              {
                title: "Интеграции с гос-ИС и внешними системами",
                text: "Устойчивые интеграции с государственными информационными системами и смежными платформами.",
              },
              {
                title: "Процессы разработки и CI/CD",
                text: "Конвейер разработки: планирование, код-ревью, тесты, релизы, мониторинг и обратная связь.",
              },
              {
                title: "Безопасность и аттестация",
                text: "Учёт требований ИБ, модель угроз, подготовка к аттестации, журналирование и контроль доступа.",
              },
            ].map((s) => (
              <div key={s.title} className="py-1 sm:py-2">
                <div className="font-semibold text-base sm:text-lg md:text-2xl mb-1 sm:mb-2">
                  {s.title}
                </div>
                <p className="text-white/70 max-w-2xl">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "projects",
    content: (
      <div className="w-full max-w-[min(100vw-2.5rem,52rem)] space-y-4 md:space-y-10">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Примеры реализованных проектов
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Несколько задач, в которых я выступал как архитектор и руководитель
            разработки.
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
              effect:
                "Эффект: быстрый доступ к метрикам и статусу проектов 24/7.",
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
              <p className="text-white/80 text-[11px] sm:text-xs mt-1">
                {p.effect}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "testimonials",
    content: (
      <div className="space-y-5 max-w-xl">
        <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
          Отзывы и рекомендации
        </div>
        <p className="text-sm sm:text-base text-white/80">
          Короткие выдержки из отзывов коллег и стейкхолдеров, с которыми мы
          запускали сложные проекты.
        </p>
        <div className="space-y-3 text-sm md:text-base">
          <div>
            <p className="italic text-white/85">
              «Кирилл держит в фокусе и бизнес-задачу, и техническую сторону. С
              ним легче реализовывать проекты с госрегулированием и высокими
              требованиями к качеству».
            </p>
            <p className="text-white/60 text-xs mt-1">
              Руководитель направления цифровизации (госсектор)
            </p>
          </div>
          <div>
            <p className="italic text-white/85">
              «Умеет выстроить коммуникацию между разработчиками, аналитиками и
              заказчиком. Архитектурные решения аргументированы и реалистичны по
              срокам и ресурсам».
            </p>
            <p className="text-white/60 text-xs mt-1">Тимлид разработки</p>
          </div>
          <div>
            <p className="italic text-white/85">
              «После внедрения системы по его архитектуре количество ручной
              работы и ошибок в отчётности заметно снизилось. Это один из
              проектов, где эффект можно посчитать в цифрах».
            </p>
            <p className="text-white/60 text-xs mt-1">
              Представитель заказчика
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "contacts",
    content: (
      <div className="space-y-8 sm:space-y-10 max-w-xl">
        <div className="space-y-4 sm:space-y-5">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Свяжитесь со мной
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Напишите, если вам нужен аудит, архитектура новой системы или
            внешний CIO. Обсудим контекст, цели и возможные форматы
            сотрудничества.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/75">
            Часто начинаем с короткого онлайн-созвона на 20–30 минут.
          </p>
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

        <form
          action="https://formsubmit.co/kovtun.k.s.nun@gmail.com"
          method="POST"
          className="flex flex-col gap-4 pt-6 sm:pt-8 border-t border-white/15 text-white"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://your-domain.ru/thanks" />

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
            className="self-start px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-white/80 transition"
          >
            Отправить
          </button>
        </form>
      </div>
    ),
  },
];

export function BiographyHorizontal() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  // touch-свайп
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const clampIndex = (i: number) => Math.max(0, Math.min(items.length - 1, i));

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

  // touch → свайп влево/вправо (мобилки/тачпады)
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
        const direction = dx < 0 ? 1 : -1; // влево → следующий
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

  const activeItem = items[activeIndex];
  const isRightSlide = !!activeItem && activeItem.id !== MAIN_SLIDE_ID;

  return (
    <div className="relative min-h-screen">
      {/* Градиент справа — ПОД текстом */}
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

      {/* Контент поверх градиента */}
      <div ref={scrollRef} className="relative z-10 overflow-hidden h-screen">
        <article
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ transform: `translate3d(${-activeIndex * 100}vw, 0, 0)` }}
        >
          {items.map((item, index) => {
            const isMain = item.id === MAIN_SLIDE_ID;
            const alignClass = isMain
              ? "items-center justify-center md:justify-start"
              : "items-center justify-center md:justify-end";

            const isActive = index === activeIndex;

            return (
              <section
                key={item.id}
                className={`
                  relative flex-none w-screen h-screen
                  flex px-4 sm:px-6 md:px-16 lg:px-24
                  py-10 sm:py-12 md:py-0
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
                  {item.content}
                </div>
              </section>
            );
          })}
        </article>
      </div>

      {/* Стрелки навигации (сверху справа) */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-10 z-30 flex items-center gap-2">
        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={() => goTo(activeIndexRef.current - 1)}
          disabled={activeIndex === 0}
          className={`
            h-9 w-9 rounded-full border border-white/15
            bg-white/5 backdrop-blur-md
            grid place-items-center
            transition
            hover:bg-white/10 hover:border-white/25
            disabled:opacity-30 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-white/30
          `}
        >
          <ChevronLeft className="h-4 w-4 text-white/90" />
        </button>

        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={() => goTo(activeIndexRef.current + 1)}
          disabled={activeIndex === items.length - 1}
          className={`
            h-9 w-9 rounded-full border border-white/15
            bg-white/5 backdrop-blur-md
            grid place-items-center
            transition
            hover:bg-white/10 hover:border-white/25
            disabled:opacity-30 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-white/30
          `}
        >
          <ChevronRight className="h-4 w-4 text-white/90" />
        </button>
      </div>

      {/* Пагинация 01 / 02 / 03 */}
      <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-10 z-20 flex gap-3 sm:gap-4 text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] uppercase">
        {items.map((item, index) => {
          const label = String(index + 1).padStart(2, "0");
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              className={`
                transition-colors
                ${isActive ? "text-white" : "text-white/40 hover:text-white/80"}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
