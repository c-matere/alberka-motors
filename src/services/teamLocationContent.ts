import { TeamDesk, TeamDeskIcon } from '../data/team';
import { LocationImage } from '../data/location';

const CMS_BASE_URL = import.meta.env.VITE_PAYLOAD_API_URL || '/api';

export interface CmsTeamMember {
  id?: string | number;
  name: string;
  role: string;
  eyebrow?: string;
  bio?: string;
  image?: string;
  photo?: { url?: string } | string | null;
  responsibilities?: { item?: string }[];
  icon?: string;
  order?: number;
  active?: boolean;
}

export interface CmsLocationPhoto {
  id?: string | number;
  caption: string;
  alt?: string;
  image?: { url?: string } | string | null;
  order?: number;
  active?: boolean;
}

async function fetchCmsCollection<T>(path: string): Promise<T[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${CMS_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return [];
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) return [];
    const data = await res.json();
    return Array.isArray(data?.docs) ? (data.docs as T[]) : [];
  } catch {
    return [];
  }
}

function mediaUrl(value: CmsTeamMember['photo']): string | undefined {
  if (typeof value === 'string') return value || undefined;
  if (value && typeof value === 'object' && value.url) return value.url;
  return undefined;
}

const ICON_OPTIONS: TeamDeskIcon[] = ['sourcing', 'inspection', 'workshop', 'handover'];

export async function fetchCmsTeamMembers(): Promise<TeamDesk[]> {
  const docs = await fetchCmsCollection<CmsTeamMember>(
    '/team-members?limit=100&depth=1&sort=order&where[active][equals]=true',
  );
  const visible = docs.filter((doc) => doc && doc.role && doc.active !== false);
  if (visible.length === 0) return [];

  return visible.map((doc, index) => ({
    id: String(doc.id ?? `cms-desk-${index}`),
    index: String(index + 1).padStart(2, '0'),
    icon: ICON_OPTIONS.includes(doc.icon as TeamDeskIcon)
      ? (doc.icon as TeamDeskIcon)
      : ICON_OPTIONS[index % ICON_OPTIONS.length],
    eyebrow: doc.eyebrow || '',
    title: doc.role,
    description: doc.bio || '',
    responsibilities: (doc.responsibilities || [])
      .map((entry) => entry?.item)
      .filter((item): item is string => Boolean(item)),
    name: doc.name && doc.name !== doc.role ? doc.name : undefined,
    photo: mediaUrl(doc.photo) || doc.image || undefined,
  }));
}

export async function fetchCmsLocationPhotos(): Promise<LocationImage[]> {
  const docs = await fetchCmsCollection<CmsLocationPhoto>(
    '/location-photos?limit=100&depth=1&sort=order&where[active][equals]=true',
  );
  return docs
    .filter((doc) => doc && doc.active !== false)
    .map((doc) => ({
      src: mediaUrl(doc.image) || '',
      caption: doc.caption,
      alt: doc.alt || doc.caption,
    }))
    .filter((image) => Boolean(image.src));
}
