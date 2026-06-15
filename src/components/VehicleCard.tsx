import Link from "next/link";
import { formatMileage, formatPrice, type Vehicle } from "@/lib/vehicles";

const statusStyles: Record<Vehicle["status"], string> = {
  Available: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Sold: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${vehicle.accent}`}
      >
        <span className="text-sm font-medium uppercase tracking-widest text-white/70">
          {vehicle.bodyType}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[vehicle.status]}`}
        >
          {vehicle.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-navy">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          {formatMileage(vehicle.mileage)} · {vehicle.fuel} · {vehicle.drivetrain}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-navy">
            {formatPrice(vehicle.price)}
          </span>
          <span className="text-sm font-medium text-gold-dark group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
