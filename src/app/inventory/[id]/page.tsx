import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import ListingCard from "@/components/site/ListingCard";
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

  return (
    <div className="bg-white pt-28 text-zinc-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link href="/inventory" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
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
            <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-zinc-400">
              {v.frames360?.length ? "360° View Available — drag to rotate" : "Photo gallery"}
            </p>
          </Reveal>

          {/* Detail */}
          <div className="flex flex-col">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{v.year} · {v.bodyType}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                {v.make} {v.model}
              </h1>
              <p className="mt-2 text-lg text-zinc-600">{v.trim}</p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-7 flex items-end gap-5 border-y border-zinc-200 py-6">
                <div>
                  <p className="text-4xl font-bold tracking-tight text-zinc-900">{formatPrice(v.price)}</p>
                  <p className="mt-1 text-xs text-zinc-500">est. {estMonthly(v.price)} · 72mo</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.slice(0, 4).map(([k, val]) => (
                  <div key={k} className="rounded-lg bg-zinc-50 p-4">
                    <dt className="text-[10px] uppercase tracking-widest text-zinc-400">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-zinc-900">{val}</dd>
                  </div>
                ))}
              </dl>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {specs.slice(4).map(([k, val]) => (
                  <div key={k} className="rounded-lg bg-zinc-50 p-4">
                    <dt className="text-[10px] uppercase tracking-widest text-zinc-400">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-zinc-900">{val}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-zinc-900 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  Ask About This Vehicle
                </Link>
                <Link
                  href="/financing"
                  className="rounded-full border border-zinc-300 px-7 py-3.5 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
                >
                  Estimate Payments
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Vehicle gallery */}
        {media.length > 0 && (
          <Reveal blur>
            <div className="mt-24 border-t border-zinc-200 pt-16">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Vehicle gallery.</h2>
              <p className="mt-2 text-zinc-600">Browse every angle in a premium studio presentation.</p>
              <div className="mt-8">
                <VehicleGallery media={media} alt={`${v.year} ${v.make} ${v.model}`} />
              </div>
            </div>
          </Reveal>
        )}

        {/* Related */}
        <div className="mt-28 border-t border-zinc-200 pt-16 pb-24">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">More from the collection</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ListingCard key={r.id} vehicle={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
