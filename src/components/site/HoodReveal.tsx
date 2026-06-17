"use client";

import { useState } from "react";

/**
 * Tap the front of the car to "open the hood" — the front view hinges up from
 * the top while the engine bay fades in behind it. Tap again to close.
 */
export default function HoodReveal({
  front,
  engineBay,
  alt,
}: {
  front: string;
  engineBay: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      aria-label={open ? "Close hood" : "Open hood to view engine bay"}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-surface"
      style={{ perspective: "1200px" }}
    >
      {/* engine bay — revealed underneath */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={engineBay}
        alt={`${alt} engine bay`}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
          open ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      />

      {/* front of car — the "hood" that lifts */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={front}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain p-2"
        style={{
          transformOrigin: "top center",
          transform: open ? "rotateX(-82deg) translateY(-8%)" : "rotateX(0deg)",
          opacity: open ? 0.2 : 1,
          transition:
            "transform 0.95s cubic-bezier(0.16,1,0.3,1), opacity 0.95s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-line bg-black/55 px-4 py-1.5 text-[11px] font-medium tracking-widest text-white/85 backdrop-blur">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 13l2-5h11l3 3h2v4M3 13v3h2M19 13v3h-2M7 16a2 2 0 104 0M15 16a2 2 0 104 0" />
        </svg>
        {open ? "Tap to close hood" : "Tap to open hood"}
      </span>
    </button>
  );
}
