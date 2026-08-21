import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionPageRenderer } from "@/components/solutions/SolutionPageRenderer";
import { solutionRegistry } from "@/content/solutions/registry";
import { createSolutionMetadata } from "@/lib/seo/metadata";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return solutionRegistry.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;

  const solution = solutionRegistry.find((item) => item.slug === slug);

  if (!solution) {
    return {};
  }

  return createSolutionMetadata(solution);
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;

  const solution = solutionRegistry.find((item) => item.slug === slug);

  if (!solution) {
    notFound();
  }

  return <SolutionPageRenderer solution={solution} />;
}
