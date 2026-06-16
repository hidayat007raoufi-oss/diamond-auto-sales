"use client";

import { useMemo, useState } from "react";
import VehicleCard from "@/components/site/VehicleCard";
import type { Vehicle } from "@/lib/vehicles";

const bodyFilters = ["All", "Coupe", "Sedan", "SUV", "Truck"] as const;
const sorts = ["Featured", "Price: Low", "Price: High", "Lowest Miles"] as const;

export default function InventoryExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [body, setBody] = useState<(typeof bodyFilters)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");

  const list = useMemo(() => {
    let v = vehicles.filter((x) => (body === "All" ? true : x.bodyType === body));
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
  }, [vehicles, body, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {bodyFilters.map((b) => (
            <button
              key={b}
              onClick={() => setBody(b)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                body === b
                  ? "border-transparent bg-white text-black"
                  : "border-line text-dim hover:border-line-strong hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-mute">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
            className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-white outline-none transition-colors hover:border-line-strong"
          >
            {sorts.map((s) => (
              <option key={s} value={s} className="bg-surface text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-mute">{list.length} vehicles</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
