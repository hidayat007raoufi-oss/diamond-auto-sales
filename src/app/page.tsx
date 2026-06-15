import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import { featuredVehicles } from "@/lib/vehicles";

const perks = [
  {
    title: "Honest, Up-Front Pricing",
    body: "Every vehicle is competitively priced with no hidden fees or last-minute surprises.",
  },
  {
    title: "Financing for All Credit",
    body: "Good credit, bad credit, or no credit — our team works with multiple lenders to get you approved.",
  },
  {
    title: "Inspected & Reconditioned",
    body: "Each car passes a multi-point inspection so you can drive off the lot with confidence.",
  },
];

export default function Home() {
  const featured = featuredVehicles();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:py-32">
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold ring-1 ring-gold/30">
            Springfield&apos;s trusted used car dealer
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Find your next car with{" "}
            <span className="text-gold">confidence.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-300">
            Quality pre-owned cars, trucks, and SUVs — backed by honest pricing
            and financing options for every credit situation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inventory"
              className="rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy transition hover:bg-amber-300"
            >
              Browse Inventory
            </Link>
            <Link
              href="/financing"
              className="rounded-full border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-6"
            >
              <h3 className="text-lg font-semibold text-navy">{perk.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured inventory */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Featured Vehicles
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Hand-picked deals from our current lot.
              </p>
            </div>
            <Link
              href="/inventory"
              className="hidden text-sm font-semibold text-gold-dark hover:underline sm:block"
            >
              View all inventory →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/inventory"
              className="text-sm font-semibold text-gold-dark hover:underline"
            >
              View all inventory →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to drive something better?
          </h2>
          <p className="max-w-lg text-zinc-300">
            Stop by the lot or reach out and our team will help you find the
            right vehicle and the right payment.
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-300"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
