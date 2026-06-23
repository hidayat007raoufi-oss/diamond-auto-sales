import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { formatDaily, type RentalClass } from "@/lib/rentals";

/** Light rental-class card. Photo over tone, with daily/weekly pricing. */
export default function RentalCard({ rental }: { rental: RentalClass }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <div className="absolute inset-0" style={{ background: rental.tone }} />
          <PhotoLayer src={rental.image} alt={`${rental.name} rental`} />
        </div>
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-900 shadow">
          {rental.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight text-zinc-900">{rental.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{rental.examples}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
          <span>{rental.seats} seats</span>
          <span>{rental.bags} bags</span>
          <span>Unlimited local miles</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4">
          <div>
            <p className="text-xl font-bold text-zinc-900">{formatDaily(rental.dailyFrom)}</p>
            <p className="mt-0.5 text-xs text-zinc-500">or ${rental.weeklyFrom}/week</p>
          </div>
          <Link
            href={`/rentals#reserve`}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-zinc-700"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
