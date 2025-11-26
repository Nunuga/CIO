import { useEffect, useState } from "react";

type StatRowProps = {
  label: string;
  title: string;
  subtitle: string;
  percent: number; // 0–100
  delay?: number;
};

const StatRow: React.FC<StatRowProps> = ({
  label,
  title,
  subtitle,
  percent,
  delay = 0,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(percent), delay);
    return () => clearTimeout(t);
  }, [percent, delay]);

  return (
    <div className="py-2">
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </div>

      <div className="mt-1 text-2xl md:text-3xl font-semibold">
        {title}
      </div>

      <div className="mt-1 text-white/75 text-sm md:text-base max-w-xl">
        {subtitle}
      </div>

      {/* график */}
      <div className="mt-2">
        <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="
              h-full
              bg-gradient-to-r from-white via-white to-white/60
              shadow-[0_0_16px_rgba(255,255,255,0.7)]
              transition-[width] duration-[1000ms] ease-out
            "
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const HeroStats: React.FC = () => (
  <div className="max-w-2xl flex flex-col  divide-white/15 text-sm md:text-base">
    <div className="text-xl sm:text-2xl md:text-4xl font-semibold leading-snug">
            Цифры, которые говорят обо мне
          </div>
    <StatRow
      label="Масштаб систем"
      title="89 регионов"
      subtitle="Федеральные АИС"
      percent={100}
      delay={0}
    />
    <StatRow
      label="Эффект автоматизации"
      title="−80%"
      subtitle="Сокращение ручного труда"
      percent={80}
      delay={150}
    />
    <StatRow
      label="Инновации"
      title="2 патента"
      subtitle="Уникальные архитектуры"
      percent={65}
      delay={300}
    />
    {/* <StatRow
      label="Команды"
      title="15+ специалистов"
      subtitle="Мультидисциплинарные команды"
      percent={70}
      delay={450}
    /> */}
     <StatRow
      label="Пользователи"
      title="+ 10 000 пользователей в продуктивной эксплуатации"
      subtitle="Ежедневная нагрузка в продуктиве"
      percent={90}
      delay={600}
    />
  </div>
);
