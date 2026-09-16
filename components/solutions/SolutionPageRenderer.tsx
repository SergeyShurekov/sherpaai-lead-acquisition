import { getAbsoluteUrl } from "@/lib/site";
import { solutionRegistry } from "@/content/solutions/registry";
import type { EvidenceStatus, Solution, SolutionClaim } from "@/types/solution";
import Link from "next/link";
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

function ClaimText({ claim }: { claim: SolutionClaim }) {
  return (
    <>
      {claim.text.split("\n\n").map((paragraph) => {
        const linkText = claim.sourceLinkText;
        const linkIndex = linkText ? paragraph.indexOf(linkText) : -1;
        const beforeLink =
          linkIndex >= 0 ? paragraph.slice(0, linkIndex) : paragraph;
        const afterLink =
          linkIndex >= 0 && linkText
            ? paragraph.slice(linkIndex + linkText.length)
            : "";

        return (
          <p key={paragraph}>
            {linkIndex >= 0 && linkText && claim.sourceUrl ? (
              <>
                {beforeLink}
                <a href={claim.sourceUrl} target="_blank" rel="noreferrer">
                  {linkText}
                </a>
                {afterLink}
              </>
            ) : (
              paragraph
            )}
          </p>
        );
      })}

      {claim.source && (
        <p className={styles.claimSource}>
          Источник:{" "}
          {claim.sourceUrl ? (
            <a href={claim.sourceUrl} target="_blank" rel="noreferrer">
              {claim.source}
            </a>
          ) : (
            claim.source
          )}
        </p>
      )}

      {claim.list && (
        <ul className={styles.claimTextList}>
          {claim.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
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

      {intro && (
        <div className={styles.sectionIntro}>
          {intro.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
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

function ContentSection({
  id,
  eyebrow,
  section,
}: {
  id: string;
  eyebrow: string;
  section: Solution["problem"];
}) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <SectionIntro
          eyebrow={eyebrow}
          title={section.title}
          intro={section.intro}
        />

        {section.statement && (
          <p className={styles.integrationStatement}>{section.statement}</p>
        )}

        {section.items.length > 0 && (
          <div className={styles.claimGrid}>
            {section.items.map((item, index) => (
              <article
                className={styles.claimCard}
                key={`${item.text}-${index}`}
              >
                <div className={styles.cardNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3>{item.title || item.text}</h3>
                {item.title && <ClaimText claim={item} />}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function SolutionPageRenderer({ solution }: SolutionPageRendererProps) {
  const pageUrl = getAbsoluteUrl(`/${solution.slug}/`);
  const heroDescription = solution.heroDescription ?? solution.solution.intro;
  const finalCtaDescription =
    solution.finalCtaDescription ?? solution.businessValue.intro;
  const heroWorkflow = solution.heroWorkflow;

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
                {solution.heroKicker ?? "Sherpa AI · решение для рекрутинга"}
              </p>

              <h1 className={styles.heroTitle}>{solution.h1}</h1>

              {heroDescription && (
                <p className={styles.heroDescription}>{heroDescription}</p>
              )}

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
                  {solution.heroNote ??
                    "Решение формируется вокруг конкретной задачи бизнеса"}
                </span>
              </div>
            </div>

            {/* Conceptual workflow visualization */}
            <div
              className={styles.heroVisual}
              aria-label="Концептуальная схема рабочего сценария"
            >
              <div className={styles.visualChrome}>
                <div className={styles.visualChromeDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <span className={styles.visualChromeLabel}>
                  РАБОЧИЙ СЦЕНАРИЙ
                </span>
              </div>

              <div className={styles.workflow}>
                <div className={styles.workflowStep}>
                  <span className={styles.workflowIcon} aria-hidden="true">
                    01
                  </span>

                  <div>
                    <strong>{heroWorkflow?.taskLabel ?? "Задача"}</strong>
                    <span>
                      {heroWorkflow?.taskDescription ?? "Конкретный участок работы"}
                    </span>
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
                    <strong>{heroWorkflow?.designLabel ?? "Проектирование"}</strong>
                    <span>
                      {heroWorkflow?.designDescription ??
                        "Определяем подход и последовательность действий"}
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
                    <strong>{heroWorkflow?.resultLabel ?? "Результат"}</strong>
                    <span>
                      {heroWorkflow?.resultDescription ?? "Настроенный рабочий сценарий"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.visualFooter}>
                <span>ГИБКИЙ</span>
                <span>ОРИЕНТИРОВАННЫЙ НА ПРОЦЕСС</span>
                <span>С УЧАСТИЕМ СПЕЦИАЛИСТА</span>
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

              <h3>{solution.problem.statement ?? solution.problem.title}</h3>

              {(solution.problem.lead ?? solution.problem.intro) && (
                <p>
                  {solution.problem.lead ??
                    solution.problem.intro?.split("\n\n")[0]}
                </p>
              )}
            </div>

            <div className={styles.claimGrid}>
              {solution.problem.items.map((item, index) => (
                <article className={styles.claimCard} key={item.text}>
                  <div className={styles.cardNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3>{item.title || item.text}</h3>
                  {item.title && <ClaimText claim={item} />}
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

          <div className={styles.solutionList}>
            {solution.solution.items.map((item, index) => (
              <article className={styles.solutionItem} key={item.text}>
                <span className={styles.solutionItemNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.solutionItemBody}>
                  <h3>{item.title || item.text}</h3>
                  {item.title && <ClaimText claim={item} />}
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
            eyebrow="к результату"
            title={
              solution.capabilitiesTitle ??
              "Какие задачи рекрутинга можно автоматизировать"
            }
            intro={
              solution.capabilitiesIntro ??
              "Области применения определяются конкретной задачей и текущей организацией работы."
            }
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

                <h3>{item.title || item.text}</h3>
                {item.title && <ClaimText claim={item} />}
              </article>
            ))}
          </div>
        </div>
      </section>

      {solution.workflow && (
        <section id="workflow" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow="Человек и AI"
              title={solution.workflow.title}
              intro={solution.workflow.intro}
            />

            <div className={styles.solutionList}>
              {solution.workflow.steps.map((step, index) => (
                <article className={styles.solutionItem} key={step.title}>
                  <span className={styles.solutionItemNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.solutionItemBody}>
                    <h3>{step.title}</h3>
                    <ClaimText claim={step} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scenarios */}
      {solution.scenarios.length > 0 && (
        <section id="scenarios" className={styles.section}>
          <div className={styles.container}>
            <SectionIntro
              eyebrow="Примеры задач"
              title={solution.scenariosTitle ?? "Типовые задачи рекрутинга"}
              intro={
                solution.scenariosIntro ??
                "Каждый сценарий начинается с выявления конкретной проблемы процесса и заканчивается определением подхода, который имеет смысл реализовать."
              }
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
                        <div
                          className={styles.scenarioArrow}
                          aria-hidden="true"
                        >
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
      )}

      {/* Integrations */}
      {solution.integrations && (
        <section
          id="integrations"
          className={`${styles.section} ${styles.sectionMuted}`}
        >
          <div className={styles.container}>
            <SectionIntro
              eyebrow="Работа с системами"
              title={solution.integrations.title}
              intro={solution.integrations.intro}
            />

            {solution.integrations.statement && (
              <p className={styles.integrationStatement}>
                {solution.integrations.statement}
              </p>
            )}

            {solution.integrations.items.length > 0 ? (
              <div className={styles.integrationGrid}>
                {solution.integrations.items.map((item) => (
                  <article className={styles.integrationCard} key={item.text}>
                    <span className={styles.integrationMark} aria-hidden="true">
                      ↗
                    </span>

                    <h3>{item.title || item.text}</h3>
                    {item.title && <ClaimText claim={item} />}
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {solution.development && (
        <ContentSection
          id="development"
          eyebrow="Постепенное развитие"
          section={solution.development}
        />
      )}

      {solution.humanRole && (
        <ContentSection
          id="human-role"
          eyebrow="Человек и AI"
          section={solution.humanRole}
        />
      )}

      {/* Business value */}
      {solution.businessValue.title && (
      <section id="value" className={styles.section}>
        <div className={styles.container}>
          <SectionIntro
            eyebrow={solution.businessValueEyebrow ?? "Результат"}
            title={solution.businessValue.title}
          />

          <div className={styles.valueLayout}>
            <div className={styles.valueLead}>
              <span className={styles.valueLeadMark} aria-hidden="true">
                →
              </span>

              <h3>
                {solution.businessValueLeadTitle ??
                  "Меньше ручной работы — больше возможностей для команды"}
              </h3>

              <p>
                {solution.businessValueLeadText ??
                  "Автоматизация помогает сосредоточиться на задачах, где требуется профессиональное участие."}
              </p>
            </div>

            <div className={styles.valueList}>
              {solution.businessValue.items.map((item, index) => (
                <article className={styles.valueItem} key={item.text}>
                  <span className={styles.valueItemNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.valueItemContent}>
                    <h3>{item.title || item.text}</h3>
                    {item.title && <ClaimText claim={item} />}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Evidence */}
      <section
        id="evidence"
        className={`${styles.section} ${styles.sectionEvidence}`}
      >
        <div className={styles.container}>
          <SectionIntro
            eyebrow="Практика"
            title={solution.evidenceTitle ?? "Практический опыт"}
            intro={
              solution.evidenceIntro ??
              "Ниже — примеры проектов и подтверждённые сведения о применении подхода на практике."
            }
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

      {solution.relatedSolutions && solution.relatedSolutions.length > 0 && (
        <section
          className={styles.section}
          aria-labelledby="related-solutions-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>Связанные решения</p>
            <h2 className={styles.sectionTitle} id="related-solutions-title">
              Другие задачи подбора
            </h2>
            <div className={styles.relatedLinks}>
              {solution.relatedSolutions.map((relatedSlug) => {
                const related = solutionRegistry.find(
                  (item) => item.slug === relatedSlug,
                );

                return related ? (
                  <Link
                    className={styles.relatedLink}
                    href={`/${related.slug}/`}
                    key={related.slug}
                  >
                    {related.name}
                    <ArrowIcon />
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqIntro}>
              <p className={styles.eyebrow}>FAQ</p>

              <h2 className={styles.sectionTitle}>Частые вопросы</h2>

              <p className={styles.sectionIntro}>
                {solution.faqIntro ??
                  "Ответы на основные вопросы о подходе и формировании решения."}
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

              <h2>{solution.primaryCta.label}</h2>

              {finalCtaDescription && <p>{finalCtaDescription}</p>}
            </div>

            <div className={styles.finalCtaActions}>
              <CallbackForm solutionSlug={solution.slug} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
