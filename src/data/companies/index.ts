import type { Company, EcosystemCategory } from "@/data/types";
import { goldCategories, goldCompanies } from "@/data/companies/gold";
import { cryptoCategories, cryptoCompanies } from "@/data/companies/crypto";
import { insuranceCategories, insuranceCompanies } from "@/data/companies/insurance";
import { aiCategories, aiCompanies } from "@/data/companies/ai";
import { ventureCategories, ventureCompanies } from "@/data/companies/venture";
import { creativeCategories, creativeCompanies } from "@/data/companies/creative";

export const allCompanies: Company[] = [
  ...goldCompanies,
  ...cryptoCompanies,
  ...insuranceCompanies,
  ...aiCompanies,
  ...ventureCompanies,
  ...creativeCompanies,
];

export const categoriesByEcosystem: Record<string, EcosystemCategory[]> = {
  gold: goldCategories,
  crypto: cryptoCategories,
  insurance: insuranceCategories,
  ai: aiCategories,
  venture: ventureCategories,
  creative: creativeCategories,
};

export function getCompaniesByEcosystem(ecosystemSlug: string): Company[] {
  return allCompanies.filter((c) => c.ecosystem === ecosystemSlug);
}

export function getCompanyCount(ecosystemSlug: string): number {
  return getCompaniesByEcosystem(ecosystemSlug).length;
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return allCompanies.find((c) => c.slug === slug);
}

export function getCategoriesFor(ecosystemSlug: string): EcosystemCategory[] {
  return categoriesByEcosystem[ecosystemSlug] ?? [];
}

export function getCategoryName(ecosystemSlug: string, categorySlug: string): string {
  return (
    getCategoriesFor(ecosystemSlug).find((c) => c.slug === categorySlug)?.name ??
    categorySlug
  );
}
