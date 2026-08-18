const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function getAbsoluteUrl(path = "/"): string {
    const baseUrl = getSiteUrl().replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${baseUrl}${normalizedPath}`;
}