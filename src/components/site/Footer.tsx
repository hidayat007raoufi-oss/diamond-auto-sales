import Link from "next/link";

const columns = [
  {
    title: "Vehicles",
    links: [
      { href: "/inventory", label: "All Inventory" },
      { href: "/financing", label: "Financing" },
      { href: "/financing", label: "Trade-In" },
      { href: "/#reviews", label: "Reviews" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Detailing" },
      { href: "/services", label: "Window Tint" },
      { href: "/services", label: "Mechanical" },
      { href: "/services", label: "Tire Services" },
      { href: "/services", label: "Customization" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-black">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.webp" alt="Diamond Auto Sales LLC" className="h-20 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dim">
              Premium vehicles, transparent financing, and full in-house service
              in Raleigh, North Carolina.
            </p>
            {/* TODO: replace href="#" with real social/profile URLs */}
            <div className="mt-6 flex gap-3">
              {[
                { label: "Google", d: "M12 11v2.8h4a4 4 0 11-1.2-4.8l2-2A7 7 0 1019 12h-7z" },
                { label: "Facebook", d: "M13 22v-8h3l1-4h-4V8a1 1 0 011-1h3V3h-3a5 5 0 00-5 5v2H7v4h3v8z" },
                { label: "Instagram", d: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5-1h.01" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-dim transition-colors hover:border-line-strong hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs tracking-wide text-mute">
              Raleigh · Durham · Cary · Chapel Hill · The Triangle
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="kicker mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l, i) => (
                    <li key={`${col.title}-${i}`}>
                      <Link href={l.href} className="text-sm text-dim transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="kicker mb-4">Visit Us</p>
              <ul className="space-y-3 text-sm text-dim">
                <li>5915 Triangle Drive<br />Raleigh, NC 27616</li>
                <li>
                  <a href="tel:+19198878666" className="text-white transition-colors hover:text-silver">
                    (919) 887-8666
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@diamondautonc.com" className="transition-colors hover:text-white">
                    hello@diamondautonc.com
                  </a>
                </li>
                <li className="text-mute">Mon–Fri 9–7 · Sat 9–5</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-mute sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Diamond Auto Sales LLC. All rights reserved.</p>
          <p className="tracking-widest">RALEIGH · NORTH CAROLINA</p>
        </div>
      </div>
    </footer>
  );
}
