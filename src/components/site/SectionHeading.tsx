import Reveal from "@/components/motion/Reveal";
import type { ReactNode } from "react";

export default function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal blur>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071e3]">{kicker}</p>
      </Reveal>
      <Reveal delay={90} blur>
        <h2 className={`mt-4 text-[2.4rem] font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.25rem] text-balance ${dark ? "text-white" : "text-[#1d1d1f]"}`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={180} blur>
          <p className={`mt-5 text-base leading-relaxed ${dark ? "text-white/60" : "text-[#6e6e73]"} ${centered ? "mx-auto" : ""}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
