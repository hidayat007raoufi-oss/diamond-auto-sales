import Link from "next/link";
import type { Program } from "@/lib/programs";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 ${
        program.highlighted
          ? "border-line-strong bg-gradient-to-b from-white/[0.07] to-transparent"
          : "border-line bg-surface hover:border-line-strong"
      }`}
    >
      {program.highlighted && (
        <span className="absolute right-5 top-6 rounded-full border border-line-strong bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-white">
          Most Popular
        </span>
      )}

      <p className="text-xs uppercase tracking-widest text-silver/70">{program.positioning}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{program.name}</h3>
      <p className="mt-5 text-3xl font-semibold text-metal display">{program.priceLabel}</p>

      <ul className="mt-7 flex-1 space-y-3">
        {program.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13px] text-dim">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-silver" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12l4 4L19 7" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`btn-sheen mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-medium transition-colors duration-300 ${
          program.highlighted
            ? "bg-white text-black hover:bg-silver-bright"
            : "border border-line-strong text-white hover:bg-white hover:text-black"
        }`}
      >
        Enroll Now
      </Link>
    </div>
  );
}
