import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Plus,
  X,
  CheckCircle2,
  Share2,
  MessageCircle,
  Tag,
  Search,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { BlogPost, INITIAL_BLOG_POSTS } from '../data/blogs';
import { SkeletonImage } from './SkeletonImage';

interface BlogSectionProps {
  onNavigateHome: () => void;
  onNavigateInventory: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onNavigateHome,
  onNavigateInventory,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('alberka_blogs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_BLOG_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState(false);

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

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alberka_blogs', JSON.stringify(blogs));
    } catch {}
  }, [blogs]);

  // Lock scroll when modal or article reader is active
  useEffect(() => {
    if (selectedArticle || isWriteModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selectedArticle, isWriteModalOpen]);

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

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: formData.title,
      subtitle: formData.subtitle || formData.excerpt,
      category: formData.category,
      coverImage: formData.coverImage,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
      },
      publishedDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      readTime: formData.readTime || '4 min read',
      excerpt: formData.excerpt || formData.content.slice(0, 160) + '...',
      content: formData.content.split('\n\n').filter((p) => p.trim().length > 0),
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      featured: false,
    };

    setBlogs([newPost, ...blogs]);
    setIsWriteModalOpen(false);
    setSelectedArticle(newPost);
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

  const handleShareArticle = (art: BlogPost) => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${art.title} — ${shareUrl}`);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
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
            onClick={() => setSelectedArticle(featuredArticle)}
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
                    <span>Read Article</span>
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
              onClick={() => setSelectedArticle(article)}
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
                  <span>Read</span>
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

      {/* Full Article Reader Modal (Distraction-Free Editorial Layout) */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-[9999] bg-[#09090b]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-8 flex justify-center animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="w-full max-w-3xl bg-[#0e0e12] border border-white/[0.12] rounded-2xl p-6 sm:p-12 my-auto shadow-2xl space-y-8 text-left animate-scaleIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation & Close */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Journal</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(selectedArticle)}
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Copy link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="uppercase text-white font-semibold">{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
                <span>·</span>
                <span>{selectedArticle.publishedDate}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-tight">
                {selectedArticle.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                {selectedArticle.subtitle}
              </p>
            </div>

            {/* Hero Article Media */}
            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-black">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author Byline Card */}
            <div className="p-4 bg-black/60 border border-white/[0.08] rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold font-mono text-xs">
                  {selectedArticle.author.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{selectedArticle.author.name}</span>
                  <span className="text-[11px] text-zinc-400 font-mono block">{selectedArticle.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            {/* Article Prose Content */}
            <div className="prose prose-invert max-w-none space-y-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
              <Tag className="w-3.5 h-3.5 text-zinc-500 mr-1" />
              {selectedArticle.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] bg-zinc-900 border border-white/10 text-zinc-400 px-2.5 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Reader Footer Action Bar */}
            <div className="p-6 bg-gradient-to-r from-zinc-950 to-black border border-white/[0.08] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div>
                <span className="text-xs font-bold text-white block">Questions about this topic?</span>
                <span className="text-[11px] text-zinc-400">Consult our Mombasa workshop team or inspect our verified stock.</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20read%20your%20article%20'${encodeURIComponent(selectedArticle.title)}'%20and%20would%20like%20to%20consult%20your%20team.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white !text-xs !py-2.5 !px-4 w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>Ask Technical Team</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

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

      {/* Share Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-white text-zinc-950 px-4 py-2.5 rounded-lg shadow-2xl text-xs font-mono font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Article link copied to clipboard</span>
        </div>
      )}

    </section>
  );
};
