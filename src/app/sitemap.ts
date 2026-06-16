import type { MetadataRoute } from "next";
import { vehicles } from "@/lib/vehicles";

const base = "https://diamondautonc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/inventory", "/financing", "/services", "/programs", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const vehiclePages = vehicles.map((v) => ({
    url: `${base}/inventory/${v.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...vehiclePages];
}
