"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const fields = [
  { key: "make", label: "Make", options: ["Any Make", "Porsche", "Mercedes-AMG", "BMW", "Audi", "Tesla", "Land Rover", "Lexus", "Cadillac"] },
  { key: "price", label: "Price Range", options: ["Any Price", "Under $50k", "$50k–$100k", "$100k–$150k", "$150k+"] },
  { key: "mileage", label: "Mileage", options: ["Any Mileage", "Under 10k", "10k–25k", "25k–50k"] },
  { key: "body", label: "Body Style", options: ["Any Style", "Coupe", "Sedan", "SUV", "Truck"] },
];

export default function InventorySearchBar() {
  const router = useRouter();
  const [vals, setVals] = useState<Record<string, string>>({});

  return (
    <div className="glass grid gap-3 rounded-2xl border border-line p-3 sm:grid-cols-2 lg:grid-cols-5">
      {fields.map((f) => (
        <label key={f.key} className="flex flex-col gap-1.5 px-3 py-2">
          <span className="text-[10px] uppercase tracking-widest text-mute">{f.label}</span>
          <select
            value={vals[f.key] ?? f.options[0]}
            onChange={(e) => setVals((v) => ({ ...v, [f.key]: e.target.value }))}
            className="bg-transparent text-sm font-medium text-white outline-none [&>option]:bg-surface [&>option]:text-white"
          >
            {f.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      ))}
      <button
        onClick={() => {
          const params = new URLSearchParams();
          for (const [k, v] of Object.entries(vals)) {
            if (v && !v.startsWith("Any")) params.set(k, v);
          }
          const qs = params.toString();
          router.push(qs ? `/inventory?${qs}` : "/inventory");
        }}
        className="btn-sheen flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-silver-bright active:scale-[0.98]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
        Search
      </button>
    </div>
  );
}
