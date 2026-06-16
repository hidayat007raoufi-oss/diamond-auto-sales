import Link from "next/link";
import { estMonthly, formatMileage, formatPrice, type Vehicle } from "@/lib/vehicles";

const statusStyle: Record<Vehicle["status"], string> = {
  Available: "text-emerald-300/80",
  Reserved: "text-amber-300/80",
  Sold: "text-mute",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong"
    >
      {/* image — the dominant element */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          style={{ background: vehicle.tone }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(62%_55%_at_60%_22%,rgba(255,255,255,0.14),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface to-transparent" />

        {/* subtle vehicle glyph */}
        <svg viewBox="0 0 120 44" className="absolute bottom-5 left-1/2 h-10 w-32 -translate-x-1/2 text-white/15" fill="currentColor" aria-hidden>
          <path d="M8 30 L14 22 Q17 18 24 18 L46 18 Q52 12 64 12 L82 12 Q92 12 99 20 L108 28 Q112 30 112 33 L112 30 Q100 30 100 30 L20 30 Z" />
        </svg>
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/30">
          {vehicle.make}
        </span>

        <span className="absolute left-4 top-4 rounded-full border border-line bg-black/40 px-2.5 py-1 text-[10px] tracking-widest text-white/75 backdrop-blur">
          {vehicle.year}
        </span>
      </div>

      {/* details — minimal */}
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="text-[15px] font-semibold leading-tight text-white">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="mt-1.5 text-xs text-dim">
            {formatMileage(vehicle.mileage)} · {vehicle.power}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold text-white">{formatPrice(vehicle.price)}</p>
          <p className="mt-0.5 text-[10px] text-mute">est. {estMonthly(vehicle.price)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
        <span className={`text-[11px] font-medium uppercase tracking-widest ${statusStyle[vehicle.status]}`}>
          {vehicle.status}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white transition-all group-hover:gap-2.5">
          View Details
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
