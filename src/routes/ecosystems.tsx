import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/atlas/NetworkMap";
import { sectors } from "@/data/atlas";

export const Route = createFileRoute("/ecosystems")({
  head: () => ({
    meta: [
      { title: "عرصه‌های اکوسیستم | اطلس پل" },
      {
        name: "description",
        content:
          "شش عرصهٔ اصلی اقتصاد دیجیتال ایران در اطلس پل: فین‌تک، تجارت الکترونیک، هوش مصنوعی، لجستیک، بازی و سلامت دیجیتال، همراه با تعداد بنگاه‌ها و نرخ رشد هر عرصه.",
      },
      { property: "og:title", content: "عرصه‌های اکوسیستم | اطلس پل" },
      {
        property: "og:description",
        content:
          "نقشهٔ شش عرصهٔ اقتصاد دیجیتال ایران با تعداد بنگاه‌ها و نرخ رشد هرکدام.",
      },
    ],
  }),
  component: EcosystemsPage,
});

const toneText: Record<string, string> = {
  brand: "text-brand",
  gold: "text-[color:var(--gold)]",
  teal: "text-[color:var(--teal)]",
};

function EcosystemsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="atlas-dots pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-ink-muted">
              اطلس / عرصه‌ها
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              عرصه‌های اکوسیستم دیجیتال
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-ink-muted sm:text-base">
              هر عرصه یک خوشه از بنگاه‌های هم‌جنس است. سهم هر خوشه بر پایهٔ تعداد
              بنگاه‌های راستی‌آزمایی‌شده و شدت پیوندهای آن با دیگر عرصه‌ها محاسبه
              می‌شود.
            </p>
          </div>
          <div className="aspect-[4/3] w-full">
            <NetworkMap />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {sectors.map((sector, i) => (
            <article
              key={sector.slug}
              className={`grid gap-5 p-7 transition-colors hover:bg-secondary/50 sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="font-number text-3xl font-black text-brand-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-extrabold">{sector.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  {sector.summary}
                </p>
                <div className="mt-4 h-1.5 max-w-md overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${sector.share}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-8 sm:flex-col sm:gap-3 sm:text-left">
                <div>
                  <div className="font-number text-2xl font-black">
                    {sector.nodes}
                  </div>
                  <p className="text-[11px] text-muted-foreground">بنگاه</p>
                </div>
                <div>
                  <div
                    className={`font-number text-2xl font-black ${toneText[sector.tone]}`}
                  >
                    {sector.growth}
                  </div>
                  <p className="text-[11px] text-muted-foreground">رشد سالانه</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/50 p-7">
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            هر عرصه فهرست بازیگران خود را دارد؛ برای دیدن پروفایل بنگاه‌ها به
            صفحهٔ بازیگران بروید.
          </p>
          <Link
            to="/players"
            className="rounded-xl bg-gradient-brand px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            فهرست بازیگران
          </Link>
        </div>
      </section>
    </>
  );
}
