import Link from "next/link";

const ICON: Record<string, string> = {
  car: "M4 13l1.8-4.2A2 2 0 017.6 7.6h8.8a2 2 0 011.8 1.2L20 13v3h-2v-1H6v1H4z",
  diamond: "M6 4h12l3 5-9 11L3 9z",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  tag: "M4 11l7-7h6v6l-7 7z",
  card: "M3 7h18v10H3z M3 11h18",
};

const categories = [
  { label: "SUVs", icon: "car", href: "/inventory" },
  { label: "Sedans", icon: "car", href: "/inventory" },
  { label: "Trucks", icon: "car", href: "/inventory" },
  { label: "Luxury", icon: "diamond", href: "/inventory" },
  { label: "Performance", icon: "bolt", href: "/inventory" },
  { label: "Under $25k", icon: "tag", href: "/inventory" },
  { label: "Financing", icon: "card", href: "/financing" },
];

export default function CategoryScroller() {
  return (
    <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group flex min-w-[118px] shrink-0 flex-col items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:min-w-[136px]"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-surface-2 text-silver transition-colors group-hover:text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d={ICON[c.icon]} />
            </svg>
          </span>
          <span className="whitespace-nowrap text-sm font-medium text-white">{c.label}</span>
        </Link>
      ))}
    </div>
  );
}
