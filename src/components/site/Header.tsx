"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";
import HomeNavigation from "@/components/site/HomeNavigation";
import { pushOverlay, popOverlay } from "@/lib/overlay";

export default function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const previousOverflow = document.body.style.overflow;
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    close.current?.focus();
    pushOverlay();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
      popOverlay();
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <header className="subnav-frost-dark fixed inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Diamond Auto Sales home" className="grid h-10 w-10 place-items-center">
          <DiamondLogo className="h-6 w-6" />
        </Link>
        <HomeNavigation />
        <a href="mailto:hello@diamondautonc.com?subject=Service%20appointment%20request" className="hidden text-sm text-[#a8caff] hover:underline sm:block">Book Service</a>
        <button ref={trigger} aria-expanded={open} aria-controls="mobile-site-navigation" aria-label="Menu" type="button" onClick={() => setOpen(true)} className="grid h-10 w-10 place-content-center gap-1.5 lg:hidden">
          <span className="h-px w-5 bg-current" />
          <span className="h-px w-5 bg-current" />
        </button>
      </div>
      <div
        id="mobile-site-navigation"
        inert={!open}
        className={`fixed inset-x-0 top-0 flex h-dvh flex-col bg-[#f3f6fc] text-[#111a2d] transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onKeyDown={(event) => { if (event.key === "Escape") dismiss(); }}
      >
        <div className="flex h-12 items-center justify-between px-5">
          <Link href="/" aria-label="Diamond Auto Sales home" onClick={dismiss}><DiamondLogo className="h-6 w-6" /></Link>
          <button ref={close} type="button" onClick={dismiss} className="grid min-h-10 place-items-center px-2 text-sm">Close menu</button>
        </div>
        <HomeNavigation mobile onNavigate={dismiss} />
      </div>
    </header>
  );
}
