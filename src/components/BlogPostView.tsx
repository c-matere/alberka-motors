import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  MessageCircle,
  Tag,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Check
} from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';
import { dynaura } from 'dynaura';

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  allVehicles: Vehicle[];
  onBackToJournal: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenWhispers?: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  allPosts,
  allVehicles,
  onBackToJournal,
  onSelectPost,
  onSelectVehicle,
  onOpenWhispers,
}) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Dynamic Reading Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find related articles (same category or excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  // Match vehicles mentioned in this post
  const mentionedVehicles = allVehicles.filter((v) => {
    const text = (post.title + ' ' + post.subtitle + ' ' + post.content.join(' ')).toLowerCase();
    const nameWords = v.name.toLowerCase().split(' ');
    return nameWords.some((w) => w.length > 3 && text.includes(w));
  }).slice(0, 2);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#blog-${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${post.title} — ${url}`);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
      dynaura.success({
        title: 'Link copied',
        description: 'Article link is ready to share.',
      });
    }
  };

  const handleInquireWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Alberka Enterprises, I just read your article "${post.title}" on your website and would like to consult your technical team regarding this topic.`
    );
    window.open(`https://wa.me/254180423075?text=${msg}`, '_blank');
  };

  return (
    <article className="w-full bg-transparent text-[#222222] pb-24 sm:pb-32">
      
      {/* 1. Sticky Breadcrumb & Top Bar with Hairline Reading Progress */}
      <div className="sticky top-14 sm:top-[80px] z-30 bg-white/95 backdrop-blur-md border-b border-[#ebebeb] px-4 sm:px-8 py-3 transition-all">
        {/* Hairline reading progress indicator */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-[#ebebeb] overflow-hidden">
          <div
            className="h-full bg-[#DC2626] transition-all duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToJournal}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] hidden sm:inline font-medium">
              {post.category}
            </span>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={handleInquireWhatsApp}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white py-1.5 px-4 text-xs rounded-full font-medium shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>Discuss Topic</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="pt-12 sm:pt-20 pb-8 px-4 sm:px-8 max-w-[1000px] mx-auto text-left space-y-6">
        
        {/* Category & Metadata Pill */}
        <div className="inline-flex items-center gap-2.5 text-xs text-[#6a6a6a]">
          <span className="uppercase text-[#222222] font-semibold tracking-wider">{post.category}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.publishedDate}</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#222222] tracking-[-0.035em] leading-[1.08]">
          {post.title}
        </h1>

        {/* Subtitle / Key Thesis */}
        <p className="text-base sm:text-xl text-[#6a6a6a] leading-relaxed font-normal max-w-3xl">
          {post.subtitle}
        </p>

        {/* Author Byline */}
        <div className="pt-4 border-t border-[#ebebeb] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center text-[#DC2626] font-bold text-sm shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-semibold text-[#222222] block">{post.author.name}</span>
              <span className="text-xs text-[#6a6a6a] block">{post.author.role}</span>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-[#6a6a6a] uppercase tracking-wider block font-medium">VERIFIED SOURCE</span>
            <span className="text-xs font-semibold text-[#222222]">Alberka Technical Desk</span>
          </div>
        </div>
      </header>

      {/* 3. Widescreen Hero Cover Media */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="w-full aspect-[16/10] sm:aspect-[21/10] max-h-[560px] overflow-hidden rounded-[16px] border border-[#ebebeb] bg-[#f7f7f7] shadow-sm relative group transition-colors">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8 pointer-events-none">
            <span className="text-[12px] text-white/90 tracking-wide">
              Photo: Japanese wholesale port & technical facility inspection
            </span>
          </div>
        </div>
      </div>

      {/* 4. Article Prose & Architectural Core Body */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-8 space-y-10 text-left">
        
        {/* Executive Takeaways Box */}
        <div className="relative bg-[#f7f7f7] border border-[#ebebeb] rounded-[16px] p-6 sm:p-8 space-y-3 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#222222] font-bold">
              EXECUTIVE SUMMARY & ESSENTIAL TAKEAWAY
            </span>
          </div>
          <p className="text-sm sm:text-[15px] text-[#222222] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Prose Paragraphs */}
        <div className="space-y-6 text-base sm:text-[17px] text-[#222222] leading-[1.8] font-normal">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Tags */}
        <div className="pt-8 border-t border-[#ebebeb] flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[#6a6a6a] mr-1" />
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-[#f7f7f7] border border-[#ebebeb] text-[#6a6a6a] hover:text-[#222222] px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 5. Mentioned Showroom Vehicles (If Any) */}
        {mentionedVehicles.length > 0 && (
          <div className="pt-10 border-t border-[#ebebeb] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] font-semibold block">
                  SHOWROOM FLEET
                </span>
                <h3 className="text-xl font-bold text-[#222222] tracking-tight">
                  Vehicles Mentioned in this Story
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mentionedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => onSelectVehicle(vehicle)}
                  className="bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] rounded-[14px] p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 shadow-xs hover:shadow-sm group"
                >
                  <div className="w-20 h-16 rounded-[10px] overflow-hidden bg-[#f7f7f7] shrink-0 border border-[#ebebeb]">
                    <img src={vehicle.heroImage} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-[#222222] bg-[#f7f7f7] px-2 py-0.5 rounded-full border border-[#ebebeb]">
                        Grade {vehicle.auctionGrade || '4.5'}
                      </span>
                      <span className="text-[11px] text-[#6a6a6a]">
                        {vehicle.year} · {vehicle.transmission || 'Automatic'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#222222] group-hover:text-[#DC2626] transition-colors truncate">
                      {vehicle.name}
                    </h4>
                    <span className="text-xs font-bold text-[#DC2626] block mt-0.5">
                      KES {vehicle.priceKes.toLocaleString()}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center text-xs font-semibold text-[#DC2626] group-hover:translate-x-1 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Concierge Callout */}
        <div className="relative bg-white border border-[#ebebeb] rounded-[16px] p-8 sm:p-10 space-y-4 text-left shadow-sm mt-12">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
            <h4 className="text-lg font-bold text-[#222222]">Have Questions About Japanese Provenance?</h4>
          </div>
          <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">
            Our technical team next to Ganjoni Primary School, Mombasa can verify Japanese auction sheets, inspect chassis condition, and guide you through custom port clearance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleInquireWhatsApp}
              className="bg-[#222222] hover:bg-black text-white py-3 px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-sm rounded-full transition-all cursor-pointer"
            >
              <span className="inline-flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white fill-white" />
              </span>
              <span>Consult Technician on WhatsApp</span>
            </button>
            <button
              onClick={onBackToJournal}
              className="border border-[#ebebeb] hover:border-[#222222] bg-white hover:bg-[#f7f7f7] text-[#222222] py-3 px-5 text-xs font-medium w-full sm:w-auto rounded-full transition-all cursor-pointer"
            >
              <span>Explore More Articles</span>
            </button>
          </div>
        </div>

      </div>

      {/* 6. Related Articles / Up Next Rail */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 pt-16 sm:pt-20 mt-16 sm:mt-20 border-t border-[#ebebeb] text-left space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] font-semibold block">
                UP NEXT IN THE JOURNAL
              </span>
              <h2 className="text-2xl font-bold text-[#222222] tracking-tight">
                Related Technical Stories
              </h2>
            </div>
            <button
              onClick={onBackToJournal}
              className="text-xs text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer hidden sm:inline font-medium"
            >
              View all articles →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectPost(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative bg-white hover:bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 p-5 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-[12px] bg-[#f7f7f7] border border-[#ebebeb]">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6a6a6a]">
                    <span>{rel.category}</span>
                    <span>·</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#222222] group-hover:text-[#DC2626] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#6a6a6a] line-clamp-2">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ebebeb] mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#6a6a6a]">{rel.author.name}</span>
                  <span className="text-xs text-[#DC2626] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
