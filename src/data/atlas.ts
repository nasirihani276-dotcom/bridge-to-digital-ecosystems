export type Sector = {
  slug: string;
  name: string;
  summary: string;
  nodes: number;
  share: number;
  growth: string;
  tone: "brand" | "gold" | "teal";
};

export const sectors: Sector[] = [
  {
    slug: "fintech",
    name: "فین‌تک و پرداخت",
    summary:
      "درگاه‌های پرداخت، کیف پول‌ها، اعتبارسنجی و بانکداری باز؛ متراکم‌ترین خوشهٔ اطلس.",
    nodes: 412,
    share: 92,
    growth: "+۱۸٪",
    tone: "brand",
  },
  {
    slug: "ecommerce",
    name: "تجارت الکترونیک",
    summary:
      "بازارگاه‌ها، فروشگاه‌سازها، سرویس‌های تخفیف و زیرساخت‌های فروش آنلاین.",
    nodes: 508,
    share: 100,
    growth: "+۱۱٪",
    tone: "brand",
  },
  {
    slug: "ai",
    name: "هوش مصنوعی و داده",
    summary:
      "مدل‌های زبانی فارسی، بینایی ماشین، سکوهای داده و ابزارهای تحلیل کسب‌وکار.",
    nodes: 265,
    share: 61,
    growth: "+۴۳٪",
    tone: "teal",
  },
  {
    slug: "logistics",
    name: "لجستیک و تأمین",
    summary: "پست خصوصی، تحویل درون‌شهری، انبارداری هوشمند و مدیریت ناوگان.",
    nodes: 179,
    share: 44,
    growth: "+۹٪",
    tone: "brand",
  },
  {
    slug: "gaming",
    name: "بازی و سرگرمی",
    summary: "استودیوهای بازی، سکوهای پخش ویدیو و موسیقی، و اقتصاد محتوا.",
    nodes: 143,
    share: 36,
    growth: "+۱۵٪",
    tone: "gold",
  },
  {
    slug: "healthtech",
    name: "سلامت دیجیتال",
    summary: "نوبت‌دهی، ویزیت آنلاین، دارورسانی و پرونده‌های سلامت الکترونیک.",
    nodes: 121,
    share: 30,
    growth: "+۲۲٪",
    tone: "teal",
  },
];

export type Player = {
  name: string;
  sector: string;
  stage: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  initial: string;
  tone: "brand" | "gold" | "teal";
};

export const players: Player[] = [
  {
    name: "آبان‌پی",
    sector: "فین‌تک",
    stage: "مرحلهٔ رشد",
    description: "زیرساخت پرداخت لحظه‌ای و تسویهٔ خودکار برای کسب‌وکارهای خرد.",
    metricLabel: "تراکنش ماهانه",
    metricValue: "۱۸ میلیون",
    initial: "آ",
    tone: "brand",
  },
  {
    name: "داده‌کاوش",
    sector: "هوش مصنوعی",
    stage: "سری A",
    description: "موتور پردازش زبان فارسی برای پشتیبانی و تحلیل صدای مشتری.",
    metricLabel: "سازمان مشتری",
    metricValue: "۳۲۰",
    initial: "د",
    tone: "teal",
  },
  {
    name: "مسیرآور",
    sector: "لجستیک",
    stage: "مرحلهٔ رشد",
    description: "شبکهٔ تحویل درون‌شهری با مسیریابی پویا در ۲۴ کلان‌شهر.",
    metricLabel: "مرسوله در روز",
    metricValue: "۹۶ هزار",
    initial: "م",
    tone: "brand",
  },
  {
    name: "بازارک",
    sector: "تجارت الکترونیک",
    stage: "بالغ",
    description: "بازارگاه چندفروشندگی با تمرکز بر کالاهای تخصصی و صنعتی.",
    metricLabel: "فروشندهٔ فعال",
    metricValue: "۴۱ هزار",
    initial: "ب",
    tone: "brand",
  },
  {
    name: "نبض‌کار",
    sector: "سلامت دیجیتال",
    stage: "بذری",
    description: "پروندهٔ سلامت یکپارچه و ویزیت از راه دور برای مراکز درمانی.",
    metricLabel: "ویزیت ماهانه",
    metricValue: "۲۱۰ هزار",
    initial: "ن",
    tone: "teal",
  },
  {
    name: "استودیو کیمیا",
    sector: "بازی",
    stage: "سری A",
    description: "استودیوی بازی‌های موبایلی با انتشار جهانی و اقتصاد درون‌بازی.",
    metricLabel: "نصب فعال",
    metricValue: "۷.۴ میلیون",
    initial: "ک",
    tone: "gold",
  },
];

export type Stat = {
  label: string;
  value: string;
  note: string;
};

export const headlineStats: Stat[] = [
  { label: "بنگاه ثبت‌شده", value: "۱٬۶۲۸", note: "در ۶ عرصهٔ اصلی" },
  { label: "پیوند میان‌اکوسیستمی", value: "۳٬۹۲۰", note: "سرمایه، داده و شراکت" },
  { label: "اشتغال مستقیم", value: "۵۶ هزار", note: "برآورد سالانه" },
  { label: "پوشش داده", value: "۹۴٪", note: "به‌روزرسانی هفتگی" },
];

export const methodologySteps = [
  {
    step: "۰۱",
    title: "گردآوری",
    body: "داده از منابع عمومی، ثبت خوداظهار بنگاه‌ها و پایگاه‌های رسمی جمع می‌شود.",
  },
  {
    step: "۰۲",
    title: "راستی‌آزمایی",
    body: "هر رکورد با دست کم دو منبع مستقل تطبیق داده و برچسب اعتبار می‌گیرد.",
  },
  {
    step: "۰۳",
    title: "نگاشت پیوندها",
    body: "روابط سرمایه‌گذاری، شراکت و جریان داده میان بنگاه‌ها ترسیم می‌شود.",
  },
  {
    step: "۰۴",
    title: "انتشار",
    body: "نقشه و شاخص‌ها هفتگی به‌روزرسانی و تغییرات نسخه‌بندی می‌شوند.",
  },
];
