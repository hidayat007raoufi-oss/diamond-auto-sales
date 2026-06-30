"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * Lightweight Canvas2D particle field for the hero — hundreds of tiny blue/white
 * particles that drift, twinkle, and occasionally spark. Parallax-aware (offset
 * by depth via the shared `parallax` ref). 60fps, no WebGL. Pauses when
 * off-screen and does nothing under prefers-reduced-motion.
 */
type P = {
  x: number; y: number; z: number; r: number;
  vx: number; vy: number; tw: number; tws: number;
  blue: boolean; spark: boolean;
};

export default function BrandHeroParticles({
  parallax,
}: {
  parallax: MutableRefObject<{ px: number; py: number }>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = window.innerWidth < 640 ? 90 : 230; // fewer on mobile
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const R = () => Math.random();
    const particles: P[] = Array.from({ length: count }, () => ({
      x: R(), y: R(), z: 0.3 + R() * 0.7, r: 0.4 + R() * 1.7,
      vx: (R() * 2 - 1) * 0.00006, vy: -(0.00002 + R() * 0.00008),
      tw: R() * Math.PI * 2, tws: 0.4 + R() * 1.6,
      blue: R() < 0.55, spark: R() < 0.06,
    }));

    let raf = 0;
    let running = true;
    let last = performance.now();
    const step = () => {
      if (!running) return;
      const now = performance.now();
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);
      const { px, py } = parallax.current;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.tw += p.tws * dt * 0.001;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        const tw = 0.5 + 0.5 * Math.sin(p.tw);
        const a = (p.spark ? 0.25 + 0.75 * Math.pow(tw, 6) : 0.22 + 0.55 * tw) * p.z;
        const X = p.x * w + px * p.z * 24;
        const Y = p.y * h + py * p.z * 24;
        const rad = p.r * (0.6 + p.z);
        ctx.beginPath();
        ctx.arc(X, Y, rad, 0, Math.PI * 2);
        ctx.fillStyle = p.blue ? `rgba(120,185,255,${a})` : `rgba(225,238,255,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) {
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [parallax]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
