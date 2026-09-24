import type { Metadata } from "next";

import { getAbsoluteUrl } from "@/lib/site";
import type { Solution } from "@/types/solution";

const HOMEPAGE_TITLE = "Sherpa AI — AI-решения для HR и рекрутинга";
const HOMEPAGE_DESCRIPTION =
    "AI-решения для автоматизации задач и процессов HR и рекрутинга: AI-рекрутер, автоматизация подбора, HR-ассистент и чат-бот для рекрутинга.";

export function createHomepageMetadata(): Metadata {
    return {
        title: HOMEPAGE_TITLE,
        description: HOMEPAGE_DESCRIPTION,
        alternates: {
            canonical: getAbsoluteUrl("/"),
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

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
