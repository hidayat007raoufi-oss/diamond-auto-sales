"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * FRAME SOURCE
 * 24 high-res, dark-themed automotive photos (Unsplash) used as the
 * "scrub" sequence — drag horizontally to fly through them like Apple's
 * video-scrubbing product reveals.
 *
 * NOTE: these are PLACEHOLDER URLs. For a true 360°/turntable spin, swap
 * in a real ordered 24-frame sequence of ONE vehicle (pass via the
 * `frames` prop). The preloader below is resilient — any dead URL simply
 * settles and is skipped, so the experience never hangs or hard-breaks.
 * ------------------------------------------------------------------ */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const DEFAULT_FRAMES: string[] = [
  "1544636331-e26879cd4d9b",
  "1503376780353-7e6692767b70",
  "1617814076367-b759c7d7e738",
  "1555215695-3004980ad54e",
  "1606664515524-ed2f786a0bd6",
  "1606152421802-db97b9c7a11b",
  "1560958089-b8a1929cea89",
  "1614200179396-2bdb77ebf81b",
  "1519641471654-76ce0107ad1b",
  "1492144534655-ae79c964c9d7",
  "1502877338535-766e1452684a",
  "1583121274602-3e2820c69888",
  "1542362567-b07e54358753",
  "1503736334956-4c8f8e92946d",
  "1525609004556-c46c7d6cf023",
  "1494976388531-d1058494cdd8",
  "1552519507-da3b142c6e3d",
  "1568605117036-5fe5e7bab0b7",
  "1553440569-bcc63803a83d",
  "1511919884226-fd3cad34687c",
  "1549399542-7e3f8b79c341",
  "1605559424843-7c8757b06f81",
  "1547744152-14d985cb937f",
  "1532974297617-c0f05fe48bff",
].map(u);

const wrap = (n: number, len: number) => ((n % len) + len) % len;

type CarShowcaseProps = {
  frames?: string[];
  title?: string;
  subtitle?: string;
  className?: string;
  /**
   * Controlled mode: when provided, the rendered frame is driven externally
   * (e.g. by scroll) and internal drag/auto-rotate are disabled.
   */
  frameIndex?: number;
  /** Toggle the built-in title / hint / scrubber overlay (off when a parent supplies its own). */
  chrome?: boolean;
  /** Notifies the cached-state to a parent (e.g. to gate a scroll scene). */
  onReady?: (ready: boolean) => void;
};

export default function CarShowcase({
  frames = DEFAULT_FRAMES,
  title = "Diamond Performance",
  subtitle = "Drag to explore every angle",
  className = "",
  frameIndex,
  chrome = true,
  onReady,
}: CarShowcaseProps) {
  const total = frames.length;
  const prefersReduced = useReducedMotion();
  const controlled = frameIndex !== undefined;

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [interacted, setInteracted] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const baseIndex = useRef(0);

  const activeIndex = controlled ? wrap(frameIndex as number, total) : index;

  useEffect(() => {
    onReady?.(ready);
  }, [ready, onReady]);

  /* ---------- Pre-load / cache every frame (settle on load OR error) ---------- */
  useEffect(() => {
    let live = true;
    let settled = 0;
    // Reset progress for a fresh frame set without a synchronous setState-in-effect.
    const raf = requestAnimationFrame(() => {
      if (!live) return;
      setLoaded(0);
      setReady(false);
    });

    const bump = () => {
      if (!live) return;
      settled += 1;
      setLoaded(settled);
      if (settled >= total) setReady(true);
    };

    const imgs = frames.map((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump; // a dead URL must not stall the spinner
      img.src = src;
      return img;
    });

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frames, total]);

  /* ---------- Idle auto-rotate until the user takes over ---------- */
  useEffect(() => {
    if (controlled || !ready || interacted || prefersReduced) return;
    const id = window.setInterval(
      () => setIndex((i) => wrap(i + 1, total)),
      120
    );
    return () => window.clearInterval(id);
  }, [controlled, ready, interacted, prefersReduced, total]);

  /* ---------- Gesture: map horizontal swipe distance → frame index ---------- */
  const onPanStart = useCallback(() => {
    setInteracted(true);
    baseIndex.current = index;
  }, [index]);

  const onPan = useCallback(
    (_e: PointerEvent, info: PanInfo) => {
      const width = stageRef.current?.offsetWidth ?? 1;
      // One full swipe across the stage === one full loop through all frames.
      const pxPerFrame = width / total;
      // Drag left (negative offset) spins the car forward.
      const step = Math.round(-info.offset.x / pxPerFrame);
      setIndex(wrap(baseIndex.current + step, total));
    },
    [total]
  );

  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  return (
    <div
      className={`relative isolate overflow-hidden bg-black text-white ${className}`}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif' }}
    >
      {/* ---------- Frame stack (all preloaded; only active is visible → zero flicker) ---------- */}
      <motion.div
        ref={stageRef}
        onPanStart={controlled ? undefined : onPanStart}
        onPan={controlled ? undefined : onPan}
        className={`relative h-full w-full select-none ${
          controlled ? "" : "aspect-[16/10] cursor-grab touch-none active:cursor-grabbing"
        }`}
      >
        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt={`${title} — frame ${i + 1} of ${total}`}
            draggable={false}
            aria-hidden={i !== activeIndex}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}

        {/* cinematic vignette for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* ---------- Built-in overlay UI (drag mode) ---------- */}
        {chrome && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          {/* Title block */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
              Diamond Auto Sales
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h2>
          </div>

          {/* Bottom: hint + scrubber */}
          <div>
            <AnimatePresence>
              {!interacted && ready && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 flex items-center gap-2 text-[13px] text-white/70"
                >
                  <DragIcon />
                  {subtitle}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden bg-white/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ type: "tween", duration: 0.05 }}
                />
              </div>
              <span className="w-14 text-right font-mono text-[11px] tabular-nums tracking-widest text-white/55">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
        )}
      </motion.div>

      {/* ---------- Premium minimalist loader ---------- */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black"
          >
            <motion.span
              aria-hidden
              className="h-9 w-9 rounded-full border-2 border-white/15 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 0.9 }}
            />
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              Preparing experience
            </p>
            <p className="mt-2 font-mono text-[11px] tabular-nums tracking-widest text-white/30">
              {String(loaded).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DragIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
