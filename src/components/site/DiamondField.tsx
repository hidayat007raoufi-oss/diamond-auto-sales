/**
 * Decorative diamond field — slow glints + drifting diamond particles.
 * Pure CSS animations (see globals.css), GPU-friendly, pointer-events-none.
 */
const glints = [
  { left: "12%", top: "22%", size: 8, dur: 6, max: 0.55, delay: 0 },
  { left: "84%", top: "18%", size: 6, dur: 7.5, max: 0.45, delay: 1.2 },
  { left: "68%", top: "40%", size: 5, dur: 8, max: 0.4, delay: 2.1 },
  { left: "26%", top: "62%", size: 7, dur: 6.8, max: 0.5, delay: 0.6 },
  { left: "48%", top: "14%", size: 5, dur: 9, max: 0.4, delay: 3 },
  { left: "92%", top: "60%", size: 6, dur: 7, max: 0.45, delay: 1.8 },
  { left: "6%", top: "48%", size: 5, dur: 8.5, max: 0.4, delay: 2.6 },
  { left: "58%", top: "74%", size: 7, dur: 6.4, max: 0.5, delay: 0.9 },
];

const particles = [
  { left: "18%", size: 5, dur: 17, max: 0.3, delay: 0 },
  { left: "38%", size: 4, dur: 21, max: 0.25, delay: 4 },
  { left: "55%", size: 6, dur: 15, max: 0.3, delay: 2 },
  { left: "72%", size: 4, dur: 19, max: 0.22, delay: 6 },
  { left: "88%", size: 5, dur: 23, max: 0.28, delay: 1 },
];

export default function DiamondField({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {glints.map((g, i) => (
        <span
          key={`g${i}`}
          className="glint"
          style={{
            left: g.left,
            top: g.top,
            width: g.size,
            height: g.size,
            ["--glint-dur" as string]: `${g.dur}s`,
            ["--glint-max" as string]: g.max,
            animationDelay: `${g.delay}s`,
          }}
        />
      ))}
      {particles.map((p, i) => (
        <span
          key={`p${i}`}
          className="particle"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            ["--p-dur" as string]: `${p.dur}s`,
            ["--p-max" as string]: p.max,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
