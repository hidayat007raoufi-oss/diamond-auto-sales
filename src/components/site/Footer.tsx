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
            <p className="display text-3xl text-metal">Diamond</p>
            <p className="mt-1 text-[10px] tracking-[0.35em] text-mute">RALEIGH · AUTO SALES</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-dim">
              Premium vehicles, transparent financing, and full in-house service
              — in Raleigh, North Carolina.
            </p>
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
