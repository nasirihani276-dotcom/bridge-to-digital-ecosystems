import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/atlas/NetworkMap";
import { headlineStats, players, sectors } from "@/data/atlas";
import { fa } from "@/lib/utils";

const toneRing: Record<string, string> = {
  brand: "bg-brand-soft text-brand",
  gold: "bg-gold/15 text-[color:var(--gold)]",
  teal: "bg-teal/15 text-[color:var(--teal)]",
};

const toneBar: Record<string, string> = {
  brand: "bg-gradient-brand",
  gold: "bg-[color:var(--gold)]",
  teal: "bg-[color:var(--teal)]",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "پل | اطلس زیست‌بوم اقتصاد دیجیتال ایران" },
      {
        name: "description",
        content:
          "پل، سامانهٔ جامع دادهٔ زیست‌بوم اقتصاد دیجیتال ایران است: نقشهٔ زندهٔ فین‌تک، تجارت الکترونیک، هوش مصنوعی، لجستیک و سلامت دیجیتال به همراه شاخص‌ها و بازیگران کلیدی.",
      },
      { property: "og:title", content: "پل | اطلس زیست‌بوم اقتصاد دیجیتال ایران" },
      {
        property: "og:description",
        content:
          "نقشهٔ زندهٔ بنگاه‌ها، سرمایه و پیوندهای اقتصاد دیجیتال ایران در یک اطلس واحد.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "پل",
          alternateName: "اطلس اکوسیستم‌های اقتصاد دیجیتال",
          inLanguage: "fa-IR",
          description:
            "سامانهٔ جامع داده‌های زیست‌بوم اقتصاد دیجیتال ایران؛ نقشهٔ بنگاه‌ها، سرمایه و پیوندها.",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="atlas-dots pointer-events-none absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute -top-24 left-[-8%] size-[420px] rounded-full blur-[120px]"
          style={{ background: "color-mix(in oklch, var(--brand-glow) 45%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-[-6%] size-[380px] rounded-full blur-[130px]"
          style={{ background: "color-mix(in oklch, var(--teal) 30%, transparent)" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_1fr] lg:pb-28 lg:pt-24">
          <div className="animate-rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 px-3.5 py-1.5 text-xs font-semibold text-ink-muted backdrop-blur">
              <span className="size-1.5 rounded-full bg-[color:var(--teal)]" />
              نسخهٔ ۱٫۴ · به‌روزرسانی هفتگی داده‌ها
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              اطلس زیست‌بوم
              <br />
              <span className="text-gradient-brand">اقتصاد دیجیتال ایران</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-ink-muted sm:text-lg">
              پل به‌جای فهرست کردن سادهٔ شرکت‌ها، جریان‌ها را ترسیم می‌کند: سرمایه
              از کجا می‌آید، داده کجا جابه‌جا می‌شود و کدام پیوندها هنوز ساخته
              نشده‌اند.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/ecosystems"
                className="rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_18px_40px_-18px_var(--brand-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                کاوش در نقشهٔ اکوسیستم
              </Link>
              <Link
                to="/insights"
                className="rounded-xl border border-ink-foreground/20 px-6 py-3.5 text-sm font-bold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
              >
                مشاهدهٔ شاخص‌ها
              </Link>
            </div>
          </div>

          <div className="animate-float-slow">
            <div className="rounded-3xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between px-2 pb-3 text-xs font-semibold text-ink-muted">
                <span>نمای زندهٔ شبکه</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-node-pulse rounded-full bg-[color:var(--teal)]" />
                  متصل
                </span>
              </div>
              <div className="aspect-[4/3] w-full">
                <NetworkMap />
              </div>
            </div>
          </div>
        </div>

        {/* stat strip */}
        <div className="relative border-t border-ink-foreground/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4">
            {headlineStats.map((s) => (
              <div key={s.label} className="px-2 py-7">
                <dt className="text-xs font-semibold text-ink-muted">
                  {s.label}
                </dt>
                <dd className="font-number mt-2 text-3xl font-black text-ink-foreground">
                  {s.value}
                </dd>
                <p className="mt-1.5 text-[11px] text-ink-muted">{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECTORS */}
      <section className="atlas-grid relative">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-brand">
                ۰۱ / عرصه‌ها
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight sm:text-4xl">
                شش قارهٔ اقتصاد دیجیتال
              </h2>
            </div>
            <Link
              to="/ecosystems"
              className="text-sm font-bold text-brand hover:underline"
            >
              مشاهدهٔ همهٔ عرصه‌ها ←
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <article key={sector.slug} className="surface-card p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${toneRing[sector.tone]}`}
                  >
                    {sector.growth}
                  </span>
                  <span className="font-number text-sm font-semibold text-muted-foreground">
                    {fa(sector.nodes)} بنگاه
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{sector.name}</h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {sector.summary}
                </p>
                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${toneBar[sector.tone]}`}
                    style={{ width: `${sector.share}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-bold tracking-[0.2em] text-brand">
              ۰۲ / چرا پل
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight">
              پل‌ها را ببینید، نه فقط جزیره‌ها را
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              نام «پل» تصادفی نیست: ارزش اقتصاد دیجیتال در پیوندهاست، نه در
              فهرست بنگاه‌ها. اطلس پل هر رابطهٔ سرمایه‌گذاری، شراکت فنی و جریان
              داده را ثبت می‌کند تا بتوانید ساختار واقعی بازار را بخوانید.
            </p>
            <ul className="mt-7 space-y-3.5 text-sm font-medium">
              {[
                "پروفایل استاندارد برای هر بنگاه با منبع‌دهی شفاف",
                "نگاشت پیوندها میان سرمایه‌گذار، استارتاپ و نهاد",
                "شاخص‌های قابل مقایسه در بازه‌های زمانی",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gradient-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden bg-ink p-8 sm:p-12">
            <div className="atlas-dots absolute inset-0 opacity-40" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <blockquote className="text-lg font-bold leading-9 text-ink-foreground">
                «اقتصاد دیجیتال یک فهرست نیست؛ یک شبکه است. تا وقتی پیوندها را
                نبینیم، فقط نقطه‌ها را شمرده‌ایم.»
              </blockquote>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="font-number text-3xl font-black text-ink-foreground">
                    ۳٬۹۲۰
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">پیوند ثبت‌شده</p>
                </div>
                <div>
                  <div className="font-number text-3xl font-black text-ink-foreground">
                    ۲۷
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">منبع دادهٔ مستقل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYERS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">
            ۰۳ / بازیگران
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            گره‌های کلیدی اطلس
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {players.slice(0, 6).map((p) => (
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
                <h3 className="mt-5 text-lg font-extrabold">{p.name}</h3>
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
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-14 text-center sm:px-16">
          <div className="atlas-dots absolute inset-0 opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-black text-primary-foreground sm:text-4xl">
              بنگاه خود را روی نقشه ثبت کنید
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-primary-foreground/85">
              اگر در یکی از عرصه‌های اقتصاد دیجیتال فعالیت می‌کنید، پروفایل خود
              را به اطلس اضافه کنید تا در نقشهٔ پیوندها دیده شوید.
            </p>
            <Link
              to="/about"
              hash="contact"
              className="mt-8 inline-flex rounded-xl bg-ink px-7 py-3.5 text-sm font-bold text-ink-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              ثبت بنگاه در اطلس
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
