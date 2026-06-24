import type { Metadata } from "next";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceRows from "@/components/site/ServiceRows";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Detailing, window tint, ceramic, mechanical, tire, customization, performance, and protection — premium in-house automotive services at Diamond Auto, Raleigh NC.",
};

const detailing = [
  {
    title: "Exterior wash",
    body: "Hand wash, wheels and tires, bug and tar removal, and a streak-free dry — the foundation of every package.",
  },
  {
    title: "Interior cleaning",
    body: "Full wipe-down of dash, console, doors, and trim, glass cleaned inside out, and all touch points sanitized.",
  },
  {
    title: "Vacuuming",
    body: "Complete vacuum of carpets, mats, seats, trunk, and every crevice — pet hair and embedded debris included.",
  },
  {
    title: "Carpet & upholstery shampoo",
    body: "Hot-water extraction and shampoo for cloth seats and carpets; spot or full-interior options to lift stains.",
  },
  {
    title: "Wax & polish",
    body: "From a quick spray wax to multi-stage machine polish and sealant for a deep, protected, mirror finish.",
  },
  {
    title: "Odor removal",
    body: "Source-based deodorizing and ozone treatment options to neutralize smoke, pets, and lingering odors — not just mask them.",
  },
];

const detailIncludes = [
  "Free condition assessment & honest recommendation",
  "Interior & exterior packages — pick only what you need",
  "Leather conditioning & trim restoration add-ons",
  "Pickup & return available across the Triangle",
];

export default function ServicesPage() {
  return (
    <div className="bg-black text-white">
      <section className="cinematic">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8">
          <SectionHeading
            kicker="Service & Customization"
            title={
              <>
                Everything your vehicle needs.
              </>
            }
            intro="One roof for detailing, protection, mechanical, customization, and performance — tap any service to see what's included."
          />
        </div>
      </section>

      {/* SERVICE ROWS */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <ServiceRows />
        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">Ready to book a service?</h3>
              <p className="mt-2 text-sm text-white/60">Pickup and return available across the Triangle.</p>
            </div>
            <Button href="/contact?intent=service">Schedule Service</Button>
          </div>
        </Reveal>
      </section>

      {/* DETAILING DETAILS */}
      <section className="bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <SectionHeading
            kicker="In-House Detailing"
            title={
              <>
                Detailing, <span className="text-chrome">done right.</span>
              </>
            }
            intro="Pick exactly what your vehicle needs. Every detail is performed in-house by hand — no rushed conveyor jobs, no surprises."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detailing.map((d, i) => (
              <Reveal key={d.title} delay={i * 70} blur>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/30">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-white">{d.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* WHAT'S INCLUDED */}
          <Reveal blur>
            <div className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(47,128,255,0.10),transparent_55%)] p-10 backdrop-blur-xl sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">What&apos;s included</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Every detail starts with an honest assessment.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  We look the vehicle over, tell you what it actually needs, and quote a clear price — then deliver a finish that looks and feels brand new.
                </p>
                <div className="mt-8">
                  <Button href="/contact?intent=detailing">Book Detailing Inquiry</Button>
                </div>
              </div>
              <ul className="grid gap-3">
                {detailIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-white/70">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
