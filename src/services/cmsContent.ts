const CMS_BASE_URL = import.meta.env.VITE_PAYLOAD_API_URL || '/api';

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

const DEFAULT_SITE_SETTINGS: CmsSiteSettings = {
  businessName: 'Alberka Motors',
  tagline: 'Direct Japanese Imports · Mombasa Port & Nairobi',
  foundedYear: '2000',
  footerNotice: '© 2026 Alberka Motors. Direct Japanese Import Specialists. Mombasa & Nairobi.',
  phone: '+254 714 333 888',
  whatsappNumber: '254714333888',
  email: 'yard@alberkamotors.co.ke',
  workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
  mombasaYardAddress: 'Tangana Road, Ganjoni, Port Reitz Area, Mombasa, Kenya',
  nairobiShowroomAddress: 'Alberka Plaza, Ngong Road, Nairobi, Kenya',
};

export async function fetchCmsPage(slug: string): Promise<CmsPage | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${CMS_BASE_URL}/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.docs && data.docs.length > 0) {
      return data.docs[0] as CmsPage;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchAllCmsPages(): Promise<Record<string, CmsPage>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${CMS_BASE_URL}/pages?limit=50`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return {};
    const data = await res.json();
    if (data?.docs && Array.isArray(data.docs)) {
      const map: Record<string, CmsPage> = {};
      data.docs.forEach((doc: CmsPage) => {
        if (doc.slug) map[doc.slug] = doc;
      });
      return map;
    }
    return {};
  } catch {
    return {};
  }
}

export async function fetchCmsSiteSettings(): Promise<CmsSiteSettings> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${CMS_BASE_URL}/globals/site-settings`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return DEFAULT_SITE_SETTINGS;
    const data = await res.json();
    return { ...DEFAULT_SITE_SETTINGS, ...data };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
