import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

const statusStyle: Record<Vehicle["status"], string> = {
  Available: "text-emerald-300/80",
  Reserved: "text-amber-300/80",
  Sold: "text-mute",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.85)]"
    >
      {/* image — dominant */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <div className="absolute inset-0" style={{ background: vehicle.tone }} />
          <PhotoLayer
            src={vehicleImage(vehicle.id)}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-line bg-black/45 px-2.5 py-1 text-[10px] tracking-widest text-white/80 backdrop-blur">
          {vehicle.year}
        </span>
      </div>

      {/* details — minimal */}
      <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
        <div>
          <h3 className="text-base font-semibold leading-tight tracking-tight text-white">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="mt-1.5 text-sm text-mute">{formatMileage(vehicle.mileage)}</p>
        </div>
        <p className="text-base font-semibold tracking-tight text-white">{formatPrice(vehicle.price)}</p>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-4 sm:px-6">
        <span className={`text-[11px] font-medium uppercase tracking-widest ${statusStyle[vehicle.status]}`}>
          {vehicle.status}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-all group-hover:gap-2.5">
          View Details
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
