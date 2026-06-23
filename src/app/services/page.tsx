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

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8">
        <SectionHeading
          kicker="Service & Customization"
          title={<>Everything your vehicle needs.</>}
          intro="One roof for detailing, protection, mechanical, customization, and performance — tap any service to see what's included."
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <ServiceRows />
        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Ready to book a service?</h3>
              <p className="mt-2 text-sm text-zinc-600">Pickup and return available across the Triangle.</p>
            </div>
            <Button href="/contact">Schedule Service</Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
