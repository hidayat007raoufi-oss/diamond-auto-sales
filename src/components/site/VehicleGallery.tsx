"use client";

import { useEffect, useState } from "react";
import { pushOverlay, popOverlay } from "@/lib/overlay";

type Media = { label: string; images: string[] };

export default function VehicleGallery({ media, alt }: { media: Media[]; alt: string }) {
  const cats = media.filter((m) => m.images.length > 0);
  const [cat, setCat] = useState(0);
  const [idx, setIdx] = useState(0);
  const [full, setFull] = useState(false);

  const images = cats[cat]?.images ?? [];
  const current = images[idx];

  // Open from a 360 hotspot (e.g. tap hood -> Engine Bay).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const label = (e as CustomEvent).detail?.label as string;
      const i = cats.findIndex((c) => c.label === label);
      if (i >= 0) {
        setCat(i);
        setIdx(0);
        setFull(true);
      }
    };
    window.addEventListener("diamond:gallery-open", onOpen);
    return () => window.removeEventListener("diamond:gallery-open", onOpen);
  }, [cats]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    pushOverlay();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      popOverlay();
    };
  }, [full]);

  if (!cats.length) return null;

  return (
    <div>
      {cats.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {cats.map((c, i) => (
            <button
              key={c.label}
              onClick={() => {
                setCat(i);
                setIdx(0);
              }}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 active:scale-95 ${
                i === cat ? "border-transparent bg-zinc-900 text-white" : "border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
              }`}
            >
              {c.label}
              <span className="ml-1.5 text-[10px] opacity-60">{c.images.length}</span>
            </button>
          ))}
        </div>
      )}

      {/* studio preview */}
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.6),transparent_70%)]" />
        <button onClick={() => setFull(true)} className="absolute inset-0 cursor-zoom-in" aria-label="View full screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} alt={`${alt} — ${cats[cat]?.label}`} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-6" />
          {/* floor reflection */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} aria-hidden alt="" className="absolute inset-x-0 top-[60%] mx-auto h-[36%] w-full scale-y-[-1] object-contain opacity-[0.10] [mask-image:linear-gradient(to_bottom,#000,transparent_72%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-[20%] bottom-[11%] h-6 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.18),transparent_70%)] blur-md" />
          <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 4H5v4M15 4h4v4M9 20H5v-4M15 20h4v-4" />
            </svg>
          </span>
        </button>
      </div>

      {/* thumbnails */}
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
        {images.map((im, i) => (
          <button
            key={im}
            onClick={() => setIdx(i)}
            className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border bg-zinc-50 transition-colors ${
              i === idx ? "border-zinc-400" : "border-zinc-200 hover:border-zinc-300"
            }`}
            aria-label={`Photo ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain p-1" />
          </button>
        ))}
      </div>

      {/* fullscreen */}
      {full && (
        <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-black/93 p-4 backdrop-blur-sm" onClick={() => setFull(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current} alt={alt} onClick={(e) => e.stopPropagation()} className="max-h-[80vh] max-w-[92vw] object-contain" />
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {images.map((im, i) => (
              <button key={im} onClick={() => setIdx(i)} className={`h-12 w-16 shrink-0 overflow-hidden rounded-md border ${i === idx ? "border-white" : "border-white/30"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
          <button
            onClick={() => setFull(false)}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white hover:text-zinc-900"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
