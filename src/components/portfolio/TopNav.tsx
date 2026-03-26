import { Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/25 bg-glow/10 shadow-glow">
            <Sparkles className="h-4 w-4 text-glow" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Shokhjakhon Rustamov</div>
            <div className="text-xs text-foreground/70">Future Software Engineer</div>
          </div>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          <a className="text-sm text-foreground/80 hover:text-foreground" href="#academic">
            Academic
          </a>
          <a className="text-sm text-foreground/80 hover:text-foreground" href="#experience">
            Experience
          </a>
          <a className="text-sm text-foreground/80 hover:text-foreground" href="#projects">
            Projects
          </a>
          <a className="text-sm text-foreground/80 hover:text-foreground" href="#contact">
            Telegram
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Badge variant="glow">Emerald</Badge>
          <a
            href="mailto:hello@example.com"
            className="hidden items-center gap-2 rounded-xl border border-foreground/15 bg-white/5 px-3 py-2 text-xs text-foreground/80 hover:bg-white/10 sm:flex"
          >
            <Mail className="h-4 w-4 text-glow" />
            Contact
          </a>
          <a
            href="https://github.com/shokhjakhonrustamov2007"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-xl border border-foreground/15 bg-white/5 p-2 text-foreground/80 hover:bg-white/10 sm:inline-flex"
            aria-label="GitHub"
          >
            <span className="text-[10px] font-semibold tracking-wide">GH</span>
          </a>
        </div>
      </div>
    </header>
  );
}

