import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        ghost: "bg-transparent hover:bg-white/5",
        primary: "bg-glow text-black hover:bg-glow/90",
        outline: "border border-foreground/20 bg-transparent hover:bg-white/5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-2xl px-6",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /**
     * When provided, the button renders as an anchor (`<a>`) instead of a
     * `<button>`.
     */
    href?: string;
  };

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof href === "string") {
    const anchorProps =
      props as unknown as React.AnchorHTMLAttributes<
        HTMLAnchorElement
      >;
    return (
      <a className={classes} href={href} {...anchorProps} />
    );
  }

  return (
    <button className={classes} {...props} />
  );
}

