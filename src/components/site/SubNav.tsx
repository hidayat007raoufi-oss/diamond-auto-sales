"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

/**
 * Apple-style frosted sub-navigation. Sits just under the global header and
 * slides in once the user scrolls past the section hero, keeping the page
 * title, in-page anchors, and a high-intent CTA accessible.
 */
export default function SubNav({
  title,
  links = [],
  cta,
  tone = "light",
  appearAfter = 480,
}: {
  title: string;
  links?: NavLink[];
  cta?: NavLink;
  tone?: "light" | "dark";
  appearAfter?: number;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > appearAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [appearAfter]);

  const dark = tone === "dark";

  return (
    <div
      className={`fixed inset-x-0 top-12 z-40 transition-all duration-500 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      } ${dark ? "subnav-frost-dark" : "subnav-frost"}`}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          scroll
          className={`shrink-0 text-[15px] font-semibold tracking-tight ${dark ? "text-white" : "text-[#1d1d1f]"}`}
        >
          {title}
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[12px] font-normal transition-colors ${
                  dark ? "text-white/70 hover:text-white" : "text-[#1d1d1f]/70 hover:text-[#1d1d1f]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          {cta && (
            <Link href={cta.href} className="pill pill-blue h-8 px-3.5 text-[12px]">
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
