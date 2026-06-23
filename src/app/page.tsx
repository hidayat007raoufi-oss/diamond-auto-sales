import Link from "next/link";
import ListingCard from "@/components/site/ListingCard";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import { vehicles } from "@/lib/vehicles";
import { testimonials } from "@/lib/testimonials";

// TODO: update these with your real dealership numbers.
const stats = [
  { value: "4.9★", label: "Google rating" },
  { value: "180+", label: "Reviews" },
  { value: "12+", label: "Years in business" },
  { value: "1,200+", label: "Vehicles sold" },
];

const whyPoints = [
  { title: "CARFAX on every vehicle", body: "Full history report provided free, before you ask." },
  { title: "Financing for all credit", body: "We work with 15+ lenders to get you approved." },
  { title: "27-point inspection", body: "Every vehicle is inspected and reconditioned in-house." },
  { title: "No-pressure buying", body: "Honest, up-front pricing — no games, no surprise fees." },
];

export default function Home() {
  const available = vehicles.filter((v) => v.status !== "Sold");
  const featured = available.slice(0, 6);
  const recent = available.slice(0, 4);

  return (
    <div className="bg-white text-zinc-900">
      {/* ============ HERO (dark, cinematic) ============ */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-zinc-950">
        <ImagePlaceholder
          src="/hero/feature.jpg"
          alt="Diamond Auto Sales showroom"
          label="Hero — dealership or feature vehicle"
          dimensions="2400×1400"
          filename="/hero/feature.jpg"
          priority
          className="absolute inset-0 h-full w-full opacity-50"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
            Diamond Auto Sales · Raleigh, NC
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Find your next vehicle.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/70">
            Hand-picked inventory, transparent pricing, and financing for every
            credit situation — right here in Raleigh.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/inventory" className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
              Search Inventory
            </Link>
            <Link href="/financing" className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Get Pre-Approved
            </Link>
            <Link href="/contact?intent=trade" className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Value Your Trade
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span>★ 4.9 Google rating</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>CARFAX on every vehicle</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>Financing for all credit</span>
          </p>
        </div>
      </section>

      {/* ============ FEATURED INVENTORY (light) ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Featured Inventory</h2>
            <p className="mt-2 text-zinc-500">{available.length} vehicles available now in Raleigh.</p>
          </div>
          <Link href="/inventory" className="text-sm font-semibold text-zinc-900 hover:underline">
            View all inventory →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <ListingCard key={v.id} vehicle={v} priceDrop={i === 1} />
          ))}
        </div>
      </section>

      {/* ============ RECENT ARRIVALS (light gray) ============ */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Just Arrived</h2>
            <Link href="/inventory" className="text-sm font-semibold text-zinc-900 hover:underline">
              See more →
            </Link>
          </div>
          <div className="no-scrollbar mt-8 grid grid-flow-col auto-cols-[78%] gap-5 overflow-x-auto pb-2 sm:auto-cols-[42%] lg:grid-flow-row lg:grid-cols-4 lg:auto-cols-auto lg:overflow-visible">
            {recent.map((v) => (
              <ListingCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST STATS (light) ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-zinc-200 pt-8 text-sm text-zinc-600">
          <span className="inline-flex items-center gap-2">
            <Check /> CARFAX-verified inventory
          </span>
          <span className="inline-flex items-center gap-2">
            <Check /> Licensed NC dealer
          </span>
          <span className="inline-flex items-center gap-2">
            <Check /> Clean-title guarantee
          </span>
          <span className="inline-flex items-center gap-2">
            <Check /> Top-rated on Google
          </span>
        </div>
      </section>

      {/* ============ FINANCING (dark band, prominent CTA) ============ */}
      <section className="bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Financing made simple.</h2>
            <p className="mt-3 text-white/70">
              Good credit, bad credit, or no credit — get pre-approved online in
              minutes with a soft credit check that won&apos;t affect your score.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
              <li className="inline-flex items-center gap-2"><Check light /> All credit considered</li>
              <li className="inline-flex items-center gap-2"><Check light /> 15+ lending partners</li>
              <li className="inline-flex items-center gap-2"><Check light /> Trade-ins welcome</li>
            </ul>
          </div>
          <Link href="/financing" className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
            Get Pre-Approved
          </Link>
        </div>
      </section>

      {/* ============ REVIEWS (light) ============ */}
      <section id="reviews" className="scroll-mt-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">What our customers say</h2>
              <p className="mt-2 text-zinc-500">4.9 / 5 from 180+ verified Google reviews.</p>
            </div>
            {/* TODO: link to your Google Business reviews */}
            <a href="#" className="text-sm font-semibold text-zinc-900 hover:underline">
              Read all reviews →
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M12 3l2.5 5L20 9l-4 4 1 6-5-3-5 3 1-6L4 9l5.5-1L12 3z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-zinc-700">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-zinc-900">
                  {t.name} <span className="font-normal text-zinc-500">· {t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DEALERSHIP / WHY BUY (light, photo placeholders) ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Why buy from Diamond</h2>
          <p className="mt-3 text-zinc-600">
            A family-run Raleigh dealership built on doing right by every customer
            — from the first hello to the keys in your hand.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <ImagePlaceholder src="/dealership/exterior.jpg" alt="Diamond Auto Sales exterior" label="Dealership Exterior" dimensions="1600×1000" filename="/dealership/exterior.jpg" className="aspect-[4/3] rounded-xl lg:col-span-2 lg:aspect-[16/9]" />
          <ImagePlaceholder src="/dealership/showroom.jpg" alt="Showroom" label="Showroom" dimensions="1200×1000" filename="/dealership/showroom.jpg" className="aspect-[4/3] rounded-xl lg:aspect-auto" />
          <ImagePlaceholder src="/dealership/delivery.jpg" alt="Vehicle delivery" label="Vehicle Delivery" dimensions="1200×900" filename="/dealership/delivery.jpg" className="aspect-[4/3] rounded-xl" />
          <ImagePlaceholder src="/dealership/team.jpg" alt="Our team" label="Team Photo" dimensions="1200×900" filename="/dealership/team.jpg" className="aspect-[4/3] rounded-xl" />
          <ImagePlaceholder src="/dealership/customer-delivery.jpg" alt="Happy customer" label="Customer Delivery" dimensions="1200×900" filename="/dealership/customer-delivery.jpg" className="aspect-[4/3] rounded-xl" />
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {whyPoints.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-zinc-900 text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l4 4L19 7" />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-zinc-900">{p.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LOCATION (light gray) ============ */}
      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Visit our Raleigh location</h2>
            <dl className="mt-8 space-y-5 text-zinc-700">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Address</dt>
                <dd className="mt-1 text-lg">5915 Triangle Drive, Raleigh, NC 27616</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Phone</dt>
                <dd className="mt-1 text-lg"><a href="tel:+19198878666" className="font-semibold text-zinc-900 hover:underline">(919) 887-8666</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Hours</dt>
                <dd className="mt-1 text-lg">Mon–Fri 9am–7pm · Sat 9am–5pm · Sun closed</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+19198878666" className="rounded-full bg-zinc-900 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-700">Call the dealership</a>
              <Link href="/contact" className="rounded-full border border-zinc-300 px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-white">Send a message</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl ring-1 ring-zinc-200">
            <iframe
              title="Diamond Auto Sales location"
              className="h-72 w-full lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=5915%20Triangle%20Drive%20Raleigh%20NC%2027616&z=13&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Check({ light }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${light ? "text-white/70" : "text-zinc-900"}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12l4 4L19 7" />
    </svg>
  );
}
