import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Diamond Auto Sales. Ask about a vehicle, schedule a test drive, or start your financing application.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Contact Us</h1>
      <p className="mt-2 max-w-xl text-zinc-600">
        Have a question about a vehicle or want to schedule a test drive? Send us
        a message and we&apos;ll get back to you the same business day.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Visit the Lot
            </h2>
            <address className="mt-2 not-italic text-zinc-700">
              1234 Auto Plaza Drive<br />
              Springfield, IL 62704
            </address>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Call or Text
            </h2>
            <p className="mt-2 text-zinc-700">
              <a href="tel:+15551234567" className="hover:text-gold-dark">
                (555) 123-4567
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Hours
            </h2>
            <p className="mt-2 text-zinc-700">
              Mon–Sat: 9am – 7pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
