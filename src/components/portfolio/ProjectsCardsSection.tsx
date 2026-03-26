import { ProjectsSection } from "@/components/portfolio/ProjectsSection";

export function ProjectsCardsSection() {
  return (
    <section id="projects" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="text-sm font-medium text-foreground/70">
            Project Cards
          </div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Builds that combine theory, systems, and signal
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
            AI trading, embedded control, professional publications, and
            discipline in practice.
          </p>

          <ProjectsSection />
        </div>
      </div>
    </section>
  );
}

