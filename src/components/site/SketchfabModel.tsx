"use client";

import { useEffect, useRef, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";

const API_SRC = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";

/** Minimal shape of the bits of the Sketchfab Viewer API we use. */
type SketchfabApi = {
  start: () => void;
  addEventListener: (event: string, cb: (...args: unknown[]) => void) => void;
  setAutospin?: (value: number) => void;
};
type SketchfabClient = {
  init: (
    uid: string,
    opts: Record<string, unknown> & {
      success: (api: SketchfabApi) => void;
      error: () => void;
    }
  ) => void;
};
type SketchfabCtor = new (iframe: HTMLIFrameElement) => SketchfabClient;

const EMBED_PARAMS =
  "autostart=1&autospin=0.08&transparent=1&ui_theme=dark&ui_infos=0&ui_controls=1" +
  "&ui_stop=0&ui_watermark=0&ui_animations=0&ui_annotations=0&ui_help=0&ui_settings=0" +
  "&ui_vr=0&ui_ar=0&ui_fullscreen=0&ui_hint=0&dnt=1";

/**
 * Interactive Sketchfab model with a brand-aligned loading overlay that fades
 * only once the viewer is truly ready, a near-imperceptible auto-spin that
 * stops the instant the user interacts, and clean low-key attribution.
 */
export default function SketchfabModel({
  uid,
  title,
  author,
  authorUrl,
  modelUrl,
  className = "",
}: {
  uid: string;
  title: string;
  author: string;
  authorUrl: string;
  modelUrl: string;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    const reveal = () => !cancelled && setReady(true);

    // Fallback: load the model via plain embed URL if the API can't initialize.
    const fallback = () => {
      if (!cancelled && !iframe.src) {
        iframe.src = `https://sketchfab.com/models/${uid}/embed?${EMBED_PARAMS}`;
      }
      reveal();
    };

    const start = () => {
      const SF = (window as unknown as { Sketchfab?: SketchfabCtor }).Sketchfab;
      if (!SF) return fallback();
      try {
        const client = new SF(iframe);
        client.init(uid, {
          autostart: 1,
          autospin: 0.08, // nearly imperceptible
          transparent: 1,
          ui_theme: "dark",
          ui_infos: 0,
          ui_controls: 1,
          ui_stop: 0,
          ui_watermark: 0,
          ui_animations: 0,
          ui_annotations: 0,
          ui_help: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_ar: 0,
          ui_fullscreen: 0,
          ui_hint: 0,
          dnt: 1,
          success: (api) => {
            api.start();
            api.addEventListener("viewerready", reveal);
            // Stop the drift the moment the user takes control.
            api.addEventListener("camerastart", () => {
              try {
                api.setAutospin?.(0);
              } catch {
                /* no-op if unsupported */
              }
            });
          },
          error: fallback,
        });
      } catch {
        fallback();
      }
    };

    if ((window as unknown as { Sketchfab?: SketchfabCtor }).Sketchfab) {
      start();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${API_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", start);
        existing.addEventListener("error", fallback);
      } else {
        const s = document.createElement("script");
        s.src = API_SRC;
        s.async = true;
        s.onload = start;
        s.onerror = fallback;
        document.body.appendChild(s);
      }
    }

    // Safety net: never trap the user behind the loader.
    const t = window.setTimeout(reveal, 12000);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [uid]);

  return (
    <div className={`relative ${className}`}>
      <iframe
        ref={iframeRef}
        title={title}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />

      {/* Brand-aligned loading overlay — fades out once the viewer is ready */}
      <div
        aria-hidden={ready}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(47,128,255,0.16),transparent_70%)]" />
        <div className="relative grid place-items-center">
          <span className="absolute h-20 w-20 animate-spin rounded-full border border-white/10 border-t-[#2f80ff]/70" style={{ animationDuration: "1.1s" }} />
          <DiamondLogo className="h-9 w-9" />
        </div>
        <p className="relative mt-7 text-[11px] font-medium uppercase tracking-[0.34em] text-white/45">
          Preparing the model
        </p>
      </div>

      {/* Clean, low-key attribution (bottom-right) */}
      <a
        href={modelUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="absolute bottom-3 right-4 z-20 text-[10px] tracking-wide text-white/25 transition-colors hover:text-white/55"
      >
        “{title}” by {author}
      </a>
      {/* author credit link (kept separate so the name is its own target) */}
      <a
        href={authorUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="sr-only"
      >
        {author} on Sketchfab
      </a>
    </div>
  );
}
