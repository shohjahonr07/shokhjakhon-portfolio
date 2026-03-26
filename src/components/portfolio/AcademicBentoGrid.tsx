import { academicScores } from "@/lib/cv-data";
import { Badge } from "@/components/ui/badge";

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
              <div className="text-sm font-medium text-foreground/75">
                {item.label}
              </div>
              <div className="mt-2 text-xs text-foreground/70">
                University of Messina
              </div>
            </div>
            <Badge
              variant="glow"
              className="animate-soft-pulse px-4 py-1 shadow-[0_0_42px_rgba(16,185,129,0.22)]"
            >
              {item.score}/{item.outOf}
            </Badge>
          </div>

          <div className="relative mt-4 rounded-2xl border border-foreground/10 bg-black/10 p-4">
            <div className="text-xs font-medium text-foreground/70">
              Achievement Badge
            </div>
            <div className="mt-1 text-sm leading-6 text-foreground/85">
              Perfect performance (30/30).
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

