import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { Badge } from "@/components/ui/badge";

export function ProjectsCardsSection() {
  return (
    <section id="projects" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="glow">Projects</Badge>
            <div className="text-sm font-medium text-foreground/70">
              AI + Embedded + Research + Discipline
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Builds engineered for performance and clarity
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
            AI Trading Bot (Double Deep Q-Learning + indicators + Exness bridge),
            Bluetooth Car (Arduino/ESP32 + automated upper-side mechanism),
            plus a research publication and a “Discipline & Strength” award.
          </p>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ProjectsSection />
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-foreground/70">
                      Experience
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      Signal-to-impact timeline
                    </div>
                  </div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-glow/20 bg-glow/10 shadow-glow">
                    <span className="text-sm font-semibold text-glow">30</span>
                  </div>
                </div>

                <div className="mt-5">
                  <ExperienceTimeline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

