import Link from "next/link";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import LeadForm from "@/components/site/LeadForm";
import PaymentCalculator from "@/components/site/PaymentCalculator";
import VehicleSelector from "@/components/site/VehicleSelector";
import InventoryShowcase from "@/components/site/InventoryShowcase";
import CrystalScene from "@/components/site/CrystalScene";
import HeroCenterpiece from "@/components/site/HeroCenterpiece";
import TrustLedger from "@/components/site/TrustLedger";
import TradeInEstimator from "@/components/site/TradeInEstimator";
import PerformanceDivision from "@/components/site/PerformanceDivision";
import ServiceRows from "@/components/site/ServiceRows";
import { vehicles } from "@/lib/vehicles";
import { testimonials } from "@/lib/testimonials";

const financingPoints = ["All credit considered", "Fast application", "Trade-ins welcome"];

const pillars = [
  { n: "01", title: "Buy", body: "Quality vehicles and transparent inventory.", href: "/inventory", icon: "M5 11l2-5h10l2 5M5 11h14v5H5zM7.5 16v1.5M16.5 16v1.5" },
  { n: "02", title: "Finance", body: "Fast approvals and flexible options.", href: "/financing", icon: "M3 7h18v10H3z M3 11h18" },
  { n: "03", title: "Protect", body: "Vehicle protection, CARFAX access, and service support.", href: "/contact?intent=protection", icon: "M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" },
  { n: "04", title: "Upgrade", body: "Detailing, tint, tires, customization, and performance builds.", href: "/services", icon: "M12 2l3 6 6 1-4.5 4.2L18 20l-6-3.2L6 20l1.5-6.8L3 9l6-1 3-6z" },
];

export default function Home() {
  const total = vehicles.length;
  const availableNow = vehicles.filter((v) => v.status !== "Sold").length;

  return (
    <>
      {/* ============ HERO — faceted crystal scene ============ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <CrystalScene />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <p className="rise kicker" style={{ animationDelay: "0.16s" }}>
              Raleigh · North Carolina
            </p>
            <h1
              className="rise display mt-5 text-[clamp(3rem,9vw,6.2rem)] leading-[0.9] text-white"
              style={{ animationDelay: "0.26s" }}
            >
              Find your<br className="hidden sm:block" /> <span className="text-metal">next vehicle.</span>
            </h1>
            <p
              className="rise mx-auto mt-6 max-w-md text-lg leading-relaxed text-dim lg:mx-0"
              style={{ animationDelay: "0.4s" }}
            >
              Luxury when you want it. Practical when you need it. Financing
              designed to get you moving.
            </p>
            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{ animationDelay: "0.52s" }}
            >
              <Button href="/inventory" className="w-full sm:w-auto">
                View Inventory
              </Button>
              <Button href="/financing" variant="ghost" className="w-full sm:w-auto">
                Get Pre-Approved
              </Button>
            </div>
            <div
              className="rise mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
              style={{ animationDelay: "0.64s" }}
            >
              {["Financing Available", "CARFAX Available", "Quality Inspected Vehicles", "Raleigh, NC"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-2 text-[13px] text-dim">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="rise order-first lg:order-last" style={{ animationDelay: "0.08s" }}>
            <HeroCenterpiece className="lg:scale-110" />
          </div>
        </div>
      </section>

      {/* ============ INVENTORY — the star ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="kicker">Browse the lineup</p>
          <h2 className="display mt-3 text-[2.4rem] leading-[1.04] text-white sm:text-5xl">
            Find your category.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10">
            <VehicleSelector />
          </div>
        </Reveal>

        <div className="mt-24 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Inventory"
            title={<>Discover what&apos;s available.</>}
            intro="Browse selected vehicles ready for sale in Raleigh."
          />
          <Reveal delay={120}>
            <Button href="/inventory" variant="ghost" className="hidden sm:inline-flex">
              View all
            </Button>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
            <span className="text-white">
              {total} <span className="text-mute">in inventory</span>
            </span>
            <span className="h-4 w-px bg-line" />
            <span className="text-white">
              {availableNow} <span className="text-mute">available now</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10">
            <InventoryShowcase />
          </div>
        </Reveal>

        <div className="mt-10">
          <Button href="/inventory" variant="ghost">
            View all inventory
          </Button>
        </div>
      </section>

      {/* ============ ONE-STOP ECOSYSTEM ============ */}
      <section className="relative overflow-hidden bg-bg-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_0%,rgba(22,38,70,0.5),transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            kicker="One Brand. Every Need."
            title={<>More than a dealership.</>}
            intro="Sales, financing, service, protection, customization, and performance support under one brand."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            {pillars.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex items-center gap-5 border-b border-line/50 py-7 sm:gap-8"
              >
                <span className="font-mono text-xs tracking-widest text-mute">{p.n}</span>
                <span className="flex-1">
                  <span className="display block text-2xl tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-3xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm text-mute">{p.body}</span>
                </span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST LEDGER ============ */}
      <section className="bg-bg-2">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <SectionHeading
            kicker="Verified & Trusted"
            title={<>Shop with confidence.</>}
            intro="Vehicle history, inspections, financing, and trust — all on the record."
          />
          <div className="mt-12">
            <TrustLedger />
          </div>
        </div>
      </section>

      {/* ============ FINANCING ============ */}
      <section className="relative overflow-hidden bg-bg-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_70%_at_80%_50%,rgba(20,42,84,0.5),transparent_64%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="Financing"
              title={<>Financing made clear.</>}
              intro="Apply online or speak with our team to explore options for your next vehicle."
            />
            <ul className="mt-8 space-y-3.5">
              {financingPoints.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <li className="flex items-center gap-3 text-[15px] text-dim">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/financing">Start Financing</Button>
            </div>
          </div>
          <Reveal delay={120} blur>
            <PaymentCalculator />
          </Reveal>
        </div>
      </section>

      {/* ============ TRADE-IN ESTIMATOR ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="Trade-In"
              title={<>Know what your vehicle is worth.</>}
              intro="Get a real trade value in minutes and put it straight toward your next Diamond vehicle."
            />
            <ul className="mt-8 space-y-3.5">
              {["Top-dollar offers", "Apply your value instantly", "We buy even if you still owe"].map(
                (p, i) => (
                  <Reveal key={p} delay={i * 80}>
                    <li className="flex items-center gap-3 text-[15px] text-dim">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  </Reveal>
                )
              )}
            </ul>
          </div>
          <Reveal delay={120} blur>
            <TradeInEstimator />
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES — secondary ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Service"
          title={<>Services after the sale.</>}
          intro="Tap any service to see what's included. In-house care from our specialists."
        />
        <div className="mt-12">
          <ServiceRows />
        </div>
        <div className="mt-10">
          <Button href="/contact" variant="ghost">
            Schedule Service
          </Button>
        </div>
      </section>

      {/* ============ PERFORMANCE DIVISION ============ */}
      <PerformanceDivision />

      {/* ============ REVIEWS / TRUST ============ */}
      <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-bg-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_28%,rgba(42,54,82,0.4),transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              kicker="Reviews"
              title={<>Trusted by drivers across Raleigh.</>}
            />
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-dim">4.9 / 5 · 180+ reviews</span>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 space-y-12">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="max-w-3xl border-l border-line/60 pl-6 sm:pl-8">
                  <blockquote className="display text-2xl leading-snug text-white/90 sm:text-[2rem]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm tracking-wide text-mute">
                    {t.name} · {t.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / LEAD GEN ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              kicker="Contact"
              title={<>Ready to find your next vehicle?</>}
              intro="Tell us what you're after and our team will confirm availability — usually within one business day."
            />
            <div className="mt-10 space-y-5">
              {[
                { label: "Call", value: "(919) 887-8666", href: "tel:+19198878666" },
                { label: "Visit", value: "5915 Triangle Drive, Raleigh, NC 27616" },
                { label: "Hours", value: "Mon–Fri 9–7 · Sat 9–5 · Sun closed" },
              ].map((row) => (
                <Reveal key={row.label}>
                  <div className="flex items-center gap-6 border-b border-line pb-5">
                    <span className="w-14 shrink-0 text-[11px] uppercase tracking-widest text-mute">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className="text-lg text-white transition-colors hover:text-silver">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-lg text-white">{row.value}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-3xl border border-line">
                <iframe
                  title="Diamond Auto Sales — Raleigh location"
                  className="h-56 w-full grayscale invert-[0.92] contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=5915%20Triangle%20Drive%20Raleigh%20NC%2027616&z=13&output=embed"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} blur>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
