import type { Metadata } from "next";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Detailing, window tint, mechanical, tire, and customization — premium in-house automotive services at Diamond Auto, Raleigh NC.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="cinematic vignette relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8">
          <SectionHeading
            kicker="Beyond the Sale"
            title={<>Automotive services, in-house.</>}
            intro="Everything your vehicle needs, under one roof — handled by our specialists, not outsourced."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line p-9 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white">Ready to book a service?</h3>
              <p className="mt-2 text-sm text-dim">Concierge drop-off and return available across the Triangle.</p>
            </div>
            <Button href="/contact">Schedule Service</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
