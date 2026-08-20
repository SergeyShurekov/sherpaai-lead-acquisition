import type { Solution } from "@/types/solution";

interface SolutionPageRendererProps {
  solution: Solution;
}

export function SolutionPageRenderer({ solution }: SolutionPageRendererProps) {
  return (
    <main>
      <h1>{solution.h1}</h1>
    </main>
  );
}
