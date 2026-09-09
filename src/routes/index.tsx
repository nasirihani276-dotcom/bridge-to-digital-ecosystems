import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/atlas/NetworkMap";
import { ecosystems } from "@/data/ecosystems";
import { allCompanies, getCompanyCount, getCategoryName } from "@/data/companies";
import { fa } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "پل | اطلس اکوسیستم‌های اقتصاد دیجیتال ایران" },
      {
        name: "description",
        content:
          "پل، اطلس داده‌های اکوسیستم‌های اقتصاد دیجیتال ایران است: طلا، رمزارز، بیمه، هوش مصنوعی، سرمایه‌گذاری خطرپذیر و صنایع خلاق، همراه با پروفایل هر بنگاه.",
      },
      { property: "og:title", content: "پل | اطلس اکوسیستم‌های اقتصاد دیجیتال ایران" },
      {
        property: "og:description",
        content: "پروفایل بنگاه‌های اکوسیستم‌های اقتصاد دیجیتال ایران در یک اطلس واحد.",
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
            "اطلس داده‌های اکوسیستم‌های اقتصاد دیجیتال ایران؛ پروفایل بنگاه‌ها به تفکیک عرصه.",
        }),
      },
    ],
  }),
  component: HomePage,
});

const publishedEcosystems = ecosystems.filter((e) => getCompanyCount(e.slug) > 0);
const featuredCompanies = allCompanies.slice(0, 6);

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
              اطلس در حال ساخت است · عرصهٔ طلا نخستین مجموعهٔ منتشرشده
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              اطلس اکوسیستم‌های
              <br />
              <span className="text-gradient-brand">اقتصاد دیجیتال ایران</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-ink-muted sm:text-lg">
              پل هر عرصه از اقتصاد دیجیتال را به‌صورت جداگانه نقشه‌برداری می‌کند: نام بنگاه‌ها،
              نشانی رسمی و شرح فعالیت آن‌ها، به‌همراه مشخصات ثبتی و حقوقی برای کاربران عضو.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/ecosystems"
                className="rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_18px_40px_-18px_var(--brand-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                کاوش در نقشهٔ اکوسیستم
              </Link>
              <Link
                to="/players"
                className="rounded-xl border border-ink-foreground/20 px-6 py-3.5 text-sm font-bold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
              >
                فهرست بنگاه‌ها
              </Link>
            </div>
          </div>

          <div className="animate-float-slow">
            <div className="rounded-3xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between px-2 pb-3 text-xs font-semibold text-ink-muted">
                <span>عرصه‌های اطلس</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-node-pulse rounded-full bg-[color:var(--teal)]" />
                  ۶ عرصه
                </span>
              </div>
              <div className="aspect-[4/3] w-full">
                <NetworkMap />
              </div>
            </div>
          </div>
        </div>

        {/* stat strip — real counts only */}
        <div className="relative border-t border-ink-foreground/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4">
            <div className="px-2 py-7">
              <dt className="text-xs font-semibold text-ink-muted">بنگاه ثبت‌شده</dt>
              <dd className="font-number mt-2 text-3xl font-black text-ink-foreground">
                {fa(allCompanies.length)}
              </dd>
              <p className="mt-1.5 text-[11px] text-ink-muted">در عرصهٔ منتشرشده</p>
            </div>
            <div className="px-2 py-7">
              <dt className="text-xs font-semibold text-ink-muted">عرصهٔ در دست ساخت</dt>
              <dd className="font-number mt-2 text-3xl font-black text-ink-foreground">
                {fa(ecosystems.length)}
              </dd>
              <p className="mt-1.5 text-[11px] text-ink-muted">طلا، رمزارز، بیمه و…</p>
            </div>
            <div className="px-2 py-7">
              <dt className="text-xs font-semibold text-ink-muted">عرصهٔ منتشرشده</dt>
              <dd className="font-number mt-2 text-3xl font-black text-ink-foreground">
                {fa(publishedEcosystems.length)}
              </dd>
              <p className="mt-1.5 text-[11px] text-ink-muted">با پروفایل کامل بنگاه‌ها</p>
            </div>
            <div className="px-2 py-7">
              <dt className="text-xs font-semibold text-ink-muted">دسترسی به دادهٔ حقوقی</dt>
              <dd className="font-number mt-2 text-3xl font-black text-ink-foreground">عضویت</dd>
              <p className="mt-1.5 text-[11px] text-ink-muted">پس از ثبت‌نام رایگان</p>
            </div>
          </dl>
        </div>
      </section>

      {/* ECOSYSTEMS */}
      <section className="atlas-grid relative">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-brand">۰۱ / عرصه‌ها</p>
              <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight sm:text-4xl">
                شش عرصهٔ اقتصاد دیجیتال
              </h2>
            </div>
            <Link to="/ecosystems" className="text-sm font-bold text-brand hover:underline">
              مشاهدهٔ همهٔ عرصه‌ها ←
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ecosystems.map((eco) => {
              const count = getCompanyCount(eco.slug);
              return (
                <Link
                  key={eco.slug}
                  to={count > 0 ? "/ecosystems/$slug" : "/ecosystems"}
                  params={count > 0 ? { slug: eco.slug } : undefined}
                  className="surface-card block p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        count > 0
                          ? "rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand"
                          : "rounded-full border border-border px-3 py-1 text-xs font-bold text-muted-foreground"
                      }
                    >
                      {count > 0 ? "منتشرشده" : "به‌زودی"}
                    </span>
                    {count > 0 && (
                      <span className="font-number text-sm font-semibold text-muted-foreground">
                        {fa(count)} بنگاه
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold">{eco.name}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">{eco.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION SPLIT */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-bold tracking-[0.2em] text-brand">۰۲ / چرا پل</p>
            <h2 className="mt-4 text-3xl font-black leading-tight">
              یک پروفایل استاندارد برای هر بنگاه
            </h2>
            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              پل به‌جای آمار کلی، پروفایل مستقل هر بنگاه را ثبت می‌کند: نام، نشانی رسمی، دسته‌بندی
              فعالیت و شرح آن. مشخصات ثبتی و حقوقی هر بنگاه در لایه‌ای جداگانه و فقط برای کاربران
              عضو در دسترس است.
            </p>
            <ul className="mt-7 space-y-3.5 text-sm font-medium">
              {[
                "پروفایل عمومی هر بنگاه با نام، نشانی و شرح فعالیت",
                "مشخصات ثبتی و حقوقی، محدود به کاربران ثبت‌نام‌کرده",
                "انتشار تدریجی عرصه‌ها به‌محض تکمیل داده‌های هرکدام",
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
                «هدف پل فهرست کردن نیست؛ ساختن یک مرجع قابل اتکا برای هر عرصه، یکی پس از دیگری
                است.»
              </blockquote>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="font-number text-3xl font-black text-ink-foreground">
                    {fa(allCompanies.length)}
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">پروفایل منتشرشده</p>
                </div>
                <div>
                  <div className="font-number text-3xl font-black text-ink-foreground">
                    {fa(ecosystems.length - publishedEcosystems.length)}
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">عرصهٔ در دست گردآوری</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COMPANIES */}
      {featuredCompanies.length > 0 && (
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="text-xs font-bold tracking-[0.2em] text-brand">۰۳ / بنگاه‌ها</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">نمونه‌ای از پروفایل‌های اطلس</h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((c) => (
                <Link
                  key={c.slug}
                  to="/companies/$slug"
                  params={{ slug: c.slug }}
                  className="surface-card block p-6"
                >
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {getCategoryName(c.ecosystem, c.category)}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold">{c.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.summary}</p>
                  <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                    {c.domain}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-14 text-center sm:px-16">
          <div className="atlas-dots absolute inset-0 opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-black text-primary-foreground sm:text-4xl">
              بنگاه خود را روی نقشه ثبت کنید
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-primary-foreground/85">
              اگر در یکی از عرصه‌های اقتصاد دیجیتال فعالیت می‌کنید، اطلاعات خود را برای ما بفرستید
              تا پس از راستی‌آزمایی، پروفایلتان در اطلس منتشر شود.
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
