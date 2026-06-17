import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/site/Button";
import Reveal from "@/components/motion/Reveal";
import VehicleCard from "@/components/site/VehicleCard";
import Vehicle360 from "@/components/site/Vehicle360";
import ImageZoom from "@/components/site/ImageZoom";
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

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link href="/inventory" className="text-sm text-dim transition-colors hover:text-white">
          ← Back to inventory
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Presentation */}
          <Reveal blur>
            {v.frames360?.length ? (
              <Vehicle360 frames={v.frames360} alt={`${v.year} ${v.make} ${v.model} 360° view`} />
            ) : (
              <ImageZoom
                src={vehicleImage(v.id)}
                tone={v.tone}
                alt={`${v.year} ${v.make} ${v.model} ${v.trim}`}
              />
            )}
            <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-mute">
              {v.frames360?.length ? "360° View Available — drag to rotate" : "Photo gallery"}
            </p>
          </Reveal>

          {/* Detail */}
          <div className="flex flex-col">
            <Reveal>
              <p className="kicker">{v.year} · {v.bodyType}</p>
              <h1 className="display mt-3 text-4xl text-white sm:text-5xl">
                {v.make} {v.model}
              </h1>
              <p className="mt-2 text-lg text-dim">{v.trim}</p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-7 flex items-end gap-5 border-y border-line py-6">
                <div>
                  <p className="display text-4xl text-metal">{formatPrice(v.price)}</p>
                  <p className="mt-1 text-xs text-mute">est. {estMonthly(v.price)} · 72mo</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {specs.slice(0, 4).map(([k, val]) => (
                  <div key={k} className="bg-bg p-4">
                    <dt className="text-[10px] uppercase tracking-widest text-mute">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{val}</dd>
                  </div>
                ))}
              </dl>
              <dl className="mt-px grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {specs.slice(4).map(([k, val]) => (
                  <div key={k} className="bg-bg p-4">
                    <dt className="text-[10px] uppercase tracking-widest text-mute">{k}</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{val}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact">Ask About This Vehicle</Button>
                <Button href="/financing" variant="ghost">
                  Estimate Payments
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        <div className="mt-28 border-t border-line pt-16">
          <h2 className="display text-2xl text-white sm:text-3xl">More from the collection</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <VehicleCard key={r.id} vehicle={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
