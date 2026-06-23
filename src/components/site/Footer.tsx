import Link from "next/link";
import DiamondLogo from "@/components/site/DiamondLogo";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/inventory", label: "All Inventory" },
      { href: "/inventory", label: "Recent Arrivals" },
      { href: "/financing", label: "Financing" },
      { href: "/contact?intent=trade", label: "Value Your Trade" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Detailing" },
      { href: "/services", label: "Window Tint" },
      { href: "/services", label: "Mechanical" },
      { href: "/services", label: "Protection" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <DiamondLogo className="h-8 w-8" />
              <span className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-[0.22em] text-zinc-900">DIAMOND</span>
                <span className="text-[9px] font-medium tracking-[0.3em] text-zinc-500">AUTO SALES</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-600">
              A trusted independent dealership in Raleigh, NC — quality vehicles,
              honest pricing, and financing for every situation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l, i) => (
                    <li key={`${col.title}-${i}`}>
                      <Link href={l.href} className="text-sm text-zinc-600 transition-colors hover:text-zinc-900">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Visit</p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li>5915 Triangle Drive<br />Raleigh, NC 27616</li>
                <li>
                  <a href="tel:+19198878666" className="font-semibold text-zinc-900 hover:underline">
                    (919) 887-8666
                  </a>
                </li>
                <li>Mon–Fri 9–7 · Sat 9–5</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-7 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Diamond Auto Sales LLC · NC Dealer License #00000000</p>
          <p className="tracking-wide">Raleigh · Durham · Cary · The Triangle</p>
        </div>
      </div>
    </footer>
  );
}
