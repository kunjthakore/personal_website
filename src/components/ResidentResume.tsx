import { useState } from "react";
import { Download, Printer, Copy, FileText, Check, ChevronRight } from "lucide-react";
import { Profile } from "../types";

interface ResidentResumeProps {
  profile: Profile;
}

export default function ResidentResume({ profile }: ResidentResumeProps) {
  const [copied, setCopied] = useState(false);

  // Generate a clean Markdown version of the CV for easy copy-pasting
  const generateMarkdownResume = () => {
    return `# ${profile.name}
${profile.title} | ${profile.location}
Email: ${profile.socials.email} | Phone: ${profile.socials.phone || ""} | GitHub: ${profile.socials.github} | LinkedIn: ${profile.socials.linkedin}

## Professional Summary
${profile.bio}
${profile.secondaryBio || ""}

## Experience
${profile.experience
  .map(
    (exp) => `
### ${exp.role} - ${exp.company}
*${exp.duration}*
${exp.description}
Core Focus: ${exp.skillsDeveloped.join(", ")}
`
  )
  .join("")}

## Tech Matrix
${profile.skills
  .map(
    (cat) => `
### ${cat.category}
${cat.skills.join(", ")}
`
  )
  .join("")}

## Key Projects
${profile.projects
  .map(
    (project, idx) => `
### ${idx + 1}. ${project.title}
*Technologies: ${project.tags.join(", ")}*
${project.description}
`
  )
  .join("")}

${profile.education && profile.education.length > 0 ? `
## Education
${profile.education.map(edu => `### ${edu.degree}
${edu.institution} - ${edu.location || ""} | ${edu.year}
`).join("\n")}
` : ""}
`;
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownResume());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6 animate-fade-in" id="resume-page-container">
      {/* Editorial page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-4">
        <div>
          <h2 className="font-sans text-xl font-bold text-slate-50">Curriculum Vitae</h2>
          <p className="font-mono text-[10px] text-slate-500">Live generated · print & export compliant</p>
        </div>

        {/* Export Controls */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 rounded border border-slate-900 bg-slate-950/60 px-3 py-1.5 font-mono text-[10px] text-slate-400 hover:text-slate-100 hover:border-slate-800 transition"
            title="Copy as clean Markdown representation"
            id="btn-copy-md"
          >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            <span>{copied ? "Copied MD!" : "Copy MD"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 font-mono text-[10px] text-white hover:bg-blue-500 hover:border-blue-400 transition font-medium"
            id="btn-print-cv"
          >
            <Printer size={11} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable sheet frame */}
      <div
        className="relative bg-slate-950/20 border border-slate-900/80 rounded-xl p-8 sm:p-12 shadow-2xl font-sans text-slate-300 print:bg-white print:text-black print:p-0 print:border-0 print:shadow-none"
        id="resume-printable-sheet"
      >
        {/* Print only instructions / CSS modifiers */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            #app-root-frame, #resume-page-container {
              padding: 0 !important;
              margin: 0 !important;
            }
            #resume-printable-sheet {
              background: white !important;
              color: black !important;
              border: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              font-size: 12pt !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            .text-slate-50, .text-slate-100, .text-slate-200, .text-slate-300 {
              color: black !important;
            }
            .text-slate-400, .text-slate-500, .text-slate-600 {
              color: #4b5563 !important;
            }
            .text-blue-400, .text-blue-500 {
              color: #1d4ed8 !important;
            }
            .border-slate-800, .border-slate-900, .border-slate-905 {
              border-color: #e5e7eb !important;
            }
          }
        `}} />

        {/* Content Container */}
        <div className="space-y-8">
          {/* Top banner / Info */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 border-b border-slate-900 print:border-slate-200 pb-6">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3.5xl font-bold tracking-tight text-slate-50 print:text-black">
                {profile.name}
              </h1>
              <p className="font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
                {profile.title}
              </p>
              <p className="text-xs text-slate-400 print:text-[#4b5563]">
                {profile.location}
              </p>
            </div>
            <div className="font-mono text-[11px] space-y-1 text-slate-400 print:text-right print:text-[#4b5563] sm:text-right">
              {profile.socials.phone && <div>Phone: <a href={`tel:${profile.socials.phone}`} className="underline hover:text-slate-300">{profile.socials.phone}</a></div>}
              <div>Email: <a href={`mailto:${profile.socials.email}`} className="underline hover:text-slate-300">{profile.socials.email}</a></div>
              <div>GitHub: <a href={profile.socials.github} target="_blank" rel="noreferrer" className="underline hover:text-slate-300">{profile.socials.github.replace("https://", "")}</a></div>
              <div>LinkedIn: <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-slate-300">{profile.socials.linkedin.replace("https://", "")}</a></div>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 print:text-[#4b5563] font-bold">
              // ProfessionalTrajectory
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-300 print:text-black font-light pr-4">
              {profile.bio} {profile.secondaryBio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 print:text-[#4b5563] font-bold">
              // EngineeringExperience
            </h3>
            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-[13.5px] font-semibold text-slate-100 print:text-black">
                        {exp.role}
                      </h4>
                      <p className="text-[12px] text-slate-400 print:text-[#4b5563]">
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 print:text-[#4b5563] whitespace-nowrap pt-0.5">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-[12px] leading-relaxed text-slate-350 print:text-black font-light pr-2">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {exp.skillsDeveloped.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[9px] text-slate-500 print:text-[#4b5563]"
                      >
                        · {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology matrix */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 print:text-[#4b5563] font-bold">
              // TechnologyMatrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {profile.skills.map((group) => (
                <div key={group.id} className="space-y-2">
                  <h4 className="font-mono text-[10px] uppercase font-bold text-slate-400 print:text-[#4b5563]">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-sans text-[11.5px] text-slate-400 bg-slate-900/30 print:bg-slate-100 print:text-black border border-slate-900/80 print:border-slate-200 rounded px-1.5 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-900/60 print:border-slate-200">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 print:text-[#4b5563] font-bold">
                // KeyProjects
              </h3>
              <div className="space-y-5">
                {profile.projects.map((project, idx) => (
                  <div key={project.id} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h4 className="font-sans text-[13.5px] font-semibold text-slate-100 print:text-black">
                        {idx + 1}. {project.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 font-mono text-[9px] text-slate-500 print:text-[#4b5563]">
                        ({project.tags.join(", ")})
                      </div>
                    </div>
                    <p className="font-sans text-[12px] leading-relaxed text-slate-400 print:text-[#4b5563] font-light">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education credentials */}
          {profile.education && profile.education.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-900/60 print:border-slate-200">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 print:text-[#4b5563] font-bold">
                // EducationCredentials
              </h3>
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h4 className="font-sans text-[13.5px] font-semibold text-slate-100 print:text-black">
                        {edu.degree}
                      </h4>
                      <p className="font-sans text-[12px] text-slate-400 print:text-[#4b5563]">
                        {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 print:text-[#4b5563] whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
