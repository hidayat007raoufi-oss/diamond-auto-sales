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

        <div className="mx-auto mt-14 max-w-3xl border-t border-line/50">
          {items.map((name, i) => (
            <div key={name} className="flex items-center gap-5 border-b border-line/50 py-4 sm:gap-8">
              <span className="font-mono text-xs tracking-widest text-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display flex-1 text-lg tracking-tight text-white/85 sm:text-xl">{name}</span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
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
