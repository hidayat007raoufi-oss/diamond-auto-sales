/**
 * Custom faceted-crystal hero scene — original generative geometry (no logo,
 * no stock art). A triangulated crystal surface lit from the upper right, in
 * deep navy → metallic silver, with a slow refraction sweep. Deterministic so
 * SSR and client render identically.
 */
function rnd(a: number, b: number) {
  const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export default function CrystalScene({ className = "" }: { className?: string }) {
  const W = 1200;
  const H = 820;
  const COLS = 7;
  const ROWS = 6;
  const lx = W * 0.82;
  const ly = H * 0.06;
  const maxD = Math.hypot(W, H);

  const pts: { x: number; y: number }[][] = [];
  for (let r = 0; r <= ROWS; r++) {
    pts[r] = [];
    for (let c = 0; c <= COLS; c++) {
      const edge = c === 0 || c === COLS || r === 0 || r === ROWS;
      const jx = edge ? 0 : (rnd(r + 1, c + 1) - 0.5) * 150;
      const jy = edge ? 0 : (rnd(c + 3, r + 7) - 0.5) * 135;
      pts[r][c] = { x: (c / COLS) * W + jx, y: (r / ROWS) * H + jy };
    }
  }

  const tris: { d: string; b: number; v: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const quad = [
        [pts[r][c], pts[r][c + 1], pts[r + 1][c]],
        [pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]],
      ];
      quad.forEach((t, k) => {
        const cx = (t[0].x + t[1].x + t[2].x) / 3;
        const cy = (t[0].y + t[1].y + t[2].y) / 3;
        const dist = Math.hypot(cx - lx, cy - ly) / maxD;
        const b = Math.max(0, 1 - dist * 1.5);
        tris.push({
          d: `M${t[0].x.toFixed(1)} ${t[0].y.toFixed(1)}L${t[1].x.toFixed(1)} ${t[1].y.toFixed(1)}L${t[2].x.toFixed(1)} ${t[2].y.toFixed(1)}Z`,
          b,
          v: rnd(r * 2 + k, c * 3 + k),
        });
      });
    }
  }

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1200 820" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {tris.map((t, i) => {
          const b = Math.min(1, t.b + (t.v - 0.5) * 0.12);
          const R = Math.round(14 + (198 - 14) * b);
          const G = Math.round(20 + (206 - 20) * b);
          const B = Math.round(30 + (216 - 30) * b);
          const op = (0.16 + 0.6 * b).toFixed(2);
          return (
            <path
              key={i}
              d={t.d}
              fill={`rgba(${R},${G},${B},${op})`}
              stroke="rgba(255,255,255,0.055)"
              strokeWidth="0.7"
            />
          );
        })}
        {/* a few luminous refraction edges near the light */}
        {tris
          .filter((t) => t.b > 0.82)
          .slice(0, 6)
          .map((t, i) => (
            <path key={`e${i}`} d={t.d} fill="none" stroke="rgba(200,222,255,0.4)" strokeWidth="1" />
          ))}
      </svg>

      {/* moving refraction sweep */}
      <div className="crystal-sweep absolute inset-0" />
      {/* legibility: soft vertical + center scrim so centered copy reads cleanly */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.72))]" />
      <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_52%,rgba(0,0,0,0.55),transparent_72%)]" />
    </div>
  );
}
