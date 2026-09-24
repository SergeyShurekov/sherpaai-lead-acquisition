import type { MetadataRoute } from "next";

import { solutionRegistry } from "@/content/solutions/registry";
import { getAbsoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: getAbsoluteUrl("/") },
        ...solutionRegistry.map((solution) => ({
            url: getAbsoluteUrl(`/${solution.slug}/`),
        })),
    ];
}
