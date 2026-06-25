"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import CarShowcase, { DEFAULT_FRAMES } from "@/components/site/CarShowcase";

const specs = [
  { label: "Title", value: "Clean" },
  { label: "Engine", value: "Twin-Turbo" },
  { label: "Drivetrain", value: "Rear-Wheel Drive" },
  { label: "Mileage", value: "Low Miles" },
];

const SHADOW = "0 2px 40px rgba(0,0,0,0.65)";

/**
 * Scroll-linked cinematic scene: the car is pinned while the page scrolls,
 * its frames scrub with scroll progress (Apple video-scrub feel), and
 * premium overlay cards fade + slide in and out in sequence.
 */
export default function CarShowcaseScene({
  frames = DEFAULT_FRAMES,
  className = "",
}: {
  frames?: string[];
  className?: string;
}) {
  const total = frames.length;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  // 1. SCROLL LINKING — track progress across the tall section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → frame index (scrub the car as you scroll).
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <section ref={sectionRef} className={`relative h-[320vh] bg-black ${className}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Pinned, scroll-scrubbed car */}
        <CarShowcase frames={frames} frameIndex={index} chrome={false} className="h-full" />

        {/* Readability gradients over the dark imagery */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80"
        />

        {/* 2 + 3. OVERLAY CARDS — each lives in its own scroll window */}
        <div className="pointer-events-none absolute inset-0">
          {/* Card 1 — header */}
          <OverlayCard progress={scrollYProgress} range={[0.02, 0.32]}>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-[12px] sm:tracking-[0.35em]"
              style={{ textShadow: SHADOW }}
            >
              Diamond Performance
            </p>
            <h2
              className="mt-3 text-balance text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl"
              style={{ textShadow: SHADOW }}
            >
              Performance, perfected.
            </h2>
          </OverlayCard>

          {/* Card 2 — spec grid */}
          <OverlayCard progress={scrollYProgress} range={[0.38, 0.66]}>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-[12px] sm:tracking-[0.35em]"
              style={{ textShadow: SHADOW }}
            >
              Specifications
            </p>
            <div className="mt-5 grid w-full max-w-2xl grid-cols-2 gap-2.5 sm:mt-7 sm:gap-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 text-left backdrop-blur-xl sm:p-6"
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:text-[11px] sm:tracking-[0.18em]">
                    {s.label}
                  </p>
                  <p className="mt-1 text-base font-semibold tracking-tight text-white sm:mt-1.5 sm:text-2xl">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </OverlayCard>

          {/* Card 3 — closing CTA (bonus) */}
          <OverlayCard progress={scrollYProgress} range={[0.72, 0.98]}>
            <h2
              className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ textShadow: SHADOW }}
            >
              Yours to experience.
            </h2>
            <p
              className="mt-4 max-w-md text-base text-white/70 sm:text-lg"
              style={{ textShadow: SHADOW }}
            >
              Book a private viewing at Diamond Auto Sales.
            </p>
            <a
              href="/contact?intent=test-drive"
              className="pointer-events-auto mt-8 inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0077ed]"
            >
              Reserve
            </a>
          </OverlayCard>
        </div>
      </div>
    </section>
  );
}

/** A single overlay card: fades in + slides up, then fades out as scroll passes its window. */
function OverlayCard({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const [a, b] = range;
  const fade = Math.min(0.07, (b - a) / 3);
  const opacity = useTransform(progress, [a, a + fade, b - fade, b], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b], [44, -44]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      {children}
    </motion.div>
  );
}
