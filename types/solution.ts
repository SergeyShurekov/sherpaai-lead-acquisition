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
    slug: string;
    title: string;
    description: string;
    canonical?: string;
}

export interface Solution {
    id: string;
    slug: string;
    name: string;
    h1: string;

    seo: SolutionSEO;

    evidence: EvidenceItem[];
}