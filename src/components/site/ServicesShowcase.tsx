"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { services, type Service } from "@/lib/services";

export default function ServicesShowcase() {
  const [active, setActive] = useState<Service | null>(null);
  const [visible, setVisible] = useState(false);

  function open(s: Service) {
    setActive(s);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }
  function close() {
    setVisible(false);
    setTimeout(() => setActive(null), 320);
  }
  function askAI() {
    close();
    setTimeout(() => window.dispatchEvent(new CustomEvent("diamond:open-ai")), 220);
  }

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {services.map((s) => (
          <button key={s.id} onClick={() => open(s)} className="group text-left [perspective:1000px]">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-500 [transform-style:preserve-3d] hover:border-line-strong hover:[transform:translateY(-6px)_rotateY(5deg)]">
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-line text-silver">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{s.name}</p>
              <p className="mt-1 text-[11px] text-mute">{s.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore →
              </span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} style={{ perspective: "1400px" }} className="relative w-full max-w-lg">
            <div
              className={`glass-strong relative overflow-hidden rounded-3xl border border-line-strong p-7 transition-all duration-[420ms] sm:p-9 ${
                visible ? "opacity-100 [transform:rotateY(0)_scale(1)]" : "opacity-0 [transform:rotateY(-12deg)_scale(0.94)]"
              }`}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line-strong text-white transition-all duration-300 hover:rotate-90 hover:bg-white hover:text-black active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-silver">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d={active.icon} />
                </svg>
              </div>
              <h3 className="display mt-5 text-3xl text-white">{active.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{active.description}</p>

              <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {active.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[13px] text-zinc-200">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/contact?intent=service&service=${active.id}`}
                  className="btn-sheen flex-1 rounded-full bg-white py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-silver-bright active:scale-[0.98]"
                >
                  Request Service
                </Link>
                <button
                  onClick={askAI}
                  className="flex-1 rounded-full border border-line-strong py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
                >
                  Ask Diamond AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
