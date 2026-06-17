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
        <p className="kicker">{kicker}</p>
      </Reveal>
      <Reveal delay={90} blur>
        <h2 className="display mt-4 text-[2.4rem] leading-[1.04] text-white sm:text-5xl lg:text-[3.25rem] text-balance">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={180} blur>
          <p className={`mt-5 text-base leading-relaxed text-dim ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
