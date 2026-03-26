import { env } from "@/lib/env";

export default function sitemap() {
  const baseUrl = env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
  ];
}

