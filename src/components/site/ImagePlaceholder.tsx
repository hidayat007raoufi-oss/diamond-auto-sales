"use client";

import { useState } from "react";

/**
 * Labeled image placeholder. Point `src` at the final public path (e.g.
 * "/dealership/exterior.jpg"). Until that file exists it shows a clean,
 * intentional placeholder with the recommended size + filename. Drop the
 * real photo at that path (and redeploy) and it appears automatically — no
 * code change needed.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  dimensions,
  filename,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  dimensions: string;
  filename: string;
  className?: string;
  priority?: boolean;
}) {
  const [ok, setOk] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setOk(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 m-3 flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 p-4 text-center">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
            <circle cx="8.5" cy="9" r="1.5" />
          </svg>
          <p className="mt-3 text-sm font-semibold text-zinc-700">{label}</p>
          <p className="mt-1 text-xs text-zinc-500">Recommended {dimensions}</p>
          <p className="mt-2 rounded bg-zinc-200/70 px-2 py-0.5 font-mono text-[11px] text-zinc-600">
            public{filename}
          </p>
          <p className="mt-2 text-[11px] text-zinc-400">Drop your photo here to replace</p>
        </div>
      )}
    </div>
  );
}
