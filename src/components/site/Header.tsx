"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";
import { pushOverlay, popOverlay } from "@/lib/overlay";
import { SOCIAL_LINKS } from "@/lib/social";

const links = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/financing", label: "Financing" },
  { href: "/rentals", label: "Rentals" },
  { href: "/services", label: "Services" },
  { href: "/our-story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

const ICONS: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .46 1.4.86.4.4.66.8.86 1.4.17.4.36 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.8 3.8 0 01-.86 1.4 3.8 3.8 0 01-1.4.86c-.4.17-1 .36-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.8 3.8 0 01-1.4-.86 3.8 3.8 0 01-.86-1.4c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.46-1 .86-1.4.4-.4.8-.66 1.4-.86.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.4a6.4 6.4 0 100 12.8 6.4 6.4 0 000-12.8zm0 2.2a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4zm6.6-.4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  facebook:
    "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z",
};

function Mark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Diamond Auto Sales — home">
      <DiamondLogo className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className={`text-[13px] font-bold tracking-[0.22em] ${light ? "text-white" : "text-white"}`}>DIAMOND</span>
        <span className="text-[8px] font-medium tracking-[0.3em] text-blue-300/70">AUTO SALES</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) pushOverlay();
    return () => {
      document.body.style.overflow = "";
      if (open) popOverlay();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-black/70 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Mark />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:+19198878666" className="hidden text-sm font-semibold text-white md:block">
            (919) 887-8666
          </a>
          <Link
            href="/financing"
            className="hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_-10px_rgba(47,128,255,0.8)] transition-all hover:-translate-y-0.5 sm:inline-flex"
          >
            Get Approved
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className={`absolute h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 rounded bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {/* ---------- Full-screen glassmorphism mobile menu ---------- */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-black/80 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* ambient blue glow */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(47,128,255,0.18),transparent_70%)]" />

        <div className="relative flex items-center justify-between px-6 pt-7">
          <Mark />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.14]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="relative flex flex-1 flex-col justify-center px-6">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
              className={`border-b border-white/10 py-4 text-3xl font-semibold tracking-tight text-white/90 transition-all duration-500 hover:text-white ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="relative px-6 pb-9">
          <div className="grid grid-cols-3 gap-3">
            <a href="tel:+19198878666" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 text-xs font-semibold text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
              </svg>
              Call Now
            </a>
            <Link href="/financing" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 text-xs font-semibold text-white shadow-[0_8px_30px_-10px_rgba(47,128,255,0.8)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 12l4 4L19 7" />
              </svg>
              Get Approved
            </Link>
            <Link href="/inventory" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] py-3.5 text-xs font-semibold text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M3 12h18" />
              </svg>
              Inventory
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d={ICONS[s.icon]} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
