import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { Badge } from "@/components/ui/badge";

export function ProjectsCardsSection() {
  return (
    <section id="projects" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="glow">Projects</Badge>
            <div className="text-sm font-medium text-foreground/70">
              AI Trading • Embedded Control • Research
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built like systems. Delivered like stories.
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
            Double Deep Q-Learning + technical indicators + Exness MT4/MT5
            integration; Arduino/ESP32 command control + automated upper-side
            mechanism; and a Zenodo publication highlight.
          </p>

          <ProjectsSection />
        </div>
      </div>
    </section>
  );
}

