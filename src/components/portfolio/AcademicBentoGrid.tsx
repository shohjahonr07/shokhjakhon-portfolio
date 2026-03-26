import { academicScores } from "@/lib/cv-data";

export function AcademicBentoGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {academicScores.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/5 p-5 backdrop-blur-xl"
        >
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-glow/10 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-foreground/70">
                {item.label}
              </div>
              <div className="mt-2 text-4xl font-semibold tracking-tight">
                {item.score}
                <span className="ml-2 text-base font-medium text-foreground/65">
                  / {item.outOf}
                </span>
              </div>
            </div>
            <div className="text-xs font-medium text-glow">30/30</div>
          </div>

          <div className="relative mt-5">
            <div className="h-2 w-full rounded-full bg-white/5">
              <div
                className="h-2 rounded-full bg-glow/80 shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                style={{ width: `${Math.round((item.score / item.outOf) * 100)}%` }}
              />
            </div>
            <div className="mt-3 text-xs leading-5 text-foreground/70">
              University of Messina • performance highlight
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

