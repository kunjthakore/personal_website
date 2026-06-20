import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Sort projects so featured are displayed first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section className="space-y-6 py-6" id="projects-section">
      {/* Monospace Section Headline */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
          // Featured Projects
        </h3>
        <span className="font-mono text-[10px] text-slate-500">
          {sortedProjects.length} total
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-lg border border-slate-900 bg-slate-950/40 p-5 hover:border-slate-800 hover:bg-[#0c101c]/50 transition-all duration-350"
            id={`project-card-${project.id}`}
          >
            <div className="space-y-2.5">
              {/* Card Header Name & External Pointer */}
              <div className="flex items-start justify-between">
                <h4 className="font-sans text-[13.5px] font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-350 transition-colors">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-0.5 hover:text-slate-105"
                      aria-label="View source repository"
                    >
                      <Github size={13} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-0.5 hover:text-blue-405 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-label="View live production"
                    >
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Card description text */}
              <p className="font-sans text-[12px] leading-relaxed text-slate-400 font-light">
                {project.description}
              </p>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-wide text-slate-500 rounded bg-slate-900/50 px-1.5 py-0.5 cursor-default hover:text-slate-350 hover:bg-slate-850/60 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
