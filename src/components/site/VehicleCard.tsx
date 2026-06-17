import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import Tilt from "@/components/motion/Tilt";
import { formatMileage, formatPrice, vehicleImage, type Vehicle } from "@/lib/vehicles";

const statusStyle: Record<Vehicle["status"], string> = {
  Available: "text-emerald-300/80",
  Reserved: "text-amber-300/80",
  Sold: "text-mute",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const detail = `/inventory/${vehicle.id}`;
  return (
    <Tilt max={4} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <Link href={detail} className="block">
          <div className="relative aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <div className="absolute inset-0" style={{ background: vehicle.tone }} />
              <PhotoLayer src={vehicleImage(vehicle.id)} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
            {/* cursor-follow glare */}
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(220px circle at var(--glare-x,50%) var(--glare-y,40%), rgba(255,255,255,0.16), transparent 60%)" }}
            />
            {/* shine sweep on hover */}
            <div className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
            <span className="absolute left-4 top-4 z-20 rounded-full border border-line bg-black/45 px-2.5 py-1 text-[10px] tracking-widest text-white/80 backdrop-blur">
              {vehicle.year}
            </span>
            <span className={`absolute right-4 top-4 z-20 text-[10px] font-semibold uppercase tracking-widest ${statusStyle[vehicle.status]}`}>
              ● {vehicle.status}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h3 className="text-base font-semibold leading-tight tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="mt-1.5 text-sm text-mute">{formatMileage(vehicle.mileage)}</p>
            </div>
            <p className="text-base font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-silver-bright">
              {formatPrice(vehicle.price)}
            </p>
          </div>
        </Link>

        {/* conversion CTAs */}
        <div className="mt-auto grid grid-cols-2 gap-px border-t border-line bg-line">
          <Link
            href={`/contact?intent=testdrive&vehicle=${vehicle.id}`}
            className="flex items-center justify-center gap-1.5 bg-surface py-3.5 text-xs font-medium text-white transition-colors hover:bg-surface-2"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 11l2-5h10l2 5M5 11h14v4H5zM7.5 15v2M16.5 15v2" />
            </svg>
            Test Drive
          </Link>
          <Link
            href={`/contact?intent=carfax&vehicle=${vehicle.id}`}
            className="flex items-center justify-center gap-1.5 bg-surface py-3.5 text-xs font-medium text-white transition-colors hover:bg-surface-2"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 4h11l3 3v13H5zM9 9h6M9 13h6" />
            </svg>
            CARFAX
          </Link>
        </div>
      </article>
    </Tilt>
  );
}
