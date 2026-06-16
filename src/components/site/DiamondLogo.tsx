/**
 * Animated sparkling blue diamond logo. Pure SVG + CSS/SMIL — no JS.
 * Gem gradient fill, faceted lines, a sweeping light sheen, twinkling
 * sparkles, and a pulsing blue glow (see globals.css).
 */
export default function DiamondLogo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`diamond-logo relative inline-grid place-items-center ${className}`}>
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="dl-gem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#bfe0ff" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="dl-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="dl-clip">
            <path d="M12 6 H28 L37 16 L20 37 L3 16 Z" />
          </clipPath>
        </defs>

        {/* gem body */}
        <path d="M12 6 H28 L37 16 L20 37 L3 16 Z" fill="url(#dl-gem)" />

        {/* facets */}
        <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.6" fill="none" strokeLinejoin="round">
          <path d="M3 16 H37" />
          <path d="M12 6 L12 16 M28 6 L28 16" />
          <path d="M12 6 L20 16 L28 6" />
          <path d="M20 16 V37 M3 16 L20 37 M37 16 L20 37 M12 16 L20 37 M28 16 L20 37" />
        </g>

        {/* sweeping sheen */}
        <g clipPath="url(#dl-clip)">
          <rect x="-18" y="-6" width="11" height="52" fill="url(#dl-sheen)" transform="skewX(-18)">
            <animate attributeName="x" values="-18;46" dur="3.4s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* sparkles */}
        <g fill="#eaf3ff">
          <path className="spark s1" d="M34 6 l0.8 2 2 0.8 -2 0.8 -0.8 2 -0.8 -2 -2 -0.8 2 -0.8 z" />
          <path className="spark s2" d="M6.5 12 l0.7 1.7 1.7 0.7 -1.7 0.7 -0.7 1.7 -0.7 -1.7 -1.7 -0.7 1.7 -0.7 z" />
          <path className="spark s3" d="M21 29 l0.6 1.5 1.5 0.6 -1.5 0.6 -0.6 1.5 -0.6 -1.5 -1.5 -0.6 1.5 -0.6 z" />
        </g>
      </svg>
    </span>
  );
}
