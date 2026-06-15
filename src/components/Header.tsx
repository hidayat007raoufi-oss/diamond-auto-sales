import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/financing", label: "Financing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-navy">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M6 3h12l4 6-10 12L2 9l4-6Zm.7 2L4.3 8.6 12 18l7.7-9.4L17.3 5H6.7Z" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-white">DIAMOND</span>
            <span className="text-[10px] font-medium tracking-[0.3em] text-gold">
              AUTO SALES
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-200 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+15551234567"
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-amber-300"
        >
          (555) 123-4567
        </a>
      </div>
    </header>
  );
}
