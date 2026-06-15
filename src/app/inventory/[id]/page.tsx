import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatMileage,
  formatPrice,
  getVehicle,
  vehicles,
} from "@/lib/vehicles";

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata(
  props: PageProps<"/inventory/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  const vehicle = getVehicle(id);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${formatMileage(
      vehicle.mileage
    )}, ${formatPrice(vehicle.price)} at Diamond Auto Sales.`,
  };
}

export default async function VehiclePage(props: PageProps<"/inventory/[id]">) {
  const { id } = await props.params;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  const specs: [string, string][] = [
    ["Mileage", formatMileage(vehicle.mileage)],
    ["Body Type", vehicle.bodyType],
    ["Fuel", vehicle.fuel],
    ["Transmission", vehicle.transmission],
    ["Drivetrain", vehicle.drivetrain],
    ["Exterior", vehicle.exteriorColor],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/inventory"
        className="text-sm font-medium text-gold-dark hover:underline"
      >
        ← Back to inventory
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div
          className={`flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br ${vehicle.accent} lg:h-full lg:min-h-[24rem]`}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-white/70">
            {vehicle.make} {vehicle.model}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-navy">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-2 text-2xl font-bold text-gold-dark">
            {formatPrice(vehicle.price)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-3"
              >
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-navy">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy transition hover:bg-amber-300"
            >
              Ask About This Vehicle
            </Link>
            <Link
              href="/financing"
              className="rounded-full border border-navy/20 px-6 py-3 text-center text-sm font-semibold text-navy transition hover:border-gold"
            >
              Estimate Payments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
