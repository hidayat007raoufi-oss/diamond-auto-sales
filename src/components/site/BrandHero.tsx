"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

/**
 * Homepage brand-splash hero. Uses the car-free brand graphic as a full-screen
 * background, but serves TWO art-directed compositions:
 *   - desktop: the wide cinematic crop, object-cover center
 *   - mobile: a dedicated 9:16 portrait composition (full diamond + full logo,
 *     never clipped), object-contain center-top with header clearance
 * Cinematic motion is layered in CSS (ken-burns, blue glow pulse, chrome light
 * sweep, twinkling sparkles, drifting shards). Desktop gets pointer parallax
 * (background / logo / shards at different depths); mobile gets a gentle
 * automatic drift instead. All heavy motion is gated for phones and fully
 * disabled for prefers-reduced-motion. No WebGL — the image is the LCP.
 */

const SPARKLES = [
  { left: "16%", top: "30%", s: 3, tw: "3.5s", td: "0s", mobile: true },
  { left: "30%", top: "20%", s: 4, tw: "5s", td: "1.1s", mobile: true },
  { left: "50%", top: "16%", s: 3, tw: "4.6s", td: "0.9s", mobile: true },
  { left: "70%", top: "22%", s: 4, tw: "5.2s", td: "0.2s", mobile: true },
  { left: "84%", top: "32%", s: 3, tw: "3.9s", td: "0.5s", mobile: true },
  { left: "22%", top: "60%", s: 2, tw: "4.2s", td: "0.6s", mobile: false },
  { left: "47%", top: "66%", s: 2, tw: "3.8s", td: "0.3s", mobile: false },
  { left: "68%", top: "58%", s: 2, tw: "3.4s", td: "1.4s", mobile: false },
  { left: "8%", top: "46%", s: 2, tw: "4.4s", td: "1.2s", mobile: false },
  { left: "91%", top: "52%", s: 3, tw: "4s", td: "0.7s", mobile: false },
];

const SHARDS = [
  { left: "7%", top: "30%", size: 28, op: 0.5, dr: "8s", dd: "0s" },
  { left: "84%", top: "32%", size: 24, op: 0.45, dr: "9s", dd: "0.6s" },
  { left: "16%", top: "64%", size: 20, op: 0.4, dr: "10s", dd: "1.2s" },
  { left: "88%", top: "60%", size: 18, op: 0.4, dr: "11s", dd: "1.8s" },
];

export default function BrandHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);

  // Desktop layered pointer parallax (background moves less, shards move more).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return; // mobile uses CSS auto-drift instead

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) bgRef.current.style.transform = `translate(${nx * -10}px, ${ny * -10}px)`;
        if (fxRef.current) fxRef.current.style.transform = `translate(${nx * -28}px, ${ny * -28}px)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-minh relative flex flex-col items-center justify-end overflow-hidden bg-black px-5 pb-24 pt-24 text-center text-white sm:px-8">
      {/* background brand graphic (LCP) — art-directed via <picture> so the
          browser downloads ONLY the matching composition (good for Lighthouse).
          Mobile: dedicated 9:16, object-contain/top (full logo, never clipped).
          Desktop: wide crop, object-cover/center. */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="brand-bg-zoom absolute inset-0">
          <picture>
            <source media="(max-width: 640px)" srcSet="/hero/brand-hero-mobile.webp" />
            <img
              src="/hero/brand-hero.webp"
              alt="Diamond Auto Sales"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain object-top sm:object-cover sm:object-center"
            />
          </picture>
        </div>
      </div>

      {/* soft blue glow pulsing around the logo */}
      <div
        aria-hidden
        className="brand-glow-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_38%,rgba(60,150,255,0.32),transparent_70%)]"
      />

      {/* parallax / drift FX layer: light sweep + sparkles + shards */}
      <div ref={fxRef} className="brand-auto-drift pointer-events-none absolute inset-0 will-change-transform">
        {/* blue-white light sweep across the chrome letters */}
        <div className="absolute inset-x-0 top-[22%] h-[42%] overflow-hidden">
          <div className="brand-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#cfe7ff]/40 to-transparent mix-blend-screen" />
        </div>

        {/* twinkling particles (fewer on mobile) */}
        {SPARKLES.map((p, i) => (
          <span
            key={i}
            className={`brand-twinkle absolute rounded-full bg-white ${p.mobile ? "" : "hidden sm:block"}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.s,
              height: p.s,
              boxShadow: "0 0 8px 2px rgba(120,190,255,0.8)",
              ["--tw" as string]: p.tw,
              ["--td" as string]: p.td,
            }}
          />
        ))}

        {/* drifting diamond shards (gentle up/down + slow rotation, varied depth) */}
        {SHARDS.map((s, i) => (
          <span
            key={i}
            className="brand-drift absolute block"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.op,
              filter: "drop-shadow(0 0 6px rgba(80,160,255,0.7))",
              ["--dr" as string]: s.dr,
              ["--dd" as string]: s.dd,
            }}
          >
            <DiamondLogo className="h-full w-full" />
          </span>
        ))}
      </div>

      {/* edge vignette + top/bottom gradients (header blend + CTA legibility) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(0,0,0,0.5)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* foreground content — below the logo, never over it */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm sm:tracking-[0.32em]">
          Luxury energy · Fast movement · <span className="text-[#5aa6ff]">Diamond-level experience</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link href="/inventory" className="pill pill-blue shadow-[0_0_24px_rgba(0,113,227,0.55)]">
            View Inventory
          </Link>
          <Link href="/financing" className="pill pill-dark border border-white/15 backdrop-blur-sm">
            Get Approved
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div aria-hidden className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <span className="scroll-hint h-2 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
