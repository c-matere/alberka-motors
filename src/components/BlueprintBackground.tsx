import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // Damped mouse follow for desktop ambient spotlight
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
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090c]"
    >
      {/* 1. Studio Overhead Softbox Lights (Luminous Depth) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1920px] h-[850px] opacity-50"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.09) 0%, rgba(148, 163, 184, 0.03) 50%, transparent 80%)',
        }}
      />
      
      {/* Mid-page Titanium Ambient Glow */}
      <div 
        className="absolute top-[40vh] right-[5%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(140, 120, 80, 0.015) 60%, transparent 75%)',
        }}
      />

      {/* 2. Interactive Specular Inspection Spotlight (Desktop Only) */}
      {!isTouch && mousePos.x >= 0 && (
        <div
          className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-100 hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle 400px at center, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.01) 45%, transparent 75%)',
          }}
        />
      )}

      {/* 3. STATIC ARCHITECTURAL CAD GRID (Increased Opacity, Soft Blur, Completely Stationary) */}
      <div 
        className="absolute inset-0 opacity-[0.45]"
        style={{
          filter: 'blur(0.7px)',
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subdivided 30px Minor Grid */}
            <pattern
              id="blueprint-grid-minor-static"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="0.8"
              />
            </pattern>

            {/* 120px Major Drafting Grid with Crosshairs & Targets */}
            <pattern
              id="blueprint-grid-major-static"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="url(#blueprint-grid-minor-static)" />
              
              {/* Major Datum Lines */}
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.2"
              />

              {/* Corner Crosshairs (+) */}
              <path
                d="M -6 0 L 6 0 M 0 -6 L 0 6"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="1.4"
              />

              {/* Intersection Registration Target */}
              <circle
                cx="0"
                cy="0"
                r="1.8"
                fill="rgba(255, 255, 255, 0.9)"
              />

              {/* Center Cadence Dot */}
              <circle
                cx="60"
                cy="60"
                r="1.2"
                fill="rgba(255, 255, 255, 0.4)"
              />
            </pattern>

            {/* Soft Radial Mask so grid gently dissipates towards the outer corners */}
            <radialGradient id="grid-fade-mask-static" cx="50%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
              <stop offset="55%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
            </radialGradient>

            <mask id="grid-mask-static">
              <rect width="100%" height="100%" fill="url(#grid-fade-mask-static)" />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#blueprint-grid-major-static)"
            mask="url(#grid-mask-static)"
          />
        </svg>
      </div>

      {/* 4. ROLLS-ROYCE / BENTLEY WORK-IN-PROGRESS SCHEMATIC (Significantly Reduced Opacity to 0.09, Completely Stationary) */}
      <div 
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-[1480px] max-w-[96vw] h-[640px] opacity-[0.09] pointer-events-none select-none"
        style={{
          filter: 'blur(0.8px)',
        }}
      >
        <svg
          viewBox="0 0 1400 600"
          className="w-full h-full text-slate-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="car-draft-fade-static" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="car-mask-static">
              <rect width="1400" height="600" fill="url(#car-draft-fade-static)" />
            </mask>
          </defs>

          <g mask="url(#car-mask-static)">
            {/* Clay-Modeling Automotive Station Planes (STA Lines) */}
            {[200, 320, 440, 560, 680, 800, 920, 1040, 1160].map((x) => (
              <g key={x}>
                <line x1={x} y1="120" x2={x} y2="470" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeDasharray="3 4" />
                <text x={x + 3} y="482" fill="rgba(255, 255, 255, 0.45)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                  STA {x}
                </text>
              </g>
            ))}

            {/* Automotive Waterline Slices (WL 100 - WL 400) */}
            {[200, 270, 340, 410].map((y, idx) => (
              <g key={y}>
                <line x1="120" y1={y} x2="1280" y2={y} stroke="rgba(255, 255, 255, 0.18)" strokeWidth="0.8" strokeDasharray="4 6" />
                <text x="125" y={y - 4} fill="rgba(255, 255, 255, 0.45)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  WL {400 - idx * 100}
                </text>
              </g>
            ))}

            {/* Aerodynamic Wind-Tunnel Streamlines */}
            <path
              d="M 80 270 C 240 270, 380 300, 520 220 C 660 140, 880 150, 1060 210 C 1200 260, 1300 275, 1340 280"
              stroke="rgba(148, 163, 184, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <path
              d="M 80 310 C 260 310, 420 330, 540 250 C 680 170, 920 180, 1080 250 C 1220 300, 1300 315, 1340 320"
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="0.9"
              strokeDasharray="3 3"
            />

            {/* Ground Plane */}
            <line x1="120" y1="440" x2="1280" y2="440" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="8 4" />

            {/* Rolls-Royce / Bentley Coachwork Silhouette */}
            <path
              d="M 180 410 
                 L 180 340 
                 C 180 280, 210 260, 240 255 
                 L 530 255 
                 C 560 255, 620 190, 710 155 
                 C 820 115, 980 135, 1070 190 
                 C 1140 230, 1195 270, 1235 285 
                 L 1260 295 
                 C 1275 330, 1270 375, 1260 405 
                 L 1245 415 
                 L 1120 415 
                 C 1115 345, 1055 295, 980 295 
                 C 905 295, 845 345, 840 415 
                 L 470 415 
                 C 465 345, 405 295, 330 295 
                 C 255 295, 195 345, 190 415 
                 Z"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.8"
            />

            {/* Signature Coachline Crease */}
            <path
              d="M 195 290 C 340 285, 640 275, 940 285 C 1100 292, 1210 310, 1255 315"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />

            {/* Upright Front Pantheon Grille Silhouette & Mascot Datum */}
            <line x1="180" y1="260" x2="180" y2="400" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.4" />
            <circle cx="180" cy="245" r="4" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="0.8" />

            {/* Greenhouse Window Arcs */}
            <path
              d="M 550 250 
                 C 600 185, 680 155, 770 148 
                 C 890 138, 990 162, 1055 208 
                 C 1090 232, 1115 260, 1125 272 
                 L 550 250 Z"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.1"
              strokeDasharray="4 2"
            />

            {/* Reverse Coach Doors Cutlines & Dual Centered Handles */}
            <line x1="780" y1="147" x2="770" y2="415" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
            <line x1="970" y1="168" x2="955" y2="415" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="762" y="278" width="8" height="3" fill="rgba(255, 255, 255, 0.75)" rx="1" />
            <rect x="774" y="278" width="8" height="3" fill="rgba(255, 255, 255, 0.75)" rx="1" />

            {/* Front Wheel Hub (330, 415) */}
            <g transform="translate(330, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="18" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                RR
              </text>
            </g>

            {/* Rear Wheel Hub (980, 415) */}
            <g transform="translate(980, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="18" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                RR
              </text>
            </g>

            {/* Center of Gravity (CG) Technical Balance Datum */}
            <g transform="translate(650, 345)">
              <circle cx="0" cy="0" r="11" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" />
              <path d="M 0 -16 L 0 16 M -16 0 L 16 0" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="rgba(255, 255, 255, 0.9)" />
            </g>

            {/* Dimension Lines */}
            <g transform="translate(0, 500)">
              <line x1="330" y1="0" x2="980" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
              <path d="M 330 -5 L 330 5 M 980 -5 L 980 5" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" />
              <text x="655" y="-9" textAnchor="middle" fill="rgba(255, 255, 255, 0.8)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em">
                |← LONG WHEELBASE PLATFORM: 3,450 mm →|
              </text>
            </g>

            <g transform="translate(0, 535)">
              <line x1="180" y1="0" x2="1260" y2="0" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" strokeDasharray="5 3" />
              <text x="720" y="-7" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                TOTAL LENGTH OVERALL: 5,450 mm
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* 5. 35mm Analog Micro-Grain Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
