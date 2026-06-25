import type { Metadata } from "next";
import Link from "next/link";
import Hero3DMount from "@/components/site/Hero3DMount";

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
  return (
    <div className="no-scrollbar h-[100svh] w-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden bg-black text-white">
      {/* ===================== SECTION 1 · 3D configurator ===================== */}
      <section
        aria-label="3D configurator"
        className="relative h-[100svh] w-full snap-start snap-always overflow-hidden"
      >
        {/* ambient cinematic light behind the model */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(62%_62%_at_50%_48%,rgba(47,128,255,0.15),transparent_72%)]"
        />

        {/* Interactive WebGL viewer (R3F) — drag to rotate, live paint picker.
            Fills the section edge to edge; the overlays below are absolutely
            positioned at the corners so they never box or shrink the canvas. */}
        <Hero3DMount className="absolute inset-0" />

        {/* edge vignettes for text legibility — center stays clickable for orbit */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />

        {/* top-left brand + title (corner-anchored, never wraps the model) */}
        <div className="pointer-events-none absolute left-6 top-6 z-10 max-w-[80vw]">
          <Link href="/" className="pointer-events-auto text-[12px] font-medium text-white/60 transition-colors hover:text-white">
            ← Diamond Auto
          </Link>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.36em] text-white/55">
            Diamond · 3D Configurator
          </p>
          <h1
            className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
          >
            BMW M3 Competition.
          </h1>
          <p className="mt-2 text-sm text-white/60" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
            Drag to rotate · pick a finish below.
          </p>
        </div>

        {/* subtle "more below" cue, tucked bottom-right so it clears the picker */}
        <p aria-hidden className="pointer-events-none absolute bottom-7 right-6 z-10 text-[11px] uppercase tracking-[0.28em] text-white/35">
          Scroll ↓
        </p>
      </section>

      {/* ===================== SECTION 2 · full-screen scroll-snap gallery ===================== */}
      {gallery.map((g, i) => (
        <section
          key={g.id}
          aria-label="Gallery"
          className="relative h-[100svh] w-full snap-start snap-always overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={u(g.id)}
            alt={g.caption}
            loading={i === 0 ? "eager" : "lazy"}
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
