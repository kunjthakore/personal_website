import { SkillCategory } from "../types";

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  return (
    <section className="space-y-6 py-6" id="skills-section">
      {/* Section Head */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
          // Technology Matrix
        </h3>
        <span className="font-mono text-[10px] text-slate-500">
          Tool belt
        </span>
      </div>

      {/* Grid distribution */}
      <div className="grid gap-6 sm:grid-cols-3">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="space-y-3 p-4 rounded-lg border border-slate-950 bg-slate-950/20 hover:bg-[#0c101c]/20 hover:border-slate-900 transition-all duration-300"
            id={`skill-cat-${cat.id}`}
          >
            {/* Header indexing */}
            <div className="flex items-center gap-1.5 pb-1 select-none">
              <span className="font-mono text-[10px] text-blue-500 font-bold">
                [{String(idx + 1).padStart(2, "0")}]
              </span>
              <h4 className="font-mono text-[10.5px] uppercase tracking-wider font-semibold text-slate-350">
                {cat.category}
              </h4>
            </div>

            {/* List tags */}
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-sans text-[11.5px] text-slate-400 bg-slate-925/55 border border-slate-900 rounded px-2 py-0.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
