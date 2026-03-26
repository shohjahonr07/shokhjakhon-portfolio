import { academicScores } from "@/lib/cv-data";
import { cn } from "@/lib/utils";

export function AcademicBentoGrid() {
  return (
    <div className="rounded-3xl border border-foreground/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="overflow-hidden rounded-2xl border border-foreground/10">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-black/10">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold text-foreground/80">
                Subject
              </th>
              <th className="px-4 py-3 font-semibold text-foreground/80">
                Score
              </th>
              <th className="px-4 py-3 font-semibold text-foreground/80">
                Institution
              </th>
            </tr>
          </thead>
          <tbody>
            {academicScores.map((item) => (
              <tr key={item.label} className="border-t border-foreground/10">
                <td className="px-4 py-3 text-foreground/85">
                  {item.label}
                </td>
                <td className="px-4 py-3 text-foreground/90">
                  {item.score}/{item.outOf}
                </td>
                <td className="px-4 py-3 text-foreground/70">
                  University of Messina
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cn("mt-5 text-xs leading-6 text-foreground/65")}>
        Academic performance across core subjects (30/30 each).
      </div>
    </div>
  );
}

