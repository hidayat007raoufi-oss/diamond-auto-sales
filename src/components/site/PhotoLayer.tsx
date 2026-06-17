"use client";

import { useState } from "react";

/**
 * Renders a real photo over a gradient/silhouette fallback. Shows a shimmer
 * skeleton while loading, fades in smoothly on load, and disappears if the
 * image is missing or fails — so the fallback behind it shows. Lazy by
 * default; eager for the hero (LCP).
 */
export default function PhotoLayer({
  src,
  alt = "",
  eager = false,
  className = "",
}: {
  src?: string;
  alt?: string;
  eager?: boolean;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  const [loaded, setLoaded] = useState(false);
  if (!src || !ok) return null;
  return (
    <>
      {!loaded && <span aria-hidden className="skeleton absolute inset-0" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={(el) => {
          // Handle images already cached/complete before React attaches onLoad.
          if (el?.complete && el.naturalWidth > 0) setLoaded(true);
        }}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setOk(false)}
        onLoad={() => setLoaded(true)}
        className={`photo-fade ${loaded ? "is-loaded" : ""} absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </>
  );
}
