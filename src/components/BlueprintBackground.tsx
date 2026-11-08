import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device to avoid running mouse listeners
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
      // Damped smooth interpolation for luxury fluid lag
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
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
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#09090b]"
    >
      {/* 1. Studio Overhead Softbox Lights (Dimensional Atmospheric Depth) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1800px] h-[750px] opacity-40"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.09) 0%, rgba(161, 161, 170, 0.03) 45%, transparent 75%)',
        }}
      />
      
      {/* Secondary Warm Titanium Ambient Haze (Mid-page studio bounce) */}
      <div 
        className="absolute top-[40vh] right-[10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(140, 120, 80, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* Tertiary Cool Platinum Haze (Lower page studio bounce) */}
      <div 
        className="absolute bottom-[20vh] left-[5%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(113, 113, 122, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* 2. Interactive Specular Inspection Spotlight (Desktop Only) */}
      {!isTouch && mousePos.x >= 0 && (
        <div
          className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 pointer-events-none"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle 400px at center, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
          }}
        />
      )}

      {/* 3. Architectural CAD Blueprint Grid Layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.45] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subdivided 32px Minor Grid */}
          <pattern
            id="blueprint-grid-minor"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.025)"
              strokeWidth="0.75"
            />
          </pattern>

          {/* 160px Major Drafting Grid with Crosshairs */}
          <pattern
            id="blueprint-grid-major"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <rect width="160" height="160" fill="url(#blueprint-grid-minor)" />
            {/* Major Line */}
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
            {/* Corner Crosshair (+) */}
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1"
            />
            {/* Center Registration Mark */}
            <circle
              cx="80"
              cy="80"
              r="1"
              fill="rgba(255, 255, 255, 0.12)"
            />
          </pattern>

          {/* Radial Vignette Mask to softly fade grid toward edges & lower depths */}
          <radialGradient id="blueprint-vignette" cx="50%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.02" />
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

      {/* 4. Technical Architectural Blueprint Watermarks (Tokyo-Mombasa Axis) */}
      <div className="absolute top-24 left-6 sm:left-12 opacity-25 hidden md:block select-none pointer-events-none">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400 space-y-0.5 border-l border-white/20 pl-3">
          <div>DATUM: TOKYO · PACIFIC SHIPPING LINE</div>
          <div>COORDINATES: 35°41&apos;N 139°46&apos;E // USS TOKYO</div>
          <div>INSPECTION PROTOCOL: JEVIC / QISJ VERIFIED</div>
        </div>
      </div>

      <div className="absolute top-24 right-6 sm:right-12 opacity-25 hidden md:block select-none pointer-events-none text-right">
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400 space-y-0.5 border-r border-white/20 pr-3">
          <div>TERMINUS: MOMBASA PORT · HUB 01</div>
          <div>COORDINATES: 04°03&apos;S 39°40&apos;E // TANGANA RD</div>
          <div>WARRANTY STANDARD: 5,000 KM STRICT POWERTRAIN</div>
        </div>
      </div>

      {/* 5. 35mm Analog Micro-Grain Texture Overlay (Anti-Banding) */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
