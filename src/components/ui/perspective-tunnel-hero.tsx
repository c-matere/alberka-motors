"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, MessageCircle, Search } from "lucide-react";

export interface TunnelVehicleItem {
  src: string;
  title: string;
  subtitle?: string;
  priceKes?: string;
}

const IMAGES: TunnelVehicleItem[] = [
  {
    src: "/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg",
    title: "Toyota Harrier 2020",
    subtitle: "80-Series Dynamic Force · Grade 4.5",
    priceKes: "KES 4.50M",
  },
  {
    src: "/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg",
    title: "Volvo XC40 R-Design",
    subtitle: "2.0L Turbo AWD · Grade 4.5",
    priceKes: "KES 4.20M",
  },
  {
    src: "/vehicles/subaru-xv-2019-black/hero-front-34.jpg",
    title: "Subaru XV 2.0i-L",
    subtitle: "EyeSight Boxer AWD · Grade 4.0",
    priceKes: "KES 2.70M",
  },
  {
    src: "/vehicles/rav4-adventure.jpg",
    title: "Toyota RAV4 Adventure",
    subtitle: "Dynamic Torque AWD · 2.0L Petrol",
    priceKes: "KES 4.10M",
  },
  {
    src: "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg",
    title: "Harrier GR Sport",
    subtitle: "Gazoo Racing Package · Grade 4.5",
    priceKes: "KES 4.20M",
  },
  {
    src: "/vehicles/serena-highway-star.jpg",
    title: "Nissan Serena Highway Star",
    subtitle: "Dual Power Doors · 8-Seater Luxury",
    priceKes: "KES 2.45M",
  },
  {
    src: "/vehicles/note-epower.jpg",
    title: "Nissan Note e-POWER",
    subtitle: "100% Electric Motor Drive · Ultra-Efficient",
    priceKes: "KES 1.48M",
  },
  {
    src: "/vehicles/suzuki-every-2019/hero-front-34.jpg",
    title: "Suzuki Every 2019",
    subtitle: "Ultra-Efficient Kei Van · 660cc Automatic",
    priceKes: "KES 1.05M",
  },
  {
    src: "/vehicles/harrier-hybrid.jpg",
    title: "Toyota Harrier Hybrid",
    subtitle: "E-Four Symmetrical Electric AWD · Tokyo Grade",
    priceKes: "KES 4.65M",
  },
];

interface TunnelCardData {
  item: TunnelVehicleItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = IMAGES.map((item, i) => {
  const goldenAngle = i * 137.5 * (Math.PI / 180);
  const radiusFactorX = 0.28 + (i % 3) * 0.08;
  const radiusFactorY = 0.26 + (i % 2) * 0.09;

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX,
    radiusFactorY,
    rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
    index: i,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
  onSelect?: () => void;
}

function TunnelCard({ card, progress, pointer, total, stage, onSelect }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);

  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(140, Math.min(190, stage.width * 0.42))
    : Math.max(200, Math.min(290, stage.width * 0.19));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) => {
      const offsetX = baseX - px * panStrength;
      const offsetY = baseY - py * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    }
  );

  return (
    <motion.div
      style={{
        width: cardWidth,
        transform,
        opacity,
        zIndex: card.index + 1,
      }}
      onClick={onSelect}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none cursor-pointer"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white border border-zinc-200/90 shadow-xl shadow-zinc-950/10 hover:shadow-2xl hover:border-red-500/60 transition-all duration-500">
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Subtle Gradient & Card Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-left">
          {card.item.priceKes && (
            <span className="inline-block self-start font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white mb-1 shadow-xs">
              {card.item.priceKes}
            </span>
          )}
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-sm leading-tight">
            {card.item.title}
          </span>
          {card.item.subtitle && (
            <span className="text-[10px] sm:text-[11px] text-zinc-300 font-mono truncate mt-0.5">
              {card.item.subtitle}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export interface PerspectiveTunnelHeroProps {
  onExploreFleet?: () => void;
  onExploreWorkshop?: () => void;
}

export default function PerspectiveTunnelHero({
  onExploreFleet,
  onExploreWorkshop,
}: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Raw motion value controlled directly by mouse wheel / touch trackpad
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  // Handle wheel scrolling locally inside the viewport container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const current = rawProgress.get();
      const delta = e.deltaY * 0.0008; // Speed of tunnel travel
      const next = Math.min(1, Math.max(0, current + delta));

      // Only prevent page scroll while actively flying inside the tunnel (0 to 1)
      if ((delta > 0 && current < 0.98) || (delta < 0 && current > 0.02)) {
        e.preventDefault();
        rawProgress.set(next);
      } else {
        // At limits, let standard page scroll take over smoothly to the inventory section
        rawProgress.set(next);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  const pointer = useCameraParallax(!reduce);

  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 1.2]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.88, 1], [0.85, 1, 1, 0.1]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const handleScrollToFleet = () => {
    if (onExploreFleet) {
      onExploreFleet();
      return;
    }
    const target = document.getElementById("inventory") || document.querySelector("section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[92vh] min-h-[640px] max-h-[960px] w-full overflow-hidden bg-radial from-white via-zinc-50 to-zinc-100 text-zinc-950 select-none flex items-center justify-center border-b border-zinc-200/80"
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 1. Immersive Architectural Dot-Matrix Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e4dfd5_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_65%,transparent_100%)] opacity-80" />

      {/* 2. Soft Ambient Brand Red Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,transparent_65%)]" />

      {/* 3. ALBERKA BRAND LOGO IN BACKGROUND (Watermark Anchor) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.055] select-none">
        <img
          src="/alberka-logo-on-white.png"
          alt="Alberka Enterprises Limited Emblem"
          className="w-[580px] max-w-[70vw] object-contain filter grayscale contrast-125"
          onError={(e) => {
            // Fallback if png not found
            (e.currentTarget as HTMLImageElement).src = "/alberka-brand-logo-v2.png";
          }}
        />
      </div>

      {/* 4. Spatial Depth Ring Guides */}
      <div className="pointer-events-none absolute h-[50vmin] w-[50vmin] rounded-full border border-red-500/15" />
      <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-zinc-300/80" />

      {/* 5. Central Anchor Typography & Action Desk */}
      <motion.div
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="pointer-events-none z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl"
      >
        {/* Sole Showroom Location Badge (Airbnb Trust Pill) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ebebeb] shadow-xs text-[11px] font-mono uppercase tracking-wider text-[#222222] mb-3 sm:mb-4">
          <span className="w-2 h-2 rounded-full bg-[#ff385c]" />
          <span>MOMBASA SOLE OFFICE · ARCHBISHOP MAKARIOS RD</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-[#222222]">
          UNCOMPROMISED.
          <br />
          <span className="text-[#ff385c]">JAPANESE GRADE.</span>
        </h1>

        {/* Narrative Tagline */}
        <p className="mt-3 sm:mt-4 max-w-[50ch] text-xs sm:text-sm md:text-base font-normal text-[#6a6a6a] leading-relaxed">
          Direct Japanese auction stock delivered duty-paid to Mombasa. Certified JEVIC mileage, zero accident Grade 4.5+ units, and 100-point pre-delivery overhaul.
        </p>

        {/* Airbnb Signature Floating Search Capsule */}
        <div
          onClick={handleScrollToFleet}
          className="mt-6 w-full max-w-[720px] bg-white border border-[#ebebeb] rounded-full p-2 pl-5 sm:pl-6 flex items-center justify-between shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.12)] transition-all cursor-pointer pointer-events-auto"
        >
          <div className="flex items-center divide-x divide-[#ebebeb] flex-1 text-left min-w-0 pr-2">
            <div className="px-3 min-w-0 flex-1">
              <span className="text-[11px] font-semibold text-[#222222] block leading-tight">Make & Model</span>
              <span className="text-[13px] text-[#6a6a6a] block truncate">Prado, Harrier, XV...</span>
            </div>
            <div className="hidden sm:block px-4 min-w-0 flex-1">
              <span className="text-[11px] font-semibold text-[#222222] block leading-tight">Delivered Budget</span>
              <span className="text-[13px] text-[#6a6a6a] block truncate">Any price in KES</span>
            </div>
            <div className="hidden md:block px-4 min-w-0 flex-1">
              <span className="text-[11px] font-semibold text-[#222222] block leading-tight">Body & Drive</span>
              <span className="text-[13px] text-[#6a6a6a] block truncate">SUV, Hybrid, 4WD</span>
            </div>
          </div>

          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#ff385c] hover:bg-[#e00b41] text-white flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-xs">
            <Search className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* Secondary Clean Actions Row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <a
            href="https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20am%20inquiring%20about%20your%20verified%20Japanese%20import%20stock."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#222222] hover:text-[#ff385c] inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-white/80"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#ff385c]" />
            <span>Showroom Concierge (0180 423 075)</span>
          </a>
        </div>

        {/* Live Metrics Pill Strip */}
        <div className="mt-3 hidden sm:flex items-center gap-4 text-[11px] font-mono text-[#6a6a6a] font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff385c]" />
            <span>JEVIC Odometer Guarantee</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff385c]" />
            <span>KRA Duty-Paid Clearance</span>
          </span>
        </div>
      </motion.div>

      {/* 6. Scroll / Interaction Prompt */}
      <motion.div
        style={{ opacity: promptOpacity }}
        onClick={handleScrollToFleet}
        className="pointer-events-auto cursor-pointer absolute bottom-5 sm:bottom-6 z-20 flex flex-col items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 hover:text-red-600 transition-colors"
      >
        <span>Scroll / Drag to Explore Fleet</span>
        <div className="h-5 w-px bg-gradient-to-b from-red-600 to-transparent" />
      </motion.div>

      {/* 7. 3D Spatial Corridor Plane */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {TUNNEL_CARDS.map((card, i) => (
          <TunnelCard
            key={i}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={TUNNEL_CARDS.length}
            stage={stage}
            onSelect={handleScrollToFleet}
          />
        ))}
      </div>
    </div>
  );
}
