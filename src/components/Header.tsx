import { MapPin, Mail, Github, Linkedin, Twitter, FileText } from "lucide-react";
import { Profile } from "../types";

interface HeaderProps {
  profile: Profile;
}

export default function Header({ profile }: HeaderProps) {
  return (
    <header className="space-y-6 pt-12" id="portfolio-header">
      {/* Availability Status Notification */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            profile.isAvailableForWork ? "bg-emerald-400" : "bg-blue-400"
          }`}></span>
          <span className={`relative inline-flex h-2 w-2 rounded-full ${
            profile.isAvailableForWork ? "bg-emerald-500" : "bg-blue-500"
          }`}></span>
        </span>
        <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
          {profile.isAvailableForWork ? "Available for new projects" : "Focus state: active"}
        </span>
      </div>

      {/* Main Author Column */}
      <div className="flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            {profile.name}
          </h1>
          <p className="font-mono text-xs font-medium text-blue-400 tracking-wide">
            {profile.title}
          </p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin size={13} className="text-slate-500" />
            <span className="font-mono text-[11px] tracking-tight">{profile.location}</span>
          </div>
        </div>


      </div>

      {/* Profile Bio Description */}
      <div className="space-y-4 pt-1">
        <p className="font-sans text-sm leading-relaxed text-slate-300">
          {profile.bio}
        </p>
        {profile.secondaryBio && (
          <p className="font-sans text-xs leading-relaxed text-slate-400 font-light pr-4">
            {profile.secondaryBio}
          </p>
        )}
      </div>

      {/* Social Connection Toolbar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-3 border-b border-slate-900 pb-6" id="social-anchors">
        {profile.socials.github && (
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-all"
            id="social-github"
          >
            <Github size={13} className="group-hover:scale-105 transition-transform" />
            <span className="font-mono font-medium border-b border-dashed border-slate-705 pb-0.5 group-hover:border-slate-500">GitHub</span>
          </a>
        )}

        {profile.socials.linkedin && (
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-all"
            id="social-linkedin"
          >
            <Linkedin size={13} className="group-hover:scale-105 transition-transform" />
            <span className="font-mono font-medium border-b border-dashed border-slate-705 pb-0.5 group-hover:border-slate-500">LinkedIn</span>
          </a>
        )}

        {profile.socials.twitter && (
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-all"
            id="social-twitter"
          >
            <Twitter size={13} className="group-hover:scale-105 transition-transform" />
            <span className="font-mono font-medium border-b border-dashed border-slate-705 pb-0.5 group-hover:border-slate-500">Twitter</span>
          </a>
        )}

        {profile.socials.email && (
          <a
            href={`mailto:${profile.socials.email}`}
            className="group flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-all"
            id="social-email"
          >
            <Mail size={13} className="group-hover:scale-105 transition-transform" />
            <span className="font-mono font-medium border-b border-dashed border-slate-705 pb-0.5 group-hover:border-slate-500">Email</span>
          </a>
        )}

        {profile.socials.resumeUrl && profile.socials.resumeUrl !== "#" && (
          <a
            href={profile.socials.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-all"
            id="social-resume"
          >
            <FileText size={13} />
            <span className="font-mono font-medium border-b border-dashed border-blue-500 pb-0.5">Resume</span>
          </a>
        )}
      </div>
    </header>
  );
}
