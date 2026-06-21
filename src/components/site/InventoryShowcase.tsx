import Link from "next/link";
import { featuredVehicles, formatMileage, formatPrice } from "@/lib/vehicles";

/** Editorial "current collection" — a typographic vehicle index. No cards, no images. */
export default function InventoryShowcase() {
  const featured = featuredVehicles();
  return (
    <div className="border-t border-line/60">
      {featured.map((v) => (
        <Link
          key={v.id}
          href={`/inventory/${v.id}`}
          className="group flex items-center justify-between gap-6 border-b border-line/60 py-6 sm:py-7"
        >
          <div className="min-w-0">
            <p className="display text-2xl tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-[1.9rem]">
              {v.make} {v.model}
            </p>
            <p className="mt-1.5 truncate text-sm text-mute">
              {v.year} · {v.trim} · {v.power} · {formatMileage(v.mileage)}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-5">
            <span className="display text-lg text-metal sm:text-2xl">{formatPrice(v.price)}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
