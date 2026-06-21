"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";

export default function ServicesAccordion() {
  const [open, setOpen] = useState<string | null>(services[0].id);

  return (
    <div className="border-t border-line/70">
      {services.map((s, i) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id} className="border-b border-line/70">
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-6 text-left sm:py-7"
            >
              <span className="hidden w-10 shrink-0 font-mono text-xs text-mute sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`display flex-1 text-[1.9rem] leading-none tracking-tight transition-colors duration-300 sm:text-4xl ${
                  isOpen ? "text-white" : "text-white/65 group-hover:text-white"
                }`}
              >
                {s.name}
              </span>
              <span className="hidden text-sm text-mute md:block">{s.tagline}</span>
              <span className="ml-2 grid h-8 w-8 shrink-0 place-items-center text-silver">
                <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>

            <div className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="min-h-0">
                <div className="grid gap-8 pb-9 sm:grid-cols-[1.2fr_1fr] sm:pl-[3.75rem]">
                  <div>
                    <p className="max-w-md text-base leading-relaxed text-dim">{s.description}</p>
                    <p className="mt-4 text-[15px] text-white/85">{s.benefit}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/contact?intent=service&service=${s.id}`}
                        className="btn-sheen inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-silver-bright active:scale-[0.98]"
                      >
                        Request Service
                      </Link>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent("diamond:open-ai"))}
                        className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08] active:scale-[0.98]"
                      >
                        Ask Diamond AI
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-mute">Includes</p>
                    <ul className="mt-3 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-sm text-zinc-200">
                          <span className="h-px w-4 shrink-0 bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-sm font-semibold text-white">{s.priceFrom}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
