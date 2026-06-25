import type { Metadata } from "next";
import Link from "next/link";
import SubNav from "@/components/site/SubNav";
import CarShowcase from "@/components/site/CarShowcase";
import CarShowcaseScene from "@/components/site/CarShowcaseScene";
import PaymentCalculator from "@/components/site/PaymentCalculator";
import LeadForm from "@/components/site/LeadForm";
import ListingCard from "@/components/site/ListingCard";
import Button from "@/components/site/Button";
import { vehicles, estMonthly, formatPrice } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "BMW M3 Competition",
  description:
    "2024 BMW M3 Competition — 503 hp twin-turbo inline-six, 0–60 in 3.8s. Explore the cinematic showcase, configure your finish, and reserve a viewing at Diamond Auto Sales.",
};

const PRICE = 84900;
const VID = "bmw-m3-competition"; // demo template id

const sceneSpecs = [
  { label: "Title", value: "Clean" },
  { label: "Engine", value: "3.0L Twin-Turbo" },
  { label: "Drivetrain", value: "Rear-Wheel Drive" },
  { label: "Mileage", value: "6,400 mi" },
];

const specSheet: { label: string; value: string }[] = [
  { label: "Year", value: "2024" },
  { label: "Engine", value: "3.0L Twin-Turbo I6" },
  { label: "Power", value: "503 hp" },
  { label: "0–60 mph", value: "3.8 s" },
  { label: "Drivetrain", value: "Rear-Wheel Drive" },
  { label: "Transmission", value: "8-Speed M Steptronic" },
  { label: "Mileage", value: "6,400 mi" },
  { label: "Exterior", value: "Frozen Black" },
  { label: "Interior", value: "Black Merino" },
  { label: "Title", value: "Clean" },
];

const features = [
  "Carbon bucket seats",
  "M Sport differential",
  "Adaptive M suspension",
  "M Compound brakes",
  "Carbon-fiber roof",
  "Harman Kardon surround",
  "Head-up display",
  "Heated seats & wheel",
];

const subnavLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Configure", href: "#configure" },
  { label: "Specs", href: "#specs" },
  { label: "Financing", href: "#financing" },
];

export default function M3VdpPage() {
  const similar = vehicles.filter((v) => v.id !== VID && v.bodyType === "Coupe").slice(0, 3);
  const related = (similar.length ? similar : vehicles.slice(0, 3)).slice(0, 3);

  return (
    <div id="top" className="bg-white">
      <SubNav
        title="BMW M3 Competition"
        links={subnavLinks}
        cta={{ label: "Reserve", href: `/contact?intent=test-drive&vehicle=${VID}` }}
        tone="light"
        appearAfter={700}
      />

      {/* ============ CINEMATIC SCROLL HERO ============ */}
      <CarShowcaseScene
        eyebrow="BMW M · Competition"
        headline="The M3 Competition."
        specs={sceneSpecs}
        cta={{
          headline: "Reserve your M3.",
          subtext: "Book a private viewing at Diamond Auto Sales — no obligation.",
          href: `/contact?intent=test-drive&vehicle=${VID}`,
          label: "Reserve",
        }}
      />

      {/* ============ OVERVIEW · PRICE · CTAs ============ */}
      <section id="overview" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
                Now Available · Raleigh, NC
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-6xl">
                2024 BMW M3 Competition
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#6e6e73]">
                A 503-horsepower twin-turbo inline-six, rear-wheel drive, and a clean
                title. Track-bred precision with everyday usability.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {["503 hp", "0–60 in 3.8s", "RWD", "Clean title"].map((c) => (
                  <span key={c} className="rounded-full bg-[#f5f5f7] px-4 py-1.5 text-[13px] font-medium text-[#1d1d1f]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <p className="text-[13px] text-[#86868b]">Price</p>
              <p className="text-4xl font-semibold tracking-tight text-[#1d1d1f]">{formatPrice(PRICE)}</p>
              <p className="mt-1 text-[13px] text-[#86868b]">est. {estMonthly(PRICE)}/mo · 72 mo</p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                <Link href={`/contact?intent=test-drive&vehicle=${VID}`} className="pill pill-blue justify-center">
                  Schedule Test Drive
                </Link>
                <Link href="/financing" className="pill pill-light justify-center">
                  Get Approved
                </Link>
              </div>
              <div className="mt-3 flex items-center justify-center gap-5 text-[13px] lg:justify-start">
                <Link href={`/contact?intent=trade&vehicle=${VID}`} className="text-[#0071e3] hover:underline">
                  Value your trade ›
                </Link>
                <a href="tel:+19198878666" className="text-[#0071e3] hover:underline">
                  Call ›
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONFIGURE · interactive showcase ============ */}
      <section id="configure" className="scroll-mt-16 bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Configure</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">Make it yours.</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#6e6e73]">
              Spin the car to view every angle, and switch finishes to see it your way.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[28px] bg-black ring-1 ring-black/[0.06]">
            <CarShowcase title="BMW M3 Competition" subtitle="Drag to explore · choose a finish" />
          </div>
        </div>
      </section>

      {/* ============ SPECS + FEATURES ============ */}
      <section id="specs" className="scroll-mt-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Specifications</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">The details.</h2>
              <dl className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-4">
                {specSheet.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-[#f5f5f7] p-4 sm:p-5">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#86868b]">{s.label}</dt>
                    <dd className="mt-1 text-base font-semibold tracking-tight text-[#1d1d1f] sm:text-lg">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Highlights</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">Equipped.</h2>
              <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-[#1d1d1f]">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINANCING ============ */}
      <section id="financing" className="scroll-mt-16 bg-[#f5f5f7]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Financing</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
              Know your payment.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#6e6e73]">
              Estimate a monthly payment, then get pre-approved before you arrive — a
              soft credit check that won&apos;t affect your score.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?intent=financing">Start Financing Application</Button>
              <Button href="/inventory" variant="ghost">Browse Inventory</Button>
            </div>
          </div>
          <PaymentCalculator />
        </div>
      </section>

      {/* ============ LEAD FORM ============ */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0071e3]">Inquire</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
              Ask about this M3.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#6e6e73]">
              Questions on history, options, or availability? Send a note and our team
              will get right back to you.
            </p>
            <dl className="mt-8 space-y-4 text-[15px]">
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-[#86868b]">Call</dt>
                <dd><a href="tel:+19198878666" className="font-medium text-[#0071e3] hover:underline">(919) 887-8666</a></dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-20 shrink-0 text-[#86868b]">Visit</dt>
                <dd className="text-[#1d1d1f]">5915 Triangle Drive, Raleigh, NC 27616</dd>
              </div>
            </dl>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* ============ SIMILAR ============ */}
      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl">Similar vehicles</h2>
            <Link href="/inventory" className="text-[15px] text-[#0071e3] hover:underline">
              View all ›
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((v) => (
              <ListingCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
