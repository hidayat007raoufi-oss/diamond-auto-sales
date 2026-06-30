"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

/**
 * Living hero. The APPROVED composition (the flat brand render) stays exactly
 * as designed — nothing in it moves or shifts. Life comes from independent
 * layers animated OVER it:
 *   - 1% cinematic camera breath on the base
 *   - shifting volumetric light rays
 *   - drifting crystal shards (each its own speed/rotation/depth)
 *   - hundreds of drifting/twinkling particles (Canvas2D)
 *   - chrome light sweep + glow breathing on the logo
 *   - multi-layer parallax (mouse on desktop, device-orientation on mobile,
 *     else extremely slow auto camera drift)
 * No WebGL on the hero → 60fps + strong Lighthouse. Frozen for reduced-motion.
 */
const BrandHeroParticles = dynamic(() => import("@/components/site/BrandHeroParticles"), { ssr: false });

// Independent floating crystal shards (drift amount / rotation / timing per shard).
const CRYSTALS = [
  { left: "8%", top: "24%", size: 30, op: 0.55, cx: "10px", cy: "-14px", cr: "10deg", cd: "13s", cdl: "0s" },
  { left: "86%", top: "20%", size: 34, op: 0.5, cx: "-12px", cy: "-10px", cr: "-8deg", cd: "15s", cdl: "1.5s" },
  { left: "14%", top: "66%", size: 24, op: 0.5, cx: "8px", cy: "12px", cr: "12deg", cd: "12s", cdl: "0.8s" },
  { left: "90%", top: "60%", size: 22, op: 0.45, cx: "-9px", cy: "10px", cr: "-10deg", cd: "16s", cdl: "2.2s" },
  { left: "50%", top: "12%", size: 18, op: 0.4, cx: "6px", cy: "-10px", cr: "14deg", cd: "14s", cdl: "1s" },
  { left: "4%", top: "46%", size: 20, op: 0.45, cx: "10px", cy: "6px", cr: "8deg", cd: "17s", cdl: "0.4s" },
  { left: "94%", top: "42%", size: 20, op: 0.42, cx: "-8px", cy: "-8px", cr: "-12deg", cd: "13.5s", cdl: "1.8s" },
  { left: "72%", top: "74%", size: 16, op: 0.4, cx: "7px", cy: "11px", cr: "9deg", cd: "15.5s", cdl: "0.6s" },
];

export default function BrandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallax = useRef({ px: 0, py: 0 });

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let usingInput = false;
    let raf = 0;

    const onPointer = (e: PointerEvent) => {
      usingInput = true;
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      usingInput = true;
      target.x = Math.max(-0.5, Math.min(0.5, e.gamma / 45));
      target.y = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 45));
    };

    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    else window.addEventListener("deviceorientation", onOrient);

    const loop = () => {
      if (!usingInput) {
        // extremely slow automatic camera drift when there's no input
        const t = performance.now() * 0.0001;
        target.x = Math.sin(t) * 0.22;
        target.y = Math.cos(t * 0.8) * 0.16;
      }
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      parallax.current.px = cur.x;
      parallax.current.py = cur.y;
      sec.style.setProperty("--px", cur.x.toFixed(4));
      sec.style.setProperty("--py", cur.y.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-minh relative flex flex-col items-center justify-end overflow-hidden bg-black px-5 pb-24 pt-24 text-center text-white sm:px-8"
    >
      {/* LAYER: approved composition (static art) + camera breath + slight parallax */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: "translate(calc(var(--px,0) * -6px), calc(var(--py,0) * -6px))" }}>
        <div className="brand-breath absolute inset-0">
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
        </div>
      </div>

      {/* LAYER: volumetric light rays, slowly shifting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
        <div className="brand-ray-a absolute -inset-1/4 bg-[conic-gradient(from_200deg_at_50%_28%,transparent_0deg,rgba(90,160,255,0.10)_28deg,transparent_66deg,rgba(120,180,255,0.07)_120deg,transparent_160deg)]" />
        <div className="brand-ray-b absolute -inset-1/4 bg-[conic-gradient(from_18deg_at_52%_34%,transparent_0deg,rgba(70,140,255,0.08)_38deg,transparent_88deg)]" />
      </div>

      {/* LAYER: drifting crystal shards (independent), parallax further */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen will-change-transform"
        style={{ transform: "translate(calc(var(--px,0) * -16px), calc(var(--py,0) * -16px))" }}
      >
        {CRYSTALS.map((c, i) => (
          <span
            key={i}
            className="brand-crystal absolute block"
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: c.size,
              opacity: c.op,
              filter: "drop-shadow(0 0 6px rgba(90,160,255,0.6))",
              ["--cx" as string]: c.cx,
              ["--cy" as string]: c.cy,
              ["--cr" as string]: c.cr,
              ["--cd" as string]: c.cd,
              ["--cdl" as string]: c.cdl,
            }}
          >
            <DiamondLogo className="h-full w-full" />
          </span>
        ))}
      </div>

      {/* LAYER: particle field (hundreds), parallax-aware */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <BrandHeroParticles parallax={parallax} />
      </div>

      {/* LAYER: glow breathing + chrome light sweep on the logo */}
      <div aria-hidden className="brand-glow-pulse pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_42%,rgba(60,150,255,0.22),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[28%] h-[38%] overflow-hidden">
        <div className="brand-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-screen" />
      </div>

      {/* legibility: bottom gradient under the UI (light enough to keep floor reflections) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/55 to-transparent" />

      {/* LAYER: UI — stays perfectly readable while everything moves */}
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
