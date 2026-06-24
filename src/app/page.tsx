import Link from "next/link";
import HeroStage from "@/components/site/HeroStage";
import ListingCard from "@/components/site/ListingCard";
import RentalCard from "@/components/site/RentalCard";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/site/Button";
import LeadForm from "@/components/site/LeadForm";
import { vehicles } from "@/lib/vehicles";
import { rentals } from "@/lib/rentals";

const detailing = [
  "Exterior hand wash",
  "Interior deep cleaning",
  "Full vacuuming",
  "Carpet & upholstery shampoo",
  "Wax & polish options",
  "Odor removal",
];

const why = [
  { title: "Quality vehicles", body: "Hand-selected, inspected, and reconditioned before they ever list." },
  { title: "Financing available", body: "Every credit situation — good, bad, none, or rebuilding." },
  { title: "Trade-ins welcome", body: "Real top-dollar offers applied straight to your next vehicle." },
  { title: "Rentals available", body: "Daily, weekly, and long-term when you need a vehicle now." },
  { title: "Local support", body: "A Raleigh team that knows your name, not a faceless chain." },
  { title: "Customer-first process", body: "Honest numbers, no pressure, no surprise fees." },
];

const contact = [
  { label: "Visit", value: "5915 Triangle Drive, Raleigh, NC 27616" },
  { label: "Call", value: "(919) 887-8666", href: "tel:+19198878666" },
  { label: "Hours", value: "Mon–Fri 9am–7pm · Sat 9am–5pm · Sun closed" },
];

export default function Home() {
  const available = vehicles.filter((v) => v.status !== "Sold");
  const featured = available.slice(0, 6);

  return (
    <div className="home-in bg-black text-white">
      {/* ============ HERO ============ */}
      <HeroStage />

      {/* ============ FEATURED INVENTORY ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal blur>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Featured Inventory</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The current collection.</h2>
              <p className="mt-2 text-white/50">{available.length} vehicles available now in Raleigh.</p>
            </div>
          </Reveal>
          <Link href="/inventory" className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300">
            View all inventory →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 80} blur>
              <ListingCard vehicle={v} priceDrop={i === 1} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/inventory">Browse Inventory</Button>
            <Button href="/contact?intent=test-drive" variant="ghost">Schedule Test Drive</Button>
          </div>
        </Reveal>
      </section>

      {/* ============ FINANCING ============ */}
      <section className="border-y border-white/10 bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal blur>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Financing</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl text-balance">
                  Get <span className="text-electric">approved</span> before you arrive.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                  Good credit, bad credit, no credit, or rebuilding — our finance team
                  shops a network of lenders to structure an approval that works. First-time
                  buyers and trade-ins welcome.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/contact?intent=financing">Start Financing Application</Button>
                  <Button href="/financing" variant="ghost">Estimate Payments</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} blur>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { t: "Pre-approval", b: "Soft check, no score impact." },
                  { t: "Credit rebuilding", b: "Terms designed to move you forward." },
                  { t: "First-time buyers", b: "Programs built for no credit history." },
                  { t: "Trade-ins", b: "Top-dollar, even if you still owe." },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                    <p className="font-semibold text-white">{c.t}</p>
                    <p className="mt-1.5 text-sm text-white/50">{c.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ RENTALS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal blur>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Rentals</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance">
                Need a vehicle short-term or long-term?
              </h2>
              <p className="mt-2 max-w-xl text-white/50">
                Daily, weekly, and longer-term rentals in every class — for travel, work,
                a special occasion, or while your car is in our shop.
              </p>
            </div>
          </Reveal>
          <Link href="/rentals" className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300">
            View rental fleet →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rentals.map((r, i) => (
            <Reveal key={r.id} delay={(i % 4) * 70} blur>
              <RentalCard rental={r} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10">
            <Button href="/rentals#reserve">Request Rental Availability</Button>
          </div>
        </Reveal>
      </section>

      {/* ============ SERVICES / DETAILING ============ */}
      <section className="border-y border-white/10 bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal blur>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Services & Detailing</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Detailing, <span className="text-chrome">done right.</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                  In-house detailing, customization, and mechanical care — performed by
                  hand, with an honest assessment before any work begins.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/contact?intent=detailing">Book Detailing Inquiry</Button>
                  <Button href="/services" variant="ghost">All Services</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} blur>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">What&apos;s included</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {detailing.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[15px] text-white/70">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHY DIAMOND ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <Reveal blur>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Why Diamond Auto Sales</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One destination for everything automotive.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70} blur>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CONTACT / VISIT US ============ */}
      <section className="border-t border-white/10 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(47,128,255,0.10),transparent_55%)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-start">
          <div>
            <Reveal blur>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Visit Us</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Come see us in Raleigh.</h2>
            </Reveal>
            <div className="mt-10 space-y-6">
              {contact.map((row) => (
                <Reveal key={row.label}>
                  <div className="flex items-center gap-6 border-b border-white/10 pb-5">
                    <span className="w-14 shrink-0 text-[11px] font-medium uppercase tracking-widest text-blue-400/90">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className="text-lg text-white transition-colors hover:text-blue-300">{row.value}</a>
                    ) : (
                      <span className="text-lg text-white">{row.value}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="Diamond Auto Sales location"
                  className="h-64 w-full grayscale invert-[0.92] contrast-[0.9] lg:h-72"
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
    </div>
  );
}
