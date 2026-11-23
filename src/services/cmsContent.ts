const CMS_BASE_URL = import.meta.env.VITE_PAYLOAD_API_URL || '/api';

/**
 * Every CMS read goes through here. The SPA fallback used to return index.html
 * with a 200 status, which made `res.ok` pass and `res.json()` throw — silently
 * routing every request to static defaults. Requiring a JSON content type makes
 * an unreachable CMS unmissable and safe.
 */
async function fetchCmsJson<T>(path: string, timeoutMs = 2500): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${CMS_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) return null;

    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface CmsPageStat {
  id?: string;
  label: string;
  value: string;
  description?: string;
}

export interface CmsPageFeature {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  points?: { item: string }[];
}

export interface CmsPage {
  id?: string;
  title: string;
  slug: string;
  badge?: string;
  heroTitle: string;
  heroSubtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  stats?: CmsPageStat[];
  features?: CmsPageFeature[];
  paragraphs?: { text: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface CmsSiteSettings {
  businessName: string;
  tagline: string;
  foundedYear: string;
  footerNotice: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
  mombasaYardAddress: string;
  nairobiShowroomAddress: string;
}

export interface CmsBlogPost {
  id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  category?: string;
  coverImage?: string;
  authorName?: string;
  authorRole?: string;
  publishedDate?: string;
  readTime?: string;
  excerpt?: string;
  content?: { paragraph?: string }[];
  tags?: { tag?: string }[];
  featured?: boolean;
}

const DEFAULT_SITE_SETTINGS: CmsSiteSettings = {
  businessName: 'Alberka Enterprises Limited',
  tagline: 'Direct Japanese Imports · Mombasa Showroom & Yard',
  foundedYear: '2000',
  footerNotice: '© 2026 Alberka Enterprises Limited. Direct Japanese Import Specialists. Mombasa, Kenya.',
  phone: '+254 180 423 075',
  whatsappNumber: '254180423075',
  email: 'yard@alberka.co.ke',
  workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
  mombasaYardAddress: 'Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa, Kenya',
  nairobiShowroomAddress: 'Mombasa Showroom & Yard (Sole Office)',
};

export async function fetchCmsPage(slug: string): Promise<CmsPage | null> {
  const data = await fetchCmsJson<{ docs?: CmsPage[] }>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
  );
  return data?.docs?.[0] ?? null;
}

export async function fetchAllCmsPages(): Promise<Record<string, CmsPage>> {
  const data = await fetchCmsJson<{ docs?: CmsPage[] }>('/pages?limit=50');
  const map: Record<string, CmsPage> = {};
  data?.docs?.forEach((doc) => {
    if (doc?.slug) map[doc.slug] = doc;
  });
  return map;
}

/** Returns null when the CMS is unreachable so callers can report a real fallback. */
export async function fetchCmsSiteSettings(): Promise<CmsSiteSettings | null> {
  const data = await fetchCmsJson<Record<string, unknown>>('/globals/site-settings');
  if (!data) return null;

  const settings: CmsSiteSettings = { ...DEFAULT_SITE_SETTINGS };
  (Object.keys(DEFAULT_SITE_SETTINGS) as (keyof CmsSiteSettings)[]).forEach((key) => {
    const value = data[key];
    if (typeof value === 'string' && value.trim()) settings[key] = value;
  });
  return settings;
}

export async function fetchCmsBlogPosts(): Promise<CmsBlogPost[]> {
  const data = await fetchCmsJson<{ docs?: CmsBlogPost[] }>('/blog-posts?limit=50');
  return data?.docs ?? [];
}
