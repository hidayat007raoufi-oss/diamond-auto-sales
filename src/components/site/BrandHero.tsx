"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Homepage brand-splash hero — a LAYERED scene, not a flat image:
 *   - back: a real-time cosmic scene (starfield, drifting nebula glow, floating
 *     3D crystal shards, particle sparkles, bloom, pointer parallax)
 *   - front: the crisp hero diamond + chrome DIAMOND AUTO SALES LLC art,
 *     screen-blended over the scene (black drops out, stars twinkle through),
 *     with a chrome light sweep, glow pulse, and its own parallax depth
 *   - top: readable UI (tagline + CTAs)
 *
 * The 3D scene is code-split and lazy-mounted; quality steps down on phones and
 * it's skipped entirely for reduced-motion / Save-Data / 2G (the crisp art
 * still shows on black). The art is the LCP. Keeps Lighthouse strong.
 */
const BrandHeroScene = dynamic(() => import("@/components/site/BrandHeroScene"), { ssr: false });

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Decide whether/how strongly to run the 3D scene. */
function sceneMode(): "high" | "low" | "off" {
  if (typeof window === "undefined") return "off";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return "off";
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return "off";
  return window.matchMedia("(pointer: coarse)").matches ? "low" : "high";
}

export default function BrandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("high");

  useEffect(() => {
    const mode = sceneMode();
    const el = sectionRef.current;

    // pointer parallax for the art layer (desktop fine pointer only)
    let raf = 0;
    let onMove: ((e: PointerEvent) => void) | undefined;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && mode !== "off") {
      onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (artRef.current) artRef.current.style.transform = `translate(${nx * -9}px, ${ny * -9}px)`;
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    let io: IntersectionObserver | undefined;
    if (mode !== "off" && el) {
      setQuality(mode);
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setMounted(true);
          setActive(entry.isIntersecting);
        },
        { rootMargin: "200px 0px", threshold: 0.01 }
      );
      io.observe(el);
    }
    return () => {
      io?.disconnect();
      if (onMove) window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const showScene = mounted && ready && !failed;

  return (
    <section
      ref={sectionRef}
      className="hero-minh relative flex flex-col items-center justify-end overflow-hidden bg-black px-5 pb-24 pt-24 text-center text-white sm:px-8"
    >
      {/* LAYER 1–2 + 5: live cosmic scene (stars, nebula, floating crystals, particles) */}
      {mounted && !failed && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showScene ? "opacity-100" : "opacity-0"}`}>
          <SceneBoundary onError={() => setFailed(true)}>
            <BrandHeroScene active={active} quality={quality} onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      )}

      {/* soft blue glow pulse behind the logo */}
      <div
        aria-hidden
        className="brand-glow-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_38%,rgba(60,150,255,0.30),transparent_70%)]"
      />

      {/* LAYER 3–4: hero diamond + chrome logo art, screen-blended over the scene */}
      <div ref={artRef} className="pointer-events-none absolute inset-0 will-change-transform" style={{ mixBlendMode: "screen" }}>
        <picture>
          <source media="(max-width: 640px)" srcSet="/hero/brand-hero-mobile.webp" />
          <img
            src="/hero/brand-hero.webp"
            alt="Diamond Auto Sales"
            fetchPriority="high"
            decoding="async"
            className="hero-art-mask absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        {/* chrome light sweep across the letters */}
        <div className="absolute inset-x-0 top-[24%] h-[40%] overflow-hidden">
          <div className="brand-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        </div>
      </div>

      {/* legibility: bottom gradient under the UI */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* LAYER 6: UI — stays perfectly readable while the scene moves */}
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
