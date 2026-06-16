import type { Metadata } from "next";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import PaymentCalculator from "@/components/site/PaymentCalculator";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Bad credit, no credit, or first car? Diamond Auto's finance specialists shop 15+ lenders to find a payment that fits your life. Get pre-approved with a soft credit check.",
};

const points = [
  "Get pre-approved in minutes — soft credit check only",
  "Competitive rates from 15+ trusted lending partners",
  "First-time buyer & credit-rebuilding programs",
  "Top-dollar trade-in offers, even if you still owe",
];

export default function FinancingPage() {
  return (
    <section className="cinematic vignette relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-36 sm:px-8 sm:pb-36 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            kicker="Financing"
            title={<>Financing made clear.</>}
            intro="Apply online or speak with our team to explore options for your next vehicle. All credit considered, trade-ins welcome."
          />

          <ul className="mt-10 space-y-4">
            {points.map((p, i) => (
              <Reveal key={p} delay={i * 80}>
                <li className="flex items-start gap-3.5 text-[15px] text-dim">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-silver" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Get Pre-Approved</Button>
            <Button href="/inventory" variant="ghost">
              Browse Inventory
            </Button>
          </div>
        </div>

        <Reveal delay={120} blur>
          <PaymentCalculator />
        </Reveal>
      </div>
    </section>
  );
}
