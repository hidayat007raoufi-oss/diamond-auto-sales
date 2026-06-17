"use client";

import { useState } from "react";

/**
 * Renders a real photo over a gradient/silhouette fallback. If the image is
 * missing or fails to load, it disappears and the fallback behind it shows —
 * so the layout never breaks. Lazy by default; eager for the hero (LCP).
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
  if (!src || !ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setOk(false)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
