import Link from "next/link";
import { services } from "@/lib/services";

/** Editorial service rows — name + one-line + arrow. No cards, no icons. */
export default function ServiceRows() {
  return (
    <div>
      {services.map((s) => (
        <Link
          key={s.id}
          href={`/contact?intent=service&service=${s.id}`}
          className="group flex items-center justify-between gap-6 border-b border-white/10 py-6 sm:py-7"
        >
          <div>
            <p className="text-[1.7rem] font-bold leading-none tracking-tight text-white/80 transition-colors duration-300 group-hover:text-white sm:text-3xl">
              {s.name}
            </p>
            <p className="mt-2 text-sm text-white/40">{s.tagline}</p>
          </div>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      ))}
    </div>
  );
}
