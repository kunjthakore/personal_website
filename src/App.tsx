import { useState, useEffect, FormEvent } from "react";
import { Settings, RefreshCw, Layers, Check, MessageSquare, Send, Calendar, Star, Sparkles, X, ChevronRight, Briefcase, Compass, FileText, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Profile } from "./types";
import { INITIAL_PORTFOLIO_DATA } from "./data";
import Header from "./components/Header";
import Projects from "./components/Projects";
import ExperienceTimeline from "./components/Experience";
import Skills from "./components/Skills";
import PortfolioEditor from "./components/PortfolioEditor";
import AestheticIllustration from "./components/AestheticIllustration";
import ResidentResume from "./components/ResidentResume";

type AccentColor = "cobalt" | "indigo" | "emerald" | "amber" | "slate";
type ActivePage = "home" | "portfolio" | "resume";

interface VisitorMessage {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PORTFOLIO_DATA);
  const [accent, setAccent] = useState<AccentColor>("slate");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [visitorMessages, setVisitorMessages] = useState<VisitorMessage[]>([]);
  const [visitorName, setVisitorName] = useState("");
  const [visitorText, setVisitorText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activePage, setActivePage] = useState<ActivePage>("home");

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("portfolio_profile_data");
    const savedAccent = localStorage.getItem("portfolio_profile_accent");
    const savedMessages = localStorage.getItem("portfolio_profile_messages");
    const savedTheme = localStorage.getItem("portfolio_theme");

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to load saved profile data", e);
      }
    }
    if (savedAccent) {
      setAccent(savedAccent as AccentColor);
    }
    if (savedTheme) {
      setTheme(savedTheme as "dark" | "light");
    }
    if (savedMessages) {
      try {
        setVisitorMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to load visitor messages", e);
      }
    }
  }, []);

  // Sync theme with body class
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  // Save profile helper
  const handleUpdateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem("portfolio_profile_data", JSON.stringify(newProfile));
  };

  // Reset profile helper
  const handleResetProfile = () => {
    if (window.confirm("Are you sure you want to reset your portfolio data to default settings?")) {
      setProfile(INITIAL_PORTFOLIO_DATA);
      localStorage.setItem("portfolio_profile_data", JSON.stringify(INITIAL_PORTFOLIO_DATA));
      setAccent("slate");
      localStorage.setItem("portfolio_profile_accent", "slate");
      setTheme("dark");
      localStorage.setItem("portfolio_theme", "dark");
      setVisitorMessages([]);
      localStorage.removeItem("portfolio_profile_messages");
      setIsEditorOpen(false);
      setActivePage("home");
    }
  };

  // Save accent color helper
  const handleAccentChange = (col: AccentColor) => {
    setAccent(col);
    localStorage.setItem("portfolio_profile_accent", col);
  };

  // Handle visitors post
  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorText.trim()) return;

    const newMessage: VisitorMessage = {
      id: `msg_${Date.now()}`,
      name: visitorName.trim(),
      text: visitorText.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    const updated = [newMessage, ...visitorMessages];
    setVisitorMessages(updated);
    localStorage.setItem("portfolio_profile_messages", JSON.stringify(updated));

    setVisitorName("");
    setVisitorText("");
    setSuccessMsg("Thanks for your note! It has been posted to our guestbook.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Clear single visitor message
  const deleteMessage = (id: string) => {
    const updated = visitorMessages.filter((m) => m.id !== id);
    setVisitorMessages(updated);
    localStorage.setItem("portfolio_profile_messages", JSON.stringify(updated));
  };

  // Map accents to css class strings
  const getAccentStyles = () => {
    switch (accent) {
      case "cobalt":
        return {
          text: "text-blue-400",
          bg: "bg-blue-500",
          border: "border-blue-900/60",
          solidBg: "bg-blue-600 hover:bg-blue-500",
          glow: "shadow-blue-500/10",
        };
      case "indigo":
        return {
          text: "text-indigo-400",
          bg: "bg-indigo-500",
          border: "border-indigo-900/60",
          solidBg: "bg-indigo-600 hover:bg-indigo-500",
          glow: "shadow-indigo-500/10",
        };
      case "emerald":
        return {
          text: "text-emerald-400",
          bg: "bg-emerald-500",
          border: "border-emerald-900/60",
          solidBg: "bg-emerald-600 hover:bg-emerald-500",
          glow: "shadow-emerald-500/10",
        };
      case "amber":
        return {
          text: "text-amber-400",
          bg: "bg-amber-500",
          border: "border-amber-900/60",
          solidBg: "bg-amber-600 hover:bg-amber-500",
          glow: "shadow-amber-500/10",
        };
      case "slate":
      default:
        return {
          text: "text-slate-300",
          bg: "bg-slate-500",
          border: "border-slate-800",
          solidBg: "bg-slate-700 hover:bg-slate-650",
          glow: "shadow-slate-500/5",
        };
    }
  };

  const accentCss = getAccentStyles();

  return (
    <div className="min-h-screen selection:bg-slate-800 selection:text-white px-4 sm:px-8 md:px-16 lg:px-24 pb-24" id="app-root-frame">
      {/* Top Banner Navigation Row */}
      <nav className="mx-auto max-w-5xl flex items-center justify-between pt-8 pb-8 font-mono text-[11px] tracking-tight text-slate-500 border-b border-transparent print:hidden">
        {/* Top-Left: Handwritten Abstract Monogram Logo */}
        <button
          onClick={() => setActivePage("home")}
          className="group flex items-center gap-1.5 focus:outline-hidden"
          title="Go to main splash page"
          id="btn-logo-home"
        >
          <svg
            width="25"
            height="36"
            viewBox="0 0 25 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-100 group-hover:text-blue-400 transition-colors"
          >
            {/* Elegant single-stroke stylized cursive 'kt' or glyph */}
            <path
              d="M 12,3 C 12,3 3,24 3,28 C 3,32 10,32 12,28 C 14,24 22,6 22,6 M 7,16 L 19,17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-sans text-xs lowercase font-light text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pl-1">
            {profile.name.toLowerCase()}
          </span>
        </button>

        {/* Top-Right: Monospace spacing lowercase text links */}
        <div className="flex items-center gap-5 sm:gap-7 font-mono text-[11px] tracking-wider text-slate-400 lowercase">
          {profile.socials.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 border-b border-transparent hover:border-slate-100 transition pb-0.5"
            >
              twitter
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 border-b border-transparent hover:border-slate-100 transition pb-0.5"
            >
              linkedin
            </a>
          )}
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 border-b border-transparent hover:border-slate-100 transition pb-0.5"
            >
              github
            </a>
          )}
          
          {/* Internal section togglers */}
          <button
            onClick={() => setActivePage("resume")}
            className={`transition pb-0.5 border-b cursor-pointer ${
              activePage === "resume" ? "text-blue-400 border-blue-400 font-bold" : "hover:text-slate-100 border-transparent"
            }`}
          >
            resume
          </button>
          <button
            onClick={() => setActivePage(activePage === "home" ? "portfolio" : "home")}
            className={`transition pb-0.5 border-b cursor-pointer ${
              activePage === "portfolio" ? "text-blue-400 border-blue-400 font-bold" : "hover:text-slate-100 border-transparent"
            }`}
          >
            {activePage === "home" ? "portfolio" : "home"}
          </button>

          {/* Theme toggler */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center h-7 w-7 rounded-full bg-slate-950/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 transition active:scale-95 text-slate-400 hover:text-slate-200 cursor-pointer"
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            id="theme-toggler-btn"
          >
            {theme === "dark" ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-indigo-400" />}
          </button>
        </div>
      </nav>

      {/* Main Single Column Profile Stage */}
      <div className="mx-auto max-w-5xl" id="content-animation-stage">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="grid gap-12 lg:grid-cols-12 lg:items-center py-6 sm:py-12"
              id="home-isometric-stage"
            >
              {/* Left Column: Author Narrative list block */}
              <div className="space-y-10 lg:col-span-7">
                <div className="space-y-4">
                  <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">// splash initial</span>
                  <h1 className="font-sans text-2xl sm:text-3.5xl font-semibold tracking-tight text-slate-100">
                    hey, i'm {profile.name.toLowerCase()}
                  </h1>
                </div>

                {/* Highly descriptive sentence rows matching Daniel's visual layout */}
                <div className="space-y-8 max-w-lg font-sans">
                  <div className="space-y-1">
                    <p className="text-[14.5px] text-slate-300 leading-relaxed">
                      <strong className="text-slate-50 font-semibold">{profile.title.toLowerCase()}</strong>, backend engineer and interface hacker.
                    </p>
                    <button
                      onClick={() => setActivePage("portfolio")}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:text-blue-300 transition-all font-medium pb-0.5 border-b border-blue-500/20 hover:border-blue-450"
                    >
                      take a look at what i'm building
                      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[14.5px] text-slate-300 leading-relaxed">
                      focused on high-throughput ecosystems, custom systems and modern developer workspaces.
                    </p>
                    <button
                      onClick={() => setActivePage("portfolio")}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:text-blue-300 transition-all font-medium pb-0.5 border-b border-blue-500/20 hover:border-blue-450"
                    >
                      inspect my technologies matrix
                      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[14.5px] text-slate-300 leading-relaxed">
                      collaborating on low-latency protocols, design tokens converter, and scalable code structures.
                    </p>
                    <button
                      onClick={() => setActivePage("resume")}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:text-blue-300 transition-all font-medium pb-0.5 border-b border-blue-500/20 hover:border-blue-450"
                    >
                      review my experience & professional cv
                      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[14.5px] text-slate-300 leading-relaxed">
                      building local state engines, elegant mechanical keyboard configurations and interactive developer playgrounds.
                    </p>
                    <button
                      onClick={() => {
                        setActivePage("portfolio");
                        setTimeout(() => {
                          document.getElementById("visitor-feedback-channel")?.scrollIntoView({ behavior: "smooth" });
                        }, 250);
                      }}
                      className="group inline-flex items-center gap-1 font-mono text-[11px] text-blue-400 hover:text-blue-300 transition-all font-medium pb-0.5 border-b border-blue-500/20 hover:border-blue-450"
                    >
                      leave an entry in my guestbook
                      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Retro CRT desk illustration */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <AestheticIllustration accentColor={accent} />
              </div>
            </motion.div>
          )}

          {activePage === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="mx-auto max-w-2xl space-y-12 py-4"
              id="portfolio-list-wrapper"
            >
              {/* Profile Card Header */}
              <Header profile={profile} />

              {/* Selected Work Showcase */}
              <Projects projects={profile.projects} />

              {/* Professional timeline */}
              <ExperienceTimeline experience={profile.experience} />

              {/* Technical skills grid */}
              <Skills categories={profile.skills} />

              {/* Interactive Guestbook and Workspace Feedback Block */}
              <section className="space-y-6 pt-6 border-t border-slate-900 pb-12" id="visitor-feedback-channel">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
                    // Guestbook / Real-Time Scratchpad
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500 flex items-center gap-1">
                    <MessageSquare size={10} /> Saved locally
                  </span>
                </div>

                <p className="font-sans text-[12px] leading-relaxed text-slate-400 font-light max-w-lg mb-2">
                  Leave a note, feedback, or a question here to test the live-updating Guestbook module! All entries are stored privately on your browser container.
                </p>

                <form onSubmit={submitMessage} className="space-y-3" id="form-visitor">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your Name"
                      className="sm:col-span-1 rounded border border-slate-900 bg-slate-950/40 px-3 py-2 font-mono text-[11px] focus:border-slate-700 focus:outline-hidden text-slate-200"
                      maxLength={40}
                      required
                    />
                    <input
                      type="text"
                      value={visitorText}
                      onChange={(e) => setVisitorText(e.target.value)}
                      placeholder="Write your brief message here..."
                      className="sm:col-span-3 rounded border border-slate-900 bg-slate-950/40 px-3 py-2 font-sans text-xs focus:border-slate-700 focus:outline-hidden text-slate-200"
                      maxLength={200}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {successMsg ? (
                      <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 animate-pulse">
                        <Check size={12} /> {successMsg}
                      </span>
                    ) : (
                      <div />
                    )}
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded border border-slate-800 hover:border-slate-700 bg-slate-950 px-3.5 py-1.5 font-mono text-[10px] text-slate-350 hover:text-slate-100 transition-all font-medium"
                      id="btn-send-msg"
                    >
                      <Send size={10} /> Post Entry
                    </button>
                  </div>
                </form>

                {/* Messages Feed */}
                {visitorMessages.length > 0 && (
                  <div className="space-y-2 rounded border border-slate-900/60 bg-slate-950/20 p-4 max-h-56 overflow-y-auto">
                    {visitorMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="group relative flex items-start justify-between border-b border-slate-900/50 pb-2.5 last:border-0 last:pb-0 pt-2 first:pt-0"
                      >
                        <div className="space-y-1 pr-6">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold text-slate-300">
                              {msg.name}
                            </span>
                            <span className="font-mono text-[8px] text-slate-500">
                              {msg.timestamp}
                            </span>
                          </div>
                          <p className="font-sans text-[11.5px] text-slate-400 leading-normal font-light">
                            {msg.text}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-opacity p-0.5 duration-250"
                          title="Delete message"
                          aria-label="Remove message"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          )}

          {activePage === "resume" && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="mx-auto max-w-3xl"
            >
              <ResidentResume profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simple elegant page footer */}
      <footer className="mx-auto max-w-5xl pt-16 text-center print:hidden" id="portfolio-footer">
        <div className="mx-auto w-32 border-t border-slate-900/60 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[10.5px]">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved under local storage.
          </div>
          
          <div className="flex items-center gap-3 select-none">
            {/* Quick Palette & Theme Toggler */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/40 rounded-full border border-slate-900/50">
              {(["slate", "cobalt", "indigo", "emerald", "amber"] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => handleAccentChange(color)}
                  className={`h-2 w-2 rounded-full transition-all hover:scale-110 active:scale-95 ${
                    color === "slate"
                      ? "bg-slate-500"
                      : color === "cobalt"
                      ? "bg-blue-500"
                      : color === "indigo"
                      ? "bg-indigo-500"
                      : color === "emerald"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  } ${accent === color ? "ring-1 ring-offset-1 ring-offset-[#090b11] ring-slate-400 scale-105" : ""}`}
                  title={`Color theme: ${color}`}
                />
              ))}
              <span className="w-px h-3 bg-slate-800/80 mx-0.5" />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center transition-all hover:scale-115 active:scale-95 cursor-pointer"
                title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              >
                {theme === "dark" ? <Sun size={11} className="text-amber-400" /> : <Moon size={11} className="text-indigo-400" />}
              </button>
            </div>

            <button
              onClick={() => setIsEditorOpen(true)}
              className="text-slate-500 hover:text-slate-300 font-medium transition flex items-center gap-1"
              id="footer-btn-customize"
            >
              <Settings size={10} /> customize
            </button>
            
            <span>·</span>
            
            <button
              onClick={handleResetProfile}
              className="flex items-center gap-1 text-slate-500 hover:text-red-400 transition"
              title="Reset profile to starter data"
            >
              <RefreshCw size={10} /> restore default
            </button>
          </div>
        </div>

        {/* Cursive quote at the bottom matching Daniel's site exactly */}
        <div className="pt-10 pb-4 text-center">
          <span className="font-mono italic text-[11px] text-slate-600 lowercase select-none cursor-default hover:text-slate-400 transition-colors duration-500">
            Coder au-delà des limites
          </span>
        </div>
      </footer>

      {/* Slide-out customize panel */}
      <AnimatePresence>
        {isEditorOpen && (
          <PortfolioEditor
            profile={profile}
            onUpdate={handleUpdateProfile}
            onReset={handleResetProfile}
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating control bubble on lower scroll */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center justify-center h-10 w-10 text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-full shadow-lg active:scale-95 transition-all group"
          title="Open Website Customizer Panel"
          id="floating-gear-btn"
        >
          <Settings size={16} className="group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
