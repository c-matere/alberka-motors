import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <section className="w-full bg-[#08090a] pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 text-center text-[#d0d6e0]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Status Eyebrow Badge (Linear 4px badge) */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="badge-linear text-[11px] font-mono tracking-wider text-[#8a8f98] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4f222] inline-block animate-pulse" />
            Midnight Precision Fleet · Est. 2000
          </span>
        </div>

        {/* Display Headline (Linear 64px / 510 / -0.022em) */}
        <h1 className="hero-display text-[36px] sm:text-[56px] md:text-[68px] mb-4 sm:mb-6 text-white max-w-[960px] mx-auto">
          Pure Automotive Power.<br className="hidden sm:inline" />
          Curated Without Compromise.
        </h1>

        {/* Subheading body copy (Linear 16px Inter 400 / #8a8f98) */}
        <p className="max-w-[680px] mx-auto text-[#8a8f98] text-[15px] sm:text-[16px] leading-[1.6] mb-8 sm:mb-10 px-2" style={{ letterSpacing: '-0.011em' }}>
          Mombasa & Nairobi's premier showroom for verified Grade 4.5+ Japanese and European luxury imports. Handpicked from Tokyo auction houses, rigorously overhauled in our coastal engineering laboratory, and delivered ready for Kenyan roads.
        </p>

        {/* Linear Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <button
            onClick={onExploreFleet}
            className="btn-primary active:scale-95 text-[14px] font-[510] py-2.5 px-5"
          >
            <span>Explore Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost active:scale-95 text-[13px] py-2.5 px-4"
          >
            <span>Workshop Standards</span>
          </button>
        </div>

        {/* Product Showcase Card Frame (Linear 12px radius, #0f1011 surface, 1px #23252a border) */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[280px] xs:h-[340px] sm:h-[480px] md:h-[620px] rounded-[12px] overflow-hidden relative bg-[#0f1011] border border-[#23252a]">
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

            {/* Subtle Gradient Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090a]/90 via-[#08090a]/30 to-transparent flex items-end p-5 sm:p-8 pointer-events-none">
              <div className="text-left text-white max-w-[620px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4f222] inline-block animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98]">
                    Direct Tokyo & European Import Line
                  </span>
                </div>
                <p className="text-[17px] sm:text-[22px] md:text-[24px] font-[510] leading-tight text-white tracking-[-0.012em]">
                  Grade 4.5+ verified provenance. Zero auction mysteries.
                </p>
              </div>
            </div>

            {/* Video Controls (Linear 6px pills) */}
            <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-[6px] bg-[#08090a]/80 hover:bg-[#161718] text-[#d0d6e0] hover:text-white border border-[#23252a] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-[6px] bg-[#08090a]/80 hover:bg-[#161718] text-[#d0d6e0] hover:text-white border border-[#23252a] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Linear Spec Strip (12px radius, #0f1011, 1px border) */}
          <div className="p-4 sm:p-5 max-w-[760px] mx-auto -mt-6 sm:-mt-8 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-left bg-[#0f1011] border border-[#23252a] rounded-[12px] shadow-xl">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-[#8a8f98] font-mono uppercase tracking-wide block">Provenance</span>
                <span className="text-[14px] font-[510] text-white">4.5+ Verified</span>
              </div>
              <div>
                <span className="text-[11px] text-[#8a8f98] font-mono uppercase tracking-wide block">Overhaul</span>
                <span className="text-[14px] font-[510] text-white">150-Point Certified</span>
              </div>
              <div>
                <span className="text-[11px] text-[#8a8f98] font-mono uppercase tracking-wide block">Warranty</span>
                <span className="text-[14px] font-[510] text-white">5,000 km Cover</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={onExploreFleet}
                className="btn-primary text-[13px] py-1.5 px-3.5 cursor-pointer font-[510]"
              >
                <span>Inspect Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
