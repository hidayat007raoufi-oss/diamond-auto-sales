import type { Metadata } from "next";
import ExperienceHero from "@/components/site/ExperienceHero";

export const metadata: Metadata = {
  title: "Experience",
  description: "A full-screen, cinematic look at the machine — 3D and gallery.",
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=85`;

const gallery = [
  { id: "1544636331-e26879cd4d9b", caption: "Presence.", sub: "Every line earns its place." },
  { id: "1503376780353-7e6692767b70", caption: "Profile.", sub: "Stance that means business." },
  { id: "1555215695-3004980ad54e", caption: "Detail.", sub: "Engineered down to the millimeter." },
  { id: "1606152421802-db97b9c7a11b", caption: "Power.", sub: "Twin-turbo, fully unleashed." },
  { id: "1614200179396-2bdb77ebf81b", caption: "Night.", sub: "Built to be seen after dark." },
];

export default function ExperiencePage() {
  // Window-scroll (no nested overflow / CSS scroll-snap) so GSAP ScrollTrigger
  // owns the scroll and the hero can pin + scrub without jank.
  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* ===================== PHASE 1 · pinned 3D configurator ===================== */}
      <ExperienceHero />

      {/* ===================== gallery ===================== */}
      {gallery.map((g, i) => (
        <section key={g.id} aria-label="Gallery" className="relative h-[100svh] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={u(g.id)}
            alt={g.caption}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: "translateZ(0)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/45" />

          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
              {String(i + 1).padStart(2, "0")} — Gallery
            </p>
            <h2
              className="mt-3 text-balance text-5xl font-semibold tracking-tight sm:text-7xl"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
            >
              {g.caption}
            </h2>
            <p className="mt-3 max-w-md text-base text-white/70 sm:text-lg" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
              {g.sub}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
