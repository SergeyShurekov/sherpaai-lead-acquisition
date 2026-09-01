import { getAbsoluteUrl } from "@/lib/site";
import type { EvidenceStatus, Solution, SolutionClaim } from "@/types/solution";
import { CallbackForm } from "./CallbackForm";

import styles from "./SolutionPageRenderer.module.css";

interface SolutionPageRendererProps {
  solution: Solution;
}

const evidenceLabels: Record<
  EvidenceStatus,
  {
    label: string;
    symbol: string;
  }
> = {
  confirmed: {
    label: "Подтверждено",
    symbol: "✓",
  },
  inference: {
    label: "Вывод",
    symbol: "↳",
  },
  hypothesis: {
    label: "Гипотеза",
    symbol: "?",
  },
  unknown: {
    label: "Не установлено",
    symbol: "—",
  },
};

function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  const evidence = evidenceLabels[status];

  return (
    <span
      className={`${styles.evidenceBadge} ${styles[`evidenceBadge_${status}`]}`}
    >
      <span aria-hidden="true" className={styles.evidenceSymbol}>
        {evidence.symbol}
      </span>
      {evidence.label}
    </span>
  );
}

function ClaimStatus({ claim }: { claim: SolutionClaim }) {
  return (
    <div className={styles.claimMeta}>
      <EvidenceBadge status={claim.status} />

      {/* {claim.source && (
        <span className={styles.sourceLabel}>Источник: {claim.source}</span>
      )} */}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>

      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrowIcon}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SolutionPageRenderer({ solution }: SolutionPageRendererProps) {
  const pageUrl = getAbsoluteUrl(`/${solution.slug}/`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Решения",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 3,
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
    <main className={styles.page}>
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

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.heroKicker}>
                <span className={styles.heroKickerMark}>AI</span>
                Sherpa AI · решение для рекрутинга
              </p>

              <h1 className={styles.heroTitle}>{solution.h1}</h1>

              <p className={styles.heroDescription}>
                AI для автоматизации задач рекрутинга: обработка откликов,
                первичный отбор кандидатов, коммуникация и другие повторяющиеся
                этапы подбора.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href={solution.primaryCta.href ?? "#contact"}
                >
                  {solution.primaryCta.label}
                  <ArrowIcon />
                </a>

                {solution.secondaryCta && (
                  <a
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    href={solution.secondaryCta.href ?? "#contact"}
                  >
                    {solution.secondaryCta.label}
                  </a>
                )}
              </div>

              <div className={styles.heroNote}>
                <span className={styles.heroNoteIcon} aria-hidden="true">
                  ✓
                </span>

                <span>
                  Решение формируется вокруг конкретной задачи бизнеса
                </span>
              </div>
            </div>

            {/* Conceptual workflow visualization */}
            <div
              className={styles.heroVisual}
              aria-label="Концептуальная схема AI-рекрутинга"
            >
              <div className={styles.visualChrome}>
                <div className={styles.visualChromeDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <span className={styles.visualChromeLabel}>
                  ПРОЦЕСС AI-РЕКРУТИНГА
                </span>
              </div>

              <div className={styles.workflow}>
                <div className={styles.workflowStep}>
                  <span className={styles.workflowIcon} aria-hidden="true">
                    01
                  </span>

                  <div>
                    <strong>Задача бизнеса</strong>
                    <span>Требования к кандидатам и этапам подбора</span>
                  </div>
                </div>

                <div className={styles.workflowConnector} aria-hidden="true">
                  <span />
                </div>

                <div
                  className={`${styles.workflowStep} ${styles.workflowStepActive}`}
                >
                  <span className={styles.workflowIcon} aria-hidden="true">
                    AI
                  </span>

                  <div>
                    <strong>AI-конфигурация</strong>
                    <span>
                      Конструктор ИИ: собираем алгоритм под вашу задачу.
                    </span>
                  </div>
                </div>

                <div className={styles.workflowConnector} aria-hidden="true">
                  <span />
                </div>

                <div className={styles.workflowStep}>
                  <span className={styles.workflowIcon} aria-hidden="true">
                    03
                  </span>

                  <div>
                    <strong>Рабочий сценарий</strong>
                    <span>Автоматизированный процесс рекрутинга</span>
                  </div>
                </div>
              </div>

              <div className={styles.visualFooter}>
                <span>ГИБКИЙ</span>
                <span>ОРИЕНТИРОВАННЫЙ НА ПРОЦЕСС</span>
                <span>С УЧАСТИЕМ ИИ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        id="problem"
        className={`${styles.section} ${styles.sectionMuted}`}
      >
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Проблема"
            title={solution.problem.title}
            intro={solution.problem.intro}
          />

          <div className={styles.problemLayout}>
            <div className={styles.problemLead}>
              <span className={styles.sectionIndex}>01</span>

              <h3>
                Рекрутинг требует времени там, где процесс можно упорядочить
              </h3>

              <p>
                Там, где идёт поток кандидатов и много рутинных действий,
                AI‑автоматизация особенно уместна
              </p>
            </div>

            <div className={styles.claimGrid}>
              {solution.problem.items.map((item, index) => (
                <article className={styles.claimCard} key={item.text}>
                  <div className={styles.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>

                  <ClaimStatus claim={item} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className={styles.section}>
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Решение"
            title={solution.solution.title}
            intro={solution.solution.intro}
          />

          <div className={styles.transformation}>
            <div className={styles.transformationSide}>
              <span className={styles.transformationLabel}>ДАНО</span>

              <h3>Проблема процесса</h3>

              <p>
                Определяем узкие места в подборе и конкретные задачи, которые
                нужно решить
              </p>
            </div>

            <div className={styles.transformationCore}>
              <span className={styles.transformationCoreMark}>AI</span>

              <span>Конфигурация</span>

              <ArrowIcon />
            </div>

            <div className={styles.transformationSide}>
              <span className={styles.transformationLabel}>ВЫХОД</span>

              <h3>Сценарий решения</h3>

              <p>
                Формируем функционал под ваш процесс: решение работает в вашей
                логике, а не требует перестраивать работу
              </p>
            </div>
          </div>

          <div className={styles.solutionList}>
            {solution.solution.items.map((item, index) => (
              <article className={styles.solutionItem} key={item.text}>
                <span className={styles.solutionItemNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.solutionItemBody}>
                  <h3>{item.text}</h3>
                  <ClaimStatus claim={item} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className={`${styles.section} ${styles.sectionDark}`}
      >
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Области применения"
            title="Какие задачи рекрутинга можно автоматизировать"
            intro='Это не готовый "коробочный" продукт с функциями, которые вы оплатите, но никогда не откроете. Это конструктор: мы включим только те блоки ИИ-рекрутинга, которые закроют ваше конкретное бизнес-требование'
          />

          <div className={styles.capabilityGrid}>
            {solution.capabilities.map((item, index) => (
              <article className={styles.capabilityCard} key={item.text}>
                <span className={styles.capabilityNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.capabilityMarker} aria-hidden="true">
                  <span />
                </div>

                <h3>{item.text}</h3>

                {/* <p>Область возможной конфигурации</p>

                <ClaimStatus claim={item} /> */}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section id="scenarios" className={styles.section}>
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Примеры задач"
            title="Типовые задачи рекрутинга"
            intro="Каждый сценарий начинается с конкретной проблемы процесса и заканчивается определением подхода, который имеет смысл реализовать."
          />

          <div className={styles.scenarioGrid}>
            {solution.scenarios.map((scenario, index) => (
              <article className={styles.scenarioCard} key={scenario.title}>
                <div className={styles.scenarioHeader}>
                  <span className={styles.scenarioNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{scenario.title}</h3>
                </div>

                <div className={styles.scenarioFlow}>
                  <div className={styles.scenarioBlock}>
                    <span>Проблема</span>
                    <p>{scenario.problem}</p>
                  </div>

                  <div className={styles.scenarioArrow} aria-hidden="true">
                    ↓
                  </div>

                  <div className={styles.scenarioBlock}>
                    <span>Подход</span>
                    <p>{scenario.solution}</p>
                  </div>

                  {scenario.outcome && (
                    <>
                      <div className={styles.scenarioArrow} aria-hidden="true">
                        ↓
                      </div>

                      <div className={styles.scenarioOutcome}>
                        <div className={styles.outcomeHeader}>
                          <span>Результат</span>
                          <EvidenceBadge status={scenario.outcome.status} />
                        </div>

                        <p>{scenario.outcome.text}</p>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      {solution.integrations && (
        <section
          id="integrations"
          className={`${styles.section} ${styles.sectionMuted}`}
        >
          <div className={styles.container}>
            <SectionIntro
              eyebrow="Интеграции"
              title={solution.integrations.title}
              intro={solution.integrations.intro}
            />

            {solution.integrations.items.length > 0 ? (
              <div className={styles.integrationGrid}>
                {solution.integrations.items.map((item) => (
                  <article className={styles.integrationCard} key={item.text}>
                    <span className={styles.integrationMark} aria-hidden="true">
                      ↗
                    </span>

                    <h3>{item.text}</h3>

                    <ClaimStatus claim={item} />
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.integrationNote}>
                <span className={styles.integrationNoteMark} aria-hidden="true">
                  API
                </span>

                <div>
                  <h3>Подключаем нужные вам системы</h3>
                  <p>
                    Интеграции подбираются под задачи компании и уже
                    используемые системы и сервисы. Не нужно менять привычные
                    процессы — AI-рекрутинг встраивается в существующую
                    инфраструктуру.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Business value */}
      <section id="value" className={styles.section}>
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Результат"
            title={solution.businessValue.title}
          />

          <div className={styles.valueLayout}>
            <div className={styles.valueLead}>
              <span className={styles.valueLeadMark} aria-hidden="true">
                →
              </span>

              <h3>Меньше ручной работы — больше возможностей для команды</h3>

              <p>
                Мы автоматизируем те этапы подбора, которые отнимают больше
                всего времени, чтобы рекрутеры могли сосредоточиться на задачах,
                где действительно требуется их участие.
              </p>
            </div>

            <div className={styles.valueList}>
              {solution.businessValue.items.map((item, index) => (
                <article className={styles.valueItem} key={item.text}>
                  <span className={styles.valueItemNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.valueItemContent}>
                    <h3>{item.text}</h3>
                    <ClaimStatus claim={item} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section
        id="evidence"
        className={`${styles.section} ${styles.sectionEvidence}`}
      >
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Ключевое"
            title="AI-рекрутинг под задачи вашей компании"
            intro="Sherpa AI помогает автоматизировать конкретные этапы найма, интегрируется с необходимыми системами и адаптируется под существующие процессы компании."
          />

          <div className={styles.evidenceLegend}>
            {(Object.keys(evidenceLabels) as EvidenceStatus[]).map((status) => (
              <EvidenceBadge key={status} status={status} />
            ))}
          </div>

          <div className={styles.evidenceGrid}>
            {solution.evidence.map((item) => (
              <article className={styles.evidenceCard} key={item.id}>
                <div className={styles.evidenceCardHeader}>
                  <EvidenceBadge status={item.status} />

                  <span className={styles.evidenceId}>{item.id}</span>
                </div>

                <h3>{item.claim}</h3>

                {item.value && (
                  <p className={styles.evidenceValue}>{item.value}</p>
                )}

                {/* <span className={styles.evidenceSource}>
                  Источник: {item.source}
                </span> */}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqIntro}>
              <p className={styles.eyebrow}>FAQ</p>

              <h2 className={styles.sectionTitle}>Частые вопросы</h2>

              <p className={styles.sectionIntro}>
                Ответы на основные вопросы о подходе и формировании решения.
              </p>
            </div>

            <div className={styles.faqList}>
              {solution.faq.map((item, index) => (
                <details className={styles.faqItem} key={item.question}>
                  <summary className={styles.faqSummary}>
                    <span className={styles.faqNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.faqQuestion}>{item.question}</span>

                    <span className={styles.faqToggle} aria-hidden="true">
                      +
                    </span>
                  </summary>

                  <div className={styles.faqAnswer}>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.finalCtaInner}>
            <div>
              <p className={styles.eyebrow}>Следующий шаг</p>

              <h2>Обсудить задачи рекрутинга</h2>

              <p>
                Расскажите, какие этапы подбора занимают больше всего времени.
                Определим, где AI может автоматизировать работу и какой сценарий
                имеет смысл реализовать.
              </p>
            </div>

            <div className={styles.finalCtaActions}>
              <CallbackForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
