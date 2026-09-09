import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ecosystems } from "@/data/ecosystems";
import { getCompaniesByEcosystem, getCategoriesFor } from "@/data/companies";

const searchSchema = z.object({
  ecosystem: z.string().optional(),
});

export const Route = createFileRoute("/players")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "بازیگران اکوسیستم | اطلس پل" },
      {
        name: "description",
        content:
          "پروفایل بنگاه‌های اکوسیستم‌های اقتصاد دیجیتال ایران در اطلس پل؛ نام، نشانی رسمی و دسته‌بندی فعالیت هر بنگاه، قابل فیلتر بر اساس عرصه و دسته.",
      },
      { property: "og:title", content: "بازیگران اکوسیستم | اطلس پل" },
      {
        property: "og:description",
        content: "فهرست قابل فیلتر بنگاه‌های اکوسیستم‌های اقتصاد دیجیتال ایران.",
      },
    ],
  }),
  component: PlayersPage,
});

const publishedEcosystems = ecosystems.filter((e) => getCompaniesByEcosystem(e.slug).length > 0);

function PlayersPage() {
  const search = Route.useSearch();
  const defaultEco = search.ecosystem ?? publishedEcosystems[0]?.slug ?? "gold";
  const [activeEco, setActiveEco] = useState(defaultEco);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => getCategoriesFor(activeEco), [activeEco]);
  const companies = useMemo(() => getCompaniesByEcosystem(activeEco), [activeEco]);
  const visible = useMemo(
    () =>
      activeCategory === "all"
        ? companies
        : companies.filter((c) => c.category === activeCategory),
    [companies, activeCategory],
  );

  function selectEcosystem(slug: string) {
    setActiveEco(slug);
    setActiveCategory("all");
  }

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">اطلس / بازیگران</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            بنگاه‌های اقتصاد دیجیتال
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            فهرست را ابتدا بر اساس عرصه و سپس بر اساس دستهٔ فعالیت فیلتر کنید. عرصه‌هایی که هنوز
            داده ندارند، در این فهرست ظاهر نمی‌شوند.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {ecosystems.map((eco) => {
              const has = getCompaniesByEcosystem(eco.slug).length > 0;
              return (
                <button
                  key={eco.slug}
                  type="button"
                  disabled={!has}
                  onClick={() => selectEcosystem(eco.slug)}
                  aria-pressed={activeEco === eco.slug}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    activeEco === eco.slug
                      ? "bg-gradient-brand text-primary-foreground"
                      : has
                        ? "border border-border bg-card text-muted-foreground hover:text-foreground"
                        : "cursor-not-allowed border border-dashed border-border bg-transparent text-muted-foreground/50"
                  }`}
                >
                  {eco.name}
                  {!has && " · به‌زودی"}
                </button>
              );
            })}
          </div>

          {categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeCategory === "all"
                    ? "bg-ink text-ink-foreground"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                همهٔ دسته‌ها
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  aria-pressed={activeCategory === cat.slug}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-ink text-ink-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">بنگاهی در این دسته ثبت نشده است.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((c) => (
              <Link
                key={c.slug}
                to="/companies/$slug"
                params={{ slug: c.slug }}
                className="surface-card block p-6"
              >
                <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {categories.find((cat) => cat.slug === c.category)?.name ?? c.category}
                </span>
                <h2 className="mt-5 text-lg font-extrabold">{c.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.summary}</p>
                <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                  {c.domain}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
