import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[88px] w-full rounded-xl border border-foreground/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow/60 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

