import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { estMonthly, formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

/** Photo-dominant vehicle listing (light theme). */
export default function ListingCard({ vehicle, priceDrop }: { vehicle: Vehicle; priceDrop?: boolean }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* photo dominates */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-0" style={{ background: vehicle.tone }} />
          <PhotoLayer src={vehicleImage(vehicle.id)} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>
        {priceDrop && (
          <span className="absolute left-3 top-3 rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow">
            Price Drop
          </span>
        )}
        {vehicle.status !== "Available" && (
          <span className="absolute right-3 top-3 rounded-md bg-zinc-900/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {vehicle.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight text-zinc-900">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          {vehicle.trim} · {formatMileage(vehicle.mileage)}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-zinc-900">{formatPrice(vehicle.price)}</p>
            <p className="mt-0.5 text-xs text-zinc-500">est. {estMonthly(vehicle.price)}/mo</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-all group-hover:gap-2.5">
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
