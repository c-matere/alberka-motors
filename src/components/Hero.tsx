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
    <section className="relative w-full bg-[#09090b] pt-12 sm:pt-20 pb-20 sm:pb-28 px-6 sm:px-10 text-center text-[#f4f4f5] overflow-hidden">
      
      {/* Subtle Crimson Gradient Glow in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#dc2626]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative z-10">
        
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#18181c] border border-[#27272a] rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#e4e4e7] font-medium">
            DIRECT JAPANESE IMPORTS // MOMBASA & NAIROBI
          </span>
        </div>

        {/* Display Hero Title */}
        <h1 className="text-[36px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-bold text-white mb-6 max-w-[1100px] mx-auto tracking-tight leading-[1.06]">
          Clean Japanese Cars. Honest Mileage. Cars You Can Trust.
        </h1>

        {/* Subtitle with Clear, Simple Copy */}
        <p className="max-w-[760px] mx-auto text-[#a1a1aa] text-[17px] sm:text-[20px] leading-relaxed mb-10 sm:mb-12">
          Every vehicle is handpicked from top Japanese auctions, thoroughly serviced in our Mombasa workshop, and backed by a written 5,000 km warranty.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 sm:mb-20">
          <button
            onClick={onExploreFleet}
            className="btn-crimson group py-3 px-6 text-[15px]"
          >
            <span>Browse Cars in Stock</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost py-3 px-6 text-[15px]"
          >
            <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
            <span>Our 100-Point Workshop Check</span>
          </button>
        </div>

        {/* 21:9 Widescreen Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[320px] xs:h-[420px] sm:h-[540px] md:h-[640px] overflow-hidden relative bg-[#121215] border border-[#27272a] rounded-[6px]">
            
            {/* Cinematic Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-100 transition-transform duration-[8000ms] hover:scale-103 ease-out"
              poster="/vehicles/flagship-hero.jpg"
            >
              <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
              <img src="/vehicles/flagship-hero.jpg" alt="Alberka Motors Flagship Vehicle" className="w-full h-full object-cover" />
            </video>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent flex items-end p-6 sm:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[650px]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#ef4444] block mb-1 font-semibold">
                  FEATURED INVENTORY // MOMBASA SHOWROOM
                </span>
                <p className="text-[20px] sm:text-[26px] font-bold text-white leading-snug">
                  Nissan Serena Highway Star e-POWER · Pristine Japanese Condition
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-9 h-9 bg-[#09090b]/80 hover:bg-[#18181c] text-white border border-[#27272a] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-[4px]"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 bg-[#09090b]/80 hover:bg-[#18181c] text-white border border-[#27272a] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-[4px]"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Spec Inset Banner */}
          <div className="max-w-[980px] mx-auto -mt-8 sm:-mt-10 relative z-20 bg-[#121215] border border-[#27272a] p-6 sm:p-7 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full sm:w-auto">
              <div>
                <span className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider block mb-1">
                  AUCTION GRADE
                </span>
                <span className="text-[15px] font-bold text-white block">
                  USS Tokyo Grade 4.5+
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider block mb-1">
                  PRE-DELIVERY SERVICE
                </span>
                <span className="text-[15px] font-bold text-white block">
                  100-Point Mombasa Check
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider block mb-1">
                  WARRANTY
                </span>
                <span className="text-[15px] font-bold text-[#ef4444] block">
                  5,000 KM Engine & Gearbox
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <button
                onClick={onExploreFleet}
                className="btn-crimson !py-2.5 !px-5 w-full sm:w-auto justify-center text-[13px]"
              >
                <span>View All Cars</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
