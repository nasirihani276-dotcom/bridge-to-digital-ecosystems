import { createFileRoute } from "@tanstack/react-router";
import { ecosystems } from "@/data/ecosystems";
import { getCompanyCount, getCategoriesFor, getCompaniesByEcosystem } from "@/data/companies";
import { fa } from "@/lib/utils";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "پوشش داده‌ها | اطلس پل" },
      {
        name: "description",
        content:
          "وضعیت پوشش دادهٔ اطلس پل به تفکیک عرصه و دسته: چند بنگاه در هر عرصهٔ اقتصاد دیجیتال ایران تاکنون ثبت شده است.",
      },
      { property: "og:title", content: "پوشش داده‌ها | اطلس پل" },
      {
        property: "og:description",
        content: "تعداد بنگاه‌های ثبت‌شده در هر عرصه و دستهٔ اکوسیستم اقتصاد دیجیتال ایران.",
      },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const totalCompanies = ecosystems.reduce((sum, e) => sum + getCompanyCount(e.slug), 0);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="atlas-dots pointer-events-none absolute inset-0 opacity-45" />
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-bold tracking-[0.2em] text-ink-muted">اطلس / پوشش داده‌ها</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">پوشش دادهٔ اطلس</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-ink-muted sm:text-base">
            این صفحه فقط اعدادی را نشان می‌دهد که از شمارش مستقیم رکوردهای منتشرشده به دست
            آمده‌اند؛ هیچ برآورد یا شاخص ساختگی در آن منتشر نمی‌شود.
          </p>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-6 backdrop-blur">
              <dt className="text-xs font-semibold text-ink-muted">مجموع بنگاه‌های ثبت‌شده</dt>
              <dd className="font-number mt-3 text-3xl font-black">{fa(totalCompanies)}</dd>
              <p className="mt-2 text-[11px] text-ink-muted">در همهٔ عرصه‌ها</p>
            </div>
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-6 backdrop-blur">
              <dt className="text-xs font-semibold text-ink-muted">عرصهٔ تعریف‌شده</dt>
              <dd className="font-number mt-3 text-3xl font-black">{fa(ecosystems.length)}</dd>
              <p className="mt-2 text-[11px] text-ink-muted">در نقشهٔ راه پل</p>
            </div>
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-6 backdrop-blur">
              <dt className="text-xs font-semibold text-ink-muted">عرصهٔ منتشرشده</dt>
              <dd className="font-number mt-3 text-3xl font-black">
                {fa(ecosystems.filter((e) => getCompanyCount(e.slug) > 0).length)}
              </dd>
              <p className="mt-2 text-[11px] text-ink-muted">با پروفایل کامل بنگاه‌ها</p>
            </div>
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-6 backdrop-blur">
              <dt className="text-xs font-semibold text-ink-muted">دادهٔ حقوقی محافظت‌شده</dt>
              <dd className="font-number mt-3 text-3xl font-black">بله</dd>
              <p className="mt-2 text-[11px] text-ink-muted">فقط برای کاربران عضو</p>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-xl font-extrabold">پوشش به تفکیک عرصه</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          تعداد بنگاه‌های ثبت‌شده در هر عرصه؛ عرصه‌های بدون داده با «به‌زودی» مشخص شده‌اند.
        </p>

        <div className="mt-8 space-y-6">
          {ecosystems.map((eco) => {
            const count = getCompanyCount(eco.slug);
            const categories = getCategoriesFor(eco.slug);
            const companies = getCompaniesByEcosystem(eco.slug);
            return (
              <div key={eco.slug} className="rounded-3xl border border-border bg-card p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-extrabold">{eco.name}</h3>
                  {count > 0 ? (
                    <span className="font-number rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand">
                      {fa(count)} بنگاه
                    </span>
                  ) : (
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-bold text-muted-foreground">
                      به‌زودی
                    </span>
                  )}
                </div>
                {categories.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {categories.map((cat) => {
                      const catCount = companies.filter((c) => c.category === cat.slug).length;
                      const pct = count > 0 ? Math.round((catCount / count) * 100) : 0;
                      return (
                        <li key={cat.slug}>
                          <div className="flex items-center justify-between text-sm font-semibold">
                            <span>{cat.name}</span>
                            <span className="font-number text-muted-foreground">
                              {fa(catCount)}
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-gradient-brand"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
