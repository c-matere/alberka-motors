import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="w-full bg-[#09090b] pt-8 sm:pt-16 pb-12 sm:pb-20 px-3 sm:px-6 text-center text-white">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Status Eyebrow: Platinum Silver */}
        <span className="launch-status-label mb-2 sm:mb-3 animate-apple-fade">
          Performance & Luxury Automotive
        </span>

        {/* Product Kicker */}
        <p className="product-kicker text-[17px] sm:text-[21px] mb-2 sm:mb-3 animate-apple-up delay-100">
          Alberka Motors (Kenya)
        </p>

        {/* Display Headline */}
        <h1 className="hero-display text-[32px] sm:text-[52px] md:text-[68px] mb-4 sm:mb-6 animate-apple-up delay-150">
          Pure Automotive Power.<br className="hidden sm:inline" />
          Curated Without Compromise.
        </h1>

        {/* Subheading body copy */}
        <p className="max-w-[720px] mx-auto text-zinc-400 text-[15px] sm:text-[18px] leading-relaxed mb-6 sm:mb-10 px-2 animate-apple-up delay-200" style={{ letterSpacing: '-0.374px' }}>
          Mombasa & Nairobi's premier showroom for verified Grade 4.5+ Japanese and European luxury imports. Handpicked from Tokyo auction houses, rigorously overhauled in our coastal engineering laboratory, and delivered ready for Kenyan roads.
        </p>

        {/* Mobile Quick CTAs Bar */}
        <div className="flex sm:hidden items-center justify-center gap-3 mb-8 animate-apple-up delay-200">
          <button
            onClick={onExploreFleet}
            className="pricing-blue-pill !py-2.5 !px-5 text-[13px] active:scale-95"
          >
            <span>Explore Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onExploreWorkshop}
            className="outlined-explore-pill !py-2.5 !px-5 text-[13px] active:scale-95"
          >
            <span>Workshop Standards</span>
          </button>
        </div>

        {/* Center Visual Event: Breathtaking Editorial Automotive Video Stage */}
        <div className="relative w-full mx-auto animate-hero-zoom">
          <div className="w-full h-[280px] xs:h-[320px] sm:h-[460px] md:h-[600px] rounded-[20px] sm:rounded-[28px] overflow-hidden relative bg-[#121215] border border-[#27272a]">
            {/* Cinematic HD Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="./vehicles/flagship-hero.jpg"
            >
              <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
              <img src="./vehicles/flagship-hero.jpg" alt="Alberka Motors Flagship Fleet" className="w-full h-full object-cover" />
            </video>

            {/* Subtle Editorial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-4 sm:p-8 pointer-events-none">
              <div className="text-left text-white max-w-[620px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#dc2626] inline-block animate-pulse"></span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-zinc-300">
                    Direct Tokyo & European Import Line
                  </span>
                </div>
                <p className="text-[16px] sm:text-[22px] md:text-[24px] font-bold leading-tight text-white drop-shadow-md">
                  Grade 4.5+ verified provenance. Zero auction mysteries.
                </p>
              </div>
            </div>

            {/* Video Controls (Quiet, translucent circular pills) */}
            <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Pricing / Handover Callout */}
          <div className="p-4 sm:p-6 max-w-[780px] mx-auto -mt-6 sm:-mt-10 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-left bg-[#121215] border border-[#27272a] rounded-[20px] sm:rounded-[28px] shadow-2xl">
            <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Provenance</span>
                <span className="text-[12px] sm:text-[15px] font-bold text-white">4.5+ Verified</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Overhaul</span>
                <span className="text-[12px] sm:text-[15px] font-bold text-white">150-Point</span>
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Warranty</span>
                <span className="text-[12px] sm:text-[15px] font-bold text-white">Full Cover</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={onExploreFleet}
                className="pricing-blue-pill cursor-pointer active:scale-95"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
