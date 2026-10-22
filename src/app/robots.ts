import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Crawling stays allowed so search engines can read the "noindex" tag while
  // `site.allowIndexing` is false; the sitemap is only announced once indexing is allowed.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: site.allowIndexing ? `${site.url}/sitemap.xml` : undefined,
  };
}
