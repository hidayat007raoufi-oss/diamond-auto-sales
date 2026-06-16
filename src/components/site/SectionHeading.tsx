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
      <Reveal>
        <p className="kicker">{kicker}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display mt-4 text-4xl text-white sm:text-5xl text-balance">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className={`mt-5 text-base leading-relaxed text-dim ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
