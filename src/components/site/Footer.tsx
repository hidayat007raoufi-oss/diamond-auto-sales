import Link from "next/link";
import DiamondLogo from "@/components/site/DiamondLogo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Service Pricing" },
      { href: "/#customization", label: "Customization" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#services", label: "Detailing & Service" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <DiamondLogo className="h-7 w-7" />
              <span className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-[0.2em] text-[#1d1d1f]">DIAMOND</span>
                <span className="text-[8.5px] font-medium tracking-[0.3em] text-[#6e6e73]">AUTO SALES</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-[#6e6e73]">
              Auto repair, maintenance, and customization in Raleigh, North Carolina.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold text-[#1d1d1f]">{col.title}</p>
                <ul className="mt-3.5 space-y-2.5">
                  {col.links.map((l, i) => (
                    <li key={`${col.title}-${i}`}>
                      <Link href={l.href} className="text-[13px] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-[12px] font-semibold text-[#1d1d1f]">Visit</p>
              <ul className="mt-3.5 space-y-2.5 text-[13px] text-[#6e6e73]">
                <li>5915 Triangle Drive<br />Raleigh, NC 27617</li>
                <li>
                  <a href="tel:+19199876666" className="font-medium text-[#0071e3] hover:underline">
                    (919) 987-6666
                  </a>
                </li>
                <li>Mon–Fri 9–7 · Sat 9–5</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-6 text-[12px] text-[#86868b] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Diamond Auto Sales LLC · Raleigh, North Carolina</p>
          <p className="tracking-wide">Raleigh · Durham · Cary · The Triangle</p>
        </div>
      </div>
    </footer>
  );
}
