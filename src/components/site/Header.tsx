"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/inventory", label: "Inventory" },
  { href: "/financing", label: "Financing" },
  { href: "/services", label: "Services" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

function Mark() {
  return (
    <Link href="/" className="flex items-center" aria-label="Diamond Auto Sales LLC — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-sm.webp" alt="Diamond Auto Sales LLC" className="logo-header h-11 w-auto" />
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong border-b border-line py-2.5" : "border-b border-transparent py-4"
      }`}
    >
      <div className="nav-in mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Mark />

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-[13px] font-medium tracking-wide text-dim transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-silver transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+19198878666"
            className="hidden items-center gap-2 text-[13px] font-medium text-dim transition-colors hover:text-white md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
            </svg>
            (919) 887-8666
          </a>
          <Link
            href="/inventory"
            className="btn-sheen hidden rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-black transition-colors hover:bg-silver-bright sm:inline-flex"
          >
            View Inventory
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className={`absolute h-px w-6 bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-6 bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`glass-strong fixed inset-0 top-0 z-40 flex flex-col gap-2 px-6 pt-28 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-b border-line py-5 text-3xl font-semibold tracking-tight text-white transition-transform"
            style={{
              transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(12px)",
              opacity: open ? 1 : 0,
            }}
          >
            {l.label}
          </Link>
        ))}
        <a href="tel:+19198878666" className="mt-8 text-sm tracking-widest text-dim">
          (919) 887-8666
        </a>
      </div>
    </header>
  );
}
