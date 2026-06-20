import { motion } from "motion/react";

interface AestheticIllustrationProps {
  accentColor: string;
}

export default function AestheticIllustration({ accentColor }: AestheticIllustrationProps) {
  // Select color accent hex for glowing items
  const getAccentHex = () => {
    switch (accentColor) {
      case "cobalt":
        return "#3b82f6";
      case "indigo":
        return "#6366f1";
      case "emerald":
        return "#10b981";
      case "amber":
        return "#f59e0b";
      case "slate":
      default:
        return "#94a3b8";
    }
  };

  const glowHex = getAccentHex();

  return (
    <div className="relative select-none w-full max-w-[340px] aspect-4/3 sm:aspect-square flex items-center justify-center p-2 rounded-xl" id="cyber-isometric-artwork">
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,255,255,0.02)]"
      >
        {/* Definition of dither patterns and dot matrices */}
        <defs>
          <pattern id="dither-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1e293b" />
          </pattern>
          <pattern id="dither-dense" width="2" height="2" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" fill="#334155" />
          </pattern>
          <pattern id="diagonal-hash" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#475569" strokeWidth="0.8" />
          </pattern>
          <filter id="glow-panel">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Backdrop retro grid plate */}
        <rect x="10" y="10" width="260" height="260" fill="url(#dither-grid)" rx="8" />
        <rect x="10" y="10" width="260" height="260" stroke="#101726" strokeWidth="1.5" rx="8" />

        {/* Ambient floating terminal bubbles */}
        <circle cx="45" cy="50" r="1.5" fill="#475569" />
        <circle cx="55" cy="65" r="1.0" fill="#334155" />
        <circle cx="230" cy="210" r="1.5" fill="#475569" />
        <circle cx="240" cy="190" r="2.0" fill="#334155" />

        {/* The Cyber Storefront/Desk isometric structure */}
        <g id="retro-isometric-desk">
          {/* Base Floor Plate */}
          <path d="M 40 230 L 240 230 L 210 245 L 70 245 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />

          {/* Desk Table Body */}
          <rect x="50" y="170" width="180" height="10" fill="#0c101b" stroke="#334155" strokeWidth="1.5" rx="2" />
          {/* Desk Drawer block */}
          <rect x="65" y="180" width="35" height="42" fill="#090d16" stroke="#1e293b" strokeWidth="1.2" />
          <line x1="65" y1="194" x2="100" y2="194" stroke="#1e293b" strokeWidth="1.2" />
          <line x1="65" y1="208" x2="100" y2="208" stroke="#1e293b" strokeWidth="1.2" />
          {/* Little metal knobs */}
          <circle cx="82.5" cy="187" r="1.2" fill="#475569" />
          <circle cx="82.5" cy="201" r="1.2" fill="#475569" />
          <circle cx="82.5" cy="215" r="1.2" fill="#475569" />

          {/* Table Legs */}
          <line x1="215" y1="180" x2="215" y2="228" stroke="#334155" strokeWidth="1.8" />
          <line x1="220" y1="180" x2="220" y2="228" stroke="#1e293b" strokeWidth="1.2" />

          {/* Retro CPU Tower on desk */}
          <g id="retro-cpu">
            <rect x="180" y="100" width="30" height="70" fill="#0e1320" stroke="#334155" strokeWidth="1.5" rx="3" />
            {/* Floppy Drives and grids */}
            <rect x="185" y="106" width="20" height="3" fill="#070a10" stroke="#1e293b" strokeWidth="0.8" />
            <rect x="185" y="112" width="20" height="3" fill="#070a10" stroke="#1e293b" strokeWidth="0.8" />
            {/* Power grid dither panel */}
            <rect x="185" y="125" width="20" height="24" fill="url(#diagonal-hash)" stroke="#1e293b" strokeWidth="1" />
            {/* Tiny green glowing micro LEDs */}
            <circle cx="189" cy="158" r="1.2" fill="#10b981" />
            <motion.circle
              cx="195"
              cy="158"
              r="1.2"
              fill={glowHex}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </g>

          {/* Large Retro Display Monitor */}
          <g id="old-crt-monitor">
            {/* Base stand */}
            <path d="M 125 170 L 145 170 L 149 158 L 121 158 Z" fill="#0d111c" stroke="#334155" strokeWidth="1.2" />

            {/* CRT Outer Bezel */}
            <rect x="90" y="70" width="75" height="88" fill="#0d111c" stroke="#334155" strokeWidth="1.8" rx="6" />
            {/* Inner frame */}
            <rect x="95" y="75" width="65" height="54" fill="#060912" stroke="#1e293b" strokeWidth="1.2" rx="3" />

            {/* CRT Screen Dither Background */}
            <rect x="97" y="77" width="61" height="50" fill="url(#dither-dense)" rx="2" />

            {/* Radiant Code lines simulated */}
            <line x1="102" y1="84" x2="135" y2="84" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="102" y1="90" x2="148" y2="90" stroke={glowHex} strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" />
            <line x1="102" y1="96" x2="120" y2="96" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="102" y1="102" x2="142" y2="102" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="102" y1="108" x2="152" y2="108" stroke={glowHex} strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round" />
            <line x1="102" y1="114" x2="128" y2="114" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />

            {/* Glowing bezel indicator */}
            <motion.circle
              cx="156"
              cy="140"
              r="1.2"
              fill={glowHex}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            {/* Dial controls */}
            <circle cx="102" cy="140" r="2" fill="#1e293b" />
            <circle cx="110" cy="140" r="2" fill="#1e293b" />
          </g>

          {/* Coffee Mug on desk with rising steam */}
          <g id="warm-coffee-cup">
            <path d="M 72 162 L 78 162 L 78 170 L 72 170 Z" fill="#090c12" stroke="#475569" strokeWidth="1" />
            {/* Handle */}
            <path d="M 78 164 C 81 164 81 168 78 168" stroke="#475569" strokeWidth="0.8" />
            {/* Animated rising steam lines */}
            <motion.path
              d="M 73.5 159 Q 72 153 74 148"
              stroke="#475569"
              strokeWidth="0.8"
              strokeLinecap="round"
              animate={{ y: [0, -3, 0], opacity: [0.1, 0.8, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />
            <motion.path
              d="M 76.5 159 Q 78 154 76 149"
              stroke="#475569"
              strokeWidth="0.8"
              strokeLinecap="round"
              animate={{ y: [0, -4, 0], opacity: [0.1, 0.7, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.6, delay: 0.3 }}
            />
          </g>

          {/* Custom Mechanical Keyboard */}
          <g id="cyber-keyboard">
            <rect x="94" y="160" width="38" height="6" fill="#0a0d16" stroke="#475569" strokeWidth="1.2" rx="1.5" />
            {/* Glowing layout */}
            <line x1="97" y1="163" x2="129" y2="163" stroke={glowHex} strokeWidth="1.2" strokeOpacity="0.7" strokeDasharray="2 1" />
          </g>

          {/* Modern Desk Plant */}
          <g id="desk-plant">
            <path d="M 218 170 C 220 162 216 156 220 152 C 223 156 221 162 222 170" fill="#10b981" fillOpacity="0.8" />
            <path d="M 224 170 C 228 164 228 158 231 154 C 230 160 227 165 226 170" fill="#10b981" fillOpacity="0.6" />
            {/* Pot */}
            <path d="M 216 170 L 228 170 L 225 180 L 219 180 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          </g>

          {/* Sleek Desk Lamp casting golden light cone */}
          <g id="desk-lamp">
            <path d="M 54 170 L 58 170 L 56 120" stroke="#334155" strokeWidth="1.5" />
            <path d="M 56 120 L 74 125" stroke="#334155" strokeWidth="1.5" />
            {/* Lamb shade */}
            <path d="M 70 120 L 82 124 L 78 132 L 66 128 Z" fill="#0d111c" stroke="#475569" strokeWidth="1.2" />

            {/* Glowing Light Cone - SVG gradient / opacity */}
            <polygon
              points="74,130 150,170 110,170"
              fill={glowHex}
              fillOpacity="0.08"
              className="pointer-events-none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
