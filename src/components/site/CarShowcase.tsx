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
 * 24 dark-themed automotive photos (Unsplash) used as the "scrub"
 * sequence. Each color FINISH reuses the same base shots with a distinct
 * imgix color-grade, so selecting a finish swaps the active image array
 * for a visually different set — exactly the placeholder-array swap the
 * mechanic calls for. Drop in real per-color turntable frames anytime via
 * the `finishes` prop.
 *
 * The preloader is resilient: any dead URL simply settles and is skipped,
 * so the experience never hangs.
 * ------------------------------------------------------------------ */
const BASE_IDS = [
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
];

const u = (id: string, grade = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80${grade}`;

export type Finish = { name: string; dot: string; frames: string[] };

const DEFAULT_FINISHES: Finish[] = [
  { name: "Matte Black", dot: "#15161a", frames: BASE_IDS.map((id) => u(id, "&sat=-100&bri=-18&con=22")) },
  { name: "Alpine White", dot: "#e8e9ec", frames: BASE_IDS.map((id) => u(id, "&sat=-100&bri=16&con=-6&high=-12")) },
  { name: "Carbon Grey", dot: "#6c7177", frames: BASE_IDS.map((id) => u(id, "&sat=-70&bri=-4&con=8")) },
];

/** Neutral single set — handy for the scroll scene / controlled usage. */
export const DEFAULT_FRAMES: string[] = BASE_IDS.map((id) => u(id));

const wrap = (n: number, len: number) => ((n % len) + len) % len;

type CarShowcaseProps = {
  /** Single image set — when provided, color finishes/dots are disabled. */
  frames?: string[];
  /** Color finishes; each swaps the active image array. Defaults to 3 finishes. */
  finishes?: Finish[];
  title?: string;
  subtitle?: string;
  className?: string;
  /** Controlled mode: render this frame (e.g. scroll-driven); disables drag/auto-rotate. */
  frameIndex?: number;
  /** Toggle the built-in title / hint / scrubber / color overlay. */
  chrome?: boolean;
  onReady?: (ready: boolean) => void;
};

export default function CarShowcase({
  frames,
  finishes = DEFAULT_FINISHES,
  title = "Diamond Performance",
  subtitle = "Drag to explore every angle",
  className = "",
  frameIndex,
  chrome = true,
  onReady,
}: CarShowcaseProps) {
  // A single `frames` set overrides finishes (no color dots).
  const finishList: Finish[] = frames
    ? [{ name: "Default", dot: "#888", frames }]
    : finishes;
  const showColors = chrome && finishList.length > 1;

  const prefersReduced = useReducedMotion();
  const controlled = frameIndex !== undefined;

  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(0); // committed finish
  const [incoming, setIncoming] = useState<number | null>(null); // finish wiping in
  const [interacted, setInteracted] = useState(false);
  const [loadedSet, setLoadedSet] = useState<Set<string>>(() => new Set());
  const [ready, setReady] = useState(false); // latched true once the first finish is cached

  const stageRef = useRef<HTMLDivElement | null>(null);
  const baseIndex = useRef(0);

  const committed = finishList[color];
  const total = committed.frames.length;
  const activeIndex = controlled ? wrap(frameIndex as number, total) : index;

  /* ---------- Pre-load / cache every frame of every finish (settle on load OR error) ---------- */
  useEffect(() => {
    let live = true;
    let readyOnce = false;
    const local = new Set<string>();
    const sets = frames ? [frames] : finishes.map((f) => f.frames);
    const initial = sets[0] ?? [];
    const imgs = sets.flat().map((src) => {
      const img = new Image();
      const done = () => {
        if (!live) return;
        local.add(src);
        setLoadedSet(new Set(local));
        if (!readyOnce && initial.every((f) => local.has(f))) {
          readyOnce = true;
          setReady(true); // first finish cached → drop the spinner for good
        }
      };
      img.onload = done;
      img.onerror = done; // a dead URL must not stall the loader
      img.src = src;
      return img;
    });
    return () => {
      live = false;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frames, finishes]);

  const loadedCount = committed.frames.filter((s) => loadedSet.has(s)).length;

  /* ---------- Idle auto-rotate until the user takes over ---------- */
  useEffect(() => {
    if (controlled || !ready || interacted || prefersReduced) return;
    const id = window.setInterval(() => setIndex((i) => wrap(i + 1, total)), 120);
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
      const pxPerFrame = width / total;
      const step = Math.round(-info.offset.x / pxPerFrame);
      setIndex(wrap(baseIndex.current + step, total));
    },
    [total]
  );

  /* ---------- Color selection → clip-path wipe reveal ---------- */
  const selectColor = useCallback(
    (i: number) => {
      if (i === color || incoming !== null) return;
      setInteracted(true);
      setIncoming(i);
    },
    [color, incoming]
  );

  const finishReveal = useCallback((i: number) => {
    setColor(i);
    setIncoming(null);
  }, []);

  useEffect(() => {
    onReady?.(ready);
  }, [ready, onReady]);

  const dotActive = incoming ?? color;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  return (
    <div
      className={`relative isolate overflow-hidden bg-black text-white ${className}`}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif' }}
    >
      {/* ---------- Stage ---------- */}
      <motion.div
        ref={stageRef}
        onPanStart={controlled ? undefined : onPanStart}
        onPan={controlled ? undefined : onPan}
        className={`relative h-full w-full select-none ${
          controlled ? "" : "aspect-[16/10] cursor-grab touch-none active:cursor-grabbing"
        }`}
      >
        {/* Base layer — committed finish */}
        <FrameStack frames={committed.frames} active={activeIndex} title={`${title} · ${committed.name}`} />

        {/* Wipe layer — incoming finish reveals over the base */}
        <AnimatePresence>
          {incoming !== null && (
            <motion.div
              key={incoming}
              className="absolute inset-0 z-[5]"
              initial={{ clipPath: prefersReduced ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              transition={{ duration: prefersReduced ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => finishReveal(incoming)}
            >
              <FrameStack
                frames={finishList[incoming].frames}
                active={activeIndex}
                title={`${title} · ${finishList[incoming].name}`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vignette for depth + readability */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[6]"
          style={{ background: "radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
        />

        {/* ---------- Built-in overlay UI (drag mode) ---------- */}
        {chrome && (
          <div className="pointer-events-none absolute inset-0 z-[7] flex flex-col justify-between p-6 sm:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
                Diamond Auto Sales
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
            </div>

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

      {/* ---------- Color finish selector (beneath the viewer) ---------- */}
      {showColors && (
        <div className="flex flex-col items-center gap-3 bg-black py-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
            {finishList[dotActive].name}
          </p>
          <div className="flex items-center gap-4">
            {finishList.map((f, i) => {
              const isActive = i === dotActive;
              return (
                <button
                  key={f.name}
                  onClick={() => selectColor(i)}
                  aria-label={f.name}
                  aria-pressed={isActive}
                  className="grid place-items-center rounded-full p-0.5 transition-transform active:scale-90"
                  style={{
                    boxShadow: isActive ? "0 0 0 1.5px #fff, 0 0 0 4px #000" : "0 0 0 1px rgba(255,255,255,0.18)",
                    borderRadius: 9999,
                  }}
                >
                  <span
                    className="block h-6 w-6 rounded-full"
                    style={{ background: f.dot, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

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
              {String(loadedCount).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** A stack of preloaded frames; only the active one is visible (zero flicker). */
function FrameStack({ frames, active, title }: { frames: string[]; active: number; title: string }) {
  return (
    <>
      {frames.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={src}
          alt={`${title} — frame ${i + 1} of ${frames.length}`}
          draggable={false}
          aria-hidden={i !== active}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
    </>
  );
}

function DragIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
