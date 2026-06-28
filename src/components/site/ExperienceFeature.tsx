"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";
import Reveal from "@/components/motion/Reveal";

/**
 * Full-bleed cinematic band promoting the /experience 3D configurator.
 *
 * Speed first: the base is a pure-CSS "studio stage" (no WebGL, no GLB) that
 * renders instantly. A live R3F preview is code-split and lazy-mounted ONLY
 * when the band nears the viewport — and only when the device/connection can
 * afford it (skipped for reduced-motion, Save-Data, and 2G). The live car
 * renders on a transparent canvas over the same stage and crossfades in, while
 * the wordmark fades out. Off-screen, its render loop parks itself. If anything
 * fails, the CSS teaser simply stays — it never regresses.
 */
const LivePreview = dynamic(() => import("@/components/site/ExperiencePreview3D"), { ssr: false });

/** If the WebGL canvas throws, swallow it and let the CSS teaser stand. */
class PreviewBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
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

/** Only spend the bytes/GPU when the device and connection can comfortably afford it. */
function canAffordLivePreview(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false;
  return true;
}

export default function ExperienceFeature() {
  const stageRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false); // live canvas mounted (one-way latch)
  const [active, setActive] = useState(true); // currently on-screen → run the render loop
  const [ready, setReady] = useState(false); // model loaded → crossfade the car in
  const [failed, setFailed] = useState(false); // WebGL/GLB failed → stay on teaser

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !canAffordLivePreview()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Preload a touch before it enters; keep observing to park the loop off-screen.
        if (entry.isIntersecting) setMounted(true);
        setActive(entry.isIntersecting);
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showCar = mounted && ready && !failed;

  return (
    <section className="relative overflow-hidden bg-black">
      {/* ambient cinematic wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_38%,rgba(47,128,255,0.18),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal blur>
          <p className="apple-metric-label text-[#2997ff]">Diamond · 3D Configurator</p>
          <h2 className="apple-headline mx-auto mt-3 max-w-4xl text-balance text-white">
            See it in three dimensions.
          </h2>
          <p className="apple-sub mx-auto mt-4 max-w-2xl text-white/65">
            Step inside the configurator. Spin the BMW M3 in real time, walk it
            through a cinematic reveal, and try every finish — right in your browser.
          </p>
        </Reveal>

        {/* ---------- cinematic stage ---------- */}
        <Reveal blur delay={120}>
          <Link
            ref={stageRef}
            href="/experience"
            aria-label="Open the 3D configurator"
            className="group relative mx-auto mt-12 block aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] sm:aspect-[21/9]"
          >
            {/* studio key light */}
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_30%,rgba(47,128,255,0.22),transparent_72%)]" />
            {/* perspective reflection floor */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                transform: "perspective(420px) rotateX(58deg)",
                transformOrigin: "bottom",
                maskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
                WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
              }}
            />

            {/* live 3D preview — pointer-events-none so taps/scroll pass to the link/page */}
            {mounted && !failed && (
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${showCar ? "opacity-100" : "opacity-0"}`}
                style={{ pointerEvents: "none" }}
              >
                <PreviewBoundary onError={() => setFailed(true)}>
                  <LivePreview active={active} onReady={() => setReady(true)} />
                </PreviewBoundary>
              </div>
            )}

            {/* center wordmark / brand — fades out once the live car takes over */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${showCar ? "opacity-0" : "opacity-100"}`}>
              <DiamondLogo className="h-10 w-10 opacity-90 transition-transform duration-700 group-hover:scale-110" />
              <p className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-7xl" style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6)" }}>
                BMW M3
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.34em] text-white/45">
                Competition
              </p>
            </div>

            {/* enter affordance */}
            <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md transition-colors group-hover:bg-white/10 sm:bottom-6 sm:right-6">
              {showCar ? "Drag to rotate" : "Explore in 3D"}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/experience" className="pill pill-blue">
              Enter the experience
            </Link>
            <Link href="/inventory" className="pill pill-dark">
              Browse inventory
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
