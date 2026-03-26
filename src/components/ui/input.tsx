import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-foreground/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow/60 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

