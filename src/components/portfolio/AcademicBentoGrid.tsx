import { academicScores } from "@/lib/cv-data";

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
                <td className="px-4 py-3 text-foreground/85">{item.label}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full border border-glow/20 bg-glow/10 px-3 py-1 text-foreground shadow-[0_0_28px_rgba(16,185,129,0.18)]">
                    {item.score}/{item.outOf}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/70">
                  University of Messina
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 text-xs leading-6 text-foreground/65">
        Consistent 30/30 achievement across core disciplines.
      </div>
    </div>
  );
}

