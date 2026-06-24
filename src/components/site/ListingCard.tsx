import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { estMonthly, formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

/** Apple-style product tile (light). Modular — swap vehicles freely. */
export default function ListingCard({ vehicle, priceDrop }: { vehicle: Vehicle; priceDrop?: boolean }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="bento bento-hover group flex flex-col bg-white ring-1 ring-black/[0.06] hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.3)]"
    >
      {/* photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <div className="absolute inset-0" style={{ background: vehicle.tone }} />
          <PhotoLayer src={vehicleImage(vehicle.id)} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>
        {priceDrop && (
          <span className="absolute left-3 top-3 rounded-full bg-[#0071e3] px-2.5 py-1 text-[11px] font-medium text-white">
            Price Drop
          </span>
        )}
        {vehicle.status !== "Available" && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
            {vehicle.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-[#1d1d1f]">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="mt-1 text-[13px] text-[#6e6e73]">
          {vehicle.trim} · {formatMileage(vehicle.mileage)}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[19px] font-semibold text-[#1d1d1f]">{formatPrice(vehicle.price)}</p>
            <p className="mt-0.5 text-[12px] text-[#86868b]">est. {estMonthly(vehicle.price)}/mo</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[14px] text-[#0071e3] transition-all group-hover:gap-1.5">
            Learn more
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
