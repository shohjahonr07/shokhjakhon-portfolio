import { AcademicBentoGrid } from "@/components/portfolio/AcademicBentoGrid";

export function AcademicSection() {
  return (
    <section id="academic" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <div className="text-sm font-medium text-foreground/70">
            Academic Bento Grid
          </div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Precision in the fundamentals
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base">
            30/30 across Calculus, Discrete Mathematics, and Applied Physics
            from the University of Messina.
          </p>

          <AcademicBentoGrid />
        </div>
      </div>
    </section>
  );
}

