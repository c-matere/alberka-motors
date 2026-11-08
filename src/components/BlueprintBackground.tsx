import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }

    // Passive scroll listener for smooth cinematic parallax
    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset || 0);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Damped mouse follow for desktop
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

    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Parallax translation: subtle slow drift as user navigates down
  const parallaxOffset = scrollY * 0.16;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090c]"
    >
      {/* 1. Studio Overhead Softbox Lights (Luminous Photographic Depth) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1920px] h-[850px] opacity-50"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.09) 0%, rgba(148, 163, 184, 0.03) 50%, transparent 80%)',
        }}
      />
      
      {/* Mid-page Titanium Ambient Haze */}
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
            background: 'radial-gradient(circle 400px at center, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 45%, transparent 75%)',
          }}
        />
      )}

      {/* 3. RESTORED ARCHITECTURAL GRID (Muted Opacity + Soft Blur Layer) */}
      <div 
        className="absolute inset-0 opacity-[0.24] transition-transform duration-75 ease-out will-change-transform"
        style={{
          filter: 'blur(1px)',
          transform: `translateY(${parallaxOffset * 0.5}px)`,
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subdivided 30px Minor Grid */}
            <pattern
              id="blueprint-grid-minor-muted"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.8"
              />
            </pattern>

            {/* 120px Major Drafting Grid with Crosshairs & Targets */}
            <pattern
              id="blueprint-grid-major-muted"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="url(#blueprint-grid-minor-muted)" />
              
              {/* Major Datum Lines */}
              <path
                d="M 120 0 L 0 0 0 120"
                fill="none"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1.2"
              />

              {/* Corner Crosshairs (+) */}
              <path
                d="M -6 0 L 6 0 M 0 -6 L 0 6"
                stroke="rgba(255, 255, 255, 0.55)"
                strokeWidth="1.4"
              />

              {/* Intersection Registration Target */}
              <circle
                cx="0"
                cy="0"
                r="1.8"
                fill="rgba(255, 255, 255, 0.85)"
              />

              {/* Center Cadence Dot */}
              <circle
                cx="60"
                cy="60"
                r="1.2"
                fill="rgba(255, 255, 255, 0.35)"
              />
            </pattern>

            {/* Soft Radial Mask so grid gently dissipates towards the periphery */}
            <radialGradient id="grid-fade-mask" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
            </radialGradient>

            <mask id="grid-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade-mask)" />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#blueprint-grid-major-muted)"
            mask="url(#grid-mask)"
          />
        </svg>
      </div>

      {/* 4. CINEMATIC ROLLS-ROYCE / BENTLEY ULTRA-LUXURY WORK-IN-PROGRESS SCHEMATIC */}
      {/* Intentionally enigmatic, submerged in technical clay-modeling draft lines with soft focus and parallax */}
      <div 
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-[1480px] max-w-[96vw] h-[640px] opacity-[0.24] pointer-events-none select-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          filter: 'blur(0.85px)',
          transform: `translate(-50%, ${parallaxOffset}px)`,
        }}
      >
        <svg
          viewBox="0 0 1400 600"
          className="w-full h-full text-slate-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="car-draft-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="car-mask">
              <rect width="1400" height="600" fill="url(#car-draft-fade)" />
            </mask>
          </defs>

          <g mask="url(#car-mask)">
            {/* Clay-Modeling Automotive Station Planes (STA Lines: Vertical Section Slices) */}
            {[200, 320, 440, 560, 680, 800, 920, 1040, 1160].map((x) => (
              <g key={x}>
                <line x1={x} y1="120" x2={x} y2="470" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="0.8" strokeDasharray="3 4" />
                <text x={x + 3} y="482" fill="rgba(255, 255, 255, 0.35)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                  STA {x}
                </text>
              </g>
            ))}

            {/* Automotive Waterline Slices (Horizontal Waterlines WL 100 - WL 400) */}
            {[200, 270, 340, 410].map((y, idx) => (
              <g key={y}>
                <line x1="120" y1={y} x2="1280" y2={y} stroke="rgba(255, 255, 255, 0.14)" strokeWidth="0.8" strokeDasharray="4 6" />
                <text x="125" y={y - 4} fill="rgba(255, 255, 255, 0.35)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  WL {400 - idx * 100}
                </text>
              </g>
            ))}

            {/* Aerodynamic Wind-Tunnel Streamlines (Curling over long bonnet & swept tail) */}
            <path
              d="M 80 270 C 240 270, 380 300, 520 220 C 660 140, 880 150, 1060 210 C 1200 260, 1300 275, 1340 280"
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />
            <path
              d="M 80 310 C 260 310, 420 330, 540 250 C 680 170, 920 180, 1080 250 C 1220 300, 1300 315, 1340 320"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="0.9"
              strokeDasharray="3 3"
            />
            <path
              d="M 80 350 C 220 350, 320 370, 460 350 C 620 330, 960 330, 1140 355 C 1240 370, 1300 375, 1340 378"
              stroke="rgba(148, 163, 184, 0.22)"
              strokeWidth="0.8"
              strokeDasharray="8 6"
            />

            {/* ================= ROLLS-ROYCE / BENTLEY STYLE WIREFRAME BLUEPRINT ================= */}
            {/* Majestic Upright Prow, Infinite Hood, Fastback Coupe-Limousine Roofline */}
            {/* Ground Plane */}
            <line x1="120" y1="440" x2="1280" y2="440" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" strokeDasharray="8 4" />

            {/* Main Outer Coachwork Silhouette */}
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
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1.8"
            />

            {/* Signature Rolls-Royce / Bentley Coachline (Shoulder crease line running the full length) */}
            <path
              d="M 195 290 C 340 285, 640 275, 940 285 C 1100 292, 1210 310, 1255 315"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />

            {/* Upright Front Pantheon Grille Silhouette & Flying Mascot Datum */}
            <line x1="180" y1="260" x2="180" y2="400" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1.4" />
            <path d="M 180 260 L 195 255 L 195 400 L 180 405" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
            {/* Mascot Spirit Datum Crosshair */}
            <circle cx="180" cy="245" r="4" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" />
            <line x1="180" y1="237" x2="180" y2="253" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />

            {/* Greenhouse Window Arcs (Sweeping pillared glasshouse) */}
            <path
              d="M 550 250 
                 C 600 185, 680 155, 770 148 
                 C 890 138, 990 162, 1055 208 
                 C 1090 232, 1115 260, 1125 272 
                 L 550 250 Z"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.1"
              strokeDasharray="4 2"
            />

            {/* Coach Doors Cutlines (Reverse-hinged rear suicide doors meeting at center pillar) */}
            {/* Front Door Rear Seam */}
            <line x1="780" y1="147" x2="770" y2="415" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" />
            {/* Rear Coach Door Seam */}
            <line x1="970" y1="168" x2="955" y2="415" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="3 2" />
            {/* Dual Centered Handles Datum (Signature Bespoke Coach Door Feature) */}
            <rect x="762" y="278" width="8" height="3" fill="rgba(255, 255, 255, 0.7)" rx="1" />
            <rect x="774" y="278" width="8" height="3" fill="rgba(255, 255, 255, 0.7)" rx="1" />

            {/* Ultra-Luxury Turbine Wheel Assembly: Front Axle (330, 415) */}
            <g transform="translate(330, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="18" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1.2" />
              {/* Concentric Self-Righting Center Cap */}
              <text x="0" y="3" textAnchor="middle" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                RR
              </text>
              {/* Multi-Spoke Turbine Drafting Lines */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 18;
                const y1 = Math.sin(rad) * 18;
                const x2 = Math.cos(rad) * 54;
                const y2 = Math.sin(rad) * 54;
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.28)" strokeWidth="0.7" />
                );
              })}
            </g>

            {/* Ultra-Luxury Turbine Wheel Assembly: Rear Axle (980, 415) */}
            <g transform="translate(980, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="18" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="rgba(255, 255, 255, 0.6)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                RR
              </text>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 18;
                const y1 = Math.sin(rad) * 18;
                const x2 = Math.cos(rad) * 54;
                const y2 = Math.sin(rad) * 54;
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.28)" strokeWidth="0.7" />
                );
              })}
            </g>

            {/* Center of Gravity (CG) Technical Balance Datum */}
            <g transform="translate(650, 345)">
              <circle cx="0" cy="0" r="11" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" />
              <path d="M 0 -16 L 0 16 M -16 0 L 16 0" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="rgba(255, 255, 255, 0.85)" />
              <text x="18" y="4" fill="rgba(255, 255, 255, 0.65)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                ⌖ CG / 50:50 COMFORT ARCHITECTURE
              </text>
            </g>

            {/* ================= CAD DIMENSION LINES & ENGINEERING ANNOTATIONS ================= */}
            {/* Wheelbase Dimension Line: 3,450 mm */}
            <g transform="translate(0, 500)">
              <line x1="330" y1="0" x2="980" y2="0" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <path d="M 330 -5 L 330 5 M 980 -5 L 980 5" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" />
              <path d="M 336 -3 L 330 0 L 336 3 M 974 -3 L 980 0 L 974 3" fill="rgba(255, 255, 255, 0.65)" />
              <text x="655" y="-9" textAnchor="middle" fill="rgba(255, 255, 255, 0.75)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em">
                |← LONG WHEELBASE PLATFORM: 3,450 mm →|
              </text>
            </g>

            {/* Overall Vehicle Length: 5,450 mm */}
            <g transform="translate(0, 535)">
              <line x1="180" y1="0" x2="1260" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" strokeDasharray="5 3" />
              <path d="M 180 -4 L 180 4 M 1260 -4 L 1260 4" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
              <text x="720" y="-7" textAnchor="middle" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                TOTAL LENGTH OVERALL: 5,450 mm
              </text>
            </g>

            {/* Height Dimension Line: 1,590 mm */}
            <g transform="translate(115, 0)">
              <line x1="0" y1="125" x2="0" y2="440" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
              <path d="M -4 125 L 4 125 M -4 440 L 4 440" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <text x="-8" y="295" textAnchor="end" fill="rgba(255, 255, 255, 0.6)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em" transform="rotate(-90 -8 295)">
                OVERALL HEIGHT: 1,590 mm
              </text>
            </g>

            {/* Geometric Radius & Tangency Construction Callouts */}
            <g transform="translate(850, 95)">
              <line x1="0" y1="0" x2="50" y2="-30" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <line x1="50" y1="-30" x2="180" y2="-30" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="rgba(255, 255, 255, 0.85)" />
              <text x="55" y="-35" fill="rgba(255, 255, 255, 0.8)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                FASTBACK COACHWORK R: 1,480mm // TANGENT CONTINUITY
              </text>
            </g>

            <g transform="translate(280, 215)">
              <line x1="0" y1="0" x2="-40" y2="-35" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <line x1="-40" y1="-35" x2="-150" y2="-35" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="rgba(255, 255, 255, 0.85)" />
              <text x="-150" y="-40" fill="rgba(255, 255, 255, 0.8)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                PROW ELEVATION 90° // PANTHEON MATRIX SPEC
              </text>
            </g>

            {/* Authentic Bespoke Skunkworks Title Block */}
            <g transform="translate(1050, 50)">
              <rect x="0" y="0" width="260" height="54" fill="rgba(0, 0, 0, 0.65)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.9" rx="4" />
              <text x="14" y="19" fill="rgba(255, 255, 255, 0.9)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="0.14em">
                BESPOKE COACHBUILDING CAD
              </text>
              <text x="14" y="34" fill="rgba(148, 163, 184, 0.8)" fontSize="8" fontFamily="JetBrains Mono, monospace">
                PROJECT: ULTRA-LUXURY CONTINENTAL SALOON
              </text>
              <text x="14" y="46" fill="rgba(148, 163, 184, 0.55)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                SCALE 1:20 · CHASSIS RIGIDITY INDEX 100%
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* 5. Fine 35mm Analog Micro-Grain Texture Overlay (Prevents digital banding on OLEDs) */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
