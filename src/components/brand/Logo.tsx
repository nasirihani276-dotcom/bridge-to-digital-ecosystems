import { Link } from "@tanstack/react-router";
import polMark from "@/assets/pol-mark.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "default" | "onInk";
  withTagline?: boolean;
  className?: string;
};

export function Logo({
  variant = "default",
  withTagline = true,
  className,
}: LogoProps) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-xl p-1.5 transition-transform duration-500 group-hover:-translate-y-0.5",
          variant === "onInk"
            ? "bg-ink-foreground/95"
            : "bg-brand-soft ring-1 ring-brand/15",
        )}
      >
        <img
          src={polMark}
          alt="نشان پل: نمادی از یک پل معلق"
          width={64}
          height={38}
          className="h-auto w-full"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight",
            variant === "onInk" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          پل
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-1 text-[11px] font-medium",
              variant === "onInk" ? "text-ink-muted" : "text-muted-foreground",
            )}
          >
            اطلس اقتصاد دیجیتال
          </span>
        )}
      </span>
    </Link>
  );
}
