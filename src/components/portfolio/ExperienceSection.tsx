import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-16 scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-foreground/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-sm font-medium text-foreground/70">
                Experience
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Internship-level focus, full-stack impact
              </h2>
              <p className="text-sm leading-7 text-foreground/75 sm:text-base">
                Ray Cargo dispatch, KPI cloud engineering, and Azmafinance ML
                automation (including automated email workflows with ML).
              </p>

              <div className="rounded-2xl border border-foreground/10 bg-black/10 p-4">
                <div className="text-xs font-medium text-foreground/70">
                  Current north star
                </div>
                <div className="mt-1 text-sm leading-6 text-foreground/85">
                  Build systems that feel cinematic and behave reliably.
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ExperienceTimeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

