import { createFileRoute, Link } from "@tanstack/react-router";
import { NetworkMap } from "@/components/atlas/NetworkMap";
import { ecosystems } from "@/data/ecosystems";
import { getCompanyCount, getCategoriesFor } from "@/data/companies";
import { fa } from "@/lib/utils";

export const Route = createFileRoute("/ecosystems")({
  head: () => ({
    meta: [
      { title: "عرصه‌های اکوسیستم | اطلس پل" },
      {
        name: "description",
        content:
          "شش عرصهٔ اقتصاد دیجیتال ایران در اطلس پل: طلا، رمزارز، بیمه، هوش مصنوعی، سرمایه‌گذاری خطرپذیر و صنایع خلاق، به‌همراه تعداد بنگاه‌های ثبت‌شدهٔ هر عرصه.",
      },
      { property: "og:title", content: "عرصه‌های اکوسیستم | اطلس پل" },
      {
        property: "og:description",
        content: "فهرست عرصه‌های اقتصاد دیجیتال ایران با تعداد بنگاه‌های ثبت‌شدهٔ هرکدام.",
      },
    ],
  }),
  component: EcosystemsPage,
});

function EcosystemsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="atlas-dots pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-ink-muted">اطلس / عرصه‌ها</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              عرصه‌های اکوسیستم دیجیتال
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-ink-muted sm:text-base">
              هر عرصه به‌صورت مستقل و به‌ترتیب تکمیل داده‌ها منتشر می‌شود. عرصه‌ای که هنوز داده
              ندارد، با برچسب «به‌زودی» نشان داده می‌شود؛ آماری برای آن ساخته نمی‌شود.
            </p>
          </div>
          <div className="aspect-[4/3] w-full">
            <NetworkMap />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {ecosystems.map((eco, i) => {
            const count = getCompanyCount(eco.slug);
            const categories = getCategoriesFor(eco.slug);
            return (
              <article
                key={eco.slug}
                className={`grid gap-5 p-7 sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="font-number text-3xl font-black text-brand-soft">
                  {fa(String(i + 1).padStart(2, "0"))}
                </span>
                <div>
                  <h2 className="text-xl font-extrabold">{eco.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {eco.summary}
                  </p>
                  {categories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <span
                          key={cat.slug}
                          className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  {count > 0 ? (
                    <>
                      <div className="font-number text-2xl font-black">{fa(count)}</div>
                      <p className="text-[11px] text-muted-foreground">بنگاه ثبت‌شده</p>
                      <Link
                        to="/ecosystems/$slug"
                        params={{ slug: eco.slug }}
                        className="mt-1 rounded-lg bg-gradient-brand px-4 py-2 text-xs font-bold text-primary-foreground"
                      >
                        مشاهدهٔ بنگاه‌ها
                      </Link>
                    </>
                  ) : (
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-muted-foreground">
                      به‌زودی
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/50 p-7">
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            برای دیدن پروفایل بنگاه‌های عرصهٔ منتشرشده به صفحهٔ بازیگران بروید.
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
