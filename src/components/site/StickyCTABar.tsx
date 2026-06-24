"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHONE = "+19198878666";

/** Floating mobile action bar — appears after scrolling, hides near top + under overlays. */
export default function StickyCTABar() {
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(0);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    onScroll();
    const onOverlay = (e: Event) => setOverlay((n) => Math.max(0, n + (e as CustomEvent).detail));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("diamond:overlay", onOverlay);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("diamond:overlay", onOverlay);
    };
  }, []);

  const visible = show && overlay === 0;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl transition-all duration-300 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a href={`tel:${PHONE}`} aria-label="Call" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.05] text-white active:scale-95">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
          </svg>
        </a>
        <Link href="/inventory" className="flex-1 rounded-full border border-white/15 bg-white/[0.05] py-3 text-center text-[13px] font-semibold text-white active:scale-[0.98]">
          Inventory
        </Link>
        <Link href="/financing" className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-center text-[13px] font-semibold text-white shadow-[0_8px_30px_-12px_rgba(47,128,255,0.9)] active:scale-[0.98]">
          Get Approved
        </Link>
      </div>
    </div>
  );
}
