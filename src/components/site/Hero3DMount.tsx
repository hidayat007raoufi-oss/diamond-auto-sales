"use client";

import dynamic from "next/dynamic";
import DiamondLogo from "@/components/site/DiamondLogo";

function Loader() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(47,128,255,0.16),transparent_70%)]" />
      <div className="relative grid place-items-center">
        <span className="absolute h-20 w-20 animate-spin rounded-full border border-white/10 border-t-[#2f80ff]/70" style={{ animationDuration: "1.1s" }} />
        <DiamondLogo className="h-9 w-9" />
      </div>
      <p className="relative mt-7 text-[11px] font-medium uppercase tracking-[0.34em] text-white/45">
        Loading 3D configurator
      </p>
    </div>
  );
}

/** Loads the WebGL viewer client-side only (three.js must not SSR). */
const Hero3D = dynamic(() => import("@/components/site/Hero3D"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Hero3DMount({ className = "" }: { className?: string }) {
  return <Hero3D className={className} />;
}
