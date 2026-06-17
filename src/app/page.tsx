import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import SectionHeading from "@/components/site/SectionHeading";
import VehicleCard from "@/components/site/VehicleCard";
import LeadForm from "@/components/site/LeadForm";
import PaymentCalculator from "@/components/site/PaymentCalculator";
import PhotoLayer from "@/components/site/PhotoLayer";
import InventorySearchBar from "@/components/site/InventorySearchBar";
import CategoryScroller from "@/components/site/CategoryScroller";
import CrystalScene from "@/components/site/CrystalScene";
import TrustSignals from "@/components/site/TrustSignals";
import TradeInEstimator from "@/components/site/TradeInEstimator";
import {
  estMonthly,
  featuredVehicles,
  formatMileage,
  formatPrice,
  vehicleImage,
  vehicles,
} from "@/lib/vehicles";
import { services } from "@/lib/services";
import { testimonials } from "@/lib/testimonials";

function SpecMini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-mute">{label}</p>
    </div>
  );
}

const financingPoints = ["All credit considered", "Fast application", "Trade-ins welcome"];

const REASON_ICON: Record<string, string> = {
  shield: "M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z",
  card: "M3 7h18v10H3z M3 11h18",
  swap: "M4 8h13l-3-3 M20 16H7l3 3",
  umbrella: "M12 3a9 9 0 019 9H3a9 9 0 019-9zM12 12v7a2 2 0 01-4 0",
  wrench: "M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2 2.3-2.3z",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z M12 10h.01",
};

const reasons = [
  { icon: "shield", title: "27-Point Inspection", body: "Every vehicle checked end to end before it's listed." },
  { icon: "card", title: "Financing Available", body: "All credit considered, with a fast online application." },
  { icon: "swap", title: "Trade-Ins Welcome", body: "Top-dollar offers, even if you still owe." },
  { icon: "umbrella", title: "Vehicle Protection", body: "Optional coverage to protect your investment." },
  { icon: "wrench", title: "In-House Service", body: "Detailing, tint, and mechanical under one roof." },
  { icon: "pin", title: "Raleigh-Based", body: "Local support across the Triangle." },
];

export default function Home() {
  const featured = featuredVehicles();
  const spotlight = featured[0];
  const supporting = featured.slice(1, 4);
  const total = vehicles.length;
  const availableNow = vehicles.filter((v) => v.status !== "Sold").length;

  return (
    <>
      {/* ============ HERO — faceted crystal scene ============ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <CrystalScene />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
          <div className="max-w-2xl">
            <p className="rise kicker" style={{ animationDelay: "0.1s" }}>
              Raleigh, North Carolina
            </p>
            <h1
              className="rise display mt-5 text-[3rem] leading-[0.96] text-white sm:text-7xl lg:text-[5rem]"
              style={{ animationDelay: "0.2s" }}
            >
              Find your next vehicle.
            </h1>
            <p
              className="rise mt-6 max-w-lg text-lg leading-relaxed text-dim"
              style={{ animationDelay: "0.35s" }}
            >
              Luxury when you want it. Practical when you need it. Financing
              designed to get you moving.
            </p>
            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.5s" }}
            >
              <Button href="/inventory" className="w-full sm:w-auto">
                View Inventory
              </Button>
              <Button href="/financing" variant="ghost" className="w-full sm:w-auto">
                Get Pre-Approved
              </Button>
            </div>
            <div
              className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3"
              style={{ animationDelay: "0.62s" }}
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
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-mute">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-silver to-transparent" />
        </div>
      </section>

      {/* ============ INVENTORY — the star ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <CategoryScroller />
        </Reveal>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
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
              <Counter to={total} /> <span className="text-mute">in inventory</span>
            </span>
            <span className="h-4 w-px bg-line" />
            <span className="text-white">
              <Counter to={availableNow} /> <span className="text-mute">available now</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8">
            <InventorySearchBar />
          </div>
        </Reveal>

        {/* spotlight — large hero tile */}
        <Reveal>
          <div className="mt-10 grid overflow-hidden rounded-3xl border border-line bg-surface/50 lg:grid-cols-2">
            <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
              <div className="absolute inset-0" style={{ background: spotlight.tone }} />
              <PhotoLayer
                src={vehicleImage(spotlight.id)}
                alt={`${spotlight.year} ${spotlight.make} ${spotlight.model}`}
                eager
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-line bg-black/40 px-3 py-1 text-[11px] tracking-widest text-white/80 backdrop-blur">
                Featured · {spotlight.year}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
              <div>
                <h3 className="display text-3xl text-white sm:text-4xl">
                  {spotlight.make} {spotlight.model}
                </h3>
                <p className="mt-1 text-dim">{spotlight.trim}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-y border-line py-6">
                <SpecMini label="Power" value={spotlight.power} />
                <SpecMini label="0–60" value={spotlight.zeroToSixty} />
                <SpecMini label="Miles" value={formatMileage(spotlight.mileage).replace(" mi", "")} />
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="display text-3xl text-metal">{formatPrice(spotlight.price)}</p>
                  <p className="mt-1 text-xs text-mute">est. {estMonthly(spotlight.price)} · 72mo</p>
                </div>
                <Button href={`/inventory/${spotlight.id}`}>View Details</Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* supporting tiles */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((v, i) => (
            <Reveal key={v.id} delay={i * 90}>
              <VehicleCard vehicle={v} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Button href="/inventory" variant="ghost" className="w-full">
            View all inventory
          </Button>
        </div>
      </section>

      {/* ============ FEATURE GRID ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="Why Diamond"
          title={<>A few reasons to buy with Diamond.</>}
          align="center"
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-2 text-silver">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d={REASON_ICON[r.icon]} />
                  </svg>
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-white sm:text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TRUST SIGNALS ============ */}
      <TrustSignals />

      {/* ============ FINANCING ============ */}
      <section className="relative overflow-hidden border-y border-line bg-bg-2">
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
          intro="Keep your vehicle at its best with in-house care from our specialists."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-line bg-surface/40 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-line-strong">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-line">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-silver" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-white">{s.name}</p>
                <p className="mt-1 text-[11px] text-mute">{s.tagline}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/contact" variant="ghost">
            Schedule Service
          </Button>
        </div>
      </section>

      {/* ============ REVIEWS / TRUST ============ */}
      <section id="reviews" className="relative scroll-mt-24 overflow-hidden border-y border-line bg-bg-2">
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

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="h-full rounded-2xl border border-line bg-surface/40 p-8">
                  <div className="flex gap-0.5 text-white/80">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                        <path d="M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-5 text-lg leading-relaxed text-white/90">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-xs font-semibold text-silver">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">{t.name}</span>
                      <span className="block text-xs text-mute">{t.detail}</span>
                    </span>
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
