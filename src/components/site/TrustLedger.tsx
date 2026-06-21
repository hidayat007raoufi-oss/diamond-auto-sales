import Link from "next/link";

/** TODO: replace href="#" with real profile URLs (Google, CARFAX, etc.). */
const ledger = [
  { label: "Google Reviews", href: "#" },
  { label: "CARFAX Verified", href: "/contact?intent=carfax" },
  { label: "27-Point Inspection", href: "#" },
  { label: "Clean Title Guarantee", href: "#" },
  { label: "All Credit Financing", href: "/financing" },
  { label: "Top-Rated Dealer", href: "#" },
];

export default function TrustLedger() {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-x-16">
      {ledger.map((item) => {
        const external = item.href === "#" || item.href.startsWith("http");
        const cls =
          "group flex items-center justify-between border-b border-line/50 py-5";
        const inner = (
          <>
            <span className="display text-xl tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-2xl">
              {item.label}
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </>
        );
        return external ? (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link key={item.label} href={item.href} className={cls}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
