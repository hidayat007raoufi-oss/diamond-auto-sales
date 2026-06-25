import type { Metadata } from "next";
import CarShowcase from "@/components/site/CarShowcase";
import CarShowcaseScene from "@/components/site/CarShowcaseScene";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Gesture-controlled, scroll-linked cinematic vehicle showcase.",
};

export default function ShowcasePage() {
  return (
    <main className="bg-black">
      {/* Scroll-linked cinematic scene: pinned car + overlay spec cards */}
      <CarShowcaseScene />

      {/* Interactive drag version */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
        <p className="mb-6 text-center text-[12px] font-semibold uppercase tracking-[0.32em] text-white/45">
          Interactive
        </p>
        <div className="overflow-hidden rounded-[28px] ring-1 ring-white/10">
          <CarShowcase title="The Performance Line" subtitle="Drag to scrub through the reveal" />
        </div>
        <p className="mt-8 text-center text-[13px] text-white/40">
          Drag horizontally (or swipe on touch) to fly through the frames.
        </p>
      </section>
    </main>
  );
}
