import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import SectionHeading from "@/components/site/SectionHeading";
import VehicleCard from "@/components/site/VehicleCard";
import ServiceCard from "@/components/site/ServiceCard";
import ProgramCard from "@/components/site/ProgramCard";
import LeadForm from "@/components/site/LeadForm";
import PaymentCalculator from "@/components/site/PaymentCalculator";
import {
  estMonthly,
  featuredVehicles,
  formatMileage,
  formatPrice,
} from "@/lib/vehicles";
import { services } from "@/lib/services";
import { programs } from "@/lib/programs";
import { testimonials } from "@/lib/testimonials";

function SpecMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-mute">{label}</p>
    </div>
  );
}

const brands = [
  "PORSCHE",
  "MERCEDES-AMG",
  "BMW M",
  "AUDI SPORT",
  "TESLA",
  "LAND ROVER",
  "LEXUS",
  "CADILLAC",
];

const reasons = [
  {
    n: "01",
    title: "Quality Vehicles",
    body: "Every vehicle is hand-selected and reconditioned through our 27-point Diamond Certified process before it reaches you.",
  },
  {
    n: "02",
    title: "Transparent Buying",
    body: "Upfront pricing and honest numbers, with a calm, no-pressure process from first look to keys in hand.",
  },
  {
    n: "03",
    title: "Premium Service",
    body: "Detailing, protection, and care handled in-house — your ownership experience never stops at the sale.",
  },
];

export default function Home() {
  const featured = featuredVehicles();
  const spotlight = featured[0];

  return (
    <>
      {/* ============ 1 · HERO ============ */}
      <section className="cinematic vignette relative flex min-h-[100svh] items-center overflow-hidden">
        {/* ambient light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 kenburns bg-[radial-gradient(55%_55%_at_62%_-2%,rgba(150,160,175,0.2),transparent_62%)]"
        />

        {/* living blue ambient */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="drift absolute right-[-8%] top-[6%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.2),transparent_60%)] blur-3xl" />
          <div className="drift-slow absolute bottom-[2%] left-[-10%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14),transparent_62%)] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
          <p className="rise kicker" style={{ animationDelay: "0.1s" }}>
            Raleigh · Luxury Automotive
          </p>
          <h1
            className="rise display mt-7 max-w-4xl text-[3.5rem] leading-[0.95] text-white sm:text-7xl lg:text-[5.6rem]"
            style={{ animationDelay: "0.2s" }}
          >
            Own the <span className="text-azure">extraordinary.</span>
          </h1>
          <p
            className="rise mt-8 max-w-md text-lg leading-relaxed text-dim sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            Premium vehicles, in-house care, and ownership programs — engineered
            into one effortless experience in the Triangle.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.5s" }}>
            <Button href="/inventory">View Inventory</Button>
            <Button href="/services" variant="ghost">
              Schedule Service
            </Button>
          </div>

          <div
            className="rise mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-mute"
            style={{ animationDelay: "0.65s" }}
          >
            <span>27-Point Diamond Certified</span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>Financing for All Credit</span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>Concierge Service</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-mute">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* brand marquee */}
      <div className="relative overflow-hidden border-y border-line bg-bg py-6">
        <div className="flex w-max marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="mx-10 text-sm font-medium tracking-[0.25em] text-mute">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ============ 2 · FEATURED INVENTORY — the star ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          kicker="The Collection"
          title={<>The inventory takes center stage.</>}
          intro="Hand-selected, Diamond Certified, and ready to drive. Meet the current lineup."
          align="center"
        />

        {/* Spotlight on the lead vehicle */}
        <Reveal>
          <div className="mt-14 grid overflow-hidden rounded-3xl border border-line bg-surface/60 shadow-[0_40px_120px_-40px_rgba(59,130,246,0.35)] lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <div className="absolute inset-0 kenburns" style={{ background: spotlight.tone }} />
              <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_15%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-line bg-black/40 px-3 py-1 text-[11px] tracking-widest text-white/80 backdrop-blur">
                Featured · {spotlight.year}
              </span>
              <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.4em] text-white/25">
                {spotlight.make}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
              <div>
                <p className="kicker text-azure">Spotlight</p>
                <h3 className="display mt-3 text-3xl text-white sm:text-4xl">
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
                <Button href={`/inventory/${spotlight.id}`}>View vehicle</Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Auto-playing lineup */}
        <div className="mt-10 flex items-end justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-mute">More from the lineup</p>
          <Button href="/inventory" variant="ghost" className="hidden sm:inline-flex">
            View all vehicles
          </Button>
        </div>
        <Reveal>
          <div className="relative -mx-5 mt-6 overflow-hidden sm:-mx-8">
            <div className="flex w-max lineup">
              {[...featured, ...featured].map((v, i) => (
                <div key={`${v.id}-${i}`} className="w-[280px] shrink-0 pr-6 sm:w-[340px]">
                  <VehicleCard vehicle={v} />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
          </div>
        </Reveal>
        <p className="mt-3 text-center text-[11px] tracking-wide text-mute">
          Hover to pause · tap a vehicle to explore
        </p>
      </section>

      {/* ============ FINANCING — APR graph ============ */}
      <section className="border-y border-line bg-bg-2">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="Financing"
              title={<>Approved, the easy way.</>}
              intro="Estimate your payment in real time, then let our specialists shop 15+ lenders to beat it."
            />
            <ul className="mt-8 space-y-3.5">
              {[
                "Pre-approved in minutes — soft credit check only",
                "Competitive rates from 15+ lending partners",
                "First-time buyer & credit-rebuilding programs",
              ].map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <li className="flex items-start gap-3 text-[15px] text-dim">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/financing">Get Pre-Approved</Button>
            </div>
          </div>
          <Reveal delay={120} blur>
            <PaymentCalculator />
          </Reveal>
        </div>
      </section>

      {/* ============ 3 · WHY CHOOSE US ============ */}
      <section className="border-y border-line bg-bg-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <SectionHeading
            kicker="Why Diamond"
            title={<>Owning should feel effortless.</>}
            intro="We engineered the entire experience — buying, financing, and care — to feel like the vehicles we sell."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.n} delay={i * 110}>
                <div className="group h-full bg-bg p-9 transition-colors duration-500 hover:bg-surface">
                  <span className="display text-5xl text-white/10 transition-colors duration-500 group-hover:text-white/20">
                    {r.n}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-white">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-dim">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* stat strip */}
          <div className="mt-px grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              { to: 1200, suffix: "+", label: "Vehicles Delivered" },
              { to: 4, suffix: ".9★", label: "Average Rating" },
              { to: 12, suffix: " yrs", label: "Serving Raleigh" },
              { to: 6, suffix: "", label: "Service Divisions" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="bg-bg p-8 text-center">
                  <p className="display text-4xl text-metal">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-mute">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · SERVICES ============ */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading
          kicker="Automotive Services"
          title={<>Beyond the sale.</>}
          intro="A full division of premium services to keep every vehicle performing — and looking — its best."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ 5 · PROGRAMS ============ */}
      <section className="border-y border-line bg-bg-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <SectionHeading
            kicker="Ownership Programs"
            title={<>Membership-grade care.</>}
            intro="Predictable, premium maintenance plans for individuals and fleets alike."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProgramCard program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6 · REVIEWS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading
          kicker="Client Stories"
          title={<>Trusted across the Triangle.</>}
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="glass h-full rounded-2xl border border-line p-8">
                <div className="flex gap-1 text-silver">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-white/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
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
      </section>

      {/* ============ 7 · CONTACT / LEAD GEN ============ */}
      <section className="relative overflow-hidden border-t border-line bg-bg-2">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(150,160,175,0.12),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              kicker="Start the Conversation"
              title={<>Let&apos;s build your ownership experience.</>}
              intro="Tell us what you're after — a specific vehicle, a service, or a full ownership plan — and a specialist will reach out within one business day."
            />
            <div className="mt-12 space-y-6">
              {[
                { label: "Visit", value: "5915 Triangle Drive, Raleigh, NC 27616" },
                { label: "Call", value: "(919) 887-8666" },
                { label: "Hours", value: "Mon–Fri 9–7 · Sat 9–5 · Sun closed" },
              ].map((row) => (
                <Reveal key={row.label}>
                  <div className="flex items-center gap-6 border-b border-line pb-6">
                    <span className="w-16 text-[11px] uppercase tracking-widest text-mute">{row.label}</span>
                    <span className="text-lg text-white">{row.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
