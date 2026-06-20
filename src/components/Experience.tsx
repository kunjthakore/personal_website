import { Briefcase } from "lucide-react";
import { Experience } from "../types";

interface ExperienceProps {
  experience: Experience[];
}

export default function ExperienceTimeline({ experience }: ExperienceProps) {
  return (
    <section className="space-y-6 py-6" id="experience-section">
      {/* Section Head */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
          // Professional Resume
        </h3>
        <span className="font-mono text-[10px] text-slate-500">
          Work experiences
        </span>
      </div>

      {/* Linear timeline stack */}
      <div className="space-y-6 relative border-l border-slate-905 pl-4 ml-2" id="resume-timeline-stack">
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="group relative space-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 120}ms` }}
            id={`experience-item-${exp.id}`}
          >
            {/* Timeline anchor circle */}
            <span className="absolute -left-[21px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-slate-900 border border-slate-800 group-hover:border-blue-400 group-hover:bg-blue-500/10 transition-colors">
              <span className="h-1 w-1 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
            </span>

            {/* Exp detail header: Title & Duration */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h4 className="font-sans text-[13.5px] font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h4>
                <p className="font-sans text-[11.5px] text-slate-400 font-light">
                  {exp.company}
                </p>
              </div>

              <span className="font-mono text-[10px] text-slate-500 font-medium whitespace-nowrap">
                {exp.duration}
              </span>
            </div>

            {/* Description */}
            <p className="font-sans text-[12px] leading-relaxed text-slate-400 font-light pr-2">
              {exp.description}
            </p>

            {/* Core tags developed */}
            {exp.skillsDeveloped && exp.skillsDeveloped.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skillsDeveloped.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[8.5px] tracking-wide text-slate-550 cursor-default"
                  >
                    · {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
