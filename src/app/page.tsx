import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SubNav from "@/components/site/SubNav";
import Reveal from "@/components/motion/Reveal";
import { serviceMenu } from "@/lib/service-menu";

export const metadata: Metadata = {
  title: "Auto Repair & Customization in Raleigh",
  description: "See pricing for maintenance, auto repair, detailing, tint, wraps, and body and paint at Diamond Auto in Raleigh.",
};

const customServices = [
  { id: "wraps", price: "From $499", color: "from-[#124585] to-[#080f24]" },
  { id: "tint", price: "From $59.99", color: "from-[#343e55] to-[#0a111c]" },
  { id: "body-paint", price: "Free estimates", color: "from-[#4b375b] to-[#171020]" },
  { id: "detailing", price: "From $25.99", color: "from-[#145362] to-[#0b1824]" },
];

export default function Home() {
  return (
    <div id="top" className="bg-white">
      <SubNav title="Diamond Auto" links={[
        { label: "Customization", href: "#customization" },
        { label: "Services & pricing", href: "#services" },
        { label: "Visit the shop", href: "#visit" },
      ]} cta={{ label: "Call the shop", href: "tel:+19199876666" }} appearAfter={560} tone="light" />

      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-24 text-center text-white sm:px-8">
        <p className="apple-metric-label text-[#2997ff]">Diamond Auto · Raleigh, NC</p>
        <h1 className="apple-headline mt-3 max-w-4xl text-balance">Auto repair &amp; customization.</h1>
        <p className="apple-sub mt-4 max-w-2xl text-white/70">
          Maintenance, repairs, and custom work for your car.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link href="#services" className="pill pill-dark">See service pricing</Link>
          <a href="sms:+19199876666" className="pill pill-blue">Text for a quote</a>
        </div>

        <div className="mt-12 w-full max-w-4xl">
          <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-[radial-gradient(ellipse_at_center,#172f53,black_72%)]">
            <Image src="/vehicles/cadillac-cts-2015/cutouts/front-right.webp" alt="" fill preload className="object-contain" sizes="(max-width: 896px) 100vw, 896px" />
          </div>
        </div>

        <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="scroll-hint h-2 w-1 rounded-full bg-white/70" />
          </div>
        </div>
      </section>

      <section id="customization" className="relative scroll-mt-12 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-5 pb-16 pt-24 text-center sm:px-8">
        <p className="apple-metric-label text-[#0071e3]">Customization</p>
        <h2 className="apple-headline mt-3 max-w-4xl text-balance text-[#1d1d1f]">Make it yours.</h2>
        <p className="apple-sub mt-4 max-w-2xl text-[#6e6e73]">Wraps, tint, body and paint, and detailing.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link href="#services" className="pill pill-light">See all services</Link>
          <a href="sms:+19199876666" className="pill pill-blue">Text for a quote</a>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {customServices.map(({ id, price, color }) => (
            <Link key={id} href={`#${id}`} className={`bento bento-hover relative flex aspect-[3/4] flex-col justify-end overflow-hidden bg-gradient-to-br p-4 text-left ${color}`}>
              <p className="text-sm font-semibold text-white">{serviceMenu.find((service) => service.id === id)?.title}</p>
              <p className="mt-1 text-xs text-white/80">{price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="services" className="scroll-mt-12 bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal blur>
            <h2 className="text-[40px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-5xl">Services &amp; pricing.</h2>
            <nav aria-label="Jump to a service" className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              {serviceMenu.map(({ id, title }) => <Link key={id} href={`#${id}`} className="link-apple text-[15px]">{title}</Link>)}
            </nav>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceMenu.map(({ id, title, prices, note }, index) => (
              <Reveal key={id} delay={(index % 3) * 80} blur>
                <section id={id} className="bento flex h-full scroll-mt-12 flex-col bg-white p-6">
                  <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-[#1d1d1f]">{title}</h3>
                  <dl className="my-4 divide-y divide-black/10">
                    {prices.map(([service, price]) => (
                      <div key={service} className="flex justify-between gap-3 py-2.5 text-sm">
                        <dt className="text-[#515154]">{service}</dt>
                        <dd className="shrink-0 whitespace-nowrap text-right font-semibold tabular-nums text-[#1d1d1f]">{price}</dd>
                      </div>
                    ))}
                  </dl>
                  {note && <p className="mb-4 text-sm text-[#6e6e73]">{note}</p>}
                  <a href={`sms:+19199876666?body=${encodeURIComponent(`Hi Diamond Auto, I’d like a quote for ${title}. My vehicle is `)}`} className="link-apple mt-auto inline-block py-2 text-[15px]" aria-label={`Text for a quote for ${title}`}>Text for a quote ›</a>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="relative overflow-hidden bg-black px-5 py-20 text-center text-white sm:px-8 sm:py-28">
        <p className="apple-metric-label text-[#2997ff]">Visit the shop</p>
        <h2 className="apple-headline mt-3 text-balance">Built in Raleigh.</h2>
        <p className="apple-sub mt-4 text-white/70">5915 Triangle Dr, Raleigh, NC 27617</p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a href="https://www.google.com/maps/search/?api=1&query=5915+Triangle+Dr+Raleigh+NC+27617" className="pill pill-dark">Get directions</a>
          <a href="tel:+19199876666" className="pill pill-blue">Call (919) 987-6666</a>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal blur>
            <h2 className="text-[40px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-5xl">Everything, in one place.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { title: "Maintenance & repairs", href: "#maintenance", description: "Oil changes, diagnostics, brakes, and more.", dark: true },
              { title: "Wraps & tint", href: "#customization", description: "Explore finishes and film options for your vehicle.", dark: false },
              { title: "Body & paint", href: "#body-paint", description: "See refinishing prices and request a free estimate.", dark: false },
              { title: "Detailing", href: "#detailing", description: "Compare basic, deluxe, and premium packages.", dark: true },
            ].map(({ title, href, description, dark }, index) => (
              <Reveal key={href} delay={(index % 2) * 90} blur>
                <Link href={href} className={`bento bento-hover flex min-h-[280px] flex-col justify-between p-9 ${dark ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}>
                  <div>
                    <h3 className="text-[28px] font-semibold leading-tight tracking-tight">{title}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-[#6e6e73]"}`}>{description}</p>
                  </div>
                  <span className={`mt-6 text-[15px] ${dark ? "text-[#2997ff]" : "text-[#0071e3]"}`}>See pricing ›</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
