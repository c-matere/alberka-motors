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
    <section className="w-full bg-[#09090b] pt-16 pb-24 px-6 text-center text-white">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Status Eyebrow: Racing Red */}
        <span className="launch-status-label mb-3 animate-apple-fade">
          Performance & Luxury Automotive
        </span>

        {/* Product Kicker */}
        <p className="product-kicker mb-3 animate-apple-up delay-100">
          Alberka Motors (Kenya)
        </p>

        {/* Display Headline */}
        <h1 className="hero-display mb-6 animate-apple-up delay-150">
          Pure Automotive Power.<br />
          Curated Without Compromise.
        </h1>

        {/* Subheading body copy */}
        <p className="max-w-[720px] mx-auto text-zinc-400 text-[17px] md:text-[19px] leading-[1.47] mb-14 animate-apple-up delay-200" style={{ letterSpacing: '-0.374px' }}>
          Mombasa & Nairobi's premier showroom for verified Grade 4.5+ Japanese and European luxury imports. Handpicked from Tokyo auction houses, rigorously overhauled in our coastal engineering laboratory, and delivered ready for Kenyan roads.
        </p>

        {/* Center Visual Event: Breathtaking Editorial Automotive Video Stage */}
        <div className="relative w-full mx-auto animate-hero-zoom">
          <div className="w-full h-[340px] sm:h-[480px] md:h-[620px] rounded-[24px] sm:rounded-[28px] overflow-hidden relative bg-[#121215] border border-[#27272a]">
            {/* Cinematic HD Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600"
            >
              <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Flagship Fleet" className="w-full h-full object-cover" />
            </video>

            {/* Subtle Editorial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 pointer-events-none">
              <div className="text-left text-white max-w-[620px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] inline-block animate-pulse"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ef4444]">
                    Direct Tokyo & European Import Line
                  </span>
                </div>
                <p className="text-[20px] sm:text-[24px] font-bold leading-tight text-white drop-shadow-md">
                  Grade 4.5+ verified provenance. Zero auction mysteries.
                </p>
              </div>
            </div>

            {/* Video Controls (Quiet, translucent circular pills) */}
            <div className="absolute top-5 right-5 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-[#dc2626] text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/70 hover:bg-[#dc2626] text-white border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Floating Pricing / Handover Callout */}
          <div className="p-6 max-w-[780px] mx-auto -mt-10 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 text-left bg-[#121215] border border-[#27272a] rounded-[28px] shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Provenance Grade</span>
                <span className="text-[15px] font-bold text-[#ef4444]">4.5+ Verified Sourcing</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Laboratory Overhaul</span>
                <span className="text-[15px] font-bold text-white">150-Point Protocol</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-semibold">Peace of Mind</span>
                <span className="text-[15px] font-bold text-white">Comprehensive Warranty</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={onExploreFleet}
                className="pricing-blue-pill cursor-pointer"
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
