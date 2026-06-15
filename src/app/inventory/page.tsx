import type { Metadata } from "next";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse our full inventory of quality pre-owned cars, trucks, and SUVs at Diamond Auto Sales.",
};

export default function InventoryPage() {
  const available = vehicles.filter((v) => v.status !== "Sold").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold text-navy">Our Inventory</h1>
        <p className="mt-2 text-zinc-600">
          {available} vehicles available now. Filtering and search coming soon.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
