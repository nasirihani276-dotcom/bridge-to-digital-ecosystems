import { createFileRoute } from "@tanstack/react-router";
import { methodologySteps } from "@/data/methodology";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "دربارهٔ پل و روش‌شناسی داده | اطلس اقتصاد دیجیتال" },
      {
        name: "description",
        content:
          "پل چگونه ساخته می‌شود: منابع داده، مراحل راستی‌آزمایی، دسته‌بندی و شیوهٔ انتشار تدریجی اطلس اکوسیستم‌های اقتصاد دیجیتال ایران.",
      },
      {
        property: "og:title",
        content: "دربارهٔ پل و روش‌شناسی داده | اطلس اقتصاد دیجیتال",
      },
      {
        property: "og:description",
        content: "منابع داده، راستی‌آزمایی و شیوهٔ انتشار اطلس پل به زبان ساده.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "پل",
          description: "اطلس داده‌های اکوسیستم‌های اقتصاد دیجیتال ایران.",
          areaServed: "IR",
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">اطلس / دربارهٔ ما</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            پل، اطلس داده‌های اکوسیستم‌های اقتصاد دیجیتال
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            پل یک نهاد رسمی آمار نیست و جای آن را نمی‌گیرد. کار پل این است که هر عرصهٔ اقتصاد
            دیجیتال را جداگانه گردآوری کند: نام بنگاه‌ها، نشانی رسمی، دسته‌بندی فعالیت و مشخصات
            ثبتی و حقوقی آن‌ها را در یک ساختار یکسان و قابل کاوش قرار دهد.
          </p>
        </div>
      </section>

      <section id="methodology" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-black">روش‌شناسی داده</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {methodologySteps.map((s) => (
            <article key={s.step} className="surface-card p-6">
              <span className="font-number text-3xl font-black text-brand-soft">{s.step}</span>
              <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-7 text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid overflow-hidden rounded-3xl border border-border md:grid-cols-2">
          <div className="bg-card p-8 sm:p-12">
            <h2 className="text-2xl font-black">ثبت بنگاه در اطلس</h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              اگر می‌خواهید کسب‌وکارتان در نقشهٔ پل دیده شود، اطلاعات پایه و منابع قابل استناد را
              برای ما بفرستید. تیم داده پس از راستی‌آزمایی، پروفایل را در به‌روزرسانی بعدی منتشر
              می‌کند.
            </p>
            <p className="mt-6 text-sm font-semibold text-muted-foreground">
              نشانی تماس هنوز تکمیل نشده است — به‌محض تعیین ایمیل یا شمارهٔ رسمی، در همین بخش
              قرار می‌گیرد.
            </p>
          </div>
          <div className="relative overflow-hidden bg-ink p-8 text-ink-foreground sm:p-12">
            <div className="atlas-dots absolute inset-0 opacity-40" />
            <div className="relative space-y-6">
              <h2 className="text-2xl font-black">اصول ما</h2>
              <ul className="space-y-4 text-sm leading-7 text-ink-muted">
                <li>هر پروفایل بر پایهٔ نشانی رسمی و قابل بازبینی بنگاه نوشته می‌شود.</li>
                <li>مشخصات ثبتی و حقوقی فقط برای کاربران ثبت‌نام‌کرده نمایش داده می‌شود.</li>
                <li>عرصه‌ای که هنوز داده ندارد، با آمار ساختگی پر نمی‌شود.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
