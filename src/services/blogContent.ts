import { BlogPost } from '../data/blogs';
import { CmsBlogPost, fetchCmsBlogPosts } from './cmsContent';

const CATEGORIES: BlogPost['category'][] = [
  'Provenance',
  'Engineering',
  'Market Guide',
  'Ownership',
];

function mapCmsBlogPost(doc: CmsBlogPost): BlogPost | null {
  if (!doc?.slug || !doc?.title) return null;

  const category = CATEGORIES.includes(doc.category as BlogPost['category'])
    ? (doc.category as BlogPost['category'])
    : 'Provenance';

  const paragraphs = (doc.content || [])
    .map((entry) => entry?.paragraph)
    .filter((text): text is string => Boolean(text && text.trim()));

  const tags = (doc.tags || [])
    .map((entry) => entry?.tag)
    .filter((tag): tag is string => Boolean(tag && tag.trim()));

  return {
    id: doc.id || doc.slug,
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle || '',
    category,
    coverImage: doc.coverImage || '',
    author: {
      name: doc.authorName || 'Alberka Technical Advisory',
      role: doc.authorRole || 'Master Inspector & Port Logistics',
    },
    publishedDate: doc.publishedDate || '',
    readTime: doc.readTime || '5 min read',
    excerpt: doc.excerpt || '',
    content: paragraphs.length > 0 ? paragraphs : [],
    tags,
    featured: Boolean(doc.featured),
  };
}

export async function fetchBlogPostsFromCms(): Promise<BlogPost[]> {
  const docs = await fetchCmsBlogPosts();
  return docs.map(mapCmsBlogPost).filter((post): post is BlogPost => post !== null);
}
