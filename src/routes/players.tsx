import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { players } from "@/data/atlas";

export const Route = createFileRoute("/players")({
  head: () => ({
    meta: [
      { title: "بازیگران اکوسیستم | اطلس پل" },
      {
        name: "description",
        content:
          "پروفایل بنگاه‌های کلیدی اقتصاد دیجیتال ایران در اطلس پل؛ حوزهٔ فعالیت، مرحلهٔ رشد و شاخص عملکردی هر بازیگر در یک فهرست قابل فیلتر.",
      },
      { property: "og:title", content: "بازیگران اکوسیستم | اطلس پل" },
      {
        property: "og:description",
        content:
          "فهرست قابل فیلتر بنگاه‌های کلیدی اقتصاد دیجیتال ایران با شاخص‌های عملکردی.",
      },
    ],
  }),
  component: PlayersPage,
});

const toneRing: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  gold: "bg-gold/15 text-[color:var(--gold)]",
  teal: "bg-teal/15 text-[color:var(--teal)]",
};

function PlayersPage() {
  const sectorList = useMemo(
    () => ["همه", ...Array.from(new Set(players.map((p) => p.sector)))],
    [],
  );
  const [active, setActive] = useState("همه");

  const visible = players.filter(
    (p) => active === "همه" || p.sector === active,
  );

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">
            اطلس / بازیگران
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            بازیگران اقتصاد دیجیتال
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            هر پروفایل شامل عرصهٔ فعالیت، مرحلهٔ رشد و یک شاخص عملکردی
            راستی‌آزمایی‌شده است. فهرست را بر اساس عرصه فیلتر کنید.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {sectorList.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setActive(s)}
                aria-pressed={active === s}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active === s
                    ? "bg-gradient-brand text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article key={p.name} className="surface-card p-6">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-12 place-items-center rounded-2xl text-lg font-black ${toneRing[p.tone]}`}
                  aria-hidden="true"
                >
                  {p.initial}
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {p.stage}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-extrabold">{p.name}</h2>
              <p className="text-xs font-semibold text-brand">{p.sector}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="text-muted-foreground">{p.metricLabel}</span>
                <span className="font-number font-bold">{p.metricValue}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
