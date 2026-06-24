import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { formatDaily, type RentalClass } from "@/lib/rentals";

/** Dark glass rental-class card. Photo over tone, with daily/weekly pricing. */
export default function RentalCard({ rental }: { rental: RentalClass }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-0" style={{ background: rental.tone }} />
          <PhotoLayer src={rental.image} alt={`${rental.name} rental`} />
        </div>
        <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {rental.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight text-white">{rental.name}</h3>
        <p className="mt-1 text-sm text-white/40">{rental.examples}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/40">
          <span>{rental.seats} seats</span>
          <span>{rental.bags} bags</span>
          <span>Unlimited local miles</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-xl font-bold text-white">{formatDaily(rental.dailyFrom)}</p>
            <p className="mt-0.5 text-xs text-white/40">or ${rental.weeklyFrom}/week</p>
          </div>
          <Link
            href={`/rentals#reserve`}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(47,128,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_48px_-10px_rgba(47,128,255,0.9)]"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
