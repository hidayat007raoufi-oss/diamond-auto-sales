import Link from "next/link";
import DiamondLogo from "@/components/site/DiamondLogo";
import Reveal from "@/components/motion/Reveal";

/**
 * Full-bleed cinematic band that promotes the /experience 3D configurator on
 * the homepage. The visual is a pure-CSS "stage" (no asset / no WebGL on the
 * homepage, so initial load stays fast) — a dark studio with a blue key light,
 * a perspective reflection floor, and the M3 wordmark. The live WebGL viewer
 * loads on its own route when the visitor enters.
 */
export default function ExperienceFeature() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* ambient cinematic wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_38%,rgba(47,128,255,0.18),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal blur>
          <p className="apple-metric-label text-[#2997ff]">Diamond · 3D Configurator</p>
          <h2 className="apple-headline mx-auto mt-3 max-w-4xl text-balance text-white">
            See it in three dimensions.
          </h2>
          <p className="apple-sub mx-auto mt-4 max-w-2xl text-white/65">
            Step inside the configurator. Spin the BMW M3 in real time, walk it
            through a cinematic reveal, and try every finish — right in your browser.
          </p>
        </Reveal>

        {/* ---------- cinematic stage ---------- */}
        <Reveal blur delay={120}>
          <Link
            href="/experience"
            aria-label="Open the 3D configurator"
            className="group relative mx-auto mt-12 block aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] sm:aspect-[21/9]"
          >
            {/* studio key light */}
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_30%,rgba(47,128,255,0.22),transparent_72%)]" />
            {/* perspective reflection floor */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                transform: "perspective(420px) rotateX(58deg)",
                transformOrigin: "bottom",
                maskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
                WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
              }}
            />

            {/* center wordmark / brand */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <DiamondLogo className="h-10 w-10 opacity-90 transition-transform duration-700 group-hover:scale-110" />
              <p className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-7xl" style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6)" }}>
                BMW M3
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.34em] text-white/45">
                Competition
              </p>
            </div>

            {/* enter affordance */}
            <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md transition-colors group-hover:bg-white/10 sm:bottom-6 sm:right-6">
              Drag to rotate
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/experience" className="pill pill-blue">
              Enter the experience
            </Link>
            <Link href="/inventory" className="pill pill-dark">
              Browse inventory
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
