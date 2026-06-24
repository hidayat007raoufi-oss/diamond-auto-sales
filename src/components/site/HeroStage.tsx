"use client";

import Link from "next/link";
import { useRef } from "react";

const DIAMONDS = [
  { l: "10%", t: "26%", s: 10, d: 9, delay: 0, o: 0.45, depth: 26 },
  { l: "84%", t: "20%", s: 13, d: 10.5, delay: 0.5, o: 0.5, depth: 40 },
  { l: "22%", t: "70%", s: 8, d: 8, delay: 0.3, o: 0.4, depth: 18 },
  { l: "74%", t: "64%", s: 11, d: 9.6, delay: 0.9, o: 0.5, depth: 34 },
  { l: "46%", t: "16%", s: 7, d: 8.4, delay: 0.2, o: 0.35, depth: 22 },
  { l: "90%", t: "46%", s: 9, d: 9.2, delay: 0.6, o: 0.45, depth: 30 },
  { l: "6%", t: "54%", s: 8, d: 8.8, delay: 1.1, o: 0.4, depth: 16 },
  { l: "60%", t: "82%", s: 9, d: 7.9, delay: 0.7, o: 0.4, depth: 38 },
];

export default function HeroStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (logoRef.current) {
      logoRef.current.style.transform = `perspective(1100px) rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 16).toFixed(2)}deg) translateZ(0)`;
    }
    if (fieldRef.current) {
      fieldRef.current.style.transform = `translate3d(${(px * -22).toFixed(1)}px, ${(py * -22).toFixed(1)}px, 0)`;
    }
  };

  const reset = () => {
    if (logoRef.current) logoRef.current.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
    if (fieldRef.current) fieldRef.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <section
      ref={stageRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black"
    >
      {/* ambient depth */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_38%,rgba(47,128,255,0.16),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* floating diamonds (parallax) */}
      <div ref={fieldRef} aria-hidden className="absolute inset-0 transition-transform duration-300 ease-out">
        {DIAMONDS.map((f, i) => (
          <span
            key={i}
            className="diamond-float"
            style={{
              left: f.l,
              top: f.t,
              width: f.s,
              height: f.s,
              borderRadius: 2,
              // @ts-expect-error custom props
              "--d-dur": `${f.d}s`,
              "--d-opacity": f.o,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-24 text-center sm:px-8">
        {/* 3D logo focus */}
        <div style={{ perspective: "1100px" }} className="rise">
          <div
            ref={logoRef}
            className="relative grid place-items-center transition-transform duration-300 ease-out will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.webp"
              alt="Diamond Auto Sales"
              width={220}
              height={220}
              className="h-36 w-auto drop-shadow-[0_0_50px_rgba(47,128,255,0.55)] sm:h-44"
            />
            {/* neon light sweep */}
            <span aria-hidden className="neon-sweep pointer-events-none absolute inset-0" />
          </div>
        </div>

        <p className="rise mt-9 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400/90" style={{ animationDelay: "0.1s" }}>
          Diamond Auto Sales · Raleigh, NC
        </p>

        <h1 className="rise hero-display mt-4 text-white text-balance" style={{ animationDelay: "0.18s" }}>
          Luxury Energy. <span className="text-electric">Fast Movement.</span> Diamond-Level Experience.
        </h1>

        <p className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60" style={{ animationDelay: "0.28s" }}>
          Quality pre-owned vehicles, financing options, rentals, detailing, and
          trade-ins — all from one local dealership.
        </p>

        <div className="rise mt-9 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: "0.38s" }}>
          <Link
            href="/inventory"
            className="btn-sheen inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_44px_-12px_rgba(47,128,255,0.85)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            View Inventory
          </Link>
          <Link
            href="/financing"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.09] sm:w-auto"
          >
            Get Approved
          </Link>
          <a
            href="tel:+19198878666"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.09] sm:w-auto"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
            </svg>
            Call Now
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div aria-hidden className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="scroll-hint h-2 w-1 rounded-full bg-blue-300" />
        </div>
      </div>
    </section>
  );
}
