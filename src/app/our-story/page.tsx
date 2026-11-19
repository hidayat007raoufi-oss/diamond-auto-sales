import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About the Shop",
  description: "Learn about Diamond Auto Sales repair, detailing, and customization services in Raleigh, NC.",
};

export default function AboutPage() {
  return (
    <section className="bg-[#0a1120] px-5 pb-24 pt-32 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#a8caff]">Diamond Auto Sales · Raleigh, NC</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-7xl">About the shop.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#c2cede]">
          Bring your vehicle in for maintenance, diagnostics, or repair. If you’re changing the look, explore tint, wraps, body and paint, and detailing packages.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="pill pill-blue" href="/#services">Explore Services</Link>
          <Link className="pill pill-dark" href="/contact">Contact the Shop</Link>
        </div>
      </div>
    </section>
  );
}
