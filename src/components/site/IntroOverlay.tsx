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
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setPhase("exiting");
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        document.documentElement.style.overflow = "";
      }, 720)
    );
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
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
      style={{
        animation: exiting ? "introExit 0.72s var(--ease-lux) forwards" : undefined,
      }}
    >
      {/* ambient blue depth */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(47,128,255,0.16),transparent_70%)]" />

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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(160,200,255,0.9),rgba(47,128,255,0.25)_45%,transparent_75%)]"
        style={{
          opacity: 0,
          animation: exiting ? "introFlash 0.32s ease-out both" : "introFlash 0.5s ease-in 2.5s both",
        }}
      />

      {/* Skip */}
      {!exiting && (
        <button
          onClick={finish}
          className="absolute bottom-7 right-7 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur transition-colors hover:bg-white/[0.12] hover:text-white"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
