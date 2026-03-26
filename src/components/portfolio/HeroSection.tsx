import { ArrowRight, Sparkles, Timer, Waves, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { academicScores, hero } from "@/lib/cv-data";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-20 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Hero Glass Card */}
          <div className="relative lg:col-span-7">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-b from-glow/20 to-transparent blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-foreground/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(16,185,129,0.12)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-glow/25 bg-glow/10 shadow-glow">
                  <Sparkles className="h-5 w-5 text-glow" />
                </span>
                <div className="text-sm text-foreground/80">
                  Top 1% cinematic portfolio • Real-time Telegram bridge
                </div>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {hero.headline}
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-foreground/80 sm:text-lg">
                {hero.shortBio}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Badge variant="glow">Obsidian Dark</Badge>
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

          {/* Bento Side Column */}
          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <div className="rounded-[2rem] border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Cpu className="h-4 w-4 text-glow" />
                      Academic Excellence
                    </div>
                    <div className="mt-2 text-2xl font-semibold">
                      {academicScores[0]?.score ?? 30}
                      <span className="ml-2 text-base font-medium text-foreground/65">
                        / {academicScores[0]?.outOf ?? 30}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 shadow-glow">
                    <Timer className="h-4 w-4 text-glow" />
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {academicScores.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-foreground/75">{s.label}</span>
                      <span className="font-semibold text-foreground">
                        {s.score}/{s.outOf}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Waves className="h-4 w-4 text-glow" />
                      Live Telegram Bridge
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                      Reply from your phone
                    </div>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 shadow-glow">
                    <span className="text-sm font-semibold text-glow">∞</span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-foreground/70">
                  Messages stream in instantly via Supabase Realtime—no spinners,
                  no waiting.
                </p>

                <div className="mt-5 flex gap-2">
                  <a
                    href="#projects"
                    className="rounded-xl border border-foreground/15 bg-white/5 px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-white/10"
                  >
                    Signals & Systems
                  </a>
                  <a
                    href="#contact"
                    className="rounded-xl border border-foreground/15 bg-glow/10 px-3 py-2 text-xs font-medium text-glow/90 hover:bg-glow/15"
                  >
                    Open Chat
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-foreground/10 bg-black/10 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 shadow-glow">
                    <span className="text-sm font-semibold text-glow">DS</span>
                  </span>
                  <div>
                    <div className="text-sm font-medium text-foreground/80">
                      Discipline & Strength
                    </div>
                    <div className="mt-1 text-sm text-foreground/70">
                      2nd Place — Regional Armwrestling
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-1 w-full rounded-full bg-white/5">
                  <div className="h-1 w-[72%] rounded-full bg-glow shadow-[0_0_24px_rgba(16,185,129,0.35)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

