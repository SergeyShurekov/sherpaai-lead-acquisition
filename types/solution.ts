export type EvidenceStatus =
    | "confirmed"
    | "inference"
    | "hypothesis"
    | "unknown";

export interface EvidenceItem {
    id: string;
    status: EvidenceStatus;
    source: string;
    claim: string;
    value?: string;
}

export interface SolutionSEO {
    title: string;
    metaDescription: string;
}

export interface SolutionClaim {
    title: string;
    text: string;
    list?: string[];
    status: EvidenceStatus;
    source?: string;
    sourceUrl?: string;
    sourceLinkText?: string;
}

export interface SolutionSection {
    title: string;
    intro?: string;
    statement?: string;
    lead?: string;
    items: SolutionClaim[];
}

export interface SolutionWorkflow {
    title: string;
    intro?: string;
    steps: SolutionClaim[];
}

export interface SolutionScenario {
    title: string;
    problem: string;
    solution: string;
    outcome?: SolutionClaim;
}

export interface SolutionFAQItem {
    question: string;
    answer: string;
}

export interface SolutionCTA {
    label: string;
    href?: string;
    eventName:
    | "page_view"
    | "cta_click"
    | "form_start"
    | "form_submit"
    | "contact_created";
}

export interface Solution {
    id: string;
    slug: string;
    name: string;
    h1: string;

    seo: SolutionSEO;

    problem: SolutionSection;
    solution: SolutionSection;
    capabilities: SolutionClaim[];
    scenarios: SolutionScenario[];
    workflow?: SolutionWorkflow;
    integrations?: SolutionSection;
    businessValue: SolutionSection;
    humanInLoop?: SolutionSection;
    humanRole?: SolutionSection;
    development?: SolutionSection;
    evidence: EvidenceItem[];
    faq: SolutionFAQItem[];

    primaryCta: SolutionCTA;
    secondaryCta?: SolutionCTA;

    relatedSolutions?: string[];
    entities?: string[];

    heroDescription?: string;
    heroKicker?: string;
    heroNote?: string;
    capabilitiesTitle?: string;
    capabilitiesIntro?: string;
    scenariosTitle?: string;
    scenariosIntro?: string;
    businessValueEyebrow?: string;
    businessValueLeadTitle?: string;
    businessValueLeadText?: string;
    evidenceTitle?: string;
    evidenceIntro?: string;
    faqIntro?: string;
    finalCtaDescription?: string;
}
