import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { repairMenu, servicePhone } from "@/lib/repair-menu";

const title = "Auto Repair & Customization";
const description = "See prices for auto repair, maintenance, window tint, wraps, body and paint, and detailing in Raleigh, NC.";
const telephone = `tel:${servicePhone.number}`;
const textMessage = `sms:${servicePhone.number}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function Home() {
  return (
    <div className="bg-[#070a10] text-white">
      <section className="relative isolate overflow-hidden border-b border-blue-300/15 bg-[radial-gradient(ellipse_at_70%_80%,#12346a_0%,#0b1425_42%,#070a10_80%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-2 px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-0 lg:pb-14">
          <div className="relative z-10 text-center lg:py-12 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#91caff]">
              Raleigh, North Carolina
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.8rem,6.7vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
              Auto Repair <span className="text-[#91caff]">&amp; Customization</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
              From oil changes and diagnostics to wraps, tint, and paint, see what we offer and what it costs.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={telephone} className="pill pill-blue">Call to Book</a>
              <a href="#service-prices" className="pill pill-dark">View Service Prices</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[680px]">
            <div aria-hidden className="absolute inset-x-[12%] bottom-[18%] h-12 rounded-full bg-blue-400/40 blur-3xl" />
            <Image
              src="/vehicles/cadillac-cts-2015/cutouts/front-left.webp"
              alt=""
              width={1500}
              height={979}
              sizes="(min-width: 1024px) 53vw, (min-width: 768px) 680px, 95vw"
              loading="eager"
              className="relative h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section id="service-prices" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="service-heading">
        <h2 id="service-heading" className="text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          Services &amp; prices
        </h2>
        <nav aria-label="Service categories" className="mt-6 flex flex-wrap gap-2">
          {repairMenu.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-white/15 px-3.5 py-2 text-sm text-slate-200 transition-colors hover:border-blue-300/60 hover:text-white"
            >
              {category.title}
            </a>
          ))}
        </nav>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repairMenu.map((category) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-heading`}
              className="flex flex-col rounded-3xl border border-blue-300/20 bg-gradient-to-br from-[#111d30] to-[#0b111c] p-5 sm:p-6"
            >
              <h3 id={`${category.id}-heading`} className="text-2xl font-semibold tracking-tight">
                {category.title}
              </h3>
              <dl className="mt-4 divide-y divide-white/10">
                {category.items.map((item) => (
                  <div key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 py-2.5 text-sm">
                    <dt className="text-slate-200">{item.name}</dt>
                    <dd className="text-right font-semibold tabular-nums text-[#91caff]">
                      {item.price}
                    </dd>
                    {item.includes && (
                      <dd className="col-span-2 mt-1 text-xs leading-relaxed text-slate-300">
                        {item.includes.join(" · ")}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              {(category.note || category.brands) && (
                <div className="mt-auto pt-4 text-sm text-slate-300">
                  {category.note && <p className="font-medium text-[#b6dcff]">{category.note}</p>}
                  {category.brands && <p>{category.brands}</p>}
                </div>
              )}
            </section>
          ))}
        </div>
      </section>

      <section id="service-contact" aria-labelledby="booking-heading" className="border-t border-blue-300/15 bg-[#0d1727] px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 id="booking-heading" className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
          Book a service or request a quote
        </h2>
        <address className="mt-4 not-italic text-slate-300">5915 Triangle Dr, Raleigh, NC 27617</address>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={telephone} className="pill pill-blue">Call {servicePhone.display}</a>
          <a href={textMessage} className="pill pill-dark">Text for a Quote</a>
        </div>
        <Link href="/inventory" className="mt-8 inline-block text-sm font-medium text-[#91caff] hover:underline">
          Browse vehicle inventory →
        </Link>
      </section>
    </div>
  );
}
