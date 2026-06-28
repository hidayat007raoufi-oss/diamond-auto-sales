import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import SubNav from "@/components/site/SubNav";
import SectionHeading from "@/components/site/SectionHeading";
import RentalCard from "@/components/site/RentalCard";
import RentalInquiryForm from "@/components/site/RentalInquiryForm";
import { rentals } from "@/lib/rentals";

export const metadata: Metadata = {
  title: "Vehicle Rentals",
  description:
    "Daily, weekly, and long-term vehicle rentals in Raleigh, NC — economy, full-size sedans, SUVs, and luxury. Flexible terms, simple pickup, unlimited local miles. Reserve today.",
};

const subnavLinks = [
  { label: "Fleet", href: "#fleet" },
  { label: "Reserve", href: "#reserve" },
];

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
    <div id="top" className="bg-white">
      <SubNav
        title="Vehicle Rentals"
        links={subnavLinks}
        cta={{ label: "Reserve", href: "#reserve" }}
        tone="light"
        appearAfter={480}
      />

      {/* HERO */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <Reveal blur>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
            Diamond Auto · Vehicle Rentals
          </p>
        </Reveal>
        <Reveal delay={90} blur>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-tight text-[#1d1d1f] text-balance sm:text-6xl">
            Need a vehicle short-term or long-term?
          </h1>
        </Reveal>
        <Reveal delay={180} blur>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6e6e73]">
            Daily, weekly, and longer-term rentals across the Triangle — for travel,
            work, a special occasion, an extended stay, or while your car is in our shop.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#fleet" className="pill pill-blue">
              View the Fleet
            </Link>
            <Link href="#reserve" className="pill pill-light">
              Request Rental Availability
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FLEET */}
      <section id="fleet" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
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
      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading kicker="Simple by design" title={<>How it works.</>} />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} blur>
                <div className="bento flex h-full gap-4 bg-white p-6 ring-1 ring-black/[0.06]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0071e3] text-sm font-semibold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#1d1d1f]">{s.title}</h3>
                    <p className="mt-1 text-sm text-[#6e6e73]">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              kicker="Reserve"
              title={<>Reserve a rental.</>}
              intro="Send your dates and preferred vehicle class. We'll confirm availability and total pricing for daily, weekly, or long-term — no obligation."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {included.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#1d1d1f]">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 7" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
            <div className="bento mt-8 bg-[#f5f5f7] p-5 text-sm text-[#6e6e73] ring-1 ring-black/[0.06]">
              <p className="font-semibold text-[#1d1d1f]">Renter requirements</p>
              <p className="mt-1.5">
                Must be 21+ with a valid driver&apos;s license and proof of
                insurance. A refundable security deposit applies. Call{" "}
                <a href="tel:+19198878666" className="text-[#0071e3] hover:underline">(919) 887-8666</a>{" "}
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
