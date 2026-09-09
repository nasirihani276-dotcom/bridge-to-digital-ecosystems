import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCompanyBySlug, getCategoryName } from "@/data/companies";
import { getEcosystem } from "@/data/ecosystems";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/companies/$slug")({
  loader: ({ params }) => {
    const company = getCompanyBySlug(params.slug);
    if (!company) throw notFound();
    return { company };
  },
  head: ({ loaderData }) => {
    const company = loaderData?.company;
    if (!company) return {};
    return {
      meta: [
        { title: `${company.name} | اطلس پل` },
        { name: "description", content: company.summary },
        { property: "og:title", content: `${company.name} | اطلس پل` },
        { property: "og:description", content: company.summary },
      ],
    };
  },
  component: CompanyPage,
});

type LegalRow = Tables<"company_legal">;

const legalFields: Array<{ key: keyof LegalRow; label: string }> = [
  { key: "registered_name", label: "نام ثبتی" },
  { key: "trade_name", label: "اسم تجاری" },
  { key: "legal_form", label: "نوع شرکت" },
  { key: "national_id", label: "شناسهٔ ملی" },
  { key: "registration_number", label: "کد ثبتی" },
  { key: "registration_unit", label: "واحد ثبت" },
  { key: "registration_date", label: "تاریخ تأسیس" },
  { key: "status", label: "وضعیت" },
  { key: "capital", label: "سرمایهٔ ثبتی" },
  { key: "ceo", label: "مدیرعامل" },
  { key: "signatories", label: "صاحبان امضا" },
  { key: "province_city", label: "استان / شهر" },
  { key: "address", label: "آدرس" },
  { key: "postal_code", label: "کد پستی" },
  { key: "phone", label: "شمارهٔ تماس" },
];

function CompanyPage() {
  const { company } = Route.useLoaderData();
  const ecosystem = getEcosystem(company.ecosystem);
  const categoryName = getCategoryName(company.ecosystem, company.category);
  const { session, loading: sessionLoading } = useSession();

  const [legal, setLegal] = useState<LegalRow | null | undefined>(undefined);
  const [legalError, setLegalError] = useState(false);

  useEffect(() => {
    if (!session) {
      setLegal(undefined);
      return;
    }
    let active = true;
    supabase
      .from("company_legal")
      .select("*")
      .eq("company_slug", company.slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setLegalError(true);
          return;
        }
        setLegal(data);
      });
    return () => {
      active = false;
    };
  }, [session, company.slug]);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">
            {ecosystem ? `اکوسیستم ${ecosystem.name}` : "اطلس پل"} / {categoryName}
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">{company.name}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-muted-foreground">
            {company.summary}
          </p>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            مشاهدهٔ وب‌گاه ← {company.domain}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="text-xl font-extrabold">دربارهٔ {company.name}</h2>
        <p className="mt-4 text-sm leading-8 text-muted-foreground">{company.profile}</p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16">
        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="text-xl font-extrabold">مشخصات ثبتی و حقوقی</h2>

          {sessionLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">در حال بررسی وضعیت ورود…</p>
          ) : !session ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-5">
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                این بخش شامل نام ثبتی، شمارهٔ ثبت، شناسهٔ ملی و سایر اطلاعات حقوقی بنگاه است و
                فقط برای کاربران ثبت‌نام‌کرده نمایش داده می‌شود.
              </p>
              <Link
                to="/auth"
                className="shrink-0 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                ورود یا ثبت‌نام
              </Link>
            </div>
          ) : legalError ? (
            <p className="mt-4 text-sm text-muted-foreground">
              در دریافت اطلاعات ثبتی خطایی رخ داد؛ دوباره تلاش کنید.
            </p>
          ) : legal === undefined ? (
            <p className="mt-4 text-sm text-muted-foreground">در حال بارگذاری…</p>
          ) : legal === null ? (
            <p className="mt-4 text-sm text-muted-foreground">
              اطلاعات ثبتی و حقوقی این بنگاه هنوز در اطلس پل ثبت نشده است.
            </p>
          ) : (
            <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {legalFields.map(({ key, label }) =>
                legal[key] ? (
                  <div key={key}>
                    <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
                    <dd className="mt-1 text-sm font-medium">{String(legal[key])}</dd>
                  </div>
                ) : null,
              )}
              {legal.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold text-muted-foreground">یادداشت</dt>
                  <dd className="mt-1 text-sm font-medium">{legal.notes}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </section>
    </>
  );
}
