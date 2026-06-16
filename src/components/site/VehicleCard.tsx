import Link from "next/link";
import Tilt from "@/components/motion/Tilt";
import { estMonthly, formatMileage, formatPrice, type Vehicle } from "@/lib/vehicles";

const statusStyle: Record<Vehicle["status"], string> = {
  Available: "text-emerald-300/90",
  Reserved: "text-amber-300/90",
  Sold: "text-mute",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const sold = vehicle.status === "Sold";
  return (
    <Tilt className="h-full">
      <Link
        href={`/inventory/${vehicle.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
      >
        {/* Presentation surface */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 scale-100 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            style={{ background: vehicle.tone }}
          />
          {/* light sweep */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_15%,rgba(255,255,255,0.16),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-line bg-black/40 px-3 py-1 text-[10px] font-medium tracking-widest text-white/80 backdrop-blur">
            {vehicle.year}
          </span>
          <span className={`absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-widest ${statusStyle[vehicle.status]}`}>
            ● {vehicle.status}
          </span>
          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 select-none text-center text-xs uppercase tracking-[0.3em] text-white/25">
            {vehicle.make}
          </span>
        </div>

        {/* Detail */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold text-white">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="mt-0.5 text-xs text-dim">{vehicle.trim}</p>
            </div>
            <div className="text-right">
              <p className="text-[15px] font-semibold text-white">{formatPrice(vehicle.price)}</p>
              <p className="mt-0.5 text-[10px] text-mute">est. {estMonthly(vehicle.price)}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
            <Spec label="Power" value={vehicle.power} />
            <Spec label="0–60" value={vehicle.zeroToSixty} />
            <Spec label="Miles" value={formatMileage(vehicle.mileage).replace(" mi", "")} />
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-silver transition-colors group-hover:text-white">
            {sold ? "View details" : "Explore this vehicle"}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </Tilt>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-widest text-mute">{label}</p>
    </div>
  );
}
