import Link from "next/link";
import DiamondLogo from "@/components/site/DiamondLogo";

/**
 * Custom brand lockup — original SVG diamond emblem + CSS wordmark.
 * No pasted logo image, no rectangle box. Scales crisply anywhere.
 */
export default function BrandMark({
  size = "sm",
  href = "/",
}: {
  size?: "sm" | "lg";
  href?: string;
}) {
  const gem = size === "lg" ? "h-9 w-9" : "h-7 w-7";
  const name = size === "lg" ? "text-base" : "text-[13px]";
  const sub = size === "lg" ? "text-[10px]" : "text-[8px]";
  return (
    <Link href={href} aria-label="Diamond Auto Sales — home" className="group flex items-center gap-2.5">
      <DiamondLogo className={gem} />
      <span className="flex flex-col leading-none">
        <span className={`${name} font-semibold tracking-[0.3em] text-white`}>DIAMOND</span>
        <span className={`${sub} mt-0.5 font-medium tracking-[0.34em] text-mute transition-colors group-hover:text-silver`}>
          AUTO SALES
        </span>
      </span>
    </Link>
  );
}
