"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";
import { pushOverlay, popOverlay } from "@/lib/overlay";
import { SOCIAL_LINKS } from "@/lib/social";

const links = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/experience", label: "Experience" },
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

function Mark() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Diamond Auto Sales — home">
      <DiamondLogo className="h-6 w-6" />
      <span className="flex flex-col leading-none">
        <span className="text-[12px] font-semibold tracking-[0.2em] text-[#1d1d1f]">DIAMOND</span>
        <span className="text-[7.5px] font-medium tracking-[0.3em] text-[#6e6e73]">AUTO SALES</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) pushOverlay();
    return () => {
      document.body.style.overflow = "";
      if (open) popOverlay();
    };
  }, [open]);

  return (
    <header className="subnav-frost fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Mark />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-normal text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a href="tel:+19198878666" className="hidden text-[13px] font-medium text-[#1d1d1f] md:block">
            (919) 887-8666
          </a>
          <Link href="/financing" className="hidden text-[13px] font-normal text-[#0071e3] hover:underline sm:block">
            Get Approved
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative grid h-9 w-9 place-items-center lg:hidden"
          >
            <span className={`absolute h-px w-5 bg-[#1d1d1f] transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-5 bg-[#1d1d1f] transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </div>

      {/* ---------- Full-screen mobile menu (Apple-clean, white) ---------- */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-white transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-12 items-center justify-between px-5">
          <Mark />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full text-[#1d1d1f] transition-colors hover:bg-black/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-2">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
              className={`border-b border-black/[0.07] py-4 text-[28px] font-semibold tracking-tight text-[#1d1d1f] transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-9 pt-4">
          <div className="grid grid-cols-3 gap-3">
            <a href="tel:+19198878666" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#f5f5f7] py-3.5 text-xs font-medium text-[#1d1d1f]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
              </svg>
              Call Now
            </a>
            <Link href="/financing" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#0071e3] py-3.5 text-xs font-medium text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 12l4 4L19 7" />
              </svg>
              Get Approved
            </Link>
            <Link href="/inventory" onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#f5f5f7] py-3.5 text-xs font-medium text-[#1d1d1f]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth="1.6">
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
                className="grid h-10 w-10 place-items-center rounded-full bg-[#f5f5f7] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
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
