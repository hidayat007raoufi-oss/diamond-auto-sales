import type { Metadata } from "next";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import PaymentCalculator from "@/components/site/PaymentCalculator";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Get approved before you arrive. Diamond Auto's finance specialists shop 15+ lenders for every credit situation — first-time buyers, credit rebuilding, and trade-ins welcome.",
};

const points = [
  "Get pre-approved in minutes — soft credit check only",
  "Competitive rates from 15+ trusted lending partners",
  "First-time buyer & credit-rebuilding programs",
  "Top-dollar trade-in offers, even if you still owe",
];

const programs = [
  {
    title: "Every credit situation",
    body: "Bad credit, no credit, repossession, or bankruptcy — our team structures approvals others can't. We work the lenders so you don't have to.",
  },
  {
    title: "First-time buyers",
    body: "No credit history yet? We have lender programs built specifically for first-time buyers, with realistic down payments and terms that build your score.",
  },
  {
    title: "Credit rebuilding",
    body: "The right loan, reported the right way, is one of the fastest paths back. We pair you with on-time-friendly terms designed to rebuild your profile.",
  },
  {
    title: "Trade-ins welcome",
    body: "Roll your current vehicle into your next one — even with a balance owed. Get a real, top-dollar offer applied directly to your purchase.",
  },
];

export default function FinancingPage() {
  return (
    <div className="bg-black text-white">
      {/* HERO + CALCULATOR */}
      <section className="cinematic">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-36 sm:px-8 sm:pb-36 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              kicker="Financing"
              title={
                <>
                  Get <span className="text-electric">approved</span> before you arrive.
                </>
              }
              intro="Apply online or speak with our specialists to explore options for your next vehicle. Every credit situation considered, trade-ins welcome — and you'll know your numbers before you ever step on the lot."
            />

            <ul className="mt-10 space-y-4">
              {points.map((p, i) => (
                <Reveal key={p} delay={i * 80}>
                  <li className="flex items-start gap-3.5 text-[15px] text-white/70">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact?intent=financing">Start Financing Application</Button>
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

      {/* PROGRAMS */}
      <section className="bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
          <SectionHeading
            kicker="How we get you approved"
            title={<>Financing built around your situation.</>}
            intro="We don't fit you into one program — we shop your application across our lending network and structure the approval that actually works for you."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} blur>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
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
                  Know your payment before you visit.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  Start your application now — a soft pull only, no impact to your score — and our finance team will have your options ready when you walk in.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href="/contact?intent=financing">Start Financing Application</Button>
                <Button href="/inventory" variant="ghost">
                  Browse Inventory
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
