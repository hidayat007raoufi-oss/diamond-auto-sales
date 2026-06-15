import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">
            Diamond <span className="text-gold">Auto Sales</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-zinc-400">
            Quality pre-owned vehicles, honest pricing, and financing for every
            credit situation.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/inventory" className="hover:text-gold">Inventory</Link></li>
            <li><Link href="/financing" className="hover:text-gold">Financing</Link></li>
            <li><Link href="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Visit Us
          </p>
          <address className="mt-3 space-y-1 text-sm not-italic text-zinc-400">
            <p>1234 Auto Plaza Drive</p>
            <p>Springfield, IL 62704</p>
            <p>
              <a href="tel:+15551234567" className="hover:text-gold">
                (555) 123-4567
              </a>
            </p>
            <p>Mon–Sat: 9am – 7pm</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-zinc-500 sm:px-6">
          © {new Date().getFullYear()} Diamond Auto Sales. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
