import type { Solution } from "@/types/solution";
import Link from "next/link";

interface SolutionPageRendererProps {
  solution: Solution;
}

export function SolutionPageRenderer({ solution }: SolutionPageRendererProps) {
  const pageUrl = `https://www.hr-demandengine.ru/${solution.slug}/`;

  const visibleEvidence = solution.evidence.filter(
    (item) => item.status === "confirmed",
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://www.hr-demandengine.ru/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: solution.name,
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: solution.seo.title,
    description: solution.seo.metaDescription,
    url: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {solution.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <nav aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span aria-hidden="true"> / </span>
        <span>{solution.name}</span>
      </nav>

      <section>
        <p>SherpaAI · решение для рекрутинга</p>

        <h1>{solution.h1}</h1>

        <p>
          AI-рекрутинг под задачи компании: функциональность формируется вокруг
          конкретного процесса подбора, его проблем и требований бизнеса.
        </p>

        <div>
          <a href={solution.primaryCta.href ?? "#contact"}>
            {solution.primaryCta.label}
          </a>

          {solution.secondaryCta && (
            <a href={solution.secondaryCta.href ?? "#contact"}>
              {solution.secondaryCta.label}
            </a>
          )}
        </div>
      </section>

      <section id="problem">
        <p>Проблема</p>

        <h2>{solution.problem.title}</h2>

        {solution.problem.intro && <p>{solution.problem.intro}</p>}

        <div>
          {solution.problem.items.map((item) => (
            <article key={item.text}>
              <h3>{item.text}</h3>

              <p>
                {item.status === "confirmed"
                  ? "Подтверждённая область"
                  : "Типовая зона возможной автоматизации"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="solution">
        <p>Решение</p>

        <h2>{solution.solution.title}</h2>

        {solution.solution.intro && <p>{solution.solution.intro}</p>}

        <div>
          {solution.solution.items.map((item) => (
            <article key={item.text}>
              <h3>{item.text}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities">
        <p>Функциональные области</p>

        <h2>Что может быть сформировано под задачу</h2>

        <p>
          Ниже перечислены не фиксированные модули продукта, а релевантные
          области AI-рекрутинга, которые могут быть частью конфигурации при
          наличии соответствующего бизнес-требования.
        </p>

        <div>
          {solution.capabilities.map((item) => (
            <article key={item.text}>
              <h3>{item.text}</h3>
              <p>Область возможной конфигурации</p>
            </article>
          ))}
        </div>
      </section>

      <section id="scenarios">
        <p>Сценарии</p>

        <h2>Типовые задачи рекрутинга</h2>

        <div>
          {solution.scenarios.map((scenario) => (
            <article key={scenario.title}>
              <h3>{scenario.title}</h3>

              <p>
                <strong>Проблема:</strong> {scenario.problem}
              </p>

              <p>
                <strong>Подход:</strong> {scenario.solution}
              </p>

              {scenario.outcome && (
                <p>
                  <strong>Результат:</strong> {scenario.outcome.text}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {solution.integrations && (
        <section id="integrations">
          <p>Интеграции</p>

          <h2>{solution.integrations.title}</h2>

          {solution.integrations.intro && <p>{solution.integrations.intro}</p>}
        </section>
      )}

      <section id="value">
        <p>Бизнес-ценность</p>

        <h2>{solution.businessValue.title}</h2>

        <div>
          {solution.businessValue.items.map((item) => (
            <article key={item.text}>
              <h3>{item.text}</h3>

              <p>
                {item.status === "confirmed"
                  ? "Подтверждено"
                  : "Потенциальная ценность; зависит от конкретного процесса"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence">
        <p>Доказательства</p>

        <h2>Реальные кейсы и результаты</h2>

        {visibleEvidence.length > 0 ? (
          <div>
            {visibleEvidence.map((item) => (
              <article key={item.id}>
                <h3>{item.claim}</h3>

                {item.value && <p>{item.value}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p>
            Реальные кейсы и показатели существуют, но не публикуются на этой
            странице без структурированного подтверждения источника и
            результата.
          </p>
        )}
      </section>

      <section id="faq">
        <p>FAQ</p>

        <h2>Частые вопросы</h2>

        <div>
          {solution.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact">
        <p>Следующий шаг</p>

        <h2>Обсудить задачу рекрутинга</h2>

        <p>
          Опишите процесс подбора, который требуется автоматизировать или
          усилить. Решение можно сформировать после уточнения задачи и
          требований бизнеса.
        </p>

        <a href={solution.primaryCta.href ?? "#contact"}>
          {solution.primaryCta.label}
        </a>
      </section>
    </main>
  );
}
