import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Diamond Auto Sales — a family-run dealership built on honest pricing and great service.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">About Diamond Auto Sales</h1>
      <div className="mt-6 space-y-4 text-zinc-700">
        <p>
          Diamond Auto Sales is a family-owned dealership serving the Springfield
          area for over 15 years. We built our reputation on a simple idea:
          treat every customer the way we&apos;d want to be treated.
        </p>
        <p>
          Every vehicle on our lot is hand-selected, inspected, and reconditioned
          by our team before it&apos;s offered for sale. No pressure, no gimmicks —
          just quality vehicles at fair prices.
        </p>
        <p>
          Whether you&apos;re buying your first car or your fifth, our team is here
          to make the process simple, transparent, and even enjoyable.
        </p>
      </div>
    </div>
  );
}
