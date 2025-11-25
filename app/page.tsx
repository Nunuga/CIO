import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold tracking-[0.2em] uppercase">
        Demo
      </h1>
      <p className="text-sm opacity-80">
        Стартовая страница тестового проекта. Основной экран — Biography.
      </p>
      <Link
        href="/biography"
        className="border border-white/50 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
      >
        Go to Biography
      </Link>
    </main>
  );
}
