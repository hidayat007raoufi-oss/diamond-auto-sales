import type { Metadata } from "next";
import CarShowcase from "@/components/site/CarShowcase";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Gesture-controlled cinematic vehicle showcase — drag to scrub through every frame.",
};

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-8">
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
