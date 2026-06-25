import type { Metadata } from "next";
import Link from "next/link";

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
      {/* ===================== SECTION 1 · 3D WebGL (placeholder) ===================== */}
      <section
        aria-label="3D model"
        className="relative flex h-[100svh] w-full snap-start snap-always items-center justify-center overflow-hidden"
      >
        {/* ambient cinematic light */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_46%,rgba(47,128,255,0.18),transparent_70%)]"
        />
        <div aria-hidden className="ambient-sheen absolute inset-0 opacity-40" />

        {/* rotating 3D gizmo — stands in for the WebGL canvas */}
        <div aria-hidden className="relative h-[78vmin] w-[78vmin] [transform-style:preserve-3d]">
          <div className="absolute inset-0" style={{ transform: "rotateX(74deg)" }}>
            <div className="spin-slow h-full w-full rounded-full border border-white/15" />
          </div>
          <div className="absolute inset-[12%]" style={{ transform: "rotateX(74deg) rotateZ(30deg)" }}>
            <div className="spin-rev h-full w-full rounded-full border border-[#2f80ff]/35" />
          </div>
          <div className="absolute inset-[26%]" style={{ transform: "rotateY(70deg)" }}>
            <div className="spin-slow h-full w-full rounded-full border border-white/10" />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(120,180,255,0.55),transparent_70%)] blur-xl" />
          </div>
        </div>

        {/* copy */}
        <div className="relative z-10 px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/55">
            Diamond · 3D Experience
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl">
            The machine,<br className="hidden sm:block" /> in three dimensions.
          </h1>
          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.32em] text-white/35">
            WebGL model · mount point
          </p>
        </div>

        {/* scroll cue */}
        <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="scroll-hint h-2 w-1 rounded-full bg-white/70" />
          </div>
        </div>

        {/* minimal exit affordance (kept tiny + edge, not a panel) */}
        <Link
          href="/"
          className="absolute left-6 top-6 z-10 text-[12px] font-medium text-white/50 transition-colors hover:text-white"
        >
          ← Diamond Auto
        </Link>
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
