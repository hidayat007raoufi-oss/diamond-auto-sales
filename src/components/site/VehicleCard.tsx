import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

const statusStyle: Record<Vehicle["status"], string> = {
  Available: "text-emerald-300/80",
  Reserved: "text-amber-300/80",
  Sold: "text-mute",
};

/** Image-led editorial tile — no border, no box, no card chrome. */
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/inventory/${vehicle.id}`} className="group block">
      <div className="relative aspect-[16/11] overflow-hidden rounded-lg">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-0" style={{ background: vehicle.tone }} />
          <PhotoLayer src={vehicleImage(vehicle.id)} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute left-4 top-4 text-[11px] tracking-widest text-white/75">{vehicle.year}</span>
        <span className={`absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-widest ${statusStyle[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="mt-1 text-sm text-mute">
            {formatMileage(vehicle.mileage)} · {vehicle.power}
          </p>
        </div>
        <p className="text-base font-semibold tracking-tight text-white">{formatPrice(vehicle.price)}</p>
      </div>
    </Link>
  );
}
