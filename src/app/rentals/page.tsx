import type { Metadata } from "next";
import Link from "next/link";
import RentalCard from "@/components/site/RentalCard";
import RentalInquiryForm from "@/components/site/RentalInquiryForm";
import { rentals } from "@/lib/rentals";

export const metadata: Metadata = {
  title: "Vehicle Rentals",
  description:
    "Daily and weekly vehicle rentals in Raleigh, NC — economy, full-size sedans, SUVs, and luxury. Flexible terms, simple pickup, unlimited local miles. Reserve today.",
};

const steps = [
  { n: "1", title: "Choose your vehicle", body: "Pick a class that fits your trip and budget — from economy to luxury." },
  { n: "2", title: "Tell us your dates", body: "Send your pickup and return dates and we confirm availability fast." },
  { n: "3", title: "Pick up & go", body: "Bring a valid license and insurance. Keys in hand, you're on the road." },
];

const included = [
  "Unlimited local miles",
  "24/7 roadside assistance",
  "Flexible daily & weekly terms",
  "Clean, inspected, sanitized vehicles",
  "Easy extensions",
  "Weekly & monthly discounts",
];

export default function RentalsPage() {
  return (
    <div className="bg-white text-zinc-900">
      {/* HERO */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-zinc-950 pt-24">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        <div aria-hidden className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-zinc-700/20 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">Diamond Auto · Vehicle Rentals</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Rent the right vehicle for any reason.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Daily and weekly rentals across the Triangle — for travel, work,
            a special occasion, or while your car is in our shop.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#fleet" className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
              View the Fleet
            </Link>
            <Link href="#reserve" className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Our rental fleet</h2>
          <p className="mt-3 text-zinc-600">
            Well-maintained, late-model vehicles in every class — pick what fits your trip.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rentals.map((r) => (
            <RentalCard key={r.id} rental={r} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Reserve a rental</h2>
            <p className="mt-3 text-zinc-600">
              Send your dates and preferred vehicle class. We&apos;ll confirm
              availability and total pricing — no obligation.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {included.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 7" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl bg-zinc-50 p-5 text-sm text-zinc-600 ring-1 ring-zinc-200">
              <p className="font-semibold text-zinc-900">Renter requirements</p>
              <p className="mt-1.5">
                Must be 21+ with a valid driver&apos;s license and proof of
                insurance. A refundable security deposit applies. Call{" "}
                <a href="tel:+19198878666" className="font-semibold text-zinc-900 hover:underline">(919) 887-8666</a>{" "}
                with questions.
              </p>
            </div>
          </div>
          <RentalInquiryForm />
        </div>
      </section>
    </div>
  );
}
