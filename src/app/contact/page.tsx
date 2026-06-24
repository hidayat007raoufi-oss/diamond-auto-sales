import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import LeadForm from "@/components/site/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Diamond Auto at 5915 Triangle Drive, Raleigh NC 27616, or request a callback. Vehicle sales, service, and ownership programs.",
};

const rows = [
  { label: "Visit", value: "5915 Triangle Drive, Raleigh, NC 27616" },
  { label: "Call", value: "(919) 887-8666", href: "tel:+19198878666" },
  { label: "Email", value: "hello@diamondautonc.com", href: "mailto:hello@diamondautonc.com" },
  { label: "Hours", value: "Mon–Fri 9–7 · Sat 9–5 · Sun by appointment" },
];

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      <div className="bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(47,128,255,0.10),transparent_55%)]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-28 pt-36 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <SectionHeading
              kicker="Contact"
              title={<>Ready to find your next vehicle?</>}
              intro="Stop by our Raleigh showroom or send a message and our team will confirm availability — sales, financing, rentals, service, and trade-ins."
            />

            <div className="mt-12 space-y-6">
              {rows.map((row) => (
                <Reveal key={row.label}>
                  <div className="flex items-center gap-6 border-b border-white/10 pb-6">
                    <span className="w-16 shrink-0 text-[11px] font-medium uppercase tracking-widest text-blue-400/90">{row.label}</span>
                    {row.href ? (
                      <a href={row.href} className="text-lg text-white transition-colors hover:text-blue-300">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-lg text-white">{row.value}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="Diamond Auto location"
                  className="h-64 w-full grayscale invert-[0.92] contrast-[0.9]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=5915%20Triangle%20Drive%20Raleigh%20NC%2027616&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} blur>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
