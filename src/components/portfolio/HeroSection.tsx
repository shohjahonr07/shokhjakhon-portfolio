import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/cv-data";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr,0.85fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-glow/25 bg-glow/10 shadow-glow">
                <Sparkles className="h-5 w-5 text-glow" />
              </span>
              <div className="text-sm text-foreground/80">
                Cinematic portfolio • Real-time Telegram bridge
              </div>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg">
              {hero.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Badge variant="glow">Obsidian Dark</Badge>
              <Badge>Type-safe TS</Badge>
              <Badge>SEO-first</Badge>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                className="shadow-[0_0_60px_rgba(16,185,129,0.18)]"
                href="#projects"
              >
                Explore Projects <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                href="#contact"
              >
                Open Telegram Chat
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-glow/20 to-transparent blur-2xl" />
            <div className="relative rounded-[2.2rem] border border-foreground/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]">
              <div className="text-sm text-foreground/75">Now</div>
              <div className="mt-1 text-2xl font-semibold">
                {hero.name}
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/75">
                <div className="flex items-center justify-between gap-4">
                  <span>Primary focus</span>
                  <span className="text-foreground">Full-stack systems</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Design language</span>
                  <span className="text-foreground">Emerald glow, cinematic motion</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Communication</span>
                  <span className="text-foreground">Live Telegram bridge</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-foreground/10 bg-black/10 p-4">
                <div className="text-xs font-medium text-foreground/70">
                  Tip
                </div>
                <div className="mt-1 text-sm text-foreground/85">
                  Scroll for section reveals. Messages update instantly once you
                  reply from your phone.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

