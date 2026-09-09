export type Ecosystem = {
  slug: string;
  name: string;
  summary: string;
};

// شش عرصه‌ای که پل داده‌های آن‌ها را گردآوری می‌کند. تا وقتی داده‌های واقعی
// یک عرصه وارد نشده، آرایهٔ شرکت‌های آن در src/data/companies خالی می‌ماند و
// در نقشه به‌صورت «به‌زودی» نمایش داده می‌شود — نه با آمار ساختگی.
export const ecosystems: Ecosystem[] = [
  {
    slug: "gold",
    name: "طلا",
    summary:
      "پلتفرم‌های خرید و نگهداری دیجیتال طلا، صندوق‌های کالایی، بازارگاه‌های جواهر و زنجیرهٔ تأمین فیزیکی طلا.",
  },
  {
    slug: "crypto",
    name: "رمزارز",
    summary: "صرافی‌ها، کیف پول‌ها و زیرساخت‌های معاملهٔ دارایی دیجیتال.",
  },
  {
    slug: "insurance",
    name: "بیمه",
    summary: "بیمه‌های دیجیتال، مقایسه‌گرهای بیمه و خدمات فناوری بیمه.",
  },
  {
    slug: "ai",
    name: "هوش مصنوعی",
    summary: "مدل‌های زبانی، بینایی ماشین و ابزارهای تحلیل داده برای کسب‌وکار.",
  },
  {
    slug: "venture",
    name: "سرمایه‌گذاری خطرپذیر",
    summary: "صندوق‌های سرمایه‌گذاری خطرپذیر و شتاب‌دهنده‌های استارتاپی.",
  },
  {
    slug: "creative",
    name: "صنایع خلاق",
    summary: "استودیوهای طراحی، تولید محتوا، بازی و رسانهٔ دیجیتال.",
  },
];

export function getEcosystem(slug: string): Ecosystem | undefined {
  return ecosystems.find((e) => e.slug === slug);
}
