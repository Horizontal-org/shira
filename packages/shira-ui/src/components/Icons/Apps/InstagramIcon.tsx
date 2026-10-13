export function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram" role="img" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="instagram-icon-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="50%" stopColor="#ee2a7b" />
          <stop offset="100%" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#instagram-icon-gradient)" />
      <circle cx="16" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="8" r="1.6" fill="#fff" />
    </svg>
  )
};
export default InstagramIcon;
