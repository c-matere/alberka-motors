import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  MessageCircle,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Check
} from 'lucide-react';
import { BlogPost } from '../data/blogs';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

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
    }
  };

  const handleInquireWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Alberka Enterprises, I just read your article "${post.title}" on your website and would like to consult your technical team regarding this topic.`
    );
    window.open(`https://wa.me/254180423075?text=${msg}`, '_blank');
  };

  return (
    <article className="w-full bg-transparent text-[#f4f4f5] pb-24 sm:pb-32">
      
      {/* 1. Sticky Breadcrumb & Top Bar with Hairline Reading Progress */}
      <div className="sticky top-14 sm:top-[68px] z-30 bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-8 py-3 transition-all">
        {/* Hairline reading progress indicator */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-zinc-200 overflow-hidden">
          <div
            className="h-full bg-zinc-950 transition-all duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToJournal}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-600 hidden sm:inline">
              {post.category}
            </span>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-zinc-200 text-zinc-700 hover:text-zinc-950 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Share article link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={handleInquireWhatsApp}
              className="btn-white !py-1.5 !px-3.5 !text-xs !rounded-full font-semibold shadow-sm inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-zinc-950" />
              <span>Discuss Topic</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="pt-12 sm:pt-20 pb-8 px-4 sm:px-8 max-w-[1000px] mx-auto text-left space-y-6">
        
        {/* Category & Metadata Pill */}
        <div className="inline-flex items-center gap-2.5 font-mono text-xs text-zinc-600">
          <span className="uppercase text-zinc-950 font-semibold tracking-wider">{post.category}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.publishedDate}</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.08]">
          {post.title}
        </h1>

        {/* Subtitle / Key Thesis */}
        <p className="text-base sm:text-xl text-zinc-600 leading-relaxed font-normal max-w-3xl">
          {post.subtitle}
        </p>

        {/* Author Byline */}
        <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-zinc-800 border border-white/15 flex items-center justify-center text-zinc-950 font-bold font-mono text-sm shrink-0 shadow-md">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-bold text-zinc-950 block">{post.author.name}</span>
              <span className="text-xs text-zinc-600 font-mono block">{post.author.role}</span>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-zinc-500 uppercase block">VERIFIED SOURCE</span>
            <span className="text-xs font-semibold text-zinc-700">Alberka Technical Desk</span>
          </div>
        </div>
      </header>

      {/* 3. Widescreen Hero Cover Media */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="w-full aspect-[16/10] sm:aspect-[21/10] max-h-[560px] overflow-hidden rounded-2xl border border-zinc-200/90 hover:border-zinc-300 bg-zinc-100 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-zinc-950/[0.04] relative group transition-colors">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8 pointer-events-none">
            <span className="font-mono text-[11px] text-zinc-600 tracking-wider">
              Photo: Japanese wholesale port & technical facility inspection
            </span>
          </div>
        </div>
      </div>

      {/* 4. Article Prose & Architectural Core Body */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-8 space-y-10 text-left">
        
        {/* Executive Takeaways Box */}
        <div className="relative bg-zinc-50 border border-zinc-200 hover:border-white/20 rounded-2xl p-6 sm:p-8 space-y-4 before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-950 font-bold">
              EXECUTIVE SUMMARY & ESSENTIAL TAKEAWAY
            </span>
          </div>
          <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Prose Paragraphs */}
        <div className="space-y-6 text-base sm:text-[17.5px] text-zinc-700 leading-[1.8] font-normal">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Article Tags */}
        <div className="pt-8 border-t border-zinc-200 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-zinc-500 mr-1" />
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-xs bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 5. Mentioned Showroom Vehicles (If Any) */}
        {mentionedVehicles.length > 0 && (
          <div className="pt-10 border-t border-zinc-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-600 font-semibold block">
                  SHOWROOM FLEET
                </span>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
                  Vehicles Mentioned in this Story
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mentionedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => onSelectVehicle(vehicle)}
                  className="bg-white hover:bg-zinc-50/80 border border-zinc-200 hover:border-red-600/40 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.08)] group"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <img src={vehicle.heroImage} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                        Grade {vehicle.auctionGrade || '4.5'}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {vehicle.year} · {vehicle.transmission || 'Automatic'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition-colors truncate">
                      {vehicle.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-red-600 block mt-0.5">
                      KES {vehicle.priceKes.toLocaleString()}
                    </span>
                  </div>
                  <div className="shrink-0 flex items-center text-xs font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct Concierge Callout */}
        <div className="relative bg-white border border-zinc-200 rounded-2xl p-8 sm:p-10 space-y-4 text-left shadow-[0_4px_24px_rgba(0,0,0,0.04)] mt-12">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            <h4 className="text-lg font-bold text-zinc-950">Have Questions About Japanese Provenance?</h4>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Our technical team next to Ganjoni Primary School, Mombasa can verify Japanese auction sheets, inspect chassis condition, and guide you through custom port clearance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleInquireWhatsApp}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-lg rounded-xl transition-all cursor-pointer"
            >
              <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white fill-white" />
              </span>
              <span>Consult Technician on WhatsApp</span>
            </button>
            <button
              onClick={onBackToJournal}
              className="btn-ghost py-3 px-5 text-xs font-medium w-full sm:w-auto cursor-pointer"
            >
              <span>Explore More Articles</span>
            </button>
          </div>
        </div>

      </div>

      {/* 6. Related Articles / Up Next Rail */}
      {relatedPosts.length > 0 && (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 pt-16 sm:pt-20 mt-16 sm:mt-20 border-t border-zinc-200 text-left space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-600 font-semibold block">
                UP NEXT IN THE JOURNAL
              </span>
              <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">
                Related Technical Stories
              </h2>
            </div>
            <button
              onClick={onBackToJournal}
              className="text-xs font-mono text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer hidden sm:inline"
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
                className="group relative bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-red-600/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col justify-between shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.08)]"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                    <span>{rel.category}</span>
                    <span>·</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-zinc-600 line-clamp-2">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">{rel.author.name}</span>
                  <span className="text-xs text-red-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Link Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-white text-zinc-950 px-4 py-2.5 rounded-lg shadow-2xl text-xs font-mono font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Article link copied to clipboard</span>
        </div>
      )}

    </article>
  );
};
