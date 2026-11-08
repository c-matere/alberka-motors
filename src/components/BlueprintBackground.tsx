import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    let animationFrameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090b]"
    >
      {/* 1. Visible Architectural CAD Blueprint Grid Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subdivided 30px Minor Grid (Subtle but clearly visible) */}
          <pattern
            id="blueprint-grid-minor"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.065)"
              strokeWidth="0.8"
            />
          </pattern>

          {/* 120px Major Drafting Grid with Crosshairs & Registration Targets */}
          <pattern
            id="blueprint-grid-major"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <rect width="120" height="120" fill="url(#blueprint-grid-minor)" />
            
            {/* Major Datum Lines */}
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="rgba(255, 255, 255, 0.13)"
              strokeWidth="1.2"
            />

            {/* Corner Crosshair (+) with high visible contrast */}
            <path
              d="M -7 0 L 7 0 M 0 -7 L 0 7"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.4"
            />

            {/* Target Precision Dot at Intersection */}
            <circle
              cx="0"
              cy="0"
              r="1.8"
              fill="rgba(255, 255, 255, 0.75)"
            />

            {/* Center Cadence Dot */}
            <circle
              cx="60"
              cy="60"
              r="1.2"
              fill="rgba(255, 255, 255, 0.25)"
            />
          </pattern>

          {/* Vignette Mask that preserves visible blueprint lines across the entire page */}
          <radialGradient id="blueprint-vignette" cx="50%" cy="30%" r="85%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
            <stop offset="45%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#fff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.45" />
          </radialGradient>

          <mask id="blueprint-mask">
            <rect width="100%" height="100%" fill="url(#blueprint-vignette)" />
          </mask>
        </defs>

        {/* Masked Blueprint Canvas */}
        <rect
          width="100%"
          height="100%"
          fill="url(#blueprint-grid-major)"
          mask="url(#blueprint-mask)"
        />
      </svg>

      {/* 2. Overhead Studio Softbox Lights (Luminous Photographic Depth) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1800px] h-[750px] opacity-70"
        style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(161, 161, 170, 0.04) 50%, transparent 80%)',
        }}
      />
      
      {/* Mid-page Warm Titanium Studio Bounce */}
      <div 
        className="absolute top-[45vh] right-[5%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(140, 120, 80, 0.02) 60%, transparent 80%)',
        }}
      />

      {/* Lower-page Cool Platinum Studio Bounce */}
      <div 
        className="absolute bottom-[15vh] left-[5%] w-[750px] h-[750px] rounded-full blur-[160px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(113, 113, 122, 0.02) 60%, transparent 80%)',
        }}
      />

      {/* 3. Interactive Specular Inspection Spotlight (Desktop Cursor Follow) */}
      {!isTouch && mousePos.x >= 0 && (
        <div
          className="absolute w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle 350px at center, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%)',
          }}
        />
      )}

      {/* 4. Architectural Technical Blueprint Watermarks (Visible Tokyo-Mombasa Engineering Axis) */}
      <div className="absolute top-28 left-6 sm:left-10 opacity-70 hidden md:block select-none pointer-events-none">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-zinc-400 space-y-1 border-l-2 border-white/30 pl-3.5 bg-black/40 backdrop-blur-sm py-1.5 pr-3 rounded-r">
          <div className="text-white font-semibold">CAD GRID: 120mm · DATUM: TOKYO</div>
          <div>PACIFIC VESSEL TRANSIT // 35°41&apos;N 139°46&apos;E</div>
          <div className="text-zinc-500">USS TOKYO & CAA CHASSIS AUDIT</div>
        </div>
      </div>

      <div className="absolute top-28 right-6 sm:right-10 opacity-70 hidden md:block select-none pointer-events-none text-right">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-zinc-400 space-y-1 border-r-2 border-white/30 pr-3.5 bg-black/40 backdrop-blur-sm py-1.5 pl-3 rounded-l">
          <div className="text-white font-semibold">TERMINUS: MOMBASA PORT · HUB 01</div>
          <div>TANGANA RD WORKSHOP // 04°03&apos;S 39°40&apos;E</div>
          <div className="text-zinc-500">5,000 KM MECHANICAL HOIST CERTIFIED</div>
        </div>
      </div>

      {/* 5. 35mm Analog Micro-Grain Texture Overlay (Anti-Banding) */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
