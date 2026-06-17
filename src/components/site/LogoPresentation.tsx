/**
 * Dramatic 3D presentation of the Diamond crest for the hero. The logo's black
 * field screens out (mix-blend), leaving a floating, glowing 3D crest with an
 * aura, a moving shimmer, and a faded reflection beneath.
 */
export default function LogoPresentation() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm" style={{ perspective: "1300px" }}>
      {/* aura behind the crest */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(64,116,214,0.28),transparent_62%)] blur-2xl"
      />
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.webp" alt="Diamond Auto Sales LLC" className="logo-hero w-full" />
        <div aria-hidden className="logo-shimmer pointer-events-none absolute inset-0" />
      </div>
      {/* reflection */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo.webp"
        alt=""
        aria-hidden
        className="mx-auto -mt-[6%] w-full scale-y-[-1] opacity-20 [mask-image:linear-gradient(to_bottom,#000,transparent_55%)] [mix-blend-mode:screen]"
      />
    </div>
  );
}
