import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PhotoLayer from "@/components/site/PhotoLayer";
import { FEATURED_PERFORMANCE_ID } from "@/lib/featured";
import SectionHeading from "@/components/site/SectionHeading";
import InventoryExplorer from "@/components/site/InventoryExplorer";
import { vehicles, getVehicle, vehicleImage, formatPrice } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse the current collection of vehicles at Diamond Auto Sales in Raleigh, NC.",
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
  const perfCar = FEATURED_PERFORMANCE_ID ? getVehicle(FEATURED_PERFORMANCE_ID) : null;
  return (
    <div className="bg-white">
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-24 text-center text-white sm:px-8">
        <p className="apple-metric-label text-[#0071e3]">
          {perfCar ? "Now Available" : "Performance"}
        </p>
        <h1 className="apple-headline mt-3 max-w-4xl text-balance">
          {perfCar ? (
            <>{perfCar.year} {perfCar.make} {perfCar.model}.</>
          ) : (
            <>Performance, perfected.</>
          )}
        </h1>
        <p className="apple-sub mt-4 max-w-2xl text-white/70">
          {perfCar
            ? `${perfCar.trim} · ${perfCar.power} · ${formatPrice(perfCar.price)}`
            : "Explore the Diamond Auto Sales vehicle collection."}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link href={perfCar ? `/inventory/${perfCar.id}` : "#collection"} className="pill pill-dark">
            Browse collection
          </Link>
          <Link
            href={perfCar ? `/contact?intent=test-drive&vehicle=${perfCar.id}` : "/contact?intent=test-drive"}
            className="pill pill-blue"
          >
            Reserve
          </Link>
          <Link href="/experience" className="pill pill-3d">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M12 2.5l8.5 4.9v9.2L12 21.5 3.5 16.6V7.4z" />
              <path d="M3.7 7.3L12 12l8.3-4.7M12 12v9.3" />
            </svg>
            Explore in 3D
          </Link>
        </div>

        {/* product visual */}
        <div className="mt-8 w-full max-w-3xl">
          {perfCar ? (
            <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-[28px]">
              <div className="absolute inset-0" style={{ background: perfCar.tone }} />
              <PhotoLayer src={vehicleImage(perfCar.id)} alt={`${perfCar.year} ${perfCar.make} ${perfCar.model}`} eager />
            </div>
          ) : (
            <Image
              src="/vehicles/cadillac-cts-2015/cutouts/front-right.webp"
              alt=""
              width={1500}
              height={759}
              loading="eager"
              className="mx-auto h-auto w-full"
            />
          )}
        </div>

        <div aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
            <span className="scroll-hint h-2 w-1 rounded-full bg-white/70" />
          </div>
        </div>
      </section>

      <div id="collection" className="mx-auto max-w-7xl scroll-mt-12 px-5 pb-28 pt-24 sm:px-8 sm:pt-28">
        <SectionHeading
          kicker="Inventory"
          title={<>The current collection.</>}
          intro="Filter, compare, and request a test drive."
        />
        <div className="mt-12">
          <InventoryExplorer vehicles={vehicles} initial={initial} />
        </div>
      </div>
    </div>
  );
}
