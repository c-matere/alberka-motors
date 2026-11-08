import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable interactive tracking on mobile / touch devices for maximum performance and zero clutter
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0c0d12]"
    >
      {/* 1. Lighter, Luminous Ambient Studio Lighting (Softens the canvas so it never feels oppressive) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1920px] h-[850px] opacity-60"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(203, 213, 225, 0.03) 45%, transparent 75%)',
        }}
      />
      
      {/* Mid-page Warm Studio Ambient Glow */}
      <div 
        className="absolute top-[45vh] right-[8%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(140, 120, 80, 0.015) 55%, transparent 75%)',
        }}
      />

      {/* 2. Interactive Specular Inspection Light (Desktop Only - Soft & Subtle) */}
      {!isTouch && mousePos.x >= 0 && (
        <div
          className="absolute w-[750px] h-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-100 hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle 350px at center, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
          }}
        />
      )}

      {/* 3. CINEMATIC WORK-IN-PROGRESS VEHICLE DESIGN BLUEPRINT (Desktop & Tablet Only - Completely hidden on mobile to avoid clutter) */}
      <div className="hidden md:block absolute top-16 lg:top-24 left-1/2 -translate-x-1/2 w-[1280px] max-w-[95vw] h-[580px] opacity-[0.22] select-none pointer-events-none">
        <svg
          viewBox="0 0 1200 520"
          className="w-full h-full text-slate-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle Drafting Dot Grid Pattern for CAD Table */}
            <pattern id="cad-dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.8" fill="rgba(255, 255, 255, 0.25)" />
            </pattern>
            {/* Soft Radial Fade so the blueprint blends seamlessly into the dark atmosphere */}
            <radialGradient id="schematic-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="blueprint-vignette-mask">
              <rect width="1200" height="520" fill="url(#schematic-fade)" />
            </mask>
          </defs>

          <g mask="url(#blueprint-vignette-mask)">
            {/* Soft CAD Grid Underlay */}
            <rect width="1200" height="520" fill="url(#cad-dots)" opacity="0.6" />

            {/* Ground Plane Baseline */}
            <line x1="80" y1="410" x2="1120" y2="410" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="6 4" />

            {/* Aerodynamic Airflow Streamlines (Wind-tunnel velocity simulation) */}
            <path
              d="M 60 220 C 220 220, 360 250, 470 190 C 580 130, 780 140, 920 180 C 1040 220, 1140 240, 1180 245"
              stroke="rgba(148, 163, 184, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="8 6"
            />
            <path
              d="M 60 260 C 240 260, 340 290, 440 230 C 540 170, 740 170, 890 220 C 1020 260, 1120 280, 1180 285"
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 300 C 200 300, 260 325, 360 320 C 520 310, 840 310, 980 325 C 1080 340, 1140 350, 1180 352"
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="0.8"
              strokeDasharray="12 8"
            />

            {/* ================= VEHICLE WIREFRAME SILHOUETTE (Work-in-Progress Japanese Flagship) ================= */}
            {/* Main Outer Body Contour Line */}
            <path
              d="M 140 380 
                 L 140 360 
                 C 140 330, 170 305, 220 300 
                 L 380 270 
                 C 430 260, 490 200, 560 170 
                 C 640 135, 780 145, 870 185 
                 C 940 220, 990 265, 1030 280 
                 L 1060 290 
                 C 1075 320, 1070 350, 1065 375 
                 L 1055 385 
                 L 970 385 
                 C 965 330, 915 290, 860 290 
                 C 805 290, 755 330, 750 385 
                 L 430 385 
                 C 425 330, 375 290, 320 290 
                 C 265 290, 215 330, 210 385 
                 Z"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.8"
            />

            {/* Greenhouse / Cabin Window Arcs */}
            <path
              d="M 445 258 
                 C 485 205, 545 178, 620 168 
                 C 720 156, 810 172, 875 210 
                 C 915 235, 945 265, 960 278 
                 L 445 258 Z"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            {/* B-Pillar Divider */}
            <line x1="680" y1="164" x2="675" y2="265" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" />
            {/* C-Pillar Quarter Glass Accent */}
            <line x1="820" y1="178" x2="810" y2="272" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" strokeDasharray="2 2" />

            {/* Front Wheel Assembly (Rim, Hub, Caliper) */}
            <g transform="translate(320, 385)">
              <circle cx="0" cy="0" r="62" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="48" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="14" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" />
              {/* Spoke Guides */}
              <line x1="-48" y1="0" x2="48" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
              <line x1="0" y1="-48" x2="0" y2="48" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
              <line x1="-34" y1="-34" x2="34" y2="34" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
              <line x1="-34" y1="34" x2="34" y2="-34" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            </g>

            {/* Rear Wheel Assembly */}
            <g transform="translate(860, 385)">
              <circle cx="0" cy="0" r="62" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="48" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="14" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" />
              {/* Spoke Guides */}
              <line x1="-48" y1="0" x2="48" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
              <line x1="0" y1="-48" x2="0" y2="48" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
              <line x1="-34" y1="-34" x2="34" y2="34" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
              <line x1="-34" y1="34" x2="34" y2="-34" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
            </g>

            {/* Center of Gravity (CG) Datum Marker */}
            <g transform="translate(590, 320)">
              <circle cx="0" cy="0" r="9" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1" />
              <path d="M 0 -13 L 0 13 M -13 0 L 13 0" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" />
              <text x="14" y="4" fill="rgba(255, 255, 255, 0.65)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                CG: 50/50 AXLE DISTRIBUTION
              </text>
            </g>

            {/* ================= CAD DIMENSION LINES & TELEMETRY ================= */}
            {/* Wheelbase Measurement Line: 2,850 mm */}
            <g transform="translate(0, 455)">
              <line x1="320" y1="0" x2="860" y2="0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              <path d="M 320 -5 L 320 5 M 860 -5 L 860 5" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
              <path d="M 326 -3 L 320 0 L 326 3 M 854 -3 L 860 0 L 854 3" fill="rgba(255, 255, 255, 0.6)" />
              <text x="590" y="-8" textAnchor="middle" fill="rgba(255, 255, 255, 0.75)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                |← WHEELBASE: 2,850 mm →|
              </text>
            </g>

            {/* Overall Length Measurement: 4,740 mm */}
            <g transform="translate(0, 485)">
              <line x1="140" y1="0" x2="1065" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" strokeDasharray="4 3" />
              <path d="M 140 -4 L 140 4 M 1065 -4 L 1065 4" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              <text x="590" y="-6" textAnchor="middle" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                OVERALL VEHICLE LENGTH: 4,740 mm
              </text>
            </g>

            {/* Height Measurement Line: 1,660 mm */}
            <g transform="translate(85, 0)">
              <line x1="0" y1="145" x2="0" y2="410" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />
              <path d="M -4 145 L 4 145 M -4 410 L 4 410" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              <text x="-8" y="280" textAnchor="end" fill="rgba(255, 255, 255, 0.6)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em" transform="rotate(-90 -8 280)">
                HEIGHT: 1,660 mm
              </text>
            </g>

            {/* Aerodynamic Curvature & Tangent Annotations */}
            <g transform="translate(680, 115)">
              <line x1="0" y1="0" x2="40" y2="-25" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
              <line x1="40" y1="-25" x2="140" y2="-25" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2" fill="rgba(255, 255, 255, 0.7)" />
              <text x="44" y="-30" fill="rgba(255, 255, 255, 0.75)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                ROOF APEX RADIUS: R 840mm // G2 CONTINUITY
              </text>
            </g>

            <g transform="translate(230, 240)">
              <line x1="0" y1="0" x2="-35" y2="-30" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
              <line x1="-35" y1="-30" x2="-120" y2="-30" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2" fill="rgba(255, 255, 255, 0.7)" />
              <text x="-120" y="-35" fill="rgba(255, 255, 255, 0.75)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                HOOD INCLINE: 14.8° // LOW TURBULENCE
              </text>
            </g>

            {/* Skunkworks Title Block */}
            <g transform="translate(900, 70)">
              <rect x="0" y="0" width="230" height="48" fill="rgba(0, 0, 0, 0.5)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" rx="4" />
              <text x="12" y="18" fill="rgba(255, 255, 255, 0.85)" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="0.14em">
                ALBERKA CAD DESIGN STAGE
              </text>
              <text x="12" y="32" fill="rgba(148, 163, 184, 0.75)" fontSize="8" fontFamily="JetBrains Mono, monospace">
                SCALE 1:25 · TOKYO AUCTION AUDIT
              </text>
              <text x="12" y="42" fill="rgba(148, 163, 184, 0.5)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                AERODYNAMIC COEFFICIENT: Cd 0.28
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* 4. Fine 35mm Micro-Grain Layer (Provides matte analog texture without digital noise) */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
