import Reveal from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export default function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal blur>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">{kicker}</p>
      </Reveal>
      <Reveal delay={90} blur>
        <h2 className="mt-4 text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] text-balance">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={180} blur>
          <p className={`mt-5 text-base leading-relaxed text-white/60 ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
