import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Flexible auto financing for all credit situations at Diamond Auto Sales. Good credit, bad credit, or no credit — get pre-approved today.",
};

const steps = [
  {
    title: "Apply Online",
    body: "Fill out a quick, secure application — it only takes a few minutes and won't impact your credit to check.",
  },
  {
    title: "Get Matched",
    body: "We work with multiple lenders to find terms that fit your budget and credit situation.",
  },
  {
    title: "Drive Away",
    body: "Pick your vehicle, sign, and drive home. It's that simple.",
  },
];

export default function FinancingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-navy">Financing Made Simple</h1>
      <p className="mt-2 max-w-2xl text-zinc-600">
        Good credit, bad credit, or no credit — our finance team works with a
        network of lenders to get you behind the wheel.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-6"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-bold text-navy">
              {i + 1}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-navy">
              {step.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">{step.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/contact"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-amber-300"
        >
          Start Your Application
        </Link>
      </div>
    </div>
  );
}
