"use client";

import { useRef, useState } from "react";

/**
 * Floating holographic wireframe vehicle — original glowing line-art that
 * hovers in space, drifts, and tilts toward the cursor/touch. No image, no
 * card, no box. Pure SVG + CSS.
 */
type Car = { body: string; glass: string; wheels: [number, number]; r: number };

const CARS: Record<string, Car> = {
  suv: {
    body: "M12 100 L16 82 Q18 70 32 68 L60 64 L72 42 Q76 36 88 36 L158 36 Q174 38 180 62 L202 80 Q210 82 210 96 L210 104 L12 104",
    glass: "M80 48 L88 42 L154 42 Q166 44 170 60 L84 60 Z",
    wheels: [58, 170],
    r: 17,
  },
  sedan: {
    body: "M12 100 L18 86 Q22 78 34 76 L70 72 Q82 56 110 54 L150 54 Q172 56 182 72 L200 82 Q208 84 208 96 L208 104 L12 104",
    glass: "M80 72 Q90 58 110 57 L146 57 Q166 59 174 72 L150 70 L100 70 Z",
    wheels: [60, 168],
    r: 15,
  },
  coupe: {
    body: "M10 102 L14 94 L42 88 Q64 70 100 66 L152 64 Q182 66 200 84 L210 94 L210 104 L10 104",
    glass: "M72 72 Q94 60 122 60 L150 62 Q168 66 176 78 L100 76 Z",
    wheels: [58, 170],
    r: 16,
  },
  performance: {
    body: "M8 104 L12 96 L40 90 Q62 70 100 66 L156 64 Q188 66 206 86 L212 96 L212 104 L8 104",
    glass: "M70 72 Q94 58 124 58 L154 60 Q172 64 180 78 L100 76 Z",
    wheels: [56, 172],
    r: 16,
  },
  luxury: {
    body: "M10 100 L16 88 Q22 80 36 78 L74 74 Q88 60 116 58 L158 58 Q182 60 192 74 L208 84 Q214 86 214 96 L214 104 L10 104",
    glass: "M82 74 Q92 60 116 59 L152 59 Q172 61 180 74 L156 72 L104 72 Z",
    wheels: [60, 172],
    r: 15,
  },
};

function Wire({ car }: { car: Car }) {
  return (
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d={car.body} />
      <path d={car.glass} />
      <line x1="20" y1="104" x2="204" y2="104" strokeOpacity="0.5" />
      {car.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="104" r={car.r} />
          <circle cx={cx} cy="104" r={car.r - 6} strokeOpacity="0.7" />
        </g>
      ))}
    </g>
  );
}

export default function HologramVehicle({ kind, className = "" }: { kind: string; className?: string }) {
  const car = CARS[kind] ?? CARS.coupe;
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 16 });
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
      className={`relative aspect-[16/9] w-full select-none ${className}`}
      style={{ perspective: "1100px" }}
    >
      {/* suspended glow + light floor */}
      <div aria-hidden className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(150,195,255,0.16),transparent_66%)] blur-2xl" />
      <div aria-hidden className="absolute bottom-[14%] left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[rgba(170,205,255,0.55)] to-transparent" />
      <div aria-hidden className="absolute bottom-[8%] left-1/3 right-1/3 h-10 rounded-[50%] bg-[radial-gradient(ellipse,rgba(120,170,255,0.18),transparent_70%)] blur-md" />

      <div
        className="floaty-soft h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        <svg
          viewBox="0 0 220 130"
          className="h-full w-full"
          style={{ filter: "drop-shadow(0 0 6px rgba(150,200,255,0.45))" }}
        >
          {/* extruded depth copy */}
          <g transform="translate(15 -11)" stroke="rgba(150,195,255,0.22)" strokeWidth="1">
            <Wire car={car} />
          </g>
          {/* main wireframe */}
          <g stroke="rgba(206,228,255,0.9)" strokeWidth="1.25">
            <Wire car={car} />
          </g>
        </svg>
        {/* faint hologram scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-screen"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(160,200,255,0.18) 0 1px, transparent 1px 5px)" }}
        />
      </div>
    </div>
  );
}
