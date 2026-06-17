"use client";

import { useEffect, useState } from "react";
import PhotoLayer from "@/components/site/PhotoLayer";

/**
 * Vehicle media viewer: cinematic presentation that opens a fullscreen
 * lightbox with click-to-zoom. Structured so a multi-image gallery or a
 * 360° frame set can drop in later without architectural changes.
 */
export default function ImageZoom({
  src,
  tone,
  alt,
}: {
  src?: string;
  tone: string;
  alt: string;
}) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${alt} fullscreen`}
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line"
      >
        <div className="absolute inset-0 kenburns" style={{ background: tone }} />
        <PhotoLayer src={src} alt={alt} eager />
        <span className="absolute left-5 top-5 rounded-full border border-line bg-black/40 px-3 py-1 text-[11px] tracking-widest text-white/80 backdrop-blur">
          27-Point Inspected
        </span>
        <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-line bg-black/45 text-white/85 backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 4H5v4M15 4h4v4M9 20H5v-4M15 20h4v-4" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => {
              e.stopPropagation();
              setZoom((z) => !z);
            }}
            className={`max-h-[90vh] max-w-[92vw] rounded-2xl object-contain transition-transform duration-500 ${
              zoom ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-black/50 text-white transition-colors hover:bg-white hover:text-black"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
