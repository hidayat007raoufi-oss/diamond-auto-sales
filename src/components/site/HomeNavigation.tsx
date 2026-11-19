"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    label: "Services",
    description: "See repair and maintenance pricing.",
    links: [
      ["Oil Change & Maintenance", "/#oil"],
      ["Brakes & Suspension", "/#brakes"],
      ["Engine & Transmission", "/#engine"],
      ["A/C & Electrical", "/#ac"],
      ["Tires & Alignment", "/#tires"],
    ],
  },
  {
    label: "Customization",
    description: "Explore finishes and detailing packages.",
    links: [
      ["Window Tint", "/#tint"],
      ["Wraps", "/#wraps"],
      ["Body & Paint", "/#body"],
      ["Detailing", "/#detailing"],
    ],
  },
  {
    label: "Inventory",
    description: "Browse vehicles and explore the showroom.",
    links: [["Browse Inventory", "/inventory"], ["Explore in 3D", "/experience"], ["Financing", "/financing"]],
  },
  {
    label: "About",
    description: "Get to know Diamond Auto Sales in Raleigh.",
    links: [["Our Story", "/our-story"]],
  },
  {
    label: "Contact",
    description: "Get in touch or request a service appointment.",
    links: [["Contact & Location", "/contact"], ["Book Service by Email", "mailto:hello@diamondautonc.com?subject=Service%20appointment%20request"]],
  },
];

export default function HomeNavigation({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [active, setActive] = useState<string | null>(null);

  if (mobile) {
    return (
      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-6 py-3 text-[#10182a]">
        {sections.map(({ label, description, links }) => (
          <details key={label} name="mobile-home-nav" className="border-b border-black/10 py-4">
            <summary className="cursor-pointer text-xl font-semibold">{label}</summary>
            <p className="mt-3 text-sm text-slate-600">{description}</p>
            <ul className="mt-2">
              {links.map(([title, href]) => (
                <li key={href}><Link className="block py-2.5 text-[#155abe]" href={href} onClick={onNavigate}>{title}</Link></li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Main navigation" className="hidden h-full items-center gap-2 lg:flex">
      {sections.map(({ label, description, links }) => {
        const expanded = active === label;
        const id = `home-nav-${label.toLowerCase()}`;
        return (
          <div
            className="relative flex h-full items-center"
            key={label}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(label); }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && !event.currentTarget.querySelector(":focus-visible")) {
                setActive((current) => current === label ? null : current);
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setActive((current) => current === label ? null : current);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && expanded) {
                event.currentTarget.querySelector("button")?.focus();
                setActive(null);
              }
            }}
          >
            <button
              type="button"
              className="h-full cursor-pointer px-3 text-sm text-white/85 hover:text-white aria-expanded:text-[#a8caff]"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={(event) => setActive(event.detail > 0 && window.matchMedia("(hover: hover)").matches ? label : expanded ? null : label)}
            >
              {label}
            </button>
            <div
              id={id}
              hidden={!expanded}
              className="absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-b-2xl border border-white/15 bg-[#101827] p-4 shadow-2xl"
            >
              <p className="mb-2 text-sm text-slate-300">{description}</p>
              <ul>
                {links.map(([title, href]) => (
                  <li key={href}>
                    <Link href={href} onClick={() => setActive(null)} className="block rounded-lg px-2 py-2 text-sm text-white hover:bg-blue-400/15 focus-visible:bg-blue-400/15">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
