import { ArrowRight, Sparkles, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { academicScores, hero, timeline } from "@/lib/cv-data";

export function HeroSection() {
  const mlHighlight =
    timeline.find((t) => t.company === "Azmafinance")?.highlights?.[0] ??
    "Automated email workflows with ML.";

  return (
    <section id="home" className="relative pt-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="relative lg:col-span-7">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-b from-glow/20 to-transparent blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-foreground/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(16,185,129,0.12)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-glow/25 bg-glow/10 shadow-glow">
                  <Sparkles className="h-5 w-5 text-glow" />
                </span>
                <div className="text-sm text-foreground/80">
                  Cinematic. Fast. Reliable. Obsidian-dark.
                </div>
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {hero.name}
              </h1>

              <h2 className="mt-3 text-balance text-xl font-semibold text-glow sm:text-2xl">
                {hero.headline}
              </h2>

              <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg">
                {hero.shortBio}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Badge variant="glow">Achievement-grade</Badge>
                <Badge>Type-safe TS</Badge>
                <Badge>SEO-first</Badge>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-[0_0_60px_rgba(16,185,129,0.18)]"
                  href="#projects"
                >
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </Button>

                <Button variant="ghost" size="lg" href="#contact">
                  Telegram Chat
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="text-sm font-medium text-foreground/70">
                  Achievement Badges
                </div>
                <div className="mt-4 grid gap-3">
                  {academicScores.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="text-sm text-foreground/80">{s.label}</div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-glow/25 bg-glow/10 px-3 py-1 text-sm font-semibold text-glow shadow-[0_0_40px_rgba(16,185,129,0.22)] animate-soft-pulse">
                        {s.score}/{s.outOf}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="text-sm font-medium text-foreground/70">
                  Internship focus
                </div>
                <div className="mt-3 text-lg font-semibold">
                  Azmafinance ML Intern
                </div>
                <p className="mt-2 text-sm leading-6 text-foreground/75">
                  {mlHighlight}
                </p>
              </div>

              <div className="rounded-[2rem] border border-foreground/10 bg-black/10 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-foreground/70">
                    Telegram bridge
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 shadow-glow">
                    <Send className="h-4 w-4 text-glow" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/75">
                  Reply from your phone: messages persist in-session and
                  stream instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

