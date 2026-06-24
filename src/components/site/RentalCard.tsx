import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { formatDaily, type RentalClass } from "@/lib/rentals";

/** Apple light rental-class tile. Photo over tone, with daily/weekly pricing. */
export default function RentalCard({ rental }: { rental: RentalClass }) {
  return (
    <div className="bento bento-hover group flex flex-col bg-white ring-1 ring-black/[0.06] hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.3)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <div className="absolute inset-0" style={{ background: rental.tone }} />
          <PhotoLayer src={rental.image} alt={`${rental.name} rental`} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-white backdrop-blur">
          {rental.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold leading-tight tracking-tight text-[#1d1d1f]">{rental.name}</h3>
        <p className="mt-1 text-[13px] text-[#6e6e73]">{rental.examples}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#86868b]">
          <span>{rental.seats} seats</span>
          <span>{rental.bags} bags</span>
          <span>Unlimited local miles</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-black/[0.06] pt-4">
          <div>
            <p className="text-[19px] font-semibold text-[#1d1d1f]">{formatDaily(rental.dailyFrom)}</p>
            <p className="mt-0.5 text-[12px] text-[#86868b]">or ${rental.weeklyFrom}/week</p>
          </div>
          <Link href="/rentals#reserve" className="pill pill-blue h-8 px-3.5 text-[12px]">
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
