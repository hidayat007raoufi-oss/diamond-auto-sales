import type { Metadata } from "next";
import SectionHeading from "@/components/site/SectionHeading";
import InventoryExplorer from "@/components/site/InventoryExplorer";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse the current collection of luxury and performance vehicles at Diamond Auto in Raleigh, NC. Hand-selected, Diamond Certified, and ready to drive.",
};

const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

export default async function InventoryPage(props: PageProps<"/inventory">) {
  const sp = await props.searchParams;
  const initial = {
    make: str(sp.make),
    body: str(sp.body),
    price: str(sp.price),
    mileage: str(sp.mileage),
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading
          kicker="Inventory"
          title={<>The current collection.</>}
          intro="Hand-selected luxury and performance vehicles — each Diamond Certified, 27-point inspected, and priced up front. Filter, compare, and book a test drive."
        />
        <div className="mt-12">
          <InventoryExplorer vehicles={vehicles} initial={initial} />
        </div>
      </div>
    </div>
  );
}
