const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI<T>(
    path: string,
    params: Record<string, string> = {}
): Promise<T | null> {
    const queryString = new URLSearchParams(params).toString();
    const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;
    try {
        const res = await fetch(url, {
            next: { revalidate: 60 },
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json;
    } catch {
        return null;
    }
}

export function getStrapiMediaUrl(url: string | null | undefined): string {
    if (!url) return '/placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface StrapiImage {
    id: number; documentId: string; url: string;
    alternativeText?: string; width?: number; height?: number;
}

export interface Carousel {
    id: number; documentId: string; title: string; subtitle?: string;
    image: StrapiImage; link_url?: string; link_text?: string;
    order: number; is_active: boolean;
}

export interface Service {
    id: number; documentId: string; title: string; description?: string;
    icon?: string; image?: StrapiImage; slug: string; order: number;
    included_items?: string[];
}

export interface TeamMember {
    id: number; documentId: string; name: string; role: string;
    bio?: string; image?: StrapiImage; order: number;
    flag?: string; location?: string;
}

export interface HowItWorksStep {
    id: number; num?: string; title: string; description?: string;
}

export interface TextItem {
    id: number; icon?: string; title?: string; description?: string;
}

export interface AboutPage {
    documentId: string; mission: string; vision?: string;
    hero_tagline?: string; hero_image: StrapiImage;
    body?: string; objectives?: string; background?: string;
    values?: TextItem[];
    objectives_list?: TextItem[];
}

export interface Sector {
    id: number; documentId: string; title: string; slug: string;
    description?: string; icon?: string; image?: StrapiImage;
    products?: string[]; order: number;
}

export interface GlobalSetting {
    documentId: string;
    site_name: string;
    site_tagline?: string;
    contact_email?: string;
    contact_phone?: string;
    address?: string;
    twitter_url?: string;
    facebook_url?: string;
    linkedin_url?: string;
    footer_text?: string;
    // Homepage copy
    homepage_tagline?: string;
    homepage_intro_1?: string;
    homepage_intro_2?: string;
    whoweare_heading?: string;
    whoweare_body_1?: string;
    whoweare_body_2?: string;
    homepage_cta_eyebrow?: string;
    homepage_cta_heading?: string;
    homepage_cta_body?: string;
    // Services page
    services_cta_heading?: string;
    services_cta_body?: string;
    // About page
    about_cta_heading?: string;
    about_cta_body?: string;
    // Structured
    brands_list?: string;
    how_it_works?: HowItWorksStep[];
    why_us?: TextItem[];
}

// ── API Functions ──────────────────────────────────────────────────────────

export async function getCarousels(): Promise<Carousel[]> {
    const res = await fetchAPI<{ data: Carousel[] }>('/carousels', {
        'filters[is_active][$eq]': 'true', 'sort': 'order:asc',
        'populate': 'image', 'pagination[pageSize]': '10',
    });
    return res?.data || [];
}

export async function getServices(): Promise<Service[]> {
    const res = await fetchAPI<{ data: Service[] }>('/services', {
        'sort': 'order:asc', 'populate': 'image', 'pagination[pageSize]': '50',
    });
    return res?.data || [];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const res = await fetchAPI<{ data: TeamMember[] }>('/team-members', {
        'sort': 'order:asc', 'populate': 'image', 'pagination[pageSize]': '50',
    });
    return res?.data || [];
}

export async function getAboutPage(): Promise<AboutPage | null> {
    const res = await fetchAPI<{ data: AboutPage }>('/about-page', {
        'populate': 'hero_image,values,objectives_list',
    });
    return res?.data || null;
}

export async function getSectors(): Promise<Sector[]> {
    const res = await fetchAPI<{ data: Sector[] }>('/sectors', {
        'sort': 'order:asc', 'populate': 'image', 'pagination[pageSize]': '50',
    });
    return res?.data || [];
}

export async function getGlobalSettings(): Promise<GlobalSetting | null> {
    const res = await fetchAPI<{ data: GlobalSetting }>('/global-setting', {
        'populate': 'how_it_works,why_us',
    });
    return res?.data || null;
}
