import { timeline } from "@/lib/cv-data";

export function ExperienceTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1 bottom-1 w-px bg-foreground/10" />
      <div className="space-y-6">
        {timeline.map((item, idx) => (
          <div key={item.company} className="relative pl-12">
            <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 bg-white/5 shadow-glow">
              <div className="h-2.5 w-2.5 rounded-full bg-glow" />
            </div>

            <div className="rounded-3xl border border-foreground/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-sm text-foreground/70">
                    {item.company}
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {item.role}
                  </div>
                </div>
                <div className="text-xs font-medium text-foreground/60">
                  {idx === 2 ? "ML Automation" : "Operational impact"}
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-glow" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

