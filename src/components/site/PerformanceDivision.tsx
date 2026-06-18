import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import Button from "@/components/site/Button";

const items = [
  "Performance Upgrades",
  "Custom Builds",
  "Wheel Packages",
  "Suspension",
  "Exhaust Systems",
  "Detailing",
  "Ceramic Coating",
  "Window Tint",
  "Enthusiast Services",
];

export default function PerformanceDivision() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* subtle carbon weave + cool depth + brushed-metal top edge */}
      <div aria-hidden className="carbon absolute inset-0" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_115%,rgba(28,46,84,0.5),transparent_60%)]" />
      <div aria-hidden className="brushed absolute inset-x-0 top-0 h-px" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          kicker="Diamond Performance Division"
          title={<>For drivers who want more.</>}
          intro="For drivers who want more than transportation. Customization, performance styling, wheel packages, suspension upgrades, exhaust work, detailing, tint, and enthusiast-focused services."
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {items.map((name, i) => (
            <Reveal key={name} delay={i * 50}>
              <div className="group relative h-full rounded-2xl border border-line bg-surface/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong">
                <span className="font-mono text-xs tracking-widest text-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base font-semibold tracking-tight text-white">{name}</p>
                <span className="mt-4 block h-px w-8 bg-accent/70 transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-sm text-dim">
              A dedicated performance arm of Diamond Auto Sales — engineered for
              enthusiasts, built to a higher standard.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/services">Explore Services</Button>
              <Button href="/contact?intent=build" variant="ghost">
                Start a Build
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
