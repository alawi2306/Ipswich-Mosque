// Suffolk Muslim Society — geometric pattern + icon components

const StarPattern = ({ id = "star-pattern", color = "#B8962E", scale = 80 }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width={scale} height={scale} patternUnits="userSpaceOnUse">
        <g stroke={color} strokeWidth="0.8" fill="none">
          {/* 8-fold star */}
          <polygon points={`${scale/2},6 ${scale/2+6},${scale/2-6} ${scale-6},${scale/2} ${scale/2+6},${scale/2+6} ${scale/2},${scale-6} ${scale/2-6},${scale/2+6} 6,${scale/2} ${scale/2-6},${scale/2-6}`} />
          <rect x={scale/2 - 14} y={scale/2 - 14} width="28" height="28" transform={`rotate(45 ${scale/2} ${scale/2})`} />
          <rect x={scale/2 - 14} y={scale/2 - 14} width="28" height="28" />
          {/* corner connectors */}
          <line x1="0" y1="0" x2={scale/4} y2={scale/4} />
          <line x1={scale} y1="0" x2={3*scale/4} y2={scale/4} />
          <line x1="0" y1={scale} x2={scale/4} y2={3*scale/4} />
          <line x1={scale} y1={scale} x2={3*scale/4} y2={3*scale/4} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const ArchPattern = ({ id = "arch-pattern", color = "#0F3D52" }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="0.6">
          <path d="M 0 60 Q 0 30 30 30 Q 60 30 60 60" />
          <path d="M 30 60 Q 30 45 45 45 Q 60 45 60 60" />
          <circle cx="30" cy="30" r="3" fill={color} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const Logo = ({ size = 48, color = "#1B6B8A", accent = "#B8962E" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    {/* Mihrab arch silhouette with star */}
    <g>
      <path d="M 8 42 L 8 24 Q 8 8 24 8 Q 40 8 40 24 L 40 42 Z" fill={color} />
      <g transform="translate(24, 22)">
        <polygon
          points="0,-9 3,-3 9,-3 4,1 6,7 0,4 -6,7 -4,1 -9,-3 -3,-3"
          fill={accent}
        />
      </g>
      <rect x="8" y="40" width="32" height="2" fill={accent} />
    </g>
  </svg>
);

// Lucide-style icons
const Icon = {
  Clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  Calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Book: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M4 4h11a4 4 0 0 1 4 4v13H7a3 3 0 0 1-3-3V4z"/><path d="M19 17H7a3 3 0 0 0-3 3"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>,
  Megaphone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 11v2a3 3 0 0 0 3 3l3 5h2l-1-5h3l6 4V4l-6 4H6a3 3 0 0 0-3 3z"/></svg>,
  Users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 20a5 5 0 0 1 6-1"/></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Phone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M22 16.9V20a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3.1a2 2 0 0 1 2 1.7l.6 3.3a2 2 0 0 1-.6 1.9L7.9 10.2a16 16 0 0 0 5.9 5.9l1.3-1.3a2 2 0 0 1 1.9-.6l3.3.6a2 2 0 0 1 1.7 2z"/></svg>,
  Mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 7 9-7"/></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  Mosque: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 21V13a9 9 0 0 1 18 0v8M12 7v3M3 21h18M8 21v-5h8v5"/></svg>,
  HandHeart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M11 14h2a2 2 0 0 0 0-4h-3.5L7 12 4 9l-2 2 5 5 6 5 9-9a3 3 0 0 0-4-4l-2 2"/></svg>,
  Download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></svg>,
};

Object.assign(window, { StarPattern, ArchPattern, Logo, Icon });
