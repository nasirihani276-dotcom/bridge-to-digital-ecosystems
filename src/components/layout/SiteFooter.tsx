import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="atlas-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variant="onInk" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink-muted">
              سامانهٔ جامع داده‌های زیست‌بوم اقتصاد دیجیتال ایران؛ نقشه‌ای زنده
              از بنگاه‌ها، سرمایه و پیوندهای میان آن‌ها.
            </p>
          </div>

          <nav aria-label="پیوندهای اطلس">
            <h2 className="text-sm font-bold text-ink-foreground">اطلس</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <Link to="/ecosystems" className="hover:text-ink-foreground">
                  عرصه‌های اکوسیستم
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-ink-foreground">
                  فهرست بازیگران
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-ink-foreground">
                  شاخص‌ها و گزارش‌ها
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="پیوندهای سازمانی">
            <h2 className="text-sm font-bold text-ink-foreground">سازمان</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <Link to="/about" className="hover:text-ink-foreground">
                  دربارهٔ پل
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  hash="methodology"
                  className="hover:text-ink-foreground"
                >
                  روش‌شناسی داده
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  hash="contact"
                  className="hover:text-ink-foreground"
                >
                  ثبت بنگاه و تماس
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>© ۱۴۰۴ پل — همهٔ حقوق محفوظ است.</p>
          <p>داده‌های نمایش‌داده‌شده نمونه‌اند و هفتگی به‌روزرسانی می‌شوند.</p>
        </div>
      </div>
    </footer>
  );
}
