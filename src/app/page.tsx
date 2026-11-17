import type { Metadata } from "next";
import Image from "next/image";
import { serviceMenu } from "@/lib/service-menu";

const phone = "(919) 987-6666";
const call = "tel:+19199876666";
const text = "sms:+19199876666";
const address = "5915 Triangle Dr, Raleigh, NC 27617";
const directions = "https://www.google.com/maps/search/?api=1&query=5915+Triangle+Dr+Raleigh+NC+27617";

export const metadata: Metadata = {
  title: { absolute: "Auto Repair & Customization in Raleigh | Diamond Auto Sales" },
  description: "Explore prices for oil changes, brake service, tires, tint, wraps, body and paint, and detailing at Diamond Auto Sales in Raleigh, NC.",
  openGraph: {
    title: "Auto Repair & Customization in Raleigh | Diamond Auto Sales",
    description: "Browse the Diamond Auto service menu and text the shop for a quote.",
  },
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[#080e19] pb-24 text-white sm:pb-0">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" aria-label="Diamond Auto Sales home">
            <Image src="/brand/logo.webp" alt="Diamond Auto Sales" width={144} height={72} className="h-14 w-auto object-contain" />
          </a>
          <a href={call} className="rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">{phone}</a>
        </div>
      </header>

      <section className="border-b border-sky-400/20 bg-[radial-gradient(ellipse_at_top_right,#163e71,transparent_70%)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <a href={directions} className="text-sm font-semibold text-sky-300 underline underline-offset-4">Raleigh, North Carolina</a>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">Auto repair &amp; customization</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">From oil changes and brakes to tint, wraps, paint, and detailing. See pricing and reach the shop directly.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#service-menu" className="rounded-full bg-sky-300 px-5 py-3 font-bold text-slate-950 hover:bg-sky-200">See service pricing</a>
            <a href={text} className="rounded-full border border-white/25 px-5 py-3 font-semibold hover:bg-white/10">Text for a quote</a>
          </div>
        </div>
      </section>

      <section id="service-menu" aria-labelledby="menu-title" className="mx-auto max-w-6xl scroll-mt-5 px-5 py-12 sm:px-8 sm:py-16">
        <h2 id="menu-title" className="text-3xl font-bold tracking-tight sm:text-4xl">Services &amp; pricing</h2>
        <nav aria-label="Jump to a service" className="mb-8 mt-5 flex flex-wrap gap-2">
          {serviceMenu.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-sky-300/25 px-3.5 py-2.5 text-sm text-sky-100 hover:bg-sky-400/15">{title}</a>
          ))}
        </nav>

        <div className="grid gap-5 lg:grid-cols-2">
          {serviceMenu.map(({ id, title, prices, note }) => (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-5 flex-col rounded-2xl border border-white/10 bg-[#101a2a] p-5 sm:p-7">
              <h3 id={`${id}-title`} className="text-2xl font-bold tracking-tight">{title}</h3>
              <dl className="my-4 divide-y divide-white/10">
                {prices.map(([service, price]) => (
                  <div key={service} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-2.5">
                    <dt className="text-sm leading-relaxed text-slate-200 sm:text-base">{service}</dt>
                    <dd className="whitespace-nowrap text-right text-sm font-semibold tabular-nums text-sky-300 sm:text-base">{price}</dd>
                  </div>
                ))}
              </dl>
              {note && <p className="mb-4 text-sm text-slate-300">{note}</p>}
              <div className="mt-auto pt-2">
                <a href={`${text}?body=${encodeURIComponent(`Hi Diamond Auto, I’d like a quote for ${title}. My vehicle is `)}`} className="inline-flex min-h-11 items-center rounded-full border border-sky-300/40 px-4 text-sm font-semibold text-sky-200 hover:bg-sky-400/15" aria-label={`Text for a quote for ${title}`}>Text for a quote</a>
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <div>
            <p className="font-bold">Diamond Auto Sales LLC</p>
            <a href={directions} className="mt-1 inline-block text-slate-300 underline underline-offset-4">{address}</a>
          </div>
          <a href={call} className="font-semibold text-sky-300">{phone}</a>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 border-t border-white/15 bg-[#080e19] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
        <a href={call} className="rounded-full border border-white/25 py-3 text-center text-sm font-semibold">Call the shop</a>
        <a href={text} className="rounded-full bg-sky-300 py-3 text-center text-sm font-bold text-slate-950">Text for a quote</a>
      </div>
    </div>
  );
}
