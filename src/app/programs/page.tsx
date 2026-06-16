import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import ProgramCard from "@/components/site/ProgramCard";
import { programs } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Ownership Programs",
  description:
    "Membership-grade care: fleet maintenance, monthly vehicle care, tire care, protection, and tint warranty programs at Diamond Auto, Raleigh NC.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="cinematic vignette relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8">
          <SectionHeading
            kicker="Ownership"
            title={<>Care programs.</>}
            intro="Membership-grade plans that keep your vehicle at its best — long after the sale."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProgramCard program={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
