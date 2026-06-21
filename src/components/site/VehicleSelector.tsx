"use client";

import Link from "next/link";
import { useState } from "react";
import { vehicles, vehicleImage } from "@/lib/vehicles";

type Cat = { label: string; sample: string; href: string; count: number };

const defs: { label: string; sample: string; href: string; match: (p: number, body: string) => boolean }[] = [
  { label: "SUVs", sample: "range-rover-sport-autobiography", href: "/inventory?body=SUV", match: (_p, b) => b === "SUV" },
  { label: "Sedans", sample: "tesla-model-s-plaid", href: "/inventory?body=Sedan", match: (_p, b) => b === "Sedan" },
  { label: "Coupes", sample: "porsche-911-carrera-s", href: "/inventory?body=Coupe", match: (_p, b) => b === "Coupe" },
  { label: "Performance", sample: "bmw-m4-competition", href: "/inventory", match: (_p, b) => b === "Coupe" },
  { label: "Luxury", sample: "mercedes-amg-gt-53", href: "/inventory", match: (p) => p >= 90000 },
];

const cats: Cat[] = defs.map((d) => ({
  label: d.label,
  sample: d.sample,
  href: d.href,
  count: vehicles.filter((v) => d.match(v.price, v.bodyType)).length,
}));

export default function VehicleSelector() {
  const [active, setActive] = useState(0);
  const cur = cats[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      {/* category list — big editorial type, no boxes */}
      <ul className="order-last lg:order-first">
        {cats.map((c, i) => (
          <li key={c.label} className="border-b border-line/60 last:border-0">
            <Link
              href={c.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group flex items-baseline justify-between gap-4 py-3.5"
            >
              <span
                className={`display text-[2rem] leading-none tracking-tight transition-colors duration-300 sm:text-5xl ${
                  i === active ? "text-white" : "text-mute group-hover:text-dim"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`shrink-0 text-right text-xs uppercase tracking-widest transition-all duration-300 ${
                  i === active ? "text-accent opacity-100" : "text-mute opacity-60"
                }`}
              >
                {c.count} available
                <span className="ml-2 hidden sm:inline">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* stage — real photography, crossfade, studio reflection */}
      <Link
        href={cur.href}
        className="group relative block aspect-[16/11] overflow-hidden rounded-sm bg-[radial-gradient(78%_72%_at_55%_30%,#1b1e24,#000)]"
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_55%_18%,rgba(255,255,255,0.07),transparent_70%)]" />
        {cats.map((c, i) => (
          <span
            key={c.label}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={vehicleImage(c.sample)} alt={`${c.label} at Diamond Auto Sales`} className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
          </span>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <p className="display text-3xl text-white sm:text-4xl">{cur.label}</p>
            <p className="mt-1 text-sm text-dim">{cur.count} available now</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-3">
            View {cur.label}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
