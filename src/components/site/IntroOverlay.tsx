"use client";

import { useEffect, useRef, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

const SEEN_KEY = "diamond_intro_seen_v1";

/** Deterministic floating-diamond field (no Math.random in render → no hydration drift). */
const FIELD = [
  { l: "12%", t: "22%", s: 10, d: 8.5, delay: 0.0, o: 0.5 },
  { l: "82%", t: "18%", s: 14, d: 9.5, delay: 0.6, o: 0.6 },
  { l: "24%", t: "70%", s: 8, d: 7.5, delay: 0.3, o: 0.45 },
  { l: "70%", t: "66%", s: 12, d: 10, delay: 0.9, o: 0.55 },
  { l: "46%", t: "14%", s: 7, d: 8, delay: 0.2, o: 0.4 },
  { l: "8%", t: "52%", s: 9, d: 9, delay: 1.1, o: 0.5 },
  { l: "90%", t: "44%", s: 11, d: 8.8, delay: 0.5, o: 0.55 },
  { l: "58%", t: "82%", s: 9, d: 7.8, delay: 0.7, o: 0.45 },
  { l: "34%", t: "40%", s: 6, d: 9.2, delay: 1.3, o: 0.4 },
  { l: "66%", t: "32%", s: 8, d: 8.3, delay: 0.4, o: 0.5 },
];

type Phase = "pending" | "playing" | "exiting" | "done";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("pending");
  const [soundOn, setSoundOn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const finish = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    audioRef.current?.pause();
    setPhase("exiting");
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        document.documentElement.style.overflow = "";
      }, 720)
    );
  };

  // Sound is muted by default; this is the opt-in toggle. The audio element
  // is wired and ready — drop a file at /public/sounds/startup.mp3 to enable a
  // subtle engine/startup cue. play() is guarded so a missing file is a no-op.
  const toggleSound = () => {
    const a = audioRef.current;
    const next = !soundOn;
    setSoundOn(next);
    if (!a) return;
    a.muted = !next;
    if (next) {
      a.currentTime = 0;
      void a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  useEffect(() => {
    const bucket = timers.current;
    // Defer the decision out of the effect body to avoid cascading renders.
    const raf = requestAnimationFrame(() => {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = localStorage.getItem(SEEN_KEY) === "1";
      } catch {}

      if (seen || reduce) {
        setPhase("done");
        return;
      }

      // Play the cinematic sequence.
      document.documentElement.style.overflow = "hidden";
      setPhase("playing");
      // Auto-finish at the end of the timeline, then exit.
      bucket.push(setTimeout(finish, 3000));
    });

    return () => {
      cancelAnimationFrame(raf);
      bucket.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "pending" || phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div
      role="dialog"
      aria-label="Diamond Auto Sales intro"
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
      style={{
        animation: exiting ? "introExit 0.72s var(--ease-lux) forwards" : undefined,
      }}
    >
      {/* sound-ready structure — muted by default (engine/startup cue) */}
      <audio ref={audioRef} src="/sounds/startup.mp3" preload="auto" muted />

      {/* ambient blue depth */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(47,128,255,0.16),transparent_70%)]" />

      {/* floating diamonds */}
      {FIELD.map((f, i) => (
        <span
          key={i}
          className="diamond-float"
          style={{
            left: f.l,
            top: f.t,
            width: f.s,
            height: f.s,
            // @ts-expect-error custom props
            "--d-dur": `${f.d}s`,
            "--d-opacity": f.o,
            animationDelay: `${f.delay}s`,
            borderRadius: 2,
          }}
        />
      ))}

      {/* center stage */}
      <div className="relative flex flex-col items-center">
        {/* rotating 3D diamond */}
        <div
          className="relative grid place-items-center"
          style={{
            perspective: "900px",
            animation: "introDiamondIn 0.9s var(--ease-lux) both",
          }}
        >
          <div
            className="tilt-3d"
            style={{ animation: "introDiamondSpin 6s linear infinite" }}
          >
            <DiamondLogo className="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-[0_0_40px_rgba(47,128,255,0.7)]" />
          </div>
        </div>

        {/* metallic wordmark builds in */}
        <div
          className="relative mt-8 overflow-hidden"
          style={{ animation: "introLogoBuild 1.1s var(--ease-lux) 1.1s both" }}
        >
          <p className="text-chrome text-center text-2xl font-semibold tracking-[0.18em] sm:text-3xl">
            DIAMOND AUTO SALES
          </p>
          <p className="mt-1 text-center text-[11px] font-medium uppercase tracking-[0.5em] text-blue-300/70">
            LLC
          </p>
          {/* neon light sweep across the logo */}
          <span className="neon-sweep pointer-events-none absolute inset-0" />
        </div>
      </div>

      {/* flash/glow transition near the end */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(160,200,255,0.9),rgba(47,128,255,0.25)_45%,transparent_75%)]"
        style={{
          opacity: 0,
          animation: exiting ? "introFlash 0.32s ease-out both" : "introFlash 0.5s ease-in 2.5s both",
        }}
      />

      {/* Controls */}
      {!exiting && (
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:left-auto sm:right-7 sm:translate-x-0">
          <button
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute intro sound" : "Unmute intro sound"}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 backdrop-blur transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            {soundOn ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M16 9a3 3 0 010 6M18.5 7a6 6 0 010 10" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M22 9l-6 6M16 9l6 6" />
              </svg>
            )}
          </button>
          <button
            onClick={finish}
            className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            Skip Intro
          </button>
        </div>
      )}
    </div>
  );
}
