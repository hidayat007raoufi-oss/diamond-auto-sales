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
        </defs>

        {/* gem body */}
        <path d="M12 6 H28 L37 16 L20 37 L3 16 Z" fill="url(#dl-gem)" />

        {/* facets */}
        <g stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.6" fill="none" strokeLinejoin="round">
          <path d="M3 16 H37" />
          <path d="M12 6 L12 16 M28 6 L28 16" />
          <path d="M12 6 L20 16 L28 6" />
          <path d="M20 16 V37 M3 16 L20 37 M37 16 L20 37 M12 16 L20 37 M28 16 L20 37" />
        </g>
      </svg>
    </span>
  );
}
