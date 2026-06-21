"use client";

import Link from "next/link";
import { useState } from "react";
import { vehicles } from "@/lib/vehicles";
import HologramVehicle from "@/components/site/HologramVehicle";

const defs: { label: string; kind: string; href: string; match: (p: number, body: string) => boolean }[] = [
  { label: "SUVs", kind: "suv", href: "/inventory?body=SUV", match: (_p, b) => b === "SUV" },
  { label: "Sedans", kind: "sedan", href: "/inventory?body=Sedan", match: (_p, b) => b === "Sedan" },
  { label: "Coupes", kind: "coupe", href: "/inventory?body=Coupe", match: (_p, b) => b === "Coupe" },
  { label: "Performance", kind: "performance", href: "/inventory", match: (_p, b) => b === "Coupe" },
  { label: "Luxury", kind: "luxury", href: "/inventory", match: (p) => p >= 90000 },
];

const cats = defs.map((d) => ({
  ...d,
  count: vehicles.filter((v) => d.match(v.price, v.bodyType)).length,
}));

export default function VehicleSelector() {
  const [active, setActive] = useState(0);
  const cur = cats[active];

  return (
    <div className="flex flex-col items-center">
      {/* category names — editorial nav, no boxes */}
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:gap-x-10">
        {cats.map((c, i) => (
          <button
            key={c.label}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`text-lg font-medium tracking-tight transition-colors duration-300 sm:text-xl ${
              i === active ? "text-white" : "text-mute hover:text-dim"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* floating hologram centerpiece */}
      <HologramVehicle kind={cur.kind} className="mt-6 max-w-3xl" />

      {/* count + CTA */}
      <div className="-mt-2 flex flex-col items-center">
        <p className="display text-4xl text-white sm:text-5xl">
          {cur.count}
          <span className="ml-2 align-middle text-sm font-normal uppercase tracking-widest text-mute">Available</span>
        </p>
        <Link
          href={cur.href}
          className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-white"
        >
          Browse {cur.label}
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
