// SMS v2 — patterns + icons + logo

const StarPattern = ({ id = "star-pattern", color = "#B8962E", scale = 64 }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width={scale} height={scale} patternUnits="userSpaceOnUse">
        <g stroke={color} strokeWidth="0.5" fill="none" opacity="0.9">
          <polygon points={`${scale/2},4 ${scale/2+5},${scale/2-5} ${scale-4},${scale/2} ${scale/2+5},${scale/2+5} ${scale/2},${scale-4} ${scale/2-5},${scale/2+5} 4,${scale/2} ${scale/2-5},${scale/2-5}`} />
          <rect x={scale/2 - 10} y={scale/2 - 10} width="20" height="20" transform={`rotate(45 ${scale/2} ${scale/2})`} />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const DotPattern = ({ id = "dot-pat", color = "#1B6B8A" }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill={color} opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

// Wordmark-style logo: dome silhouette + minaret marker
const Logo = ({ size = 24, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g fill={color}>
      <path d="M12 2 L12 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="1.2"/>
      <path d="M4 20 L4 12 Q4 6 12 6 Q20 6 20 12 L20 20 Z" opacity="0.95"/>
      <rect x="4" y="20" width="16" height="2" rx="0.5"/>
      <rect x="10.5" y="14" width="3" height="6" fill="#0E3D52"/>
      <path d="M10.5 14 Q12 12.5 13.5 14" fill="#0E3D52"/>
    </g>
  </svg>
);

const Icon = {
  Sunrise: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 18h18M5.5 14a6.5 6.5 0 0 1 13 0M12 3v3M5 6l2 2M19 6l-2 2M2 11h2M20 11h2"/></svg>,
  Sun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>,
  CloudSun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M15 7a5 5 0 0 0-4.9 4M19 7l1-1M17 4v-1.5M14 4l-.7-1M21 11h1.5M19 14a4 4 0 0 0-4-4H7a5 5 0 1 0-1 9.9"/><path d="M19 14a4 4 0 0 1 0 7H7"/></svg>,
  Sunset: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 18h18M5.5 14a6.5 6.5 0 0 1 13 0M12 9V3M9 6l3 3 3-3M2 11h2M20 11h2"/></svg>,
  Moon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  Clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  Calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Book: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M4 4h11a4 4 0 0 1 4 4v13H7a3 3 0 0 1-3-3z"/><path d="M19 17H7a3 3 0 0 0-3 3"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>,
  Megaphone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11v2a3 3 0 0 0 3 3l3 5h2l-1-5h3l6 4V4l-6 4H6a3 3 0 0 0-3 3z"/></svg>,
  Users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 20a5 5 0 0 1 6-1"/></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Phone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9V20a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3.1a2 2 0 0 1 2 1.7l.6 3.3a2 2 0 0 1-.6 1.9L7.9 10.2a16 16 0 0 0 5.9 5.9l1.3-1.3a2 2 0 0 1 1.9-.6l3.3.6a2 2 0 0 1 1.7 2z"/></svg>,
  Mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ChevronRight: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  ChevronLeft: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  HandHeart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 14h2a2 2 0 0 0 0-4h-3.5L7 12 4 9l-2 2 5 5 6 5 9-9a3 3 0 0 0-4-4l-2 2"/></svg>,
  Download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></svg>,
  Twitter: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 5.8a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1A4.2 4.2 0 0 0 11 9.2a12 12 0 0 1-8.7-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5A4.2 4.2 0 0 0 5 14a4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 18.7 12 12 0 0 0 8.5 21c7.8 0 12-6.4 12-12v-.5A8.5 8.5 0 0 0 22 5.8z"/></svg>,
  Facebook: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12a10 10 0 1 0-11.6 9.9V15h-2.5v-3h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 3h-2.3v6.9A10 10 0 0 0 22 12z"/></svg>,
  Instagram: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  Youtube: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21.6 7.2A2.5 2.5 0 0 0 19.8 5.4C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8zM10 15V9l5 3-5 3z"/></svg>,
  Live: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M16 8a5.5 5.5 0 0 1 0 8M8 8a5.5 5.5 0 0 0 0 8M19 5a10 10 0 0 1 0 14M5 5a10 10 0 0 0 0 14"/></svg>,
  Bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M6 8a6 6 0 0 1 12 0v4l2 3H4l2-3V8z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>,
  Mosque: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 21V12a9 9 0 0 1 18 0v9M12 6V3M3 21h18M8 21v-5h8v5M12 9v3"/></svg>,
};

Object.assign(window, { StarPattern, DotPattern, Logo, Icon });
