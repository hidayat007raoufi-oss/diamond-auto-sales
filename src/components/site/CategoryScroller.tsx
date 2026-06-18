import Link from "next/link";

/** Original silhouette illustrations (viewBox 0 0 220 130, ground ~104). */
function Art({ kind }: { kind: string }) {
  const wheel = (cx: number, r = 15) => (
    <>
      <circle cx={cx} cy={104} r={r} fill="#0b0c0e" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
      <circle cx={cx} cy={104} r={r - 7} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
    </>
  );
  const body = (d: string, glass?: string, wheels: [number, number] = [60, 168], r = 15) => (
    <>
      <ellipse cx="110" cy="112" rx="96" ry="7" fill="rgba(0,0,0,0.5)" />
      <path d={d} fill="url(#catMetal)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeLinejoin="round" />
      {glass && <path d={glass} fill="rgba(10,14,20,0.9)" />}
      {wheel(wheels[0], r)}
      {wheel(wheels[1], r)}
    </>
  );

  switch (kind) {
    case "suv":
      return body(
        "M12 100 L16 82 Q18 70 32 68 L60 64 L72 42 Q76 36 88 36 L158 36 Q174 38 180 62 L202 80 Q210 82 210 96 L210 104 L12 104 Z",
        "M80 48 L88 42 L154 42 Q166 44 170 60 L84 60 Z",
        [58, 170],
        16
      );
    case "truck":
      return body(
        "M12 104 L12 84 L22 82 L40 82 L52 50 Q56 44 68 44 L104 44 Q116 44 120 58 L126 82 L210 82 L210 104 Z",
        "M58 56 L66 48 L100 48 Q110 48 112 58 L60 58 Z",
        [52, 176]
      );
    case "performance":
      return body(
        "M10 102 L14 94 L42 88 Q64 70 100 66 L152 64 Q182 66 200 84 L210 94 L210 104 L10 104 Z",
        "M72 72 Q94 60 122 60 L150 62 Q168 66 176 78 L100 76 Z",
        [58, 170]
      );
    case "luxury":
      return body(
        "M10 100 L16 88 Q22 80 36 78 L74 74 Q88 60 116 58 L158 58 Q182 60 192 74 L208 84 Q214 86 214 96 L214 104 L10 104 Z",
        "M82 74 Q92 60 116 59 L152 59 Q172 61 180 74 L156 72 L104 72 Z",
        [60, 172]
      );
    case "sedan":
      return body(
        "M12 100 L18 86 Q22 78 34 76 L70 72 Q82 56 110 54 L150 54 Q172 56 182 72 L200 82 Q208 84 208 96 L208 104 L12 104 Z",
        "M80 72 Q90 58 110 57 L146 57 Q166 59 174 72 L150 70 L100 70 Z",
        [60, 168]
      );
    case "tag":
      return (
        <>
          <path d="M118 34 L186 34 L186 102 L143 145 L100 102 L100 52 Z" transform="rotate(-12 143 90)" fill="url(#catMetal)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <circle cx="118" cy="58" r="6" fill="#0b0c0e" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <text x="138" y="100" fontSize="34" fontWeight="700" fill="#0b0c0e" textAnchor="middle">$</text>
        </>
      );
    case "card":
      return (
        <>
          <rect x="34" y="44" width="152" height="92" rx="10" fill="url(#catMetal)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <rect x="34" y="60" width="152" height="16" fill="#0b0c0e" />
          <rect x="46" y="104" width="44" height="8" rx="2" fill="rgba(11,12,14,0.7)" />
          <rect x="100" y="104" width="28" height="8" rx="2" fill="rgba(11,12,14,0.5)" />
        </>
      );
    default:
      return null;
  }
}

const categories = [
  { label: "SUVs", kind: "suv", href: "/inventory?body=SUV" },
  { label: "Sedans", kind: "sedan", href: "/inventory?body=Sedan" },
  { label: "Trucks", kind: "truck", href: "/inventory?body=Truck" },
  { label: "Luxury", kind: "luxury", href: "/inventory" },
  { label: "Performance", kind: "performance", href: "/inventory" },
  { label: "Under $25k", kind: "tag", href: "/inventory?price=Under $50k" },
  { label: "Financing", kind: "card", href: "/financing" },
];

export default function CategoryScroller() {
  return (
    <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
      {/* shared metallic gradient */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="catMetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dfe4ea" />
            <stop offset="0.5" stopColor="#9aa3af" />
            <stop offset="1" stopColor="#3a3f48" />
          </linearGradient>
        </defs>
      </svg>

      {categories.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group relative w-[160px] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:w-auto sm:flex-1"
        >
          <div className="relative aspect-[5/4] overflow-hidden bg-[radial-gradient(80%_70%_at_50%_30%,#202329,#0c0d10)]">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_18%,rgba(255,255,255,0.07),transparent_70%)]" />
            <svg viewBox="0 0 220 130" className="absolute inset-0 h-full w-full p-3 transition-transform duration-500 group-hover:scale-105">
              <Art kind={c.kind} />
            </svg>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm font-semibold text-white">{c.label}</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-mute transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
