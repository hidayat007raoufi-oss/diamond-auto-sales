import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import Button from "@/components/site/Button";

/**
 * TODO: replace href="#" with your real profile URLs once available.
 * (Google Business reviews, CarGurus / AutoTrader / Cars.com dealer pages.)
 */
const marketplaces = [
  { name: "Google Reviews", href: "#", note: "Rated by local buyers" },
  { name: "CarGurus", href: "#", note: "Top-rated dealer" },
  { name: "AutoTrader", href: "#", note: "Verified listings" },
  { name: "Cars.com", href: "#", note: "Trusted marketplace" },
  { name: "CARFAX", href: "#", note: "History reports" },
];

const badges = [
  { label: "Warranty Options", icon: "M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" },
  { label: "27-Point Inspected", icon: "M5 12l4 4L19 7" },
  { label: "Financing — All Credit", icon: "M3 7h18v10H3z M3 11h18" },
  { label: "Clean Titles", icon: "M7 8h10M7 12h6M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-3 2z" },
];

export default function TrustSignals() {
  return (
    <section className="relative border-y border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Verified & Trusted"
          title={<>Shop with confidence.</>}
          intro="Request vehicle history, schedule a test drive, and get financing support before you visit."
          align="center"
        />

        {/* Marketplace links */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {marketplaces.map((m, i) => (
            <Reveal key={m.name} delay={i * 60}>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center justify-center gap-1 rounded-2xl border border-line bg-surface/60 px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-line-strong"
              >
                <span className="text-sm font-semibold text-white">{m.name}</span>
                <span className="text-[11px] text-mute">{m.note}</span>
                <span className="mt-1 text-[11px] font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  View →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Badges */}
        <Reveal>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 text-[12px] font-medium text-dim"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={b.icon} />
                </svg>
                {b.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#">View Google Reviews</Button>
            <Button href="/contact?intent=carfax" variant="ghost">
              Request CARFAX
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
