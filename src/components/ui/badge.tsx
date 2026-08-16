import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "success" | "warning" | "accent";
}

export function Badge({ children, className, tone = "default" }: BadgeProps) {
  const tones = {
    default: "bg-[var(--bg-muted)] text-[var(--text-muted)]",
    success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    accent: "bg-[var(--accent)]/15 text-[var(--accent)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
