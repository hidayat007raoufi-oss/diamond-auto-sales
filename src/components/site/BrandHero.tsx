"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

/**
 * Homepage brand-splash hero. A cropped, car-free brand graphic (giant chrome
 * DIAMOND logo + floating diamond + crystal shards + cosmic glow) used as a
 * full-screen background, with cinematic motion layered on top in CSS:
 *  - slow ken-burns drift on the background
 *  - soft blue glow pulsing around the logo
 *  - a light sweep across the chrome letters
 *  - tiny twinkling sparkle particles
 *  - gently drifting diamond shards
 *  - subtle mouse/touch parallax (desktop, layered for depth)
 *
 * Performance-minded: pure CSS animations (GPU transform/opacity), no WebGL.
 * Heavy motion (bg zoom, sweep, parallax) is disabled on phones / reduced-motion;
 * the image itself is the LCP and loads eagerly. CTAs sit below the logo.
 */

const SPARKLES = [
  { left: "12%", top: "28%", s: 3, tw: "3.5s", td: "0s" },
  { left: "22%", top: "62%", s: 2, tw: "4.2s", td: "0.6s" },
  { left: "34%", top: "18%", s: 4, tw: "5s", td: "1.1s" },
  { left: "47%", top: "70%", s: 2, tw: "3.8s", td: "0.3s" },
  { left: "58%", top: "24%", s: 3, tw: "4.6s", td: "0.9s" },
  { left: "68%", top: "60%", s: 2, tw: "3.4s", td: "1.4s" },
  { left: "78%", top: "32%", s: 4, tw: "5.2s", td: "0.2s" },
  { left: "86%", top: "54%", s: 3, tw: "4s", td: "0.7s" },
  { left: "8%", top: "46%", s: 2, tw: "4.4s", td: "1.2s" },
  { left: "91%", top: "22%", s: 3, tw: "3.9s", td: "0.5s" },
];

const SHARDS = [
  { left: "6%", top: "30%", size: 30, op: 0.5, dr: "8s", dd: "0s" },
  { left: "16%", top: "66%", size: 22, op: 0.4, dr: "10s", dd: "1.2s" },
  { left: "82%", top: "34%", size: 26, op: 0.45, dr: "9s", dd: "0.6s" },
  { left: "90%", top: "62%", size: 20, op: 0.4, dr: "11s", dd: "1.8s" },
];

export default function BrandHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);

  // Subtle layered parallax on pointer move — desktop only, reduced-motion off.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (bgRef.current) bgRef.current.style.transform = `translate(${nx * -10}px, ${ny * -10}px)`;
        if (fxRef.current) fxRef.current.style.transform = `translate(${nx * -26}px, ${ny * -26}px)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden bg-black px-5 pb-20 pt-24 text-center text-white sm:px-8 sm:pb-24">
      {/* background brand graphic (LCP) */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="brand-bg-zoom absolute inset-0">
          <Image
            src="/hero/brand-hero.webp"
            alt="Diamond Auto Sales"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* soft blue glow pulsing around the logo */}
      <div
        aria-hidden
        className="brand-glow-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(42%_36%_at_50%_40%,rgba(60,150,255,0.35),transparent_70%)]"
      />

      {/* parallax FX layer: sparkles + drifting shards + light sweep */}
      <div ref={fxRef} className="pointer-events-none absolute inset-0 will-change-transform">
        {/* light sweep across the chrome letters (mid band) */}
        <div className="absolute inset-x-0 top-[24%] h-[44%] overflow-hidden">
          <div className="brand-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent mix-blend-screen" />
        </div>

        {/* twinkling particles */}
        {SPARKLES.map((p, i) => (
          <span
            key={i}
            className="brand-twinkle absolute rounded-full bg-white"
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

        {/* drifting diamond shards */}
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

      {/* edge vignette for cinematic depth + clean blend under the header */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* foreground content — below the logo, never over it */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-sm">
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
