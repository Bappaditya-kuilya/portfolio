import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bappadityakuilya.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ["about", "projects", "skills", "journey", "contact"];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sections.map((section) => ({
      url: `${siteUrl}#${section}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
