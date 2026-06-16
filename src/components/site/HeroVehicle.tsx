import Image from "next/image";

/**
 * Cinematic hero vehicle stage. Pass `src` once real 4K vehicle photography
 * is available; until then a polished spotlit silhouette stands in.
 */
export default function HeroVehicle({
  src,
  alt = "Featured premium vehicle",
}: {
  src?: string;
  alt?: string;
}) {
  if (src) {
    return (
      <div className="relative aspect-[5/4] w-full overflow-hidden">
        <Image src={src} alt={alt} fill priority className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[5/4] w-full select-none"
      role="img"
      aria-label={`${alt} — hero image placeholder`}
    >
      {/* dramatic spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(58%_52%_at_54%_40%,rgba(255,255,255,0.12),transparent_66%)]" />
      <svg viewBox="0 0 480 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="hv-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a4f58" />
            <stop offset="0.45" stopColor="#1d2025" />
            <stop offset="1" stopColor="#0a0b0d" />
          </linearGradient>
          <linearGradient id="hv-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b212b" />
            <stop offset="1" stopColor="#0c0f14" />
          </linearGradient>
          <radialGradient id="hv-shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.7" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* contact shadow */}
        <ellipse cx="245" cy="184" rx="210" ry="12" fill="url(#hv-shadow)" />

        {/* body */}
        <path
          d="M28 150 L34 132 Q40 120 58 116 L84 112 Q92 96 118 90 L182 84 Q198 84 210 70 L236 50 Q248 42 276 42 L330 44 Q360 46 378 66 L398 86 L432 90 Q452 94 456 110 L458 132 L456 150 Z"
          fill="url(#hv-body)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        {/* greenhouse */}
        <path d="M212 70 L240 52 L326 50 L366 68 Z" fill="url(#hv-glass)" />
        {/* metallic highlights */}
        <path d="M236 50 Q248 42 276 42 L330 44" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" />
        <path d="M118 90 L182 84" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.3" />
        {/* minimal cool underglow */}
        <path d="M62 150 L452 150" stroke="rgba(96,165,250,0.22)" strokeWidth="1.5" />

        {/* wheels */}
        <g>
          <circle cx="120" cy="150" r="30" fill="#0a0b0d" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <circle cx="120" cy="150" r="13" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
          <circle cx="360" cy="150" r="30" fill="#0a0b0d" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <circle cx="360" cy="150" r="13" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
