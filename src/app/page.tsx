import Link from "next/link";
import ListingCard from "@/components/site/ListingCard";
import RentalCard from "@/components/site/RentalCard";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";
import { vehicles } from "@/lib/vehicles";
import { rentals } from "@/lib/rentals";

const pillars = [
  { title: "Vehicle Sales", body: "Hand-selected, inspected inventory.", href: "/inventory" },
  { title: "Vehicle Rentals", body: "Daily & weekly, every class.", href: "/rentals" },
  { title: "Financing", body: "Every credit situation welcome.", href: "/financing" },
  { title: "Trade-Ins", body: "Top-dollar offers, fast.", href: "/contact?intent=trade" },
  { title: "Customization", body: "Wraps, wheels, performance.", href: "/services" },
  { title: "Detailing & Service", body: "In-house care that lasts.", href: "/services" },
];

const whyPoints = [
  { title: "Everything in one place", body: "Buy, rent, finance, trade, customize, and service — without leaving the lot." },
  { title: "Financing for all credit", body: "We work with a network of lenders to get you approved, whatever your history." },
  { title: "Inspected & reconditioned", body: "Every vehicle we sell is inspected and reconditioned in-house before it lists." },
  { title: "Straightforward pricing", body: "Honest, up-front numbers — no games, no surprise fees at the table." },
];

const serviceAreas = [
  "Raleigh", "Durham", "Cary", "Chapel Hill", "Wake Forest", "Greensboro", "Charlotte",
];

export default function Home() {
  const available = vehicles.filter((v) => v.status !== "Sold");
  const featured = available.slice(0, 6);

  return (
    <div className="bg-white text-zinc-900">
      {/* ============ HERO (dark, cinematic) ============ */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-zinc-950">
        <ImagePlaceholder
          src="/hero/feature.jpg"
          alt="Diamond Auto Sales showroom"
          label="Hero — dealership or feature vehicle"
          dimensions="2400×1400"
          filename="/hero/feature.jpg"
          priority
          className="absolute inset-0 h-full w-full opacity-45"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-zinc-950/45" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
            Diamond Auto · Raleigh, North Carolina
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl">
            North Carolina&apos;s Premier Automotive Destination
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Quality vehicles, flexible rentals, financing solutions, and
            automotive services — all in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/inventory" className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
              Browse Inventory
            </Link>
            <Link href="/rentals" className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Rent a Vehicle
            </Link>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span>Vehicle Sales</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>Rentals</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>Financing</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>Service & Customization</span>
          </p>
        </div>
      </section>

      {/* ============ BUSINESS PILLARS ============ */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-zinc-200 sm:grid-cols-3 lg:grid-cols-6">
            {pillars.map((p) => (
              <Link key={p.title} href={p.href} className="group bg-white p-5 transition-colors hover:bg-zinc-50">
                <p className="text-sm font-semibold text-zinc-900">{p.title}</p>
                <p className="mt-1 text-xs leading-snug text-zinc-500">{p.body}</p>
                <span className="mt-3 inline-flex text-xs font-semibold text-zinc-900 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INVENTORY SHOWCASE ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Vehicles for sale</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Featured Inventory</h2>
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

      {/* ============ RENTAL FLEET SHOWCASE ============ */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Vehicle rentals</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Need a vehicle today?</h2>
              <p className="mt-2 max-w-xl text-zinc-500">
                Daily and weekly rentals in every class — economy to luxury. Perfect
                for travel, work, or while your vehicle is in our shop.
              </p>
            </div>
            <Link href="/rentals" className="text-sm font-semibold text-zinc-900 hover:underline">
              View rental fleet →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rentals.map((r) => (
              <RentalCard key={r.id} rental={r} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/rentals#reserve" className="inline-flex rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FINANCING (dark band) ============ */}
      <section className="bg-zinc-950">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Financing</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Financing that fits your life.</h2>
              <p className="mt-3 text-white/70">
                Good credit, bad credit, rebuilding, or buying your first car — get
                pre-approved online in minutes with a soft credit check that won&apos;t
                affect your score.
              </p>
            </div>
            <Link href="/financing" className="shrink-0 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
              Get Pre-Approved
            </Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Pre-approval", b: "Soft check, no score impact." },
              { t: "Credit rebuilding", b: "Programs that move you forward." },
              { t: "First-time buyers", b: "Guidance from start to keys." },
              { t: "Lender network", b: "Multiple partners competing for you." },
            ].map((c) => (
              <div key={c.t} className="bg-zinc-950 p-6">
                <p className="font-semibold text-white">{c.t}</p>
                <p className="mt-1 text-sm text-white/60">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY DIAMOND ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Why Diamond Auto</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            One destination for everything automotive.
          </h2>
          <p className="mt-3 text-zinc-600">
            From the first hello to long after the keys are in your hand, Diamond
            Auto is built to handle whatever your vehicle needs.
          </p>
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

      {/* ============ CUSTOMER DELIVERIES (photo placeholders) ============ */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Customer deliveries</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Delivered with a handshake.</h2>
            <p className="mt-3 text-zinc-600">
              Real customers, real keys. Drop your delivery photos here to show them off.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ImagePlaceholder src="/deliveries/delivery-1.jpg" alt="Customer delivery" label="Customer Delivery" dimensions="1200×900" filename="/deliveries/delivery-1.jpg" className="aspect-[4/3] rounded-xl ring-1 ring-zinc-200" />
            <ImagePlaceholder src="/deliveries/delivery-2.jpg" alt="Customer delivery" label="Customer Delivery" dimensions="1200×900" filename="/deliveries/delivery-2.jpg" className="aspect-[4/3] rounded-xl ring-1 ring-zinc-200" />
            <ImagePlaceholder src="/deliveries/delivery-3.jpg" alt="Customer delivery" label="Customer Delivery" dimensions="1200×900" filename="/deliveries/delivery-3.jpg" className="aspect-[4/3] rounded-xl ring-1 ring-zinc-200" />
            <ImagePlaceholder src="/deliveries/delivery-4.jpg" alt="Customer delivery" label="Customer Delivery" dimensions="1200×900" filename="/deliveries/delivery-4.jpg" className="aspect-[4/3] rounded-xl ring-1 ring-zinc-200" />
          </div>
        </div>
      </section>

      {/* ============ SERVICE AREA ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Service area</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Proudly serving North Carolina.</h2>
            <p className="mt-3 text-zinc-600">
              Based in Raleigh and serving customers across the Triangle and beyond —
              including the Triad and Charlotte.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {serviceAreas.map((c) => (
              <span key={c} className="rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-700">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT & LOCATION ============ */}
      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Visit us</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Stop by our Raleigh location</h2>
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
