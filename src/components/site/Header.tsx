"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DiamondLogo from "@/components/site/DiamondLogo";
import { pushOverlay, popOverlay } from "@/lib/overlay";

const links = [
  { href: "/inventory", label: "Inventory" },
  { href: "/rentals", label: "Rentals" },
  { href: "/financing", label: "Financing" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function Mark({ dark }: { dark: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Diamond Auto Sales — home">
      <DiamondLogo className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className={`text-[13px] font-bold tracking-[0.22em] ${dark ? "text-zinc-900" : "text-white"}`}>
          DIAMOND
        </span>
        <span className={`text-[8px] font-medium tracking-[0.3em] ${dark ? "text-zinc-500" : "text-white/60"}`}>
          AUTO SALES
        </span>
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

  const dark = scrolled; // dark text when header is white

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-zinc-200 bg-white/95 py-3 backdrop-blur" : "border-b border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Mark dark={dark} />

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                dark ? "text-zinc-600 hover:text-zinc-900" : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+19198878666"
            className={`hidden text-sm font-semibold md:block ${dark ? "text-zinc-900" : "text-white"}`}
          >
            (919) 887-8666
          </a>
          <Link
            href="/financing"
            className={`hidden rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:inline-flex ${
              dark ? "bg-zinc-900 text-white hover:bg-zinc-700" : "bg-white text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Get Pre-Approved
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className={`absolute h-0.5 w-6 rounded transition-all duration-300 ${dark ? "bg-zinc-900" : "bg-white"} ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 rounded transition-all duration-300 ${dark ? "bg-zinc-900" : "bg-white"} ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-white px-6 pb-10 pt-7 transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <Mark dark />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-zinc-100 py-5 text-2xl font-semibold tracking-tight text-zinc-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3 pt-8">
          <Link href="/inventory" onClick={() => setOpen(false)} className="block rounded-full bg-zinc-900 py-3.5 text-center text-sm font-semibold text-white">
            Browse Inventory
          </Link>
          <Link href="/rentals" onClick={() => setOpen(false)} className="block rounded-full border border-zinc-300 py-3.5 text-center text-sm font-semibold text-zinc-900">
            Rent a Vehicle
          </Link>
          <Link href="/financing" onClick={() => setOpen(false)} className="block rounded-full border border-zinc-300 py-3.5 text-center text-sm font-semibold text-zinc-900">
            Get Pre-Approved
          </Link>
          <a href="tel:+19198878666" className="block pt-3 text-center text-sm font-semibold text-zinc-900">
            (919) 887-8666
          </a>
        </div>
      </div>
    </header>
  );
}
