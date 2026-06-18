"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHONE = "+19198878666";

/** Floating mobile action bar — appears after ~35% scroll, hides near the top. */
export default function StickyCTABar() {
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      setShow(window.scrollY > 240 && pct > 0.3);
    };
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
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-500 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="glass-strong mx-auto flex max-w-md items-center gap-2 rounded-full border border-line-strong p-2 shadow-[0_14px_44px_-12px_rgba(0,0,0,0.85)]">
        <a href={`tel:${PHONE}`} aria-label="Call" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-white active:scale-95">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
          </svg>
        </a>
        <a href={`sms:${PHONE}`} aria-label="Text" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong text-white active:scale-95">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 5h16v11H8l-4 3z" />
          </svg>
        </a>
        <Link href="/financing" className="flex-1 rounded-full bg-white py-3 text-center text-[13px] font-semibold text-black active:scale-[0.98]">
          Get Pre-Approved
        </Link>
        <Link href="/inventory" className="flex-1 rounded-full border border-line-strong py-3 text-center text-[13px] font-medium text-white active:scale-[0.98]">
          Inventory
        </Link>
      </div>
    </div>
  );
}
