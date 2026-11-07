import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

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
    <section className="relative w-full bg-[#160a1d] pt-16 sm:pt-24 pb-20 sm:pb-32 px-6 text-center text-[#f5f5f7] overflow-hidden">
      
      {/* Nocturnal Atmospheric Spotlight */}
      <div className="absolute inset-0 rr-ambient-glow-plum pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-[#261230]/40 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Eyebrow Inscription */}
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[rgba(197,168,128,0.4)]" />
          <span className="rr-eyebrow">
            THE HOUSE OF ALBERKA // EST. 2000 // MOMBASA & NAIROBI
          </span>
          <div className="h-[1px] w-8 bg-[rgba(197,168,128,0.4)]" />
        </div>

        {/* Display Hero Title (Riviera / Cinzel Uppercase) */}
        <h1 className="rr-title-hero text-[34px] sm:text-[54px] md:text-[68px] lg:text-[76px] mb-6 max-w-[1200px] mx-auto tracking-[0.16em]">
          PURVEYORS OF TRANSCENDENT MOTOR CARS.
        </h1>

        {/* Serif Narrative Quote / Subtitle */}
        <p className="max-w-[820px] mx-auto text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[22px] italic leading-[1.6] mb-10 sm:mb-12">
          Direct Japanese auction provenance, curated with unhurried discernment, and mechanically perfected in our private Mombasa coastal atelier.
        </p>

        {/* Aristocratic Action Suite */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-20">
          <button
            onClick={onExploreFleet}
            className="btn-rr-solid group"
          >
            <span>COMMISSION THE FLEET</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-rr-ghost"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>ENTER THE ATELIER</span>
          </button>
        </div>

        {/* 21:9 Cinemascope Stage Frame (Zero Radius, Hairline Metallic Border) */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[320px] xs:h-[420px] sm:h-[540px] md:h-[680px] overflow-hidden relative bg-[#0f0714] border border-[rgba(197,168,128,0.25)]">
            
            {/* Cinematic Slow-Glide Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-100 transition-transform duration-[12000ms] hover:scale-105 ease-out"
              poster="/vehicles/flagship-hero.jpg"
            >
              <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
              <img src="/vehicles/flagship-hero.jpg" alt="Alberka Motors Flagship Marque" className="w-full h-full object-cover" />
            </video>

            {/* Rolls-Royce Style Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#160a1d] via-[#160a1d]/30 to-[#0f0714]/40 flex items-end p-6 sm:p-12 pointer-events-none">
              <div className="text-left text-[#f5f5f7] max-w-[700px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 bg-[#c5a880]" />
                  <span className="font-['Cinzel'] text-[10.5px] uppercase tracking-[0.25em] text-[#c5a880]">
                    FLAGSHIP NISSAN SERENA HIGHWAY STAR // BESPOKE E-POWER
                  </span>
                </div>
                <p className="font-['Cinzel'] text-[20px] sm:text-[28px] font-light leading-snug tracking-[0.12em] text-[#f5f5f7]">
                  The Sanctuary of Motion. Zero Auction Mysteries.
                </p>
              </div>
            </div>

            {/* Video Controls (Hairline Zero-Radius Buttons) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-9 h-9 bg-[#0f0714]/80 hover:bg-[#160a1d] text-[#c5a880] border border-[rgba(197,168,128,0.3)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title={isPlaying ? 'Pause Motion' : 'Play Motion'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 bg-[#0f0714]/80 hover:bg-[#160a1d] text-[#c5a880] border border-[rgba(197,168,128,0.3)] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Atelier Spec Inset (Hard 0px edges, hairline rose-gold wire inlay) */}
          <div className="max-w-[960px] mx-auto -mt-8 sm:-mt-12 relative z-20 bg-[#131316] border border-[rgba(197,168,128,0.3)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full sm:w-auto">
              <div>
                <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-[0.2em] block mb-1">
                  PROVENANCE
                </span>
                <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider block">
                  USS Tokyo Grade 4.5+
                </span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-[0.2em] block mb-1">
                  ATELIER DISCIPLINE
                </span>
                <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider block">
                  100-Point Pre-Delivery
                </span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-[0.2em] block mb-1">
                  WARRANTY COVENANT
                </span>
                <span className="font-['Cinzel'] text-[14px] text-[#c5a880] tracking-wider block">
                  5,000 KM Written Protection
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <button
                onClick={onExploreFleet}
                className="btn-rr-solid !py-2.5 !px-5 w-full sm:w-auto justify-center"
              >
                <span>COMMISSION VIEWING</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
