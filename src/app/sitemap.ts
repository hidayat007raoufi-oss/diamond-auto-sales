import type { MetadataRoute } from "next";

const base = "https://diamondautonc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/our-story", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );
}
