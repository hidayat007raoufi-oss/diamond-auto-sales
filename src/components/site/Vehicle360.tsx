"use client";

import { useRef, useState } from "react";

/**
 * Premium 360° spin viewer. Drag left/right (mouse or touch) to rotate through
 * an ordered set of frames. Ready for future 360° image sets — pass `frames`.
 */
export default function Vehicle360({
  frames,
  alt = "360° vehicle view",
}: {
  frames: string[];
  alt?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; idx: number } | null>(null);

  const begin = (x: number) => {
    start.current = { x, idx: index };
    setDragging(true);
  };
  const move = (x: number) => {
    if (!start.current) return;
    const n = frames.length;
    const width = wrap.current?.clientWidth ?? 600;
    // One full-width drag = one full rotation, regardless of frame count.
    const step = Math.round(((x - start.current.x) / width) * n);
    setIndex((((start.current.idx + step) % n) + n) % n);
  };
  const end = () => {
    start.current = null;
    setDragging(false);
  };

  return (
    <div
      ref={wrap}
      className={`relative aspect-[4/3] touch-none select-none overflow-hidden rounded-3xl border border-line bg-surface ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        begin(e.clientX);
      }}
      onPointerMove={(e) => move(e.clientX)}
      onPointerUp={end}
      onPointerLeave={end}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frames[index]}
        alt={alt}
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain p-2"
      />

      <span className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-line bg-black/45 px-3 py-1 text-[11px] font-medium tracking-widest text-white/85 backdrop-blur">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12a9 9 0 11-3-6.7M21 4v4h-4" />
        </svg>
        360°
      </span>

      <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-line bg-black/45 px-3 py-1 text-[11px] text-white/70 backdrop-blur">
        Drag to rotate
      </span>
    </div>
  );
}
