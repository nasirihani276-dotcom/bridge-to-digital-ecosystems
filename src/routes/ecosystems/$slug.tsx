import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getEcosystem } from "@/data/ecosystems";
import { getCompaniesByEcosystem, getCategoriesFor } from "@/data/companies";

export const Route = createFileRoute("/ecosystems/$slug")({
  loader: ({ params }) => {
    const ecosystem = getEcosystem(params.slug);
    if (!ecosystem) throw notFound();
    return { ecosystem };
  },
  head: ({ loaderData }) => {
    const ecosystem = loaderData?.ecosystem;
    if (!ecosystem) return {};
    return {
      meta: [
        { title: `اکوسیستم ${ecosystem.name} | اطلس پل` },
        { name: "description", content: `فهرست بنگاه‌ها و پروفایل‌های اکوسیستم ${ecosystem.name} در اطلس پل. ${ecosystem.summary}` },
        { property: "og:title", content: `اکوسیستم ${ecosystem.name} | اطلس پل` },
        { property: "og:description", content: ecosystem.summary },
      ],
    };
  },
  component: EcosystemDetailPage,
});

function EcosystemDetailPage() {
  const { ecosystem } = Route.useLoaderData();
  const categories = useMemo(() => getCategoriesFor(ecosystem.slug), [ecosystem.slug]);
  const companies = useMemo(() => getCompaniesByEcosystem(ecosystem.slug), [ecosystem.slug]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visible =
    activeCategory === "all" ? companies : companies.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">
            <Link to="/ecosystems" className="hover:underline">
              عرصه‌ها
            </Link>{" "}
            / {ecosystem.name}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            اکوسیستم {ecosystem.name}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            {ecosystem.summary}
          </p>

          {companies.length === 0 ? (
            <p className="mt-8 inline-flex rounded-full border border-dashed border-border px-4 py-2 text-sm font-bold text-muted-foreground">
              داده‌های این عرصه هنوز منتشر نشده است — به‌زودی
            </p>
          ) : (
            categories.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  aria-pressed={activeCategory === "all"}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    activeCategory === "all"
                      ? "bg-gradient-brand text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
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
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-gradient-brand text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {companies.length > 0 && (
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
      )}
    </>
  );
}
