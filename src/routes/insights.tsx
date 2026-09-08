import { createFileRoute } from "@tanstack/react-router";
import { headlineStats, sectors } from "@/data/atlas";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "شاخص‌ها و روند بازار | اطلس پل" },
      {
        name: "description",
        content:
          "شاخص‌های کلیدی اقتصاد دیجیتال ایران در اطلس پل: حجم سرمایه‌گذاری، اشتغال، سهم هر عرصه و روند رشد فصلی بر پایهٔ داده‌های راستی‌آزمایی‌شده.",
      },
      { property: "og:title", content: "شاخص‌ها و روند بازار | اطلس پل" },
      {
        property: "og:description",
        content:
          "سرمایه‌گذاری، اشتغال و روند رشد فصلی اقتصاد دیجیتال ایران در یک نگاه.",
      },
    ],
  }),
  component: InsightsPage,
});

const quarterly = [
  { q: "بهار ۱۴۰۳", value: 38 },
  { q: "تابستان ۱۴۰۳", value: 52 },
  { q: "پاییز ۱۴۰۳", value: 47 },
  { q: "زمستان ۱۴۰۳", value: 68 },
  { q: "بهار ۱۴۰۴", value: 74 },
  { q: "تابستان ۱۴۰۴", value: 91 },
];

function InsightsPage() {
  const max = Math.max(...quarterly.map((q) => q.value));

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="atlas-dots pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-bold tracking-[0.2em] text-ink-muted">
            اطلس / شاخص‌ها
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            شاخص‌های زیست‌بوم
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-ink-muted sm:text-base">
            اعداد زیر برآورد اطلس پل از وضعیت جاری زیست‌بوم است و هر هفته با
            ورود رکوردهای تازه بازنگری می‌شود.
          </p>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {headlineStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-6 backdrop-blur"
              >
                <dt className="text-xs font-semibold text-ink-muted">
                  {s.label}
                </dt>
                <dd className="font-number mt-3 text-3xl font-black">
                  {s.value}
                </dd>
                <p className="mt-2 text-[11px] text-ink-muted">{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="text-xl font-extrabold">
            روند سرمایه‌گذاری فصلی (همت)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            مجموع دورهای اعلام‌شدهٔ سرمایه‌گذاری در شش فصل گذشته.
          </p>

          <div className="mt-10 flex h-56 items-end gap-3 sm:gap-5">
            {quarterly.map((q) => (
              <div key={q.q} className="flex flex-1 flex-col items-center gap-3">
                <span className="font-number text-xs font-bold text-brand">
                  {q.value}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-brand transition-all duration-700"
                  style={{ height: `${(q.value / max) * 100}%` }}
                />
                <span className="text-[10px] font-medium text-muted-foreground">
                  {q.q}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="text-xl font-extrabold">سهم عرصه‌ها</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            نسبت بنگاه‌های ثبت‌شده در هر عرصه.
          </p>
          <ul className="mt-8 space-y-5">
            {sectors.map((s) => (
              <li key={s.slug}>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{s.name}</span>
                  <span className="font-number text-muted-foreground">
                    {s.nodes}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${s.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
