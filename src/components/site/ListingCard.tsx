import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { estMonthly, formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

/** Photo-dominant vehicle listing — dark premium glass. */
export default function ListingCard({ vehicle, priceDrop }: { vehicle: Vehicle; priceDrop?: boolean }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_-20px_rgba(47,128,255,0.5)]"
    >
      {/* photo dominates */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0c0c0e]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-0" style={{ background: vehicle.tone }} />
          <PhotoLayer src={vehicleImage(vehicle.id)} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>
        {priceDrop && (
          <span className="absolute left-3 top-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(47,128,255,0.8)]">
            Price Drop
          </span>
        )}
        {vehicle.status !== "Available" && (
          <span className="absolute right-3 top-3 rounded-md border border-white/15 bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
            {vehicle.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-white">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="mt-1 text-sm text-white/50">
          {vehicle.trim} · {formatMileage(vehicle.mileage)}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-chrome">{formatPrice(vehicle.price)}</p>
            <p className="mt-0.5 text-xs text-white/40">est. {estMonthly(vehicle.price)}/mo</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-all group-hover:gap-2.5 group-hover:text-blue-300">
            View Details
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
