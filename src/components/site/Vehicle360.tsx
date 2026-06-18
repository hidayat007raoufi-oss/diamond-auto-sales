"use client";

import { useRef, useState } from "react";

export type Hotspot = {
  /** frame index this hotspot is relevant to */
  frame: number;
  /** gallery category to open */
  label: string;
  /** position within the viewer */
  x: string;
  y: string;
  /** short caption */
  caption: string;
};

/**
 * Premium 360° spin viewer. Drag (mouse/touch) to rotate. Angle-aware
 * hotspots appear only on the relevant frame and open the matching gallery
 * category via a window event.
 */
export default function Vehicle360({
  frames,
  alt = "360° vehicle view",
  hotspots = [],
}: {
  frames: string[];
  alt?: string;
  hotspots?: Hotspot[];
}) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; idx: number } | null>(null);

  const move = (x: number) => {
    if (!start.current) return;
    const n = frames.length;
    const width = wrap.current?.clientWidth ?? 600;
    const step = Math.round(((x - start.current.x) / width) * n);
    setIndex((((start.current.idx + step) % n) + n) % n);
  };

  const active = hotspots.filter((h) => h.frame === index);

  return (
    <div
      ref={wrap}
      className={`relative aspect-[4/3] touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        start.current = { x: e.clientX, idx: index };
        setDragging(true);
      }}
      onPointerMove={(e) => move(e.clientX)}
      onPointerUp={() => {
        start.current = null;
        setDragging(false);
      }}
      onPointerLeave={() => {
        start.current = null;
        setDragging(false);
      }}
      role="img"
      aria-label={alt}
    >
      {/* studio ground shadow */}
      <div className="pointer-events-none absolute inset-x-[14%] bottom-[10%] h-7 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.55),transparent_70%)] blur-md" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frames[index]} alt={alt} draggable={false} className="absolute inset-0 h-full w-full object-contain p-2" />

      {/* angle-aware hotspots */}
      {active.map((h) => (
        <button
          key={h.label}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent("diamond:gallery-open", { detail: { label: h.label } }));
          }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: h.x, top: h.y }}
          aria-label={`View ${h.caption}`}
        >
          <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-accent/50" />
          <span className="relative block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(41,151,255,0.9)]" />
          <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-black/60 px-2.5 py-1 text-[10px] tracking-widest text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            {h.caption}
          </span>
        </button>
      ))}

      <span className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-line bg-black/45 px-3 py-1 text-[11px] font-medium tracking-widest text-white/85 backdrop-blur">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12a9 9 0 11-3-6.7M21 4v4h-4" />
        </svg>
        360°
      </span>
      <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-line bg-black/45 px-3 py-1 text-[11px] text-white/70 backdrop-blur">
        Drag to rotate{hotspots.length ? " · tap the markers" : ""}
      </span>
    </div>
  );
}
