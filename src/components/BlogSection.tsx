import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  X,
  Search,
} from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { SkeletonImage } from './SkeletonImage';

interface BlogSectionProps {
  blogs: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onAddPost?: (post: BlogPost) => void;
  onNavigateHome?: () => void;
  onNavigateInventory?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogs,
  onSelectPost,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  return (
    <section className="w-full bg-transparent py-14 sm:py-20 px-4 sm:px-8 text-zinc-900 relative">
      <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header with "Write Article" Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600">
                EDITORIAL JOURNAL · AUTOMOTIVE RESEARCH
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.05]">
              The Alberka Journal
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl font-normal">
              Technical guides on Japanese auction provenance, hybrid battery preservation in Kenyan climates, and vehicle clearance insights.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs text-zinc-500 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-full">
              {filteredBlogs.length} Published Articles
            </span>
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
                        : 'bg-zinc-50 text-zinc-600 hover:text-white hover:bg-zinc-100 border border-zinc-200'
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
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-zinc-300 rounded-full text-xs text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 transition-colors"
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
            className="group relative bg-white hover:bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 aspect-[16/10] sm:aspect-[21/11] lg:h-full overflow-hidden bg-zinc-100 relative">
                <SkeletonImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-white/95 backdrop-blur-md border border-zinc-200 text-zinc-950 px-2.5 py-1 text-[10.5px] font-mono uppercase font-bold rounded-md shadow-xs">
                    FEATURED STORY
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-600 font-mono">
                    <span className="text-zinc-950 font-bold">{featuredArticle.category}</span>
                    <span>·</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-snug group-hover:text-red-600 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-semibold text-zinc-950 block">{featuredArticle.author.name}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {(searchQuery || activeCategory !== 'all' ? filteredBlogs : standardArticles).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectPost(article)}
              className="group relative bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[12px] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-xs cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#f7f7f7] relative">
                  <SkeletonImage
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md border border-black/5 text-[#222222] px-2.5 py-0.5 text-[10.5px] font-medium rounded-full shadow-2xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#6a6a6a] font-mono">
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-[#222222] tracking-tight leading-snug group-hover:text-[#DC2626] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#6a6a6a] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 border-t border-[#ebebeb] mt-3 flex items-center justify-between">
                <span className="text-xs text-[#6a6a6a] font-mono">{article.author.name}</span>
                <span className="text-xs text-[#DC2626] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-2xl p-8 space-y-4 max-w-md mx-auto">
            <BookOpen className="w-8 h-8 mx-auto text-zinc-500" />
            <h3 className="text-lg font-bold text-zinc-950">No articles match your search</h3>
            <p className="text-xs text-zinc-600">
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

    </section>
  );
};
