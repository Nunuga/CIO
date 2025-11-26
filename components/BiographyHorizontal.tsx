"use client";

import { useEffect, useRef, useState } from "react";
import { HeroStats } from "./HeroStats";
import { ContactForm } from "./ContactForm";

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
        {/* <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Почему со мной работают
          </div>
        </div> */}
         <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Почему со мной работают
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            {/* Работаю как внешний CIO, руководитель разработки и архитектурный
            консультант. Помогаю компаниям выстроить зрелую IT-функцию, повысить
            устойчивость систем и получить понятный roadmap развития. */}
          </p>
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
            <div className="font-semibold">
              Архитектор и управленец в одном лице
            </div>
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
    content: (
      <div className="max-w-3xl space-y-8 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <div className="text-xl sm:text-2xl md:text-4xl font-semibold">
            Комплексные IT-решения и услуги
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            Работаю как внешний CIO, руководитель разработки и архитектурный
            консультант. Помогаю компаниям выстроить зрелую IT-функцию, повысить
            устойчивость систем и получить понятный roadmap развития.
          </p>
        </div>

        <div className="text-sm sm:text-base md:text-lg text-white/85">
          <div className="flex flex-col divide-y divide-white/45">
            {[
              {
                title: "CIO / руководитель разработки (part-time)",
                text: "Выстраиваю управляемое развитие продуктов и архитектуры: задаю приоритеты, координирую работу команды разработки, контролирую релизы и обеспечиваю прозрачную коммуникацию с бизнесом.",
              },

              {
                title: "Архитектурный и технологический аудит",
                text: "Провожу комплексный анализ архитектуры, интеграций и процессов разработки. Определяю риски, узкие места и формирую план развития на 3–6 месяцев с конкретными рекомендациями и quick-wins.",
              },

              {
                title: "Проектирование АИС и платформ",
                text: "Формирую устойчивые решения: модули, данные, масштабирование, отказоустойчивость, очереди и событийные процессы.",
              },

              {
                title: "Интеграции с гос-ИС и внешними системами",
                text: "Проектирую надёжные интеграционные контуры: адаптеры, анти-коррупционный слой, очереди, механики повторов, идемпотентность и мониторинг с соблюдением SLA и полной наблюдаемостью.",
              },

              {
                title: "Процессы разработки, DevSecOps и CI/CD",
                text: "Выстраиваю зрелый цикл разработки: конвейер CI/CD, регламенты, код-ревью, тестирование, автоматизация, контроль качества релизов и мониторинг на всех этапах.",
              },

              // {
              //   title: "Информационная безопасность и аттестация",
              //   text: "Прорабатываю модель угроз, настраиваю сегментацию, DMZ, журналирование и контроль доступа. Готовлю системы к аттестации ФСТЭК/ФСБ с полным набором документов и рекомендаций.",
              // },
            ].map((s) => (
              <div key={s.title} className="py-1 sm:py-2">
                <div className="font-semibold text-base sm:text-lg md:text-2xl mb-1 sm:mb-1">
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
      <div className="w-full max-w-[min(100vw-2.5rem,52rem)] space-y-4 md:space-y-4">
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

        <ContactForm />
      </div>
    ),
  },
];

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

export function BiographyHorizontal() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);

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

  const activeItem = items[activeIndex];
  const isRightSlide = !!activeItem && activeItem.id !== MAIN_SLIDE_ID;

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
          {items.map((item, index) => {
            const isMain = item.id === MAIN_SLIDE_ID;

            // ✅ header: мобилка — вверх/влево, десктоп — как было (влево по горизонтали, по вертикали центр)
            const alignClass = isMain
              ? "items-start justify-start md:items-center md:justify-start"
              : "items-center justify-center md:justify-end";

            const isActive = index === activeIndex;

            return (
              <section
                key={item.id}
                className={`
                  relative flex-none w-screen h-screen
                  flex px-4 sm:px-6 md:px-16 lg:px-24
                  ${
                    isMain ? "pt-14 sm:pt-16 md:py-0" : "py-10 sm:py-12 md:py-0"
                  }
                  overflow-y-auto
                  ${alignClass}
                `}
              >
                <div
                  className={`
                    relative max-w-3xl
                    text-base md:text-lg leading-relaxed
                    transition-all duration-700
                    ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-6"
                    }
                  `}
                >
                  {item.content}
                </div>
              </section>
            );
          })}
        </article>
      </div>

      {/* Стрелки (сверху справа) */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-10 z-30 flex items-center gap-2">
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
          disabled={activeIndex === items.length - 1}
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
