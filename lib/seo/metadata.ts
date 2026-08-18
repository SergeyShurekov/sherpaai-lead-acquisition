import type { Metadata } from "next";

import { getAbsoluteUrl } from "@/lib/site";
import type { Solution } from "@/types/solution";

export function createSolutionMetadata(solution: Solution): Metadata {
    const canonicalUrl = getAbsoluteUrl(`/${solution.slug}/`);

    return {
        title: solution.seo.title,
        description: solution.seo.metaDescription,

        alternates: {
            canonical: canonicalUrl,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}