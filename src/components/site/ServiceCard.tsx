import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-line-strong">
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(200,204,209,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] transition-colors duration-500 group-hover:border-line-strong">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-silver" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d={service.icon} />
        </svg>
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">{service.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-widest text-silver/70">{service.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-dim">{service.description}</p>

      <ul className="mt-6 space-y-2.5">
        {service.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-[13px] text-dim">
            <span className="h-1 w-1 rounded-full bg-silver" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
