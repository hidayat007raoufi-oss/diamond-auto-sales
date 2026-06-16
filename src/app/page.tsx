import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Counter from "@/components/motion/Counter";
import SectionHeading from "@/components/site/SectionHeading";
import VehicleCard from "@/components/site/VehicleCard";
import ServiceCard from "@/components/site/ServiceCard";
import ProgramCard from "@/components/site/ProgramCard";
import LeadForm from "@/components/site/LeadForm";
import { featuredVehicles } from "@/lib/vehicles";
import { services } from "@/lib/services";
import { programs } from "@/lib/programs";
import { testimonials } from "@/lib/testimonials";

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

  return (
    <>
      {/* ============ 1 · HERO ============ */}
      <section className="cinematic vignette relative flex min-h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 kenburns bg-[radial-gradient(70%_60%_at_50%_-5%,rgba(150,160,175,0.22),transparent_60%)]" />
        <Parallax speed={0.12} className="absolute inset-x-0 bottom-[-20%] top-0">
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
        </Parallax>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
          <p className="rise kicker" style={{ animationDelay: "0.1s" }}>
            Raleigh · North Carolina
          </p>
          <h1 className="rise display mt-6 max-w-4xl text-[15vw] leading-[0.92] text-white sm:text-7xl lg:text-8xl" style={{ animationDelay: "0.2s" }}>
            Automotive Ownership.
            <span className="block text-metal">Reimagined.</span>
          </h1>
          <p className="rise mt-8 max-w-md text-lg leading-relaxed text-dim" style={{ animationDelay: "0.35s" }}>
            Premium vehicles, in-house care, and ownership programs — engineered
            into one effortless experience in the Triangle.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.5s" }}>
            <Button href="/inventory">View Inventory</Button>
            <Button href="/services" variant="ghost">
              Schedule Service
            </Button>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-mute">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-silver to-transparent" />
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

      {/* ============ 2 · FEATURED INVENTORY ============ */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Featured Inventory"
            title={<>The current collection.</>}
            intro="A rotating selection of performance and luxury vehicles, ready to drive home."
          />
          <Reveal delay={120}>
            <Button href="/inventory" variant="ghost" className="hidden sm:inline-flex">
              View all vehicles
            </Button>
          </Reveal>
        </div>

        {/* Auto-playing showcase — the lineup scrolls itself, pauses on hover */}
        <Reveal>
          <div className="relative -mx-5 mt-14 overflow-hidden sm:-mx-8">
            <div className="flex w-max lineup">
              {[...featured, ...featured].map((v, i) => (
                <div key={`${v.id}-${i}`} className="w-[300px] shrink-0 pr-6 sm:w-[360px]">
                  <VehicleCard vehicle={v} />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
          </div>
        </Reveal>
        <p className="mt-3 text-center text-[11px] tracking-wide text-mute">
          Hover to pause · tap a vehicle to explore
        </p>
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
