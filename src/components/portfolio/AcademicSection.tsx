import { AcademicBentoGrid } from "@/components/portfolio/AcademicBentoGrid";

export function AcademicSection() {
  return (
    <section id="academic" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-foreground/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-sm font-medium text-foreground/70">
                Academic Excellence
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                30/30. Repeated. Verified.
              </h2>
              <p className="text-sm leading-7 text-foreground/75 sm:text-base">
                Calculus, Discrete Mathematics, and Applied Physics from the
                University of Messina.
              </p>

              <div className="rounded-2xl border border-foreground/10 bg-black/10 p-4">
                <div className="text-xs font-medium text-foreground/70">Why it matters</div>
                <div className="mt-1 text-sm leading-6 text-foreground/85">
                  Clean fundamentals become fast engineering decisions.
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <AcademicBentoGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

