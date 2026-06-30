"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

/**
 * Full-bleed brand-splash homepage hero. Base layer is pure CSS (blue halo +
 * the brand diamond mark + chrome wordmark) so it renders instantly and stands
 * on its own. A real-time 3D refracting diamond (BrandHero3D) is code-split and
 * lazy-mounted behind the wordmark, crossfading in — skipped for reduced-motion
 * / Save-Data / 2G, parked when scrolled away, and falling back to the CSS mark
 * if WebGL fails. three.js stays out of the homepage's initial bundle.
 */
const BrandHero3D = dynamic(() => import("@/components/site/BrandHero3D"), { ssr: false });

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

function canAffordLivePreview(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false;
  return true;
}

export default function BrandHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAffordLivePreview()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        setActive(entry.isIntersecting);
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showGem = mounted && ready && !failed;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-24 text-center text-white sm:px-8"
    >
      {/* blue studio halo (always) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(47,128,255,0.22),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(38%_32%_at_50%_38%,rgba(140,190,255,0.20),transparent_75%)]" />

      {/* live 3D diamond — decorative background behind the wordmark */}
      {mounted && !failed && (
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${showGem ? "opacity-100" : "opacity-0"}`}>
          <PreviewBoundary onError={() => setFailed(true)}>
            <BrandHero3D active={active} onReady={() => setReady(true)} />
          </PreviewBoundary>
        </div>
      )}

      {/* CSS diamond mark — shows until the gem is ready / on low-power devices */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${showGem ? "opacity-0" : "opacity-100"}`}
      >
        <DiamondLogo className="h-36 w-36 sm:h-52 sm:w-52" />
      </div>

      {/* foreground brand content */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="apple-metric-label text-[#9cc4ff]">Diamond Auto Sales · Raleigh, NC</p>
        <h1 className="brand-wordmark mt-4">DIAMOND</h1>
        <p className="brand-submark">AUTO SALES LLC</p>
        <p className="apple-sub mt-5 max-w-2xl text-white/70">
          Luxury energy. Fast movement. Diamond-level experience.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/inventory" className="pill pill-blue">
            View Inventory
          </Link>
          <Link href="/financing" className="pill pill-dark">
            Get Approved
          </Link>
          <Link href="/experience" className="pill pill-3d">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4z" />
              <path d="M3.7 7.3L12 12l8.3-4.7M12 12v9.3" />
            </svg>
            Explore in 3D
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
