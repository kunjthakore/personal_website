import { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Trash, RotateCcw, Save, Settings, Sparkles } from "lucide-react";
import { Profile, Project, Experience, SkillCategory } from "../types";

interface PortfolioEditorProps {
  profile: Profile;
  onUpdate: (updatedProfile: Profile) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioEditor({
  profile,
  onUpdate,
  onReset,
  isOpen,
  onClose,
}: PortfolioEditorProps) {
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);
  const [activeTab, setActiveTab] = useState<"general" | "projects" | "experience" | "skills">("general");

  // Handle text field changes
  const handleFieldChange = (field: keyof Profile, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested socials changes
  const handleSocialChange = (field: string, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [field]: value,
      },
    }));
  };

  // Projects CRUD
  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updatedProjects = [...editedProfile.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    handleFieldChange("projects", updatedProjects);
  };

  const handleProjectTagsChange = (index: number, tagsString: string) => {
    const tags = tagsString.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    handleProjectChange(index, "tags", tags);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      title: "New Project",
      description: "Short description of the awesome project you built.",
      tags: ["React", "TypeScript"],
      githubUrl: "https://github.com",
      featured: true,
    };
    handleFieldChange("projects", [newProject, ...editedProfile.projects]);
  };

  const removeProject = (id: string) => {
    const updatedProjects = editedProfile.projects.filter((p) => p.id !== id);
    handleFieldChange("projects", updatedProjects);
  };

  // Experience CRUD
  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const updatedExp = [...editedProfile.experience];
    updatedExp[index] = {
      ...updatedExp[index],
      [field]: value,
    };
    handleFieldChange("experience", updatedExp);
  };

  const handleExperienceSkillsChange = (index: number, skillsString: string) => {
    const skills = skillsString.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    handleExperienceChange(index, "skillsDeveloped", skills);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: "Software Developer",
      company: "Company Name",
      duration: "2024 — Present",
      description: "Outline your main achievements and day-to-day contributions here.",
      skillsDeveloped: ["React", "Node.js"],
    };
    handleFieldChange("experience", [newExp, ...editedProfile.experience]);
  };

  const removeExperience = (id: string) => {
    const updatedExp = editedProfile.experience.filter((e) => e.id !== id);
    handleFieldChange("experience", updatedExp);
  };

  // Skills CRUD
  const handleSkillCategoryChange = (index: number, value: string) => {
    const updatedSkills = [...editedProfile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      category: value,
    };
    handleFieldChange("skills", updatedSkills);
  };

  const handleSkillsListChange = (index: number, skillsString: string) => {
    const skillsList = skillsString.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    const updatedSkills = [...editedProfile.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      skills: skillsList,
    };
    handleFieldChange("skills", updatedSkills);
  };

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: `skill_${Date.now()}`,
      category: "New Tech Guild",
      skills: ["Docker", "Linux"],
    };
    handleFieldChange("skills", [...editedProfile.skills, newCategory]);
  };

  const removeSkillCategory = (id: string) => {
    const updatedSkills = editedProfile.skills.filter((s) => s.id !== id);
    handleFieldChange("skills", updatedSkills);
  };

  const handleSave = () => {
    onUpdate(editedProfile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
      {/* Click-outside backdrop to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="flex h-full w-full max-w-xl flex-col border-l border-slate-800 bg-[#0c0f17] text-slate-100 shadow-2xl"
        id="side-panel-editor"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-500/10 text-blue-400">
              <Settings size={18} />
            </span>
            <div>
              <h2 className="font-sans font-semibold text-base text-slate-50">Local Profile Editor</h2>
              <p className="font-mono text-[10px] text-slate-400">Saves securely in your browser's LocalStorage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition"
            aria-label="Close settings"
            id="btn-close-editor"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-4 border-b border-slate-800 bg-[#0e121d] px-2 py-1 text-center font-mono text-[11px] tracking-tight text-slate-400">
          {(["general", "projects", "experience", "skills"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded py-2 font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-slate-800/80 text-blue-400 font-semibold border-b border-blue-500"
                  : "hover:text-slate-200"
              }`}
              id={`tab-${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form Body Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  Avatar / Profile Photo URL
                </label>
                <input
                  type="text"
                  value={editedProfile.avatarUrl || ""}
                  onChange={(e) => handleFieldChange("avatarUrl", e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                  placeholder="https://images.unsplash.com/..."
                  id="input-avatar"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden font-medium text-slate-50"
                    placeholder="Kunj Thakore"
                    id="input-name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Profile Subtitle
                  </label>
                  <input
                    type="text"
                    value={editedProfile.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden text-slate-200"
                    placeholder="Full-Stack Developer"
                    id="input-title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => handleFieldChange("location", e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                    placeholder="San Francisco, CA"
                    id="input-location"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Active Status Message
                  </label>
                  <input
                    type="text"
                    value={editedProfile.statusText}
                    onChange={(e) => handleFieldChange("statusText", e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                    placeholder="Building a dev tool"
                    id="input-status"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded border border-slate-800 bg-slate-925 p-3">
                <input
                  type="checkbox"
                  checked={editedProfile.isAvailableForWork}
                  onChange={(e) => handleFieldChange("isAvailableForWork", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-blue-500 focus:ring-0"
                  id="chk-availability"
                />
                <label htmlFor="chk-availability" className="cursor-pointer font-sans text-xs text-slate-300 select-none">
                  Show "Open to new opportunities" status flag
                </label>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  Primary Biography Narrative
                </label>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                  className="w-full h-24 rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden resize-none leading-relaxed"
                  placeholder="Primary elevator pitch details..."
                  id="txt-bio"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  Secondary Details (Hobby, lifestyle, fun facts)
                </label>
                <textarea
                  value={editedProfile.secondaryBio || ""}
                  onChange={(e) => handleFieldChange("secondaryBio", e.target.value)}
                  className="w-full h-16 rounded border border-slate-800 bg-slate-900/60 px-3 py-2 font-sans text-xs focus:border-blue-500 focus:outline-hidden resize-none leading-relaxed"
                  placeholder="More about mechanical keyboards, records, tea..."
                  id="txt-secondary-bio"
                />
              </div>

              <div className="border-t border-slate-800 pt-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Professional Anchors & Contact Details
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={editedProfile.socials.github}
                      onChange={(e) => handleSocialChange("github", e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                      id="input-github"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={editedProfile.socials.linkedin}
                      onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                      id="input-linkedin"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={editedProfile.socials.email}
                      onChange={(e) => handleSocialChange("email", e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                      id="input-email-field"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={editedProfile.socials.phone || ""}
                      onChange={(e) => handleSocialChange("phone", e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                      id="input-phone"
                      placeholder="+91 7874804043"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                      Twitter / X Link
                    </label>
                    <input
                      type="text"
                      value={editedProfile.socials.twitter || ""}
                      onChange={(e) => handleSocialChange("twitter", e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                      id="input-twitter"
                    />
                  </div>
                </div>
              </div>

              {/* Education credentials */}
              <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Education Credentials
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newEdu = {
                        id: `edu_${Date.now()}`,
                        degree: "New Degree / Certification",
                        institution: "University/School",
                        year: "2024",
                        location: "City, Country",
                      };
                      handleFieldChange("education", [...(editedProfile.education || []), newEdu]);
                    }}
                    className="flex items-center gap-1 rounded bg-[#1d4ed8]/15 px-2 py-0.5 font-mono text-[9px] text-[#2563eb] hover:bg-[#1d4ed8]/25 transition-all cursor-pointer"
                  >
                    <Plus size={10} /> Add
                  </button>
                </div>
                <div className="space-y-3">
                  {(editedProfile.education || []).map((edu, eIdx) => (
                    <div key={edu.id} className="p-3 rounded border border-slate-900 bg-slate-950/20 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (editedProfile.education || []).filter((item) => item.id !== edu.id);
                          handleFieldChange("education", updated);
                        }}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition cursor-pointer"
                        title="Remove education"
                      >
                        <Trash size={12} />
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-mono text-[8.5px] uppercase tracking-wider text-slate-500 mb-0.5">
                            Degree / Course
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...(editedProfile.education || [])];
                              updated[eIdx] = { ...updated[eIdx], degree: e.target.value };
                              handleFieldChange("education", updated);
                            }}
                            className="w-full rounded border border-slate-800 bg-slate-900/60 px-2 py-1 font-sans text-xs focus:border-[#2563eb] focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8.5px] uppercase tracking-wider text-slate-500 mb-0.5">
                            Institution
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...(editedProfile.education || [])];
                              updated[eIdx] = { ...updated[eIdx], institution: e.target.value };
                              handleFieldChange("education", updated);
                            }}
                            className="w-full rounded border border-slate-800 bg-slate-900/60 px-2 py-1 font-sans text-xs focus:border-[#2563eb] focus:outline-hidden"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-mono text-[8.5px] uppercase tracking-wider text-slate-500 mb-0.5">
                            Location
                          </label>
                          <input
                            type="text"
                            value={edu.location || ""}
                            onChange={(e) => {
                              const updated = [...(editedProfile.education || [])];
                              updated[eIdx] = { ...updated[eIdx], location: e.target.value };
                              handleFieldChange("education", updated);
                            }}
                            className="w-full rounded border border-slate-800 bg-slate-900/60 px-2 py-1 font-sans text-xs focus:border-[#2563eb] focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[8.5px] uppercase tracking-wider text-slate-500 mb-0.5">
                            Graduation Year
                          </label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => {
                              const updated = [...(editedProfile.education || [])];
                              updated[eIdx] = { ...updated[eIdx], year: e.target.value };
                              handleFieldChange("education", updated);
                            }}
                            className="w-full rounded border border-slate-800 bg-slate-900/60 px-2 py-1 font-sans text-xs focus:border-[#2563eb] focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Managed Projects ({editedProfile.projects.length})
                </span>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center gap-1 rounded bg-blue-500/15 px-2.5 py-1 font-mono text-[10px] text-blue-400 hover:bg-blue-500/25 transition-all"
                  id="btn-add-project"
                >
                  <Plus size={12} /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {editedProfile.projects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="relative rounded border border-slate-850 p-4 bg-slate-925 space-y-3"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!!project.featured}
                          onChange={(e) => handleProjectChange(idx, "featured", e.target.checked)}
                          className="h-3 w-3 rounded text-blue-500 focus:ring-0 font-sans"
                        />
                        <span className="font-mono text-[9px] text-slate-400">Featured</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        className="text-slate-500 hover:text-red-400 transition"
                        aria-label="Remove Project"
                        id={`btn-del-proj-${idx}`}
                      >
                        <Trash size={13} />
                      </button>
                    </div>

                    <div className="w-5/6">
                      <label className="block font-mono text-[9px] text-slate-500 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                        className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 mb-1">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                        className="w-full h-14 rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) => handleProjectTagsChange(idx, e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1.5 font-mono text-[10px] focus:border-blue-500 focus:outline-hidden text-blue-400"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">Demo / External Link</label>
                        <input
                          type="text"
                          value={project.liveUrl || ""}
                          onChange={(e) => handleProjectChange(idx, "liveUrl", e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1.5 font-sans text-xs focus:border-blue-500 focus:outline-hidden"
                          placeholder="https://test.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Resume Timeline ({editedProfile.experience.length})
                </span>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1 rounded bg-blue-500/15 px-2.5 py-1 font-mono text-[10px] text-blue-400 hover:bg-blue-500/25 transition-all"
                  id="btn-add-exp"
                >
                  <Plus size={12} /> Add Role
                </button>
              </div>

              <div className="space-y-4">
                {editedProfile.experience.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="relative rounded border border-slate-850 p-4 bg-slate-925 space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                      aria-label="Remove Experience"
                      id={`btn-del-exp-${idx}`}
                    >
                      <Trash size={13} />
                    </button>

                    <div className="grid grid-cols-2 gap-3 w-5/6">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden font-medium"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">Duration Line</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-mono text-[10px] focus:border-blue-500 focus:outline-hidden text-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 mb-1">
                          Core Competencies (comma separated)
                        </label>
                        <input
                          type="text"
                          value={exp.skillsDeveloped.join(", ")}
                          onChange={(e) => handleExperienceSkillsChange(idx, e.target.value)}
                          className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-mono text-[10px] focus:border-blue-500 focus:outline-hidden text-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 mb-1">Responsibility Narrative</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                        className="w-full h-16 rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Technologies Groups ({editedProfile.skills.length})
                </span>
                <button
                  type="button"
                  onClick={addSkillCategory}
                  className="flex items-center gap-1 rounded bg-blue-500/15 px-2.5 py-1 font-mono text-[10px] text-blue-400 hover:bg-blue-500/25 transition-all"
                  id="btn-add-skill-group"
                >
                  <Plus size={12} /> Add Group
                </button>
              </div>

              <div className="space-y-4">
                {editedProfile.skills.map((skillGroup, idx) => (
                  <div
                    key={skillGroup.id}
                    className="relative rounded border border-slate-850 p-4 bg-slate-925 space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => removeSkillCategory(skillGroup.id)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                      aria-label="Remove skill group"
                      id={`btn-del-skillg-${idx}`}
                    >
                      <Trash size={13} />
                    </button>

                    <div className="w-5/6">
                      <label className="block font-mono text-[9px] text-slate-500 mb-1">Group Category Name</label>
                      <input
                        type="text"
                        value={skillGroup.category}
                        onChange={(e) => handleSkillCategoryChange(idx, e.target.value)}
                        className="w-full rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 mb-1">
                        Technologies (comma separated)
                      </label>
                      <textarea
                        value={skillGroup.skills.join(", ")}
                        onChange={(e) => handleSkillsListChange(idx, e.target.value)}
                        className="w-full h-14 rounded border border-slate-800 bg-slate-900/80 px-2 py-1 font-sans text-xs focus:border-blue-500 focus:outline-hidden resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-slate-800 bg-[#0e121d] px-6 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
            id="btn-restore-editor"
          >
            <RotateCcw size={13} /> Clear / Reset
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-slate-850 px-4 py-2 font-sans text-xs text-slate-400 hover:bg-slate-900 transition"
              id="btn-cancel-editor"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded bg-blue-500 px-4 py-2 font-sans text-xs font-semibold text-white hover:bg-blue-600 shadow-sm shadow-blue-500/20 active:translate-y-[1px] transition-all"
              id="btn-save-profile"
            >
              <Save size={13} /> Apply Profile
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
