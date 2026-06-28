"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero3DMount from "@/components/site/Hero3DMount";
import { heroScroll } from "@/lib/experienceScroll";

/** Literal M3 "shots" — captions crossfade in sync with the model keyframes.
 *  `in`/`out` are scroll-progress windows aligned to SHOT_KEYS in Hero3D. */
const SHOTS = [
  { label: "Presence.", sub: "Every line, deliberate.", in: 0.18, out: 0.34 },
  { label: "Stance.", sub: "The silhouette that started it all.", in: 0.37, out: 0.56 },
  { label: "The Nose.", sub: "That unmistakable face.", in: 0.6, out: 0.76 },
  { label: "The Departure.", sub: "Unforgettable, even leaving.", in: 0.82, out: 0.97 },
];

/**
 * Phase 1 + 2 — a single pinned "film". The M3 (CSS-sticky) stays put while
 * GSAP ScrollTrigger scrubs: the model is keyframed through cinematic shots
 * (in Hero3D, via heroScroll), the intro headline recedes, and per-shot
 * captions crossfade. Drag + pinch-zoom stay live the whole time.
 */
export default function ExperienceHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      heroScroll.progress = 0;
      return;
    }

    const ctx = gsap.context(() => {
      const caps = capsRef.current ? Array.from(capsRef.current.children) : [];
      gsap.set(caps, { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            heroScroll.progress = self.progress;
          },
        },
      });

      // Intro recedes over the first ~16% of the scrub.
      tl.to([eyebrowRef.current, headlineRef.current, subRef.current], { autoAlpha: 0, y: -36, ease: "none", duration: 0.16 }, 0);

      // Each shot caption fades in, holds, fades out across its window.
      caps.forEach((el, i) => {
        const shot = SHOTS[i];
        tl.fromTo(el, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: "none", duration: 0.05 }, shot.in)
          .to(el, { autoAlpha: 0, y: -20, ease: "none", duration: 0.05 }, shot.out);
      });

      // Normalize timeline length to ~1 so caption positions align with progress.
      tl.to({}, { duration: 0.001 }, 1);
    }, wrapRef);

    return () => {
      ctx.revert();
      heroScroll.progress = 0;
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[440vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ambient cinematic light behind the model */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(62%_62%_at_50%_48%,rgba(47,128,255,0.15),transparent_72%)]" />

        {/* Interactive WebGL viewer (R3F) — drag to rotate, pinch/⌘-wheel to zoom */}
        <Hero3DMount className="absolute inset-0" />

        {/* edge vignettes for text legibility — center stays clickable for orbit */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

        {/* top-left brand + intro title */}
        <div className="pointer-events-none absolute left-6 top-6 z-10 max-w-[80vw]">
          <Link href="/" className="pointer-events-auto text-[12px] font-medium text-white/60 transition-colors hover:text-white">
            ← Diamond Auto
          </Link>
          <p ref={eyebrowRef} className="mt-3 text-[11px] font-semibold uppercase tracking-[0.36em] text-white/55">
            Diamond · 3D Configurator
          </p>
          <h1 ref={headlineRef} className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-5xl" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}>
            BMW M3 Competition.
          </h1>
          <p ref={subRef} className="mt-2 text-sm text-white/60" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
            Drag to rotate · scroll to explore · pick a finish.
          </p>
        </div>

        {/* per-shot captions (crossfaded by the scrub timeline) */}
        <div ref={capsRef} className="pointer-events-none absolute bottom-24 left-6 z-10 max-w-[80vw] sm:bottom-28">
          {SHOTS.map((s) => (
            <div key={s.label} className="absolute bottom-0 left-0">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.65)" }}>
                {s.label}
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
