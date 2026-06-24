import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import RentalCard from "@/components/site/RentalCard";
import RentalInquiryForm from "@/components/site/RentalInquiryForm";
import { rentals } from "@/lib/rentals";

export const metadata: Metadata = {
  title: "Vehicle Rentals",
  description:
    "Daily, weekly, and long-term vehicle rentals in Raleigh, NC — economy, full-size sedans, SUVs, and luxury. Flexible terms, simple pickup, unlimited local miles. Reserve today.",
};

const steps = [
  { n: "1", title: "Choose your vehicle", body: "Pick a class that fits your trip and budget — from economy to luxury." },
  { n: "2", title: "Tell us your dates", body: "Send your pickup and return dates and we confirm availability fast." },
  { n: "3", title: "Pick up & go", body: "Bring a valid license and insurance. Keys in hand, you're on the road." },
];

const included = [
  "Unlimited local miles",
  "24/7 roadside assistance",
  "Daily, weekly & long-term terms",
  "Clean, inspected, sanitized vehicles",
  "Easy extensions",
  "Weekly & monthly discounts",
];

export default function RentalsPage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="cinematic relative flex min-h-[60vh] items-center overflow-hidden pt-24">
        <div aria-hidden className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <Reveal blur>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">
              Diamond Auto · Vehicle Rentals
            </p>
          </Reveal>
          <Reveal delay={90} blur>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl text-balance">
              Need a vehicle <span className="text-electric">short-term</span> or long-term?
            </h1>
          </Reveal>
          <Reveal delay={180} blur>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Daily, weekly, and longer-term rentals across the Triangle — for travel,
              work, a special occasion, an extended stay, or while your car is in our shop.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#fleet"
                className="btn-sheen group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(47,128,255,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_48px_-10px_rgba(47,128,255,0.9)]"
              >
                View the Fleet
              </Link>
              <Link
                href="#reserve"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.09]"
              >
                Request Rental Availability
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLEET */}
      <section id="fleet" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          kicker="The Fleet"
          title={<>Our rental fleet.</>}
          intro="Well-maintained, late-model vehicles in every class — pick what fits your trip, whether it's a day, a week, or a few months."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rentals.map((r, i) => (
            <Reveal key={r.id} delay={i * 70} blur>
              <RentalCard rental={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading kicker="Simple by design" title={<>How it works.</>} />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} blur>
                <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-bold text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="scroll-mt-24 bg-black">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Reserve"
              title={<>Reserve a rental.</>}
              intro="Send your dates and preferred vehicle class. We'll confirm availability and total pricing for daily, weekly, or long-term — no obligation."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {included.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 7" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60 backdrop-blur-xl">
              <p className="font-semibold text-white">Renter requirements</p>
              <p className="mt-1.5">
                Must be 21+ with a valid driver&apos;s license and proof of
                insurance. A refundable security deposit applies. Call{" "}
                <a href="tel:+19198878666" className="font-semibold text-blue-400 hover:text-blue-300">(919) 887-8666</a>{" "}
                with questions.
              </p>
            </div>
          </div>
          <Reveal delay={120} blur>
            <RentalInquiryForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
