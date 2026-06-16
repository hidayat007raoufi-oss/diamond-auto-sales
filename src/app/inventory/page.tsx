import type { Metadata } from "next";
import SectionHeading from "@/components/site/SectionHeading";
import InventoryExplorer from "@/components/site/InventoryExplorer";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse the current collection of luxury and performance vehicles at Diamond Auto in Raleigh, NC. Hand-selected, Diamond Certified, and ready to drive.",
};

export default function InventoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-36 sm:px-8">
      <SectionHeading
        kicker="The Collection"
        title={<>Current inventory.</>}
        intro="Hand-selected vehicles, reconditioned in-house and ready to drive. This is where it starts."
      />
      <div className="mt-12">
        <InventoryExplorer vehicles={vehicles} />
      </div>
    </div>
  );
}
