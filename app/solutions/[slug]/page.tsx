import { notFound } from "next/navigation";

import { SolutionPageRenderer } from "@/components/solutions/SolutionPageRenderer";
import { solutionRegistry } from "@/content/solutions/registry";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;

  const solution = solutionRegistry.find((item) => item.slug === slug);

  if (!solution) {
    notFound();
  }

  return <SolutionPageRenderer solution={solution} />;
}
