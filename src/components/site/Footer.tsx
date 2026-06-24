import Link from "next/link";
import DiamondLogo from "@/components/site/DiamondLogo";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/inventory", label: "All Inventory" },
      { href: "/rentals", label: "Vehicle Rentals" },
      { href: "/financing", label: "Financing" },
      { href: "/contact?intent=trade", label: "Value Your Trade" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/services", label: "Detailing & Service" },
      { href: "/services", label: "Customization" },
      { href: "/our-story", label: "Our Story" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <DiamondLogo className="h-8 w-8" />
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-[0.22em] text-white">DIAMOND</span>
                <span className="text-[9px] font-medium tracking-[0.3em] text-blue-300/70">AUTO SALES</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              North Carolina&apos;s premier automotive destination — vehicle sales,
              rentals, financing, and full-service care, all in Raleigh.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/90">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l, i) => (
                    <li key={`${col.title}-${i}`}>
                      <Link href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400/90">Visit</p>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                <li>5915 Triangle Drive<br />Raleigh, NC 27616</li>
                <li>
                  <a href="tel:+19198878666" className="font-semibold text-white hover:text-blue-300">
                    (919) 887-8666
                  </a>
                </li>
                <li>Mon–Fri 9–7 · Sat 9–5</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-xs text-white/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Diamond Auto Sales LLC · Raleigh, North Carolina</p>
          <p className="tracking-wide">Raleigh · Durham · Cary · The Triangle</p>
        </div>
      </div>
    </footer>
  );
}
