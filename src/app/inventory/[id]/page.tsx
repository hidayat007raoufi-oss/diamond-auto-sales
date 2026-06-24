import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/site/Button";
import ListingCard from "@/components/site/ListingCard";
import LeadForm from "@/components/site/LeadForm";
import Vehicle360 from "@/components/site/Vehicle360";
import ImageZoom from "@/components/site/ImageZoom";
import VehicleGallery from "@/components/site/VehicleGallery";
import {
  estMonthly,
  formatMileage,
  formatPrice,
  getVehicle,
  vehicleImage,
  vehicles,
} from "@/lib/vehicles";

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata(
  props: PageProps<"/inventory/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const v = getVehicle(id);
  if (!v) return { title: "Vehicle not found" };
  return {
    title: `${v.year} ${v.make} ${v.model} ${v.trim}`,
    description: `${v.year} ${v.make} ${v.model} ${v.trim} — ${v.power}, ${formatMileage(
      v.mileage
    )}, ${formatPrice(v.price)} at Diamond Auto, Raleigh NC.`,
  };
}

export default async function VehiclePage(props: PageProps<"/inventory/[id]">) {
  const { id } = await props.params;
  const v = getVehicle(id);
  if (!v) notFound();

  const specs: [string, string][] = [
    ["Year", String(v.year)],
    ["Mileage", formatMileage(v.mileage)],
    ["Power", v.power],
    ["0–60 mph", v.zeroToSixty],
    ["Drivetrain", v.drivetrain],
    ["Body", v.bodyType],
    ["Exterior", v.exterior],
    ["Status", v.status],
  ];

  const similar = vehicles.filter((x) => x.id !== v.id && x.bodyType === v.bodyType).slice(0, 3);
  const fallback = vehicles.filter((x) => x.id !== v.id).slice(0, 3);
  const related = (similar.length ? similar : fallback).slice(0, 3);

  const heroPhoto = vehicleImage(v.id);
  const media = v.media ?? (heroPhoto ? [{ label: "Exterior", images: [heroPhoto] }] : []);
  const hasEngine = media.some((m) => m.label === "Engine Bay");
  const hotspots = hasEngine
    ? [{ frame: 0, label: "Engine Bay", x: "52%", y: "40%", caption: "Tap to view engine bay" }]
    : [];

  const pillLink =
    "rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]";

  return (
    <div className="bg-black pt-28 text-white">
      <div className="bg-[radial-gradient(120%_120%_at_50%_-10%,rgba(47,128,255,0.10),transparent_55%)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href="/inventory" className="text-sm text-white/40 transition-colors hover:text-white">
            ← Back to inventory
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            {/* Presentation */}
            <Reveal blur>
              {v.frames360?.length ? (
                <Vehicle360
                  frames={v.frames360}
                  alt={`${v.year} ${v.make} ${v.model} 360° view`}
                  hotspots={hotspots}
                />
              ) : (
                <ImageZoom
                  src={vehicleImage(v.id)}
                  tone={v.tone}
                  alt={`${v.year} ${v.make} ${v.model} ${v.trim}`}
                />
              )}
              <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-white/40">
                {v.frames360?.length ? "360° View Available — drag to rotate" : "Photo gallery"}
              </p>
            </Reveal>

            {/* Detail */}
            <div className="flex flex-col">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">
                  {v.year} · {v.bodyType}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {v.make} {v.model}
                </h1>
                <p className="mt-2 text-lg text-white/60">{v.trim}</p>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-3 border-y border-white/10 py-6">
                  <div>
                    <p className="text-4xl font-bold tracking-tight text-chrome">{formatPrice(v.price)}</p>
                    <p className="mt-1 text-xs text-white/40">est. {estMonthly(v.price)} · 72mo · $5k down</p>
                  </div>
                  <div className="text-sm text-white/50">
                    <span className="text-blue-400">Diamond Certified</span> · 27-point inspected
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {specs.slice(0, 4).map(([k, val]) => (
                    <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">{k}</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{val}</dd>
                    </div>
                  ))}
                </dl>
                <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {specs.slice(4).map(([k, val]) => (
                    <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">{k}</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{val}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* CTA cluster */}
              <Reveal delay={220}>
                <div className="mt-9 flex flex-col gap-3">
                  <Button href={`/contact?intent=test-drive&vehicle=${v.id}`} className="w-full sm:w-auto">
                    Schedule Test Drive
                  </Button>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Link href="/financing" className={pillLink}>
                      Get Approved
                    </Link>
                    <Link href={`/contact?intent=trade&vehicle=${v.id}`} className={pillLink}>
                      Value Your Trade
                    </Link>
                    <a href="tel:+19198878666" className={pillLink}>
                      Call (919) 887-8666
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Vehicle gallery */}
          {media.length > 0 && (
            <Reveal blur>
              <div className="mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Vehicle gallery.</h2>
                <p className="mt-2 text-white/60">Browse every angle in a premium studio presentation.</p>
                <div className="mt-8">
                  <VehicleGallery media={media} alt={`${v.year} ${v.make} ${v.model}`} />
                </div>
              </div>
            </Reveal>
          )}

          {/* Ask about this vehicle */}
          <Reveal blur>
            <div className="mt-24 border-t border-white/10 pt-16">
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400/90">Inquire</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Ask about this {v.make} {v.model}.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/60">
                    Reserve it, request more photos, or lock in your test drive. A Diamond specialist
                    replies fast — usually within the hour during business hours.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`/contact?intent=test-drive&vehicle=${v.id}`} variant="ghost">
                      Schedule Test Drive
                    </Button>
                    <a href="tel:+19198878666" className={pillLink}>
                      Call (919) 887-8666
                    </a>
                  </div>
                </div>
                <LeadForm />
              </div>
            </div>
          </Reveal>

          {/* Related */}
          <div className="mt-24 border-t border-white/10 pt-16 pb-24">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">More from the collection</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ListingCard key={r.id} vehicle={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
