import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { solutionRegistry } from "@/content/solutions/registry";
import { createHomepageMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

export const metadata = createHomepageMetadata();

const homepageSolutionSlugs = [
  "ai-recruiter",
  "avtomatizaciya-rekrutinga",
  "hr-assistant",
  "chat-bot-dlya-rekrutinga",
] as const;

const solutionDescriptions: Record<(typeof homepageSolutionSlugs)[number], string> = {
  "ai-recruiter":
    "Обработка откликов, первичный отбор и типовые коммуникации в процессе подбора.",
  "avtomatizaciya-rekrutinga":
    "Определение повторяющихся участков подбора и их встраивание в существующий процесс.",
  "hr-assistant":
    "Поиск, обработка и подготовка информации, документы и рутинные HR-задачи.",
  "chat-bot-dlya-rekrutinga":
    "Общение с кандидатами, сбор информации и отдельные этапы подбора.",
};

const homepageSolutions = homepageSolutionSlugs.map((slug) => {
  const solution = solutionRegistry.find((item) => item.slug === slug);

  if (!solution) {
    throw new Error(`Solution not found: ${slug}`);
  }

  return solution;
});

export default function Home() {
  return (
    <div className={styles.page}>
      <Header>
        <Link href="/" className={styles.brand} aria-current="page">
          Sherpa AI
        </Link>
      </Header>

      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.intro} aria-labelledby="home-title">
            <h1 id="home-title">AI-решения для HR и рекрутинга</h1>
            <p>
              Помогаем автоматизировать отдельные задачи и процессы HR и
              рекрутинга с помощью AI.
            </p>
          </section>

          <nav className={styles.solutions} aria-label="Решения Sherpa AI">
            {homepageSolutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/${solution.slug}`}
                className={styles.solutionCard}
              >
                <h2>{solution.name}</h2>
                <p>
                  {solutionDescriptions[
                    solution.slug as (typeof homepageSolutionSlugs)[number]
                  ]}
                </p>
                <span className={styles.cardArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
