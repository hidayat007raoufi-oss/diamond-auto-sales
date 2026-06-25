import Link from "next/link";
import SubNav from "@/components/site/SubNav";
import ListingCard from "@/components/site/ListingCard";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import PhotoLayer from "@/components/site/PhotoLayer";
import Reveal from "@/components/motion/Reveal";
import { vehicles, getVehicle, vehicleImage, formatPrice } from "@/lib/vehicles";
import { rentals } from "@/lib/rentals";
import { FEATURED_PERFORMANCE_ID } from "@/lib/featured";

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
  const perfCar = FEATURED_PERFORMANCE_ID ? getVehicle(FEATURED_PERFORMANCE_ID) : null;

  return (
    <div id="top" className="bg-white">
      <SubNav title="Diamond Auto" links={subnavLinks} cta={{ label: "Reserve", href: "/contact?intent=test-drive" }} appearAfter={560} tone="light" />

      {/* ============ HERO 1 — PERFORMANCE (black) ============ */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-24 text-center text-white sm:px-8">
        <p className="apple-metric-label text-[#0071e3]">
          {perfCar ? "Now Available" : "Performance"}
        </p>
        <h1 className="apple-headline mt-3 max-w-4xl text-balance">
          {perfCar ? (
            <>{perfCar.year} {perfCar.make} {perfCar.model}.</>
          ) : (
            <>Performance, perfected.</>
          )}
        </h1>
        <p className="apple-sub mt-4 max-w-2xl text-white/70">
          {perfCar
            ? `${perfCar.trim} · ${perfCar.power} · ${formatPrice(perfCar.price)}`
            : "Hand-picked, inspected, and ready to drive. Our standout vehicles, front and center."}
        </p>
        <div className="mt-7 flex items-center gap-4">
          <Link href={perfCar ? `/inventory/${perfCar.id}` : "/inventory"} className="pill pill-dark">
            Learn more
          </Link>
          <Link
            href={perfCar ? `/contact?intent=test-drive&vehicle=${perfCar.id}` : "/contact?intent=test-drive"}
            className="pill pill-blue"
          >
            Reserve
          </Link>
        </div>

        {/* product visual */}
        <div className="mt-12 w-full max-w-4xl">
          {perfCar ? (
            <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-[28px]">
              <div className="absolute inset-0" style={{ background: perfCar.tone }} />
              <PhotoLayer src={vehicleImage(perfCar.id)} alt={`${perfCar.year} ${perfCar.make} ${perfCar.model}`} eager />
            </div>
          ) : (
            <ImagePlaceholder
              src="/hero/performance.jpg"
              alt="Featured performance vehicle"
              label="Featured performance vehicle"
              dimensions="2400×1350"
              filename="/hero/performance.jpg"
              priority
              className="aspect-[16/9] w-full rounded-[28px]"
            />
          )}
        </div>

        <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="scroll-hint h-2 w-1 rounded-full bg-white/70" />
          </div>
        </div>
      </section>

      {/* ============ HERO 2 — RENTALS (white) ============ */}
      <section id="rentals" className="relative flex min-h-[100svh] scroll-mt-16 flex-col items-center justify-center overflow-hidden bg-white px-5 pb-16 pt-24 text-center sm:px-8">
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
      <section id="inventory" className="scroll-mt-16 bg-[#f5f5f7]">
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

      {/* ============ BENTO — the business (white) ============ */}
      <section id="services" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal blur>
            <h2 id="financing" className="scroll-mt-24 text-[40px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-5xl">
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
