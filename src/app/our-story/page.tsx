import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import Button from "@/components/site/Button";
import ImagePlaceholder from "@/components/site/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Diamond Auto Sales grew from a local Raleigh dealership into North Carolina's full-service automotive destination — quality vehicles, financing, rentals, detailing, and trade-ins, built on a customer-first process.",
};

const values = [
  { title: "Quality vehicles", body: "Every vehicle is hand-selected, inspected, and reconditioned before it ever lists." },
  { title: "Financing for everyone", body: "We shop a network of lenders so good, bad, or no credit can still drive away approved." },
  { title: "Trade-ins welcome", body: "Real, top-dollar offers applied straight to your next vehicle — even with a balance owed." },
  { title: "Rentals available", body: "Daily, weekly, and long-term rentals when you need a vehicle now, not later." },
  { title: "In-house service", body: "Detailing, customization, and mechanical care under one roof — no runaround." },
  { title: "Customer-first process", body: "Honest numbers, no pressure, and a team that treats you like a neighbor." },
];

export default function OurStoryPage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="cinematic relative overflow-hidden">
        <div aria-hidden className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8">
          <SectionHeading
            kicker="Our Story"
            title={
              <>
                Built in Raleigh. <span className="text-electric">Driven by you.</span>
              </>
            }
            intro="Diamond Auto Sales started as one local dealership with a simple idea: treat people right, price vehicles fairly, and handle everything under one roof. That idea grew into North Carolina's full-service automotive destination."
          />
        </div>
      </section>

      {/* NARRATIVE + IMAGE */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal blur>
            <div className="space-y-5 text-base leading-relaxed text-white/60">
              <p>
                We&apos;re a family-minded, independent dealership in Raleigh, North
                Carolina — not a faceless chain. From the first hello to the keys in
                your hand, real people here know your name and your situation.
              </p>
              <p>
                Over the years our customers asked for more than just a great car.
                They wanted financing that actually worked for them, a loaner while
                their vehicle was in the shop, a fair number on their trade, and a
                detailer who treated their car like their own. So we built all of it.
              </p>
              <p>
                Today, Diamond Auto brings vehicle sales, financing, rentals,
                trade-ins, customization, and detailing together in one place — with
                the same straightforward, customer-first process we started with.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} blur>
            <ImagePlaceholder
              src="/dealership/exterior.jpg"
              alt="Diamond Auto Sales dealership in Raleigh"
              label="Dealership Exterior"
              dimensions="1600×1000"
              filename="/dealership/exterior.jpg"
              className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
            />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Reveal blur>
            <ImagePlaceholder
              src="/dealership/showroom.jpg"
              alt="Showroom"
              label="Showroom / Lot"
              dimensions="1200×900"
              filename="/dealership/showroom.jpg"
              className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
            />
          </Reveal>
          <Reveal delay={100} blur>
            <ImagePlaceholder
              src="/dealership/team.jpg"
              alt="The Diamond Auto team"
              label="Our Team"
              dimensions="1200×900"
              filename="/dealership/team.jpg"
              className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
            />
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <SectionHeading
            kicker="What we stand for"
            title={<>Everything you need, done right.</>}
            intro="One destination, one team, one standard — across every part of owning a vehicle."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} blur>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-white">{v.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-black">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <Reveal blur>
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(47,128,255,0.12),transparent_55%)] p-10 backdrop-blur-xl sm:p-14 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Come see the difference in person.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  Browse the current inventory online, or stop by our Raleigh
                  location and let our team take care of the rest.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href="/inventory">View Inventory</Button>
                <a
                  href="tel:+19198878666"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.09]"
                >
                  Call (919) 887-8666
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
