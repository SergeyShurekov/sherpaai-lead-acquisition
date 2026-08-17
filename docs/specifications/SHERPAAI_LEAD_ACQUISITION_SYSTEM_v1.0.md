# SHERPAAI LEAD ACQUISITION SYSTEM

## Implementation Specification v1.0

**Project:** SherpaAI
**System:** Lead Acquisition Website
**Framework:** Next.js
**Repository:** GitHub
**Primary Search Engine:** Yandex
**Target Market:** Russia
**Devices:** Desktop / Mobile
**Primary KPI:** Qualified Leads
**Implementation Agent:** Codex / Claude Code
**Primary Working Environment:** ChatGPT Project / Claude.ai Project
**Analytical Standard:** EBAAS v0.2 Working Draft

---

# 1. Specification Status

This document is the authoritative implementation specification for **SherpaAI Lead Acquisition System — Implementation Wave 1**.

The specification defines:

* system architecture;
* content architecture;
* SEO architecture;
* lead-generation architecture;
* evidence and provenance controls;
* implementation order;
* validation requirements;
* GitHub workflow;
* Definition of Done.

The implementation agent MUST treat this document as an **implementation contract**.

The implementation agent MUST NOT reinterpret this specification as an invitation to redesign the system.

If an implementation decision is not explicitly defined here, the agent MAY choose the simplest technically appropriate solution consistent with:

1. the existing repository architecture;
2. this specification;
3. Next.js / TypeScript best practices;
4. EBAAS v0.2 principles.

If the existing repository conflicts materially with this specification, the agent MUST stop before making architectural changes and report the conflict.

---

# 2. Working Environment

This specification is designed to be used primarily inside an AI-assisted development project such as:

* ChatGPT Project;
* Claude.ai Project;
* Codex / Claude Code implementation workflow.

The AI implementation agent is expected to have access to the repository or to repository artifacts supplied through the project.

The agent MUST distinguish between:

```text
AUTHORITATIVE SPECIFICATION
        ↓
EXISTING REPOSITORY
        ↓
IMPLEMENTATION
```

and generated assumptions.

The agent MUST NOT treat its own previous output as authoritative evidence about the repository.

Repository inspection always has priority over assumptions about existing implementation.

---

# 3. Purpose

Create an SEO/Growth-oriented web system for attracting organic search traffic and converting that traffic into qualified leads for SherpaAI.

The system must allow solution pages to be created and scaled from validated search demand.

The architecture MUST be designed for scalable generation of solution pages rather than five manually implemented pages.

Core model:

```text
Search Intent
      ↓
Solution Definition
      ↓
Page Specification
      ↓
Structured Page Data
      ↓
Reusable Components
      ↓
Next.js Page
      ↓
Search Traffic
      ↓
Lead
```

---

# 4. Core Product Model

SherpaAI is treated as a **solution constructor**.

Solution functionality is not assumed to be a permanently fixed catalogue of product modules.

Instead:

```text
Customer Problem
        ↓
Solution
        ↓
SherpaAI Configuration
```

rather than:

```text
Fixed Product Features
        ↓
Generic Product Page
```

The implementation MUST NOT invent product capabilities merely to fill page sections.

A capability may be described as factual only when it is supported by authoritative project information or evidence.

---

# 5. Business Objective

Primary KPI:

> Number of qualified leads.

The following are intermediate SEO/Growth metrics and MUST NOT be treated as the final business objective:

* number of pages;
* number of keywords;
* impressions;
* clicks;
* rankings;
* traffic volume;
* content volume.

SEO metrics exist to measure progress toward qualified lead acquisition.

---

# 6. First Implementation Wave

Create five solution pages.

| ID    | Solution                 | Primary Intent             | Exact Demand |       Current Position |
| ----- | ------------------------ | -------------------------- | -----------: | ---------------------: |
| LP-01 | AI-рекрутер              | `ai рекрутер`              |          244 |                      — |
| LP-02 | Автоматизация рекрутинга | `автоматизация рекрутинга` |           75 |                     97 |
| LP-03 | HR-ассистент             | `hr ассистент`             |           45 | — / related visibility |
| LP-04 | HR-чат-бот               | `hr чат-бот`               |           54 |                      9 |
| LP-05 | Чат-бот для рекрутинга   | `чат-бот для рекрутинга`   |            1 |                      2 |

`Exact Demand` represents the exact Wordstat frequency supplied by the analytical source.

Absence of a demand value MUST NOT be interpreted as zero demand.

The implementation agent MUST NOT independently replace supplied demand figures with newly estimated values unless explicitly instructed to perform new research.

---

# 7. URL Architecture

Preferred URL structure:

```text
/solutions/ai-recruiter/
/solutions/avtomatizaciya-rekrutinga/
/solutions/hr-assistent/
/solutions/hr-chat-bot/
/solutions/chat-bot-dlya-rekrutinga/
```

URLs MUST NOT be hard-coded into reusable presentation components.

Each solution MUST have a centralized configuration containing its slug.

The slug MUST act as the routing identifier.

---

# 8. Solution Data Architecture

The implementation MUST use a data-driven solution model.

Conceptual structure:

```text
content/
  solutions/
    ai-recruiter.ts
    avtomatizaciya-rekrutinga.ts
    hr-assistent.ts
    hr-chat-bot.ts
    chat-bot-dlya-rekrutinga.ts
```

The exact filesystem structure MAY be adapted to the existing repository, but the separation of content and presentation MUST remain.

Content definitions MUST NOT contain duplicated React page markup.

---

# 9. Page Data Model

Minimum conceptual model:

```ts
type SolutionPage = {
  slug: string
  intent: string
  title: string
  metaDescription: string
  h1: string

  problem: ProblemSection
  solution: SolutionSection
  scenarios: Scenario[]
  workflow?: WorkflowSection
  integrations?: IntegrationSection
  evidence?: EvidenceSection
  faq?: FAQItem[]

  primaryCta: CTA
  secondaryCta?: CTA

  relatedSolutions?: string[]
  entities?: string[]
}
```

The model MAY be extended when required by the specification or existing implementation.

It MUST NOT be expanded into a generic CMS model without a concrete requirement.

---

# 10. Page Rendering Model

Required rendering model:

```text
Solution Data
      ↓
Solution Registry
      ↓
SolutionPageRenderer
      ↓
Reusable Sections
      ↓
Rendered Page
```

The implementation MUST NOT create five independent page implementations containing substantially duplicated React markup.

Forbidden architectural pattern:

```text
page1.tsx
page2.tsx
page3.tsx
page4.tsx
page5.tsx
```

with duplicated rendering logic.

---

# 11. Required Components

Minimum reusable component set:

```text
Header
Footer

HeroSection
ProblemSection
SolutionSection
ScenarioSection
WorkflowSection
IntegrationSection
EvidenceSection
FAQSection
CTASection

Breadcrumbs
```

Additional components MAY be introduced only where an actual implementation requirement exists.

Do not create abstractions solely for theoretical future flexibility.

---

# 12. Hero Contract

Every solution page MUST contain:

```text
H1
↓
Short Value Proposition
↓
Primary CTA
```

The Hero MUST NOT contain unsupported:

* rankings;
* percentages;
* performance metrics;
* customer results;
* product capabilities;
* superiority claims;
* guarantees;
* testimonials.

Claims in the Hero are subject to the same evidence rules as the rest of the page.

---

# 13. Problem Section

Each page MUST describe a concrete problem corresponding to its search intent.

### LP-01 — AI-рекрутер

Problem:

> tasks performed by recruiters that may potentially be automated or delegated to AI.

### LP-02 — Автоматизация рекрутинга

Problem:

> manual and repetitive stages of the recruitment process.

### LP-03 — HR-ассистент

Problem:

> HR tasks for which a digital AI assistant may be useful.

### LP-04 — HR-чат-бот

Problem:

> HR communication and information tasks.

### LP-05 — Чат-бот для рекрутинга

Problem:

> interaction with candidates and automation of selected recruitment-process stages.

The Problem section MUST describe the user's operational problem rather than merely repeat the target keyword.

---

# 14. Solution Section

Each page MUST answer:

> How can SherpaAI form a solution to this problem?

Preferred model:

```text
Customer Requirement
        ↓
Solution Design
        ↓
SherpaAI
        ↓
Configured Workflow
```

Avoid unsupported formulation such as:

> "SherpaAI has the following fixed modules..."

unless the existence of those modules is explicitly confirmed by authoritative project information.

---

# 15. Scenario Model

Conceptual model:

```ts
type Scenario = {
  title: string
  problem: string
  solution: string
  outcome?: string
}
```

`outcome` MAY be rendered only when supported by valid evidence.

An unsupported expected result MUST NOT be presented as an actual result.

Distinguish between:

```text
possible outcome
```

and:

```text
verified result
```

The latter requires evidence.

---

# 16. Evidence Model

Evidence is a separate semantic entity.

Minimum model:

```ts
type Evidence = {
  type: "case" | "metric" | "testimonial"
  source: string
  claim: string
  verified: boolean
}
```

Evidence MUST NOT automatically become visible content merely because an object exists.

Production rendering requires valid verification.

Required rule:

```text
verified === true
        ↓
may be rendered as factual evidence

verified === false
        ↓
must not be rendered as factual evidence
```

If no valid evidence exists:

```text
section = not rendered
```

The implementation MUST NOT fabricate:

* cases;
* testimonials;
* metrics;
* sources;
* verification;
* customer results.

---

# 17. Case Model

Conceptual model:

```ts
type CaseStudy = {
  industry?: string
  problem: string
  solution: string
  result?: string
  metrics?: Metric[]
}
```

Fields MAY remain optional.

The architecture MUST support adding real cases later without changing the core page-rendering architecture.

A case MUST NOT be created solely because a page would benefit from having one.

---

# 18. Metrics

Conceptual model:

```ts
type Metric = {
  label: string
  value: string
  source: string
  verified: boolean
}
```

Production rendering rule:

```text
verified === true
        ↓
metric may be displayed as factual
```

```text
verified === false
        ↓
metric must not be displayed as factual
```

The agent MUST NOT convert estimated, hypothetical, inferred, or invented values into factual marketing metrics.

---

# 19. Evidence Status

The content model MUST support EBAAS evidence states.

```ts
type EvidenceStatus =
  | "confirmed"
  | "inference"
  | "hypothesis"
  | "unknown"
```

Rendering rules:

### CONFIRMED

May be presented as a factual claim when the source is valid.

### INFERENCE

May be used only when the wording clearly represents an inference rather than an established fact.

### HYPOTHESIS

Must not be presented as an established product fact or verified result.

### UNKNOWN

Must not be presented as a factual claim.

The implementation MUST NOT silently transform one evidence state into another.

---

# 20. Claim Model

For critical factual statements, support:

```ts
type Claim = {
  text: string
  status: EvidenceStatus
  source?: string
}
```

The source MAY be an internal project reference.

A provenance UI is NOT required.

The provenance mechanism exists primarily as an internal content-quality control.

---

# 21. Production Claim Rule

The following rule is mandatory:

```text
Claim
  ↓
Evidence Status
  ↓
Rendering Policy
```

Minimum rendering policy:

```text
confirmed
    → factual rendering permitted

inference
    → explicitly qualified rendering only

hypothesis
    → no factual rendering

unknown
    → no factual rendering
```

`verified: false` MUST never be treated as equivalent to `confirmed`.

Absence of evidence MUST result in omission, qualification, or neutral capability language—not fabrication.

---

# 22. Integrations

Do not create a fixed hard-coded catalogue of integrations without authoritative data.

Conceptual model:

```ts
type Integration = {
  name: string
  method?: string
  verified: boolean
}
```

If specific integrations are not confirmed:

```text
Integration list = empty
```

General capability such as API-based integration MAY be described only when that capability is supported by authoritative product information.

Do not invent integration names, protocols, vendors, or compatibility.

---

# 23. FAQ

FAQ MUST be defined independently for each search intent.

Conceptual model:

```ts
type FAQItem = {
  question: string
  answer: string
}
```

Do not use a single generic FAQ across all solution pages.

FAQ questions MUST represent real user uncertainty or commercially relevant questions.

Do not create FAQ entries solely to insert additional keywords.

---

# 24. SEO Metadata

Every solution page MUST have its own:

```text
title
description
canonical
robots
```

Metadata MUST be derived from solution data.

Required flow:

```text
Solution Data
      ↓
SEO Metadata
      ↓
Next.js Metadata API
```

Metadata MUST NOT be duplicated across unrelated solution pages.

---

# 25. Canonical

Each independent solution page MUST use a self-referencing canonical:

```text
canonical = current solution URL
```

Do not use canonical URLs to merge distinct search intents.

The canonical MUST correspond to the final public URL.

---

# 26. Robots

Solution pages MUST remain indexable unless there is an explicit technical or business reason to prevent indexing.

The implementation MUST NOT accidentally apply:

```text
noindex
```

to `/solutions/`.

---

# 27. Structured Data

The architecture MUST support, where applicable:

```text
Organization
WebPage
BreadcrumbList
FAQPage
```

Structured data MUST be generated conditionally from actual page content.

Required rule:

```text
FAQ exists
    ↓
FAQPage schema may be generated

No FAQ
    ↓
No FAQPage schema
```

The same principle applies to all structured data.

Do not generate schema content that does not correspond to visible or otherwise valid page information.

Structured data MUST NOT be used as a mechanism for introducing unsupported claims.

---

# 28. Breadcrumbs

Every solution page SHOULD provide breadcrumb navigation:

```text
Home
  ↓
Solutions
  ↓
Current Solution
```

Breadcrumb structured data MUST correspond to the actual visible breadcrumb structure.

---

# 29. Internal Linking

Solution pages MUST support semantically justified internal linking.

Initial conceptual relationship:

```text
AI Recruiter
    ↕
Recruitment Automation
    ↕
Recruitment Chatbot
    ↕
HR Chatbot
    ↕
HR Assistant
```

These relationships are not automatically bidirectional.

Links MUST be rendered only when explicitly configured.

Conceptual model:

```ts
relatedSolutions: string[]
```

The registry MUST be used to resolve related solution references.

Invalid solution references MUST fail validation rather than silently produce broken links.

---

# 30. Lead Generation Architecture

Each solution page SHOULD support the following conversion flow:

```text
Hero CTA
     ↓
Content
     ↓
Contextual CTA
     ↓
Final CTA
```

CTA model:

```ts
type CTA = {
  label: string
  href?: string
  eventName: string
}
```

The implementation MUST maintain consistent CTA event naming.

CTA labels SHOULD reflect the actual action available to the user.

Do not promise actions that the underlying interface does not provide.

---

# 31. Analytics Events

Minimum event set:

```text
page_view
cta_click
form_start
form_submit
contact_created
```

Event naming MUST be centralized and consistent.

Forbidden uncontrolled variants:

```text
click_cta
ctaClicked
button_click
lead_button
```

The analytics implementation SHOULD expose a single event abstraction rather than allowing arbitrary event-name duplication throughout components.

---

# 32. Analytics Rendering Rule

Analytics MUST NOT determine whether content is visible.

Content rendering and analytics instrumentation are separate concerns.

Preferred model:

```text
UI Action
    ├── user-visible behavior
    └── analytics event
```

A missing analytics provider MUST NOT make the primary page content unusable.

---

# 33. Lead Attribution

Where existing infrastructure supports it, preserve first-touch and current-touch attribution.

Minimum conceptual fields:

```text
landing_page
source
medium
campaign
query
referrer
```

The system SHOULD allow later analysis of:

> Which search intents actually generate qualified leads?

Attribution implementation MUST NOT require introducing a full CRM or analytics platform unless one already exists or is explicitly required.

---

# 34. Technical SEO Architecture

The Next.js implementation MUST support:

* SSR / SSG / ISR as appropriate;
* crawlable HTML;
* semantic links;
* metadata;
* canonical URLs;
* sitemap;
* robots;
* breadcrumbs;
* clean URLs.

Client-side rendering MUST NOT be used for primary content when server rendering can provide the content directly.

Server Components SHOULD be used by default.

Client Components MUST be introduced only where interactivity requires them.

---

# 35. Sitemap

Solution pages MUST automatically appear in the sitemap based on Solution Registry data.

Required architecture:

```text
Solution Registry
       ↓
Sitemap Generation
```

Do not maintain a second manually edited solution URL list.

The sitemap MUST NOT contain non-existent solution URLs.

---

# 36. Solution Registry

Create a centralized registry.

Conceptual model:

```ts
const solutions = {
  "ai-recruiter": {...},
  "avtomatizaciya-rekrutinga": {...},
  "hr-assistent": {...},
  "hr-chat-bot": {...},
  "chat-bot-dlya-rekrutinga": {...},
}
```

The registry is the authoritative runtime source for:

* routing;
* page resolution;
* metadata;
* sitemap;
* internal links;
* page rendering;
* static generation.

The registry MUST NOT contain duplicated content that already exists in the individual content definitions unless there is a concrete technical reason.

---

# 37. Dynamic Routing

Required route:

```text
app/solutions/[slug]/page.tsx
```

Resolution algorithm:

```text
slug
 ↓
Solution Registry
 ↓
validate solution
 ↓
render page
 ↓
generate metadata
```

Unknown slugs MUST return the appropriate Next.js not-found response.

---

# 38. Static Generation

If static generation is used:

```ts
generateStaticParams()
```

MUST obtain its slug list from the Solution Registry.

Do not maintain a second hard-coded list of solution slugs.

---

# 39. Type Safety

All solution content objects MUST pass TypeScript validation.

Avoid:

```ts
any
```

for solution content models.

Particular attention MUST be given to:

* CTA;
* evidence;
* claims;
* metrics;
* FAQ;
* entities;
* metadata;
* related solutions.

The implementation SHOULD prefer explicit types and discriminated unions where they improve validation.

---

# 40. Entity Architecture

Support minimal entity mapping.

Conceptual model:

```ts
type Entity = {
  id: string
  name: string
  type: string
}
```

A solution page MAY reference entities:

```ts
entities: string[]
```

This is an extensibility mechanism.

The implementation MUST NOT build a full knowledge graph infrastructure during Wave 1.

No graph database, entity-resolution engine, ontology platform, or dedicated knowledge graph UI is required.

---

# 41. Initial Entity Clusters

## AI Recruiter

```text
AI
AI recruiter
recruiter
recruitment
candidate
hiring
screening
qualification
automation
HR
```

## Recruitment Automation

```text
recruitment
hiring
automation
workflow
candidate
recruiter
HR
screening
communication
integration
```

## HR Assistant

```text
HR
HR assistant
AI assistant
employee
candidate
HR department
automation
workflow
```

## HR Chatbot

```text
HR
chatbot
AI
employee
candidate
communication
HR department
automation
```

## Recruitment Chatbot

```text
recruitment
chatbot
candidate
recruiter
hiring
communication
screening
qualification
automation
```

These are **entity coverage requirements**, not keyword insertion lists.

The implementation MUST NOT mechanically insert entity phrases into content.

---

# 42. Page-Specific Semantic Coverage

Each solution page SHOULD cover:

```text
Primary Entity
+
Supporting Entities
+
Problem Entities
+
Solution Entities
+
Commercial Entities
```

Example:

```text
AI Recruiter

Primary:
AI recruiter

Problem:
recruitment workload
candidate volume

Solution:
AI automation

Process:
screening
qualification
communication

Commercial:
implementation
demo
consultation
```

Semantic coverage MUST be achieved through useful content rather than keyword repetition.

---

# 43. Content Quality Rules

Forbidden:

* keyword stuffing;
* repetitive keyword insertion;
* artificial content volume;
* generic SEO filler;
* copied competitor wording;
* fabricated expertise;
* fabricated evidence;
* fabricated customer results;
* unsupported product capabilities.

Every content block MUST have a concrete function:

```text
Explain
OR
Prove
OR
Reduce uncertainty
OR
Move toward conversion
```

A block that serves none of these functions SHOULD NOT be added.

---

# 44. Competitive Consensus Integration

The page architecture MAY incorporate findings from previously completed Competitive Consensus research.

Competitive pages are:

```text
sources of coverage requirements
```

not:

```text
sources of copy
```

Do not copy:

* wording;
* claims;
* page structures one-to-one;
* marketing statements;
* unsupported competitor assertions.

Competitor information MUST be transformed into independent page requirements.

---

# 45. Content Architecture

Content MUST remain separate from JSX presentation.

Preferred structure:

```text
content/
  solutions/
    ai-recruiter.ts
    avtomatizaciya-rekrutinga.ts
    hr-assistent.ts
    hr-chat-bot.ts
    chat-bot-dlya-rekrutinga.ts
```

Components:

```text
components/
  sections/
```

Content definitions:

```text
content/
```

Types:

```text
types/
```

Presentation components MUST NOT contain the primary semantic content of the solution pages.

---

# 46. Blog Architecture

Blog is NOT part of Implementation Wave 1.

The architecture SHOULD allow future implementation of:

```text
/blog/
```

with support for:

* articles;
* topical clusters;
* internal links to solution pages;
* Article schema;
* author;
* publication date;
* update date.

Do not implement the blog during Wave 1 unless explicitly requested.

---

# 47. Landing vs Blog Intent Rule

Use the following architectural rule:

### Commercial intent

```text
→ solution page
```

### Informational intent

```text
→ article / knowledge content
```

### Mixed intent

```text
→ determine dominant intent from SERP and available analytical evidence
```

Do not create informational articles instead of commercial landing pages merely because articles are faster to produce.

---

# 48. Growth Architecture

The architecture MUST allow new solution pages to be added without modification of the core rendering system.

Future examples:

```text
solutions/
  ai-recruiter/
  recruitment-automation/
  hr-assistant/
  hr-chatbot/
  recruitment-chatbot/
  interview-bot/
  candidate-screening/
  hiring-automation/
  ...
```

Adding a new solution SHOULD require primarily:

```text
new content definition
+
new metadata
+
entity mapping
+
internal links
```

It MUST NOT require creating a new page-rendering component.

---

# 49. Performance Requirements

Target:

```text
Fast HTML
Minimal JS
Optimized assets
Stable layout
```

Avoid:

* heavy UI libraries without necessity;
* animation libraries without necessity;
* unnecessarily large client bundles;
* unnecessary Client Components;
* client-side rendering of primary content.

Performance optimization MUST not compromise semantic HTML or crawlability.

---

# 50. Accessibility

Minimum requirements:

* semantic HTML;
* correct heading hierarchy;
* labels for forms;
* keyboard navigation;
* accessible buttons;
* meaningful alt text;
* sufficient contrast;
* visible focus states where applicable.

Accessibility MUST be part of component implementation.

Do not postpone accessibility to a separate post-implementation phase.

---

# 51. Repository Structure

Preferred architecture:

```text
app/
  solutions/
    [slug]/
      page.tsx

components/
  layout/
  sections/
  ui/

content/
  solutions/

lib/
  seo/
  analytics/
  content/
  solutions/

types/
  solutions.ts

public/
  images/
```

The exact structure MAY be adapted to the existing Next.js App Router repository.

The architectural principles are mandatory even if directory names differ.

---

# 52. Repository Inspection Requirement

Before changing code, the implementation agent MUST inspect the existing repository.

At minimum determine:

```text
Next.js version
React version
TypeScript configuration
App Router structure
existing components
existing styling system
existing metadata implementation
existing analytics
existing forms / lead infrastructure
existing sitemap / robots implementation
existing dependencies
existing build scripts
existing tests
```

The agent MUST reuse existing infrastructure where appropriate.

The agent MUST NOT introduce a competing implementation merely because a new implementation is easier to generate.

---

# 53. Existing Architecture Preservation

The implementation MUST preserve existing architectural decisions unless they directly conflict with this specification.

Do NOT perform unrelated:

* refactoring;
* dependency upgrades;
* styling migrations;
* framework migrations;
* directory-wide restructuring;
* API redesign;
* database redesign.

A necessary change outside the implementation scope MUST be explicitly identified and justified.

---

# 54. Dependency Policy

Do not add dependencies unless they are required by the implementation.

Before adding a dependency, the implementation agent MUST verify that:

1. the functionality is genuinely required;
2. existing project dependencies cannot provide it;
3. the dependency does not create unnecessary architectural complexity.

Unrelated dependency upgrades are out of scope.

---

# 55. Development Workflow

The implementation MUST follow:

```text
SPECIFICATION
      ↓
REPOSITORY INSPECTION
      ↓
IMPLEMENTATION PLAN
      ↓
CODE
      ↓
TYPECHECK
      ↓
LINT
      ↓
BUILD
      ↓
SEO VALIDATION
      ↓
FUNCTIONAL VALIDATION
```

The task MUST NOT be considered complete merely because code has been written.

---

# 56. Implementation Plan Requirement

Before substantial code modification, the implementation agent MUST produce an implementation plan identifying:

* existing relevant repository structure;
* files to create;
* files to modify;
* reusable infrastructure;
* implementation order;
* validation commands;
* known repository conflicts, if any.

The plan MUST remain subordinate to this specification.

The agent MUST NOT use the planning phase to redesign the product architecture.

---

# 57. Implementation Order

Required sequence:

```text
1. Next.js foundation / repository inspection
       ↓
2. Solution data model
       ↓
3. Solution Registry
       ↓
4. Generic SolutionPageRenderer
       ↓
5. SEO infrastructure
       ↓
6. Analytics infrastructure
       ↓
7. LP-05
       ↓
8. LP-04
       ↓
9. LP-01
       ↓
10. LP-02
       ↓
11. LP-03
       ↓
12. Validation
       ↓
13. GitHub
```

The order MAY be adapted only when existing repository constraints require it.

Such adaptation MUST be reported.

---

# 58. LP-05 First

LP-05:

> `чат-бот для рекрутинга`

has current position:

```text
2
```

It is therefore an existing SEO asset.

The first implementation target MUST follow:

```text
Existing Search Visibility
        ↓
Better Search Intent Coverage
        ↓
Better Conversion Architecture
        ↓
Lead
```

The objective is to obtain a faster feedback loop from an existing search asset rather than waiting for a new page to establish visibility from zero.

---

# 59. LP-04 Second

LP-04:

> `HR-чат-бот`

has current position:

```text
9
```

It is the second priority existing SEO asset.

The objective is to transform existing search visibility into a stronger commercial and lead-generation asset.

---

# 60. New Demand Layer

After LP-05 and LP-04:

```text
LP-01 AI Recruiter
LP-02 Recruitment Automation
LP-03 HR Assistant
```

These pages are intended to address new search demand that is not adequately represented by existing pages.

The implementation MUST preserve their distinct search intents.

---

# 61. Search Intent Integrity

Each solution page MUST represent a distinct primary intent.

The implementation MUST NOT create multiple pages that differ only by keyword spelling while targeting the same dominant intent.

Potential cannibalization MUST be considered during content and internal-link configuration.

If two solution definitions appear to represent the same search intent, the implementation agent MUST flag the conflict rather than silently inventing differentiation.

---

# 62. Future Scaling Workflow

Future solution creation should follow:

```text
New Search Intent
       ↓
Intent Validation
       ↓
Demand
       ↓
SERP
       ↓
Competitive Consensus
       ↓
Lead Opportunity
       ↓
Page Specification
       ↓
Content Data
       ↓
Same Renderer
       ↓
New Page
```

The technical system MUST NOT become the bottleneck for SEO/Growth expansion.

---

# 63. Validation Layers

Validation MUST occur at multiple levels.

## Type Validation

Verify:

```text
SolutionPage
CTA
Scenario
Evidence
Claim
Metric
FAQ
Integration
Entity
```

## Registry Validation

Verify:

* unique slugs;
* valid references;
* required fields;
* no orphaned solution references;
* valid related-solution links.

## SEO Validation

Verify:

* unique title;
* unique description;
* H1;
* canonical;
* robots;
* sitemap inclusion;
* breadcrumbs;
* structured data conditions.

## Rendering Validation

Verify:

* correct page resolution;
* unknown slug behavior;
* correct content rendering;
* conditional sections;
* mobile layout;
* accessible markup.

## Analytics Validation

Verify:

* CTA events;
* form events;
* contact events;
* consistent event names.

---

# 64. Content Validation

The implementation MUST verify that:

```text
No fabricated claims
No fabricated metrics
No fabricated cases
No fabricated testimonials
No fabricated integrations
No unsupported product capabilities
```

Content with:

```text
hypothesis
unknown
unverified evidence
```

MUST NOT automatically render as factual marketing content.

---

# 65. SEO Validation Matrix

Each of the five pages MUST be checked individually.

| Requirement        | LP-01 | LP-02 | LP-03 | LP-04 | LP-05 |
| ------------------ | ----- | ----- | ----- | ----- | ----- |
| Unique URL         | ✓     | ✓     | ✓     | ✓     | ✓     |
| Unique title       | ✓     | ✓     | ✓     | ✓     | ✓     |
| Unique description | ✓     | ✓     | ✓     | ✓     | ✓     |
| Unique H1          | ✓     | ✓     | ✓     | ✓     | ✓     |
| Self canonical     | ✓     | ✓     | ✓     | ✓     | ✓     |
| Indexable          | ✓     | ✓     | ✓     | ✓     | ✓     |
| Primary intent     | ✓     | ✓     | ✓     | ✓     | ✓     |
| Internal links     | ✓     | ✓     | ✓     | ✓     | ✓     |
| CTA                | ✓     | ✓     | ✓     | ✓     | ✓     |

---

# 66. Route Validation

All five routes MUST resolve successfully:

```text
/solutions/ai-recruiter/
/solutions/avtomatizaciya-rekrutinga/
/solutions/hr-assistent/
/solutions/hr-chat-bot/
/solutions/chat-bot-dlya-rekrutinga/
```

An invalid route such as:

```text
/solutions/nonexistent/
```

MUST return the appropriate 404 / not-found behavior.

---

# 67. Mobile Validation

All five pages MUST be checked at mobile viewport sizes.

At minimum verify:

* navigation;
* H1;
* Hero;
* CTA;
* sections;
* forms;
* FAQ;
* breadcrumbs;
* typography;
* horizontal overflow;
* interactive elements.

No critical layout breakage is acceptable.

---

# 68. Accessibility Validation

At minimum verify:

```text
heading hierarchy
semantic elements
keyboard navigation
form labels
button accessibility
link accessibility
image alt attributes
focus visibility
```

---

# 69. Analytics Failure Isolation

Analytics failures MUST NOT prevent:

* page rendering;
* navigation;
* CTA interaction;
* form usability;
* primary content display.

Analytics is an instrumentation layer, not a rendering dependency.

---

# 70. GitHub Workflow

Each substantial implementation wave SHOULD use an isolated branch:

```text
feature/lead-acquisition-system
        ↓
implementation
        ↓
validation
        ↓
commit
        ↓
push
        ↓
PR
```

Do not mix this implementation with:

* unrelated SEO work;
* unrelated refactoring;
* dependency upgrades;
* architectural redesign;
* unrelated bug fixes.

---

# 71. Git Commit Scope

Commits SHOULD be logically atomic.

Examples:

```text
feat: add solution content model
feat: add solution registry and dynamic route
feat: add solution SEO infrastructure
feat: add recruitment chatbot solution page
```

Avoid commits that combine unrelated changes.

---

# 72. Pull Request Validation

Before PR creation, the implementation agent MUST verify:

```text
typecheck
lint
build
routes
SEO
analytics
mobile rendering
```

The PR description SHOULD identify:

* implemented scope;
* files changed;
* validation performed;
* known limitations;
* deviations from specification, if any.

---

# 73. No Silent Deviations

If the implementation cannot satisfy a requirement exactly, the agent MUST NOT silently replace it with a different behavior.

Instead report:

```text
Requirement
↓
Conflict / limitation
↓
Observed repository constraint
↓
Proposed minimal resolution
```

Architectural deviation requires explicit approval.

---

# 74. No Speculative Infrastructure

The following are explicitly OUT OF SCOPE for Wave 1 unless independently required by the existing repository:

```text
full CMS
knowledge graph database
vector database
CRM implementation
complex design system
A/B testing platform
advanced personalization engine
marketing automation platform
new authentication system
new database architecture
complex lead-scoring engine
```

The implementation MUST remain proportional to Wave 1 requirements.

---

# 75. Lead Acquisition Boundary

The website is responsible for:

```text
Search Visibility
       ↓
Intent Match
       ↓
Trust / Information
       ↓
Conversion
       ↓
Lead Capture
       ↓
Attribution
```

It is NOT required in Wave 1 to implement the entire downstream sales pipeline.

Existing lead infrastructure SHOULD be reused where available.

---

# 76. Commercial Content Integrity

Commercial claims MUST be separated conceptually into:

```text
Capability
Evidence
Hypothesis
Result
```

For example:

```text
"Can be configured to support candidate screening"
```

is different from:

```text
"Reduced screening time by 40%"
```

The second statement requires evidence.

The implementation MUST preserve this distinction.

---

# 77. EBAAS Compliance Boundary

EBAAS v0.2 Working Draft is the analytical standard for evidence discipline.

For implementation purposes:

```text
Research
   ↓
Claim
   ↓
Evidence Status
   ↓
Production Rendering
```

The system MUST provide sufficient content-model support to prevent unverified factual claims from being accidentally rendered as verified claims.

The system is NOT required to implement the complete EBAAS framework as a runtime engine.

---

# 78. Source and Provenance

For critical claims, the content model SHOULD retain an internal source reference.

Example:

```ts
{
  text: "...",
  status: "confirmed",
  source: "internal-case-001"
}
```

The source does not need to be exposed to public visitors during Wave 1.

The purpose is:

```text
traceability
+
content validation
+
future auditability
```

---

# 79. Rendering Philosophy

The implementation MUST follow:

```text
Data determines content
Components determine presentation
Registry determines availability
SEO layer determines metadata
Analytics layer determines instrumentation
```

Avoid:

```text
Component determines content
Component determines SEO strategy
Component determines solution identity
Component determines evidence
```

---

# 80. Architecture Invariants

The following are considered architectural invariants for Wave 1:

### Invariant 1

One generic solution route:

```text
/solutions/[slug]
```

### Invariant 2

One Solution Registry.

### Invariant 3

One reusable SolutionPageRenderer.

### Invariant 4

Content is separated from presentation.

### Invariant 5

SEO metadata derives from solution data.

### Invariant 6

Sitemap derives from Solution Registry.

### Invariant 7

Internal links derive from configured relationships.

### Invariant 8

Evidence status controls factual rendering.

### Invariant 9

No fabricated evidence.

### Invariant 10

No unrelated architectural redesign.

---

# 81. Definition of Done

Implementation Wave 1 is complete only when all applicable requirements below are satisfied.

```text
[ ] Repository inspected
[ ] Existing architecture documented
[ ] Next.js project builds successfully
[ ] Solution data model implemented
[ ] Solution Registry implemented
[ ] Dynamic solution route implemented
[ ] Generic SolutionPageRenderer implemented
[ ] Five solution pages implemented
[ ] Each page has a distinct primary intent
[ ] Content separated from presentation
[ ] Metadata generated dynamically
[ ] Canonical generated dynamically
[ ] Robots configured correctly
[ ] Sitemap generated from registry
[ ] Breadcrumbs implemented
[ ] Structured data implemented conditionally
[ ] Internal links configured
[ ] CTA system implemented
[ ] Analytics event system implemented
[ ] Lead attribution supported where infrastructure allows
[ ] Evidence model implemented
[ ] Claim status implemented
[ ] Verified evidence controls factual rendering
[ ] Unverified evidence does not render as factual
[ ] No fabricated claims
[ ] No fabricated cases
[ ] No fabricated metrics
[ ] No fabricated testimonials
[ ] No fabricated integrations
[ ] No unsupported product capabilities
[ ] TypeScript passes
[ ] Lint passes
[ ] Build passes
[ ] All five routes validated
[ ] Invalid solution route validated
[ ] Mobile layout validated
[ ] Accessibility validated
[ ] No critical runtime errors
[ ] Git changes scoped to implementation
[ ] Commit created
[ ] Branch pushed
[ ] PR prepared
```

---

# 82. Final Implementation Principle

The system MUST be treated as a reusable **SEO/Growth implementation engine**, not as a collection of five landing pages.

The intended architecture is:

```text
SEO Research
      ↓
Search Intent
      ↓
Solution Definition
      ↓
Page Specification
      ↓
Structured Content
      ↓
Evidence Validation
      ↓
Solution Registry
      ↓
Reusable Renderer
      ↓
Next.js Page
      ↓
Search Traffic
      ↓
Conversion
      ↓
Qualified Lead
      ↓
Attribution
      ↓
Growth Feedback
```

The technical implementation exists to accelerate this loop.

The implementation agent MUST optimize for:

```text
correctness
+
traceability
+
type safety
+
SEO integrity
+
conversion capability
+
scalability
```

and MUST NOT optimize for:

```text
maximum code volume
maximum abstraction
maximum content volume
maximum number of components
maximum number of dependencies
```

The fundamental architectural rule is:

> **SEO/Growth logic determines WHAT should be built. The reusable implementation architecture determines HOW it is built and scaled.**

The first implementation wave must establish the mechanism that allows future solution pages to be added primarily through:

```text
new search intent
+
validated solution data
+
metadata
+
entity mapping
+
internal-link configuration
```

without requiring a new page-rendering architecture for each solution.