import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }

    // Dynamic scroll observer: Dim above the fold so video has total focus,
    // brightening smoothly as user scrolls down into inventory & sections.
    let ticking = false;
    const updateScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      // Above the fold (y <= 50px): factor is 0 (very dim)
      // Between 50px and 520px: smoothly transitions from 0.0 to 1.0
      const factor = Math.min(1, Math.max(0, (y - 50) / 470));
      setScrollFactor(factor);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Dynamic Opacity Computations (Dim above the fold; brightening on scroll)
  const gridOpacity = 0.06 + scrollFactor * 0.44; // 0.06 (very dim) -> 0.50 (crisp CAD)
  const carOpacity = 0.02 + scrollFactor * 0.28;  // 0.02 (dimmed) -> 0.30 (visible blueprint)
  const softboxOpacity = 0.3 + scrollFactor * 0.45; // 0.30 -> 0.75
  const midGlowOpacity = 0.08 + scrollFactor * 0.24;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090c]"
    >
      {/* 1. Studio Overhead Softbox Lights (Luminous Photographic Depth) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1920px] h-[900px] transition-opacity duration-300 ease-out"
        style={{
          opacity: softboxOpacity,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(148, 163, 184, 0.035) 50%, transparent 80%)',
        }}
      />
      
      {/* Mid-page Warm Titanium Studio Ambient Glow */}
      <div 
        className="absolute top-[40vh] right-[6%] w-[700px] h-[700px] rounded-full blur-[160px] transition-opacity duration-300 ease-out"
        style={{
          opacity: midGlowOpacity,
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, rgba(140, 120, 80, 0.015) 60%, transparent 75%)',
        }}
      />

      {/* 2. Interactive Specular Inspection Spotlight (Desktop Only - Does the Heavy Lifting on Hover) */}
      {!isTouch && mousePos.x >= 0 && (
        <div
          className="absolute w-[850px] h-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-75 hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle 420px at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)',
          }}
        />
      )}

      {/* 3. STATIC ARCHITECTURAL CAD GRID (Dim above the fold; brightening dynamically as you scroll) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: gridOpacity,
          filter: 'blur(0.65px)',
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subdivided 30px Minor Grid */}
            <pattern
              id="blueprint-grid-minor-v4"
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
              id="blueprint-grid-major-v4"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="url(#blueprint-grid-minor-v4)" />
              
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
                stroke="rgba(255, 255, 255, 0.7)"
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
                fill="rgba(255, 255, 255, 0.45)"
              />
            </pattern>

            {/* Radial Vignette */}
            <radialGradient id="grid-fade-mask-v4" cx="50%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
              <stop offset="55%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
            </radialGradient>

            <mask id="grid-mask-v4">
              <rect width="100%" height="100%" fill="url(#grid-fade-mask-v4)" />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#blueprint-grid-major-v4)"
            mask="url(#grid-mask-v4)"
          />
        </svg>
      </div>

      {/* 4. ADVANCED LATE-STAGE BENTLEY ARCHITECTURAL CAD SCHEMATIC */}
      {/* Dimmed above the fold so video has 100% focus; brightening up as you scroll to reveal through transparent glass cards */}
      <div 
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-[1480px] max-w-[96vw] h-[640px] pointer-events-none select-none transition-opacity duration-300 ease-out"
        style={{
          opacity: carOpacity,
        }}
      >
        <svg
          viewBox="0 0 1400 620"
          className="w-full h-full text-slate-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Diamond Matrix Grille Hatch Pattern */}
            <pattern id="bentley-matrix-hatch-v4" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="8" y2="0" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
            </pattern>

            <radialGradient id="bentley-fade-v4" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="bentley-mask-v4">
              <rect width="1400" height="620" fill="url(#bentley-fade-v4)" />
            </mask>
          </defs>

          <g mask="url(#bentley-mask-v4)">
            {/* Ground Plane */}
            <line x1="100" y1="440" x2="1300" y2="440" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="8 4" />

            {/* Automotive Station Planes (STA Lines) */}
            {[180, 280, 380, 480, 580, 680, 780, 880, 980, 1080, 1180, 1260].map((x) => (
              <g key={x}>
                <line x1={x} y1="120" x2={x} y2="470" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="0.8" strokeDasharray="3 4" />
                <text x={x + 3} y="482" fill="rgba(255, 255, 255, 0.45)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  STA {x}
                </text>
              </g>
            ))}

            {/* Waterline Slices (WL 100 - WL 400) */}
            {[190, 250, 310, 370, 430].map((y, idx) => (
              <g key={y}>
                <line x1="120" y1={y} x2="1280" y2={y} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" strokeDasharray="4 6" />
                <text x="125" y={y - 4} fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  WL {400 - idx * 75}
                </text>
              </g>
            ))}

            {/* ================= BENTLEY CONTINENTAL / FLYING SPUR ARCHITECTURAL SILHOUETTE ================= */}
            {/* Iconic Bentley Matrix Grille Prow */}
            <rect x="172" y="275" width="22" height="110" fill="url(#bentley-matrix-hatch-v4)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.2" rx="3" />
            <line x1="183" y1="275" x2="183" y2="385" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.4" />

            {/* Bentley Twin Crystal Jewel Headlamps (Iconic Round Facets) */}
            <circle cx="218" cy="295" r="15" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" />
            <circle cx="218" cy="295" r="10" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" strokeDasharray="2 2" />
            <circle cx="218" cy="295" r="4" fill="rgba(255, 255, 255, 0.7)" />
            <circle cx="248" cy="292" r="10" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.2" />
            <circle cx="248" cy="292" r="3" fill="rgba(255, 255, 255, 0.65)" />

            {/* Signature Bentley "Power Line": arcs aggressively over front wheel and descends through the door */}
            <path
              d="M 194 285 
                 C 230 265, 300 250, 360 250 
                 C 430 250, 520 280, 680 300 
                 L 830 305"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.6"
            />

            {/* Signature Bentley "Rear Haunch Line": muscular swell rising powerfully over rear axle */}
            <path
              d="M 760 310 
                 C 820 270, 900 240, 970 240 
                 C 1060 240, 1140 260, 1220 290 
                 L 1255 310"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.8"
            />

            {/* Main Outer Coachwork Bodyline (Coupe / GT Swept Arc) */}
            <path
              d="M 172 385 
                 L 172 340 
                 C 172 285, 205 270, 240 268 
                 L 490 260 
                 C 530 258, 600 185, 690 152 
                 C 810 115, 960 135, 1060 185 
                 C 1130 220, 1185 260, 1225 278 
                 L 1255 290 
                 C 1270 325, 1265 375, 1255 405 
                 L 1240 415 
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

            {/* Volumetric CAD Surface Mesh Isolines */}
            <path d="M 230 275 C 310 265, 410 258, 490 258" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.9" strokeDasharray="4 3" />
            <path d="M 240 265 C 320 255, 420 248, 500 248" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 870 260 C 930 250, 1000 250, 1070 265" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="4 3" />
            <path d="M 890 275 C 950 268, 1010 268, 1080 282" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Greenhouse Window Aperture */}
            <path
              d="M 525 248 
                 C 580 182, 660 152, 750 145 
                 C 870 135, 970 158, 1035 204 
                 C 1070 228, 1095 255, 1105 268 
                 L 525 248 Z"
              stroke="rgba(255, 255, 255, 0.55)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <line x1="770" y1="145" x2="760" y2="280" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
            <line x1="930" y1="165" x2="920" y2="275" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" strokeDasharray="3 2" />

            {/* Twin Oval Exhaust Tailpipe Cross-Section Wireframe */}
            <ellipse cx="1248" cy="385" rx="10" ry="6" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <ellipse cx="1248" cy="385" rx="6" ry="3.5" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />

            {/* ================= BENTLEY DIRECTIONAL FORGED ALLOY WHEEL ASSEMBLIES ================= */}
            <g transform="translate(330, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="42" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.8" strokeDasharray="2 2" />
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 16;
                const y1 = Math.sin(rad) * 16;
                const x2 = Math.cos(rad + 0.15) * 54;
                const y2 = Math.sin(rad + 0.15) * 54;
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" />
                );
              })}
              <circle cx="0" cy="0" r="16" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.2" fill="rgba(0,0,0,0.6)" />
              <text x="0" y="3.5" textAnchor="middle" fill="rgba(255, 255, 255, 0.9)" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                B
              </text>
            </g>

            <g transform="translate(980, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="4 3" />
              <circle cx="0" cy="0" r="42" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.8" strokeDasharray="2 2" />
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 16;
                const y1 = Math.sin(rad) * 16;
                const x2 = Math.cos(rad + 0.15) * 54;
                const y2 = Math.sin(rad + 0.15) * 54;
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" />
                );
              })}
              <circle cx="0" cy="0" r="16" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.2" fill="rgba(0,0,0,0.6)" />
              <text x="0" y="3.5" textAnchor="middle" fill="rgba(255, 255, 255, 0.9)" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                B
              </text>
            </g>

            {/* Center of Gravity (CG) Technical Balance Datum */}
            <g transform="translate(650, 345)">
              <circle cx="0" cy="0" r="11" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" />
              <path d="M 0 -16 L 0 16 M -16 0 L 16 0" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="rgba(255, 255, 255, 0.9)" />
              <text x="18" y="4" fill="rgba(255, 255, 255, 0.7)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                ⌖ CG / DYNAMIC 48:52 REAR BIAS
              </text>
            </g>

            {/* ================= LATE-STAGE CAD TOOLING RELEASE ANNOTATIONS ================= */}
            <g transform="translate(0, 500)">
              <line x1="330" y1="0" x2="980" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
              <path d="M 330 -5 L 330 5 M 980 -5 L 980 5" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" />
              <path d="M 336 -3 L 330 0 L 336 3 M 974 -3 L 980 0 L 974 3" fill="rgba(255, 255, 255, 0.7)" />
              <text x="655" y="-9" textAnchor="middle" fill="rgba(255, 255, 255, 0.85)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em">
                |← MSB CHASSIS WHEELBASE: 3,194 mm →|
              </text>
            </g>

            <g transform="translate(0, 535)">
              <line x1="172" y1="0" x2="1255" y2="0" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" strokeDasharray="5 3" />
              <path d="M 172 -4 L 172 4 M 1255 -4 L 1255 4" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <text x="715" y="-7" textAnchor="middle" fill="rgba(255, 255, 255, 0.7)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                TOTAL LENGTH OVERALL: 5,316 mm · TRACK WIDTH: 1,671 mm
              </text>
            </g>

            <g transform="translate(110, 0)">
              <line x1="0" y1="130" x2="0" y2="440" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
              <path d="M -4 130 L 4 130 M -4 440 L 4 440" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <text x="-8" y="295" textAnchor="end" fill="rgba(255, 255, 255, 0.65)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em" transform="rotate(-90 -8 295)">
                OVERALL HEIGHT: 1,484 mm
              </text>
            </g>

            <g transform="translate(860, 95)">
              <line x1="0" y1="0" x2="50" y2="-30" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
              <line x1="50" y1="-30" x2="200" y2="-30" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="rgba(255, 255, 255, 0.9)" />
              <text x="55" y="-35" fill="rgba(255, 255, 255, 0.85)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                CLASS-A FASTBACK HAUNCH R: 1,220mm // ZERO-LIFT SPEC
              </text>
            </g>

            <g transform="translate(240, 220)">
              <line x1="0" y1="0" x2="-40" y2="-35" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
              <line x1="-40" y1="-35" x2="-160" y2="-35" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="rgba(255, 255, 255, 0.9)" />
              <text x="-160" y="-40" fill="rgba(255, 255, 255, 0.85)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                MATRIX PROW RAKE 88.5° // DRAG COEFFICIENT Cd: 0.29
              </text>
            </g>

            <g transform="translate(1040, 50)">
              <rect x="0" y="0" width="280" height="58" fill="rgba(0, 0, 0, 0.7)" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.9" rx="4" />
              <text x="14" y="20" fill="rgba(255, 255, 255, 0.95)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="0.14em">
                BENTLEY ADVANCED STYLING STUDIO
              </text>
              <text x="14" y="35" fill="rgba(148, 163, 184, 0.85)" fontSize="8" fontFamily="JetBrains Mono, monospace">
                STAGE 04: PRODUCTION TOOLING RELEASE
              </text>
              <text x="14" y="47" fill="rgba(148, 163, 184, 0.6)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                TORSIONAL RIGIDITY: 34,000 Nm/deg · W12 / V8 HYBRID
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
