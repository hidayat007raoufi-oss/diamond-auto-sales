/**
 * Original hero centerpiece — a faceted crystal sculpture set inside slowly
 * rotating telemetry rings (precision-engineering / motorsport HUD aesthetic).
 * 100% generated (SVG + CSS). No logo, no stock art, no inventory photo.
 */
const C = 160;

const ticks = Array.from({ length: 48 }, (_, i) => {
  const a = (i / 48) * Math.PI * 2;
  const big = i % 4 === 0;
  const r1 = 150;
  const r2 = big ? 138 : 144;
  return {
    x1: C + Math.cos(a) * r1,
    y1: C + Math.sin(a) * r1,
    x2: C + Math.cos(a) * r2,
    y2: C + Math.sin(a) * r2,
    big,
  };
});

// faceted crystal — kite silhouette with girdle + crown/pavilion facets
const T = "160,74";
const B = "160,254";
const L = "92,168";
const R = "228,168";
const G1 = "126,168";
const G2 = "194,168";
const facets: { p: string; fill: string; op: number }[] = [
  { p: `${T} ${L} ${G1}`, fill: "url(#cg)", op: 0.4 },
  { p: `${T} ${G1} ${G2}`, fill: "url(#cg)", op: 0.62 },
  { p: `${T} ${G2} ${R}`, fill: "url(#cg)", op: 0.92 },
  { p: `${B} ${L} ${G1}`, fill: "url(#cg)", op: 0.24 },
  { p: `${B} ${G1} ${G2}`, fill: "url(#cg)", op: 0.34 },
  { p: `${B} ${G2} ${R}`, fill: "url(#cg)", op: 0.5 },
];

export default function HeroCenterpiece({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-[250px] sm:w-[320px] ${className}`}>
      {/* aura */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(60,110,210,0.3),transparent_62%)] blur-2xl"
      />

      {/* telemetry ring — ticks */}
      <svg viewBox="0 0 320 320" className="spin-slow absolute inset-0 h-full w-full">
        <circle cx={C} cy={C} r="150" fill="none" stroke="rgba(108,182,255,0.16)" strokeWidth="1" strokeDasharray="2 9" />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.big ? "rgba(201,204,209,0.5)" : "rgba(201,204,209,0.2)"}
            strokeWidth={t.big ? 1.2 : 0.8}
          />
        ))}
      </svg>

      {/* inner telemetry ring — counter-rotating */}
      <svg viewBox="0 0 320 320" className="spin-rev absolute inset-0 h-full w-full">
        <circle cx={C} cy={C} r="122" fill="none" stroke="rgba(201,204,209,0.14)" strokeWidth="1" strokeDasharray="1 7" />
        <path d="M40 160 a120 120 0 0 1 60 -104" fill="none" stroke="rgba(108,182,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M280 160 a120 120 0 0 1 -60 104" fill="none" stroke="rgba(108,182,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* faceted crystal */}
      <div className="floaty-soft absolute inset-0">
        <svg viewBox="0 0 320 320" className="h-full w-full">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0" stopColor="#dfe6ee" />
              <stop offset="0.5" stopColor="#6f8bb5" />
              <stop offset="1" stopColor="#15233f" />
            </linearGradient>
          </defs>
          {facets.map((f, i) => (
            <polygon key={i} points={f.p} fill={f.fill} fillOpacity={f.op} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinejoin="round" />
          ))}
          {/* luminous refraction edges */}
          <polyline points={`${T} ${G2} ${R}`} fill="none" stroke="rgba(200,224,255,0.7)" strokeWidth="1.2" strokeLinejoin="round" />
          <line x1="160" y1="74" x2="160" y2="254" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" />
        </svg>
      </div>
    </div>
  );
}
