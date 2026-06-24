"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ListingCard from "@/components/site/ListingCard";
import type { Vehicle } from "@/lib/vehicles";

const bodyFilters = ["All", "Coupe", "Sedan", "SUV", "Truck"] as const;
const sorts = ["Featured", "Price: Low", "Price: High", "Lowest Miles"] as const;

function inPrice(p: number, label?: string) {
  switch (label) {
    case "Under $50k":
      return p < 50000;
    case "$50k–$100k":
      return p >= 50000 && p < 100000;
    case "$100k–$150k":
      return p >= 100000 && p < 150000;
    case "$150k+":
      return p >= 150000;
    default:
      return true;
  }
}
function inMiles(m: number, label?: string) {
  switch (label) {
    case "Under 10k":
      return m < 10000;
    case "10k–25k":
      return m >= 10000 && m < 25000;
    case "25k–50k":
      return m >= 25000 && m < 50000;
    default:
      return true;
  }
}

type Initial = { make?: string; body?: string; price?: string; mileage?: string };

export default function InventoryExplorer({
  vehicles,
  initial = {},
}: {
  vehicles: Vehicle[];
  initial?: Initial;
}) {
  const startBody = (bodyFilters as readonly string[]).includes(initial.body ?? "")
    ? (initial.body as (typeof bodyFilters)[number])
    : "All";
  const [body, setBody] = useState<(typeof bodyFilters)[number]>(startBody);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const activeChips = [initial.make, initial.price, initial.mileage].filter(Boolean) as string[];

  const list = useMemo(() => {
    let v = vehicles.filter(
      (x) =>
        (body === "All" || x.bodyType === body) &&
        (!initial.make || x.make === initial.make) &&
        inPrice(x.price, initial.price) &&
        inMiles(x.mileage, initial.mileage)
    );
    v = [...v].sort((a, b) => {
      switch (sort) {
        case "Price: Low":
          return a.price - b.price;
        case "Price: High":
          return b.price - a.price;
        case "Lowest Miles":
          return a.mileage - b.mileage;
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return v;
  }, [vehicles, body, sort, initial.make, initial.price, initial.mileage]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {bodyFilters.map((b) => (
            <button
              key={b}
              onClick={() => setBody(b)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 active:scale-[0.97] ${
                body === b
                  ? "border-transparent bg-white text-black"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-white/40">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
            className="rounded-full border border-white/15 bg-[#0c0c0e] px-4 py-2 text-[13px] text-white outline-none transition-colors hover:border-white/40"
          >
            {sorts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-white/40">{list.length} vehicles</p>
        {activeChips.map((c) => (
          <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60 backdrop-blur">
            {c}
          </span>
        ))}
        {activeChips.length > 0 && (
          <Link href="/inventory" className="text-xs font-semibold text-blue-400 hover:text-blue-300">
            Clear filters
          </Link>
        )}
      </div>

      {list.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <ListingCard key={v.id} vehicle={v} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-xl">
          <p className="text-white">No vehicles match these filters.</p>
          <Link href="/inventory" className="mt-3 inline-block text-sm font-semibold text-blue-400 hover:text-blue-300">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}
