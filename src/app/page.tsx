import Link from "next/link";
import SubNav from "@/components/site/SubNav";
import BrandHero from "@/components/site/BrandHero";
import ExperienceFeature from "@/components/site/ExperienceFeature";
import ListingCard from "@/components/site/ListingCard";
import PhotoLayer from "@/components/site/PhotoLayer";
import Reveal from "@/components/motion/Reveal";
import { vehicles } from "@/lib/vehicles";
import { rentals } from "@/lib/rentals";

const subnavLinks = [
  { label: "Inventory", href: "#inventory" },
  { label: "Rentals", href: "#rentals" },
  { label: "Financing", href: "#financing" },
  { label: "Services", href: "#services" },
];

const bento = [
  {
    href: "/financing",
    eyebrow: "Financing",
    title: "Get approved before you arrive.",
    body: "Every credit situation — first-time buyers, rebuilding, and trade-ins welcome.",
    dark: true,
    cta: "Start application",
  },
  {
    href: "/contact?intent=trade",
    eyebrow: "Trade-In",
    title: "Top-dollar for your trade.",
    body: "A real offer applied straight to your next vehicle — even with a balance owed.",
    dark: false,
    cta: "Value your trade",
  },
  {
    href: "/services",
    eyebrow: "Detailing & Service",
    title: "Showroom-clean, in-house.",
    body: "Detailing, customization, and mechanical care under one roof.",
    dark: false,
    cta: "Explore services",
  },
  {
    href: "/our-story",
    eyebrow: "Our Story",
    title: "Built in Raleigh.",
    body: "A local dealership grown into North Carolina's full-service destination.",
    dark: true,
    cta: "Read our story",
  },
];

export default function Home() {
  const available = vehicles.filter((v) => v.status !== "Sold");
  const featured = available.slice(0, 6);

  return (
    <div id="top" className="bg-white">
      <SubNav title="Diamond Auto" links={subnavLinks} cta={{ label: "Reserve", href: "/contact?intent=test-drive" }} appearAfter={560} tone="light" />

      {/* ============ HERO 1 — BRAND SPLASH (black, 3D diamond) ============ */}
      <BrandHero />

      {/* ============ HERO 2 — RENTALS (white) ============ */}
      <section id="rentals" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-5 pb-16 pt-24 text-center sm:px-8">
        <p className="apple-metric-label text-[#0071e3]">Vehicle Rentals</p>
        <h2 className="apple-headline mt-3 max-w-4xl text-balance text-[#1d1d1f]">
          The fleet, on your schedule.
        </h2>
        <p className="apple-sub mt-4 max-w-2xl text-[#6e6e73]">
          Daily, weekly, and long-term rentals in every class — economy to luxury.
        </p>
        <div className="mt-7 flex items-center gap-4">
          <Link href="/rentals" className="pill pill-light">Learn more</Link>
          <Link href="/rentals#reserve" className="pill pill-blue">Reserve</Link>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rentals.map((r) => (
            <div key={r.id} className="bento relative aspect-[3/4] overflow-hidden bg-[#f5f5f7]">
              <div className="absolute inset-0" style={{ background: r.tone }} />
              <PhotoLayer src={r.image} alt={`${r.name} rental`} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-left">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-[12px] text-white/80">from ${r.dailyFrom}/day</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ INVENTORY SHOWCASE (light gray) ============ */}
      <section id="inventory" className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal blur>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-[40px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-5xl">Inventory.</h2>
                <p className="mt-3 text-[19px] text-[#6e6e73]">{available.length} vehicles available now in Raleigh.</p>
              </div>
              <Link href="/inventory" className="link-apple text-[15px]">
                View all ›
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 80} blur>
                <ListingCard vehicle={v} priceDrop={i === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3D EXPERIENCE FEATURE (black, full-bleed) ============ */}
      <ExperienceFeature />

      {/* ============ BENTO — the business (white) ============ */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal blur>
            <h2 id="financing" className="text-[40px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-5xl">
              Everything, in one place.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {bento.map((b, i) => (
              <Reveal key={b.href} delay={(i % 2) * 90} blur>
                <Link
                  href={b.href}
                  className={`bento bento-hover flex min-h-[280px] flex-col justify-between p-9 ${
                    b.dark ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
                  }`}
                >
                  <div>
                    <p className={`apple-metric-label ${b.dark ? "text-[#2997ff]" : "text-[#0071e3]"}`}>{b.eyebrow}</p>
                    <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight">{b.title}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${b.dark ? "text-white/65" : "text-[#6e6e73]"}`}>
                      {b.body}
                    </p>
                  </div>
                  <span className={`mt-6 inline-flex items-center gap-1 text-[15px] ${b.dark ? "text-[#2997ff]" : "text-[#0071e3]"}`}>
                    {b.cta}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
