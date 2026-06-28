import type { Metadata } from "next";
import Link from "next/link";
import ExperienceHero from "@/components/site/ExperienceHero";

export const metadata: Metadata = {
  title: "Experience",
  description: "A full-screen, cinematic 3D look at the BMW M3 — configure the finish and explore every angle.",
};

export default function ExperiencePage() {
  // Window-scroll (no nested overflow / CSS scroll-snap) so GSAP ScrollTrigger
  // owns the scroll and the hero can pin + scrub without jank.
  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* ===================== pinned 3D "film" (Phase 1 + 2) ===================== */}
      <ExperienceHero />

      {/* ===================== closing CTA ===================== */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-6 text-center">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(47,128,255,0.16),transparent_72%)]" />
        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#2997ff]">BMW M3 Competition</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Experience it in person.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            Reserve a private viewing at Diamond Auto Sales, or browse the full inventory.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact?intent=test-drive&vehicle=bmw-m3-competition"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0071e3] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0077ed] sm:w-auto"
            >
              Reserve a viewing
            </Link>
            <Link
              href="/inventory"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/[0.09] sm:w-auto"
            >
              View Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
