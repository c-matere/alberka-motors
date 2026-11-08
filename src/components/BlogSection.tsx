import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ArrowRight,
  Plus,
  X,
  Search,
  Sparkles,
  Calendar,
  Clock,
  User,
  Tag
} from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { SkeletonImage } from './SkeletonImage';

interface BlogSectionProps {
  blogs: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onAddPost: (post: BlogPost) => void;
  onNavigateHome?: () => void;
  onNavigateInventory?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  onSelectPost,
  onAddPost,
  onNavigateHome,
  onNavigateInventory,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);

  // Authoring Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'Provenance' as BlogPost['category'],
    authorName: 'Alberka Editorial Desk',
    authorRole: 'Automotive Intelligence & Research',
    coverImage: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    readTime: '5 min read',
    excerpt: '',
    content: '',
    tags: 'Japan Auction, Kenya, Maintenance',
  });

  // Lock scroll when write modal is active
  useEffect(() => {
    if (isWriteModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isWriteModalOpen]);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Provenance', label: 'Auction & Provenance' },
    { id: 'Engineering', label: 'Engineering & Workshop' },
    { id: 'Ownership', label: 'Ownership & Care' },
    { id: 'Market Guide', label: 'Kenyan Market Guides' },
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = activeCategory === 'all' || b.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.subtitle.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const featuredArticle = filteredBlogs.find((b) => b.featured) || filteredBlogs[0];
  const standardArticles = filteredBlogs.filter((b) => b.id !== featuredArticle?.id);

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || formData.excerpt.trim(),
      category: formData.category,
      coverImage: formData.coverImage.trim(),
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim(),
      },
      publishedDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: formData.readTime.trim() || '4 min read',
      excerpt: formData.excerpt.trim() || formData.content.slice(0, 160) + '...',
      content: formData.content
        .split('\n\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: false,
    };

    onAddPost(newPost);
    setIsWriteModalOpen(false);
    onSelectPost(newPost);

    // Reset form
    setFormData({
      title: '',
      subtitle: '',
      category: 'Provenance',
      authorName: 'Alberka Editorial Desk',
      authorRole: 'Automotive Intelligence & Research',
      coverImage: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
      readTime: '5 min read',
      excerpt: '',
      content: '',
      tags: 'Japan Auction, Kenya, Maintenance',
    });
  };

  return (
    <section className="w-full bg-[#09090b] py-14 sm:py-20 px-4 sm:px-8 text-[#f4f4f5] border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header with "Write Article" Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
                EDITORIAL JOURNAL · AUTOMOTIVE RESEARCH
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
              The Alberka Journal
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-normal">
              Technical guides on Japanese auction provenance, hybrid battery preservation in Kenyan climates, and vehicle clearance insights.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="btn-white py-2.5 px-5 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-102 transition-transform"
            >
              <Plus className="w-4 h-4 text-zinc-950" />
              <span>Write & Publish Article</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Strip */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -webkit-overflow-scrolling-touch">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-zinc-950 font-bold shadow-sm'
                        : 'bg-[#0c0c0f] text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/[0.08]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 rounded-full text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Featured Editorial Story */}
        {featuredArticle && !searchQuery && activeCategory === 'all' && (
          <div
            onClick={() => onSelectPost(featuredArticle)}
            className="group relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.85)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[21/11] lg:h-full overflow-hidden bg-black relative">
                <SkeletonImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white px-2.5 py-1 text-[10.5px] font-mono uppercase font-bold rounded-md">
                    FEATURED STORY
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono">
                    <span className="text-white font-semibold">{featuredArticle.category}</span>
                    <span>·</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-zinc-200 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-semibold text-white block">{featuredArticle.author.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono block">{featuredArticle.publishedDate}</span>
                  </div>

                  <span className="btn-ghost !text-xs !py-1.5 !px-3 inline-flex items-center gap-1.5 group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Standard Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {(searchQuery || activeCategory !== 'all' ? filteredBlogs : standardArticles).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectPost(article)}
              className="group relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] cursor-pointer before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                  <SkeletonImage
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white px-2 py-0.5 text-[10px] font-mono uppercase font-semibold rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-zinc-200 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono">{article.author.name}</span>
                <span className="text-xs text-white font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Story</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-8 space-y-4 max-w-md mx-auto">
            <BookOpen className="w-8 h-8 mx-auto text-zinc-500" />
            <h3 className="text-lg font-bold text-white">No articles match your search</h3>
            <p className="text-xs text-zinc-400">
              Try searching for "Auction", "Hybrid", "Warranty", or "AWD".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="btn-white !text-xs !py-2 !px-4"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Authoring Modal Studio ("Write Blogs") */}
      {isWriteModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#09090b]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-8 flex justify-center animate-fadeIn"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-[#121216] border border-white/[0.15] rounded-2xl p-6 sm:p-10 my-auto shadow-2xl space-y-6 text-left animate-scaleIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400 font-semibold">
                    EDITORIAL DESK
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Write & Publish New Article</h3>
              </div>

              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-5">
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Article Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 KRA Valuation Changes on Japanese Imports"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white cursor-pointer"
                  >
                    <option value="Provenance">Provenance (Auction & Sourcing)</option>
                    <option value="Engineering">Engineering (Workshop & Mechanics)</option>
                    <option value="Ownership">Ownership (Maintenance & Care)</option>
                    <option value="Market Guide">Market Guide (Taxes, Drivetrains & Pricing)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Estimated Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Subtitle / Key Thesis</label>
                <input
                  type="text"
                  placeholder="A one-sentence non-obvious thesis for the reader..."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-sm font-mono text-zinc-300 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">
                  Article Body (Separate paragraphs with blank lines)
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write the full technical article here. Use two line breaks between paragraphs..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white leading-relaxed resize-y"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Auction Sheets, Hybrid, Mombasa"
                  className="w-full px-4 py-2 bg-black border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="btn-ghost !text-xs !py-2.5 !px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-white !text-xs !py-2.5 !px-5 font-bold cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Publish to Journal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
