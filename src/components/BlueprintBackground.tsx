import React, { useEffect, useState } from 'react';

export const BlueprintBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [scrollFactor, setScrollFactor] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [cycleTime, setCycleTime] = useState(0);

  // 50-Second Total Architectural Drafting Cycle:
  // 0s - 32s (0% - 64%): Slow, deliberate, artistic real-time drawing & typing
  // 32s - 40s (64% - 80%): Complete Stage 05 blueprint showcase hold
  // 40s - 50s (80% - 100%): Slow, gentle, cinematic 10-second dissolve/erase
  const CYCLE_DURATION = 50000;

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
    }

    // Dynamic scroll observer: Dim above the fold so video has total focus,
    // brightening smoothly as user scrolls down into inventory & sections.
    let ticking = false;
    const updateScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
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

    // Damped mouse follow for desktop specular spotlight
    let mouseAnimFrameId: number;
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
      mouseAnimFrameId = requestAnimationFrame(updatePosition);
    };

    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      mouseAnimFrameId = requestAnimationFrame(updatePosition);
    }

    // Real-Time Drafting & Typing Animation Clock (requestAnimationFrame loop)
    let cycleAnimFrameId: number;
    let startTime = performance.now();

    const tickCycle = (now: number) => {
      const elapsed = (now - startTime) % CYCLE_DURATION;
      setCycleTime(elapsed);
      cycleAnimFrameId = requestAnimationFrame(tickCycle);
    };

    cycleAnimFrameId = requestAnimationFrame(tickCycle);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseAnimFrameId) cancelAnimationFrame(mouseAnimFrameId);
      if (cycleAnimFrameId) cancelAnimationFrame(cycleAnimFrameId);
    };
  }, []);

  // Helper to compute typed character count with measured architectural typing cadence
  const getTyped = (fullText: string, startMs: number, speedMsPerChar: number = 55) => {
    if (cycleTime < startMs) {
      return { text: '', isTyping: false, isDone: false };
    }
    const count = Math.min(fullText.length, Math.floor((cycleTime - startMs) / speedMsPerChar));
    const isTyping = count < fullText.length;
    const isDone = count >= fullText.length;
    return {
      text: fullText.slice(0, count),
      isTyping,
      isDone,
    };
  };

  // Slow, deliberate character-by-character typed part labels
  const studioTitle = getTyped('BENTLEY ADVANCED STYLING STUDIO // CREWE', 1500, 55);
  const stageRelease = getTyped('STAGE 05: PRE-SERIES SURFACE MASTER', 4200, 50);
  const powertrain = getTyped('POWERTRAIN: 6.0L TWIN-TURBO W12 · 650 PS / 900 Nm', 7200, 48);
  const suspension = getTyped('CHASSIS: 48V ACTIVE ROLL CONTROL // EWLS AIR', 10500, 50);
  
  const prowSpec = getTyped('MATRIX PROW RAKE 88.5° // DRAG COEFFICIENT Cd: 0.29', 14000, 48);
  const haunchSpec = getTyped('CLASS-A FASTBACK HAUNCH R: 1,220mm // ZERO-LIFT SPEC', 17000, 48);
  const cgSpec = getTyped('⌖ CG / DYNAMIC 48:52 REAR BIAS', 20000, 52);
  const wheelbase = getTyped('|← MSB CHASSIS WHEELBASE: 3,194 mm →|', 23000, 48);
  const totalLength = getTyped('TOTAL LENGTH: 5,316 mm · TRACK WIDTH: 1,671 mm', 26000, 48);
  const roofHeight = getTyped('OVERALL ROOF HEIGHT: 1,484 mm', 28500, 52);
  const activeAero = getTyped('ACTIVE SPOILER: 4-STAGE DEPLOYMENT [32° DRAG REDUCTION]', 29500, 46);
  const brakeSpec = getTyped('BRAKES: 420mm CSiC 10-PISTON MONOBLOC CALIPERS', 31500, 46);

  // Slow Erase Opacity for Labels: Fades out gently over 9 full seconds between 40s and 49s
  const labelEraseOpacity = cycleTime >= 40000
    ? Math.max(0, 1 - (cycleTime - 40000) / 9000)
    : 1;

  // Dynamic Opacity Computations (Dim above the fold; brightening on scroll)
  const gridOpacity = 0.06 + scrollFactor * 0.44; // 0.06 (dim) -> 0.50 (crisp CAD)
  const carOpacity = (0.02 + scrollFactor * 0.32) * labelEraseOpacity; // Modulates with slow dissolve
  const softboxOpacity = 0.3 + scrollFactor * 0.45;
  const midGlowOpacity = 0.08 + scrollFactor * 0.24;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#09090c]"
    >
      {/* 50-Second Master Architectural CAD Keyframes: Slow Drawing & Slow Erasing */}
      <style>{`
        /* Ground Plane & Station Planes */
        @keyframes cadDrawGround {
          0% { stroke-dashoffset: 1400; opacity: 0; }
          2% { opacity: 0.85; }
          12% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1400; opacity: 0; }
        }

        /* Main Coachwork Bodyline & Fastback Arc (Slow, deliberate 14-second stroke) */
        @keyframes cadDrawBody {
          0%, 6% { stroke-dashoffset: 3400; opacity: 0; }
          8% { opacity: 0.95; }
          36% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 3400; opacity: 0; }
        }

        /* Bentley Signature Power Line (Slow 10-second arc) */
        @keyframes cadDrawPowerLine {
          0%, 20% { stroke-dashoffset: 1000; opacity: 0; }
          22% { opacity: 0.95; }
          42% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1000; opacity: 0; }
        }

        /* Muscular Rear Haunch Line */
        @keyframes cadDrawHaunch {
          0%, 26% { stroke-dashoffset: 900; opacity: 0; }
          28% { opacity: 0.95; }
          46% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 900; opacity: 0; }
        }

        /* Greenhouse Window Aperture & Headrests */
        @keyframes cadDrawGreenhouse {
          0%, 30% { stroke-dashoffset: 1800; opacity: 0; }
          32% { opacity: 0.85; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1800; opacity: 0; }
        }

        /* Crystal Jewel Headlamps & Matrix Radiator Grille */
        @keyframes cadDrawJewels {
          0%, 34% { stroke-dashoffset: 600; opacity: 0; }
          36% { opacity: 0.9; }
          54% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 600; opacity: 0; }
        }

        /* 22" Mulliner Directional Turbine Wheels */
        @keyframes cadDrawWheels {
          0%, 38% { stroke-dashoffset: 800; opacity: 0; }
          40% { opacity: 1; }
          58% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 800; opacity: 0; }
        }

        /* Carbon-Ceramic Brakes & 10-Piston Monobloc Calipers */
        @keyframes cadDrawBrakes {
          0%, 46% { stroke-dashoffset: 500; opacity: 0; }
          48% { opacity: 0.85; }
          62% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 500; opacity: 0; }
        }

        /* Active Aerodynamic Spoiler & Diffuser */
        @keyframes cadDrawAero {
          0%, 50% { stroke-dashoffset: 900; opacity: 0; }
          52% { opacity: 0.85; }
          65% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 900; opacity: 0; }
        }

        /* Dimension Datum Arrows & Tolerances */
        @keyframes cadDrawDimensions {
          0%, 54% { stroke-dashoffset: 1200; opacity: 0; }
          56% { opacity: 0.85; }
          68% { stroke-dashoffset: 0; opacity: 1; }
          80% { stroke-dashoffset: 0; opacity: 1; }
          98% { opacity: 0; stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1200; opacity: 0; }
        }

        /* Slow, Graceful Digital Drafting Laser Stylus Crosshair Sweep */
        @keyframes cadLaserSweep {
          0%, 6% { transform: translate(172px, 385px); opacity: 0; }
          8% { opacity: 1; }
          11% { transform: translate(172px, 340px); }
          15% { transform: translate(240px, 268px); }
          21% { transform: translate(490px, 260px); }
          27% { transform: translate(690px, 152px); }
          31% { transform: translate(1060px, 185px); }
          34% { transform: translate(1255px, 290px); }
          36% { transform: translate(1255px, 405px); opacity: 1; }
          37% { opacity: 0; }
          100% { transform: translate(1255px, 405px); opacity: 0; }
        }
      `}</style>

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

      {/* 2. Interactive Specular Inspection Spotlight (Desktop Only) */}
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
              id="blueprint-grid-minor-v6"
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
              id="blueprint-grid-major-v6"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="url(#blueprint-grid-minor-v6)" />
              
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
            <radialGradient id="grid-fade-mask-v6" cx="50%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1.0" />
              <stop offset="55%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
            </radialGradient>

            <mask id="grid-mask-v6">
              <rect width="100%" height="100%" fill="url(#grid-fade-mask-v6)" />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#blueprint-grid-major-v6)"
            mask="url(#grid-mask-v6)"
          />
        </svg>
      </div>

      {/* 4. ADVANCED LATE-STAGE BENTLEY ARCHITECTURAL CAD SCHEMATIC (STAGE 05: PRE-SERIES SURFACE MASTER) */}
      {/* Slower Real-time Drawing & Slower Gentle 10-Second Dissolve/Erase */}
      <div 
        className="absolute top-12 sm:top-20 left-1/2 -translate-x-1/2 w-[1480px] max-w-[96vw] h-[640px] pointer-events-none select-none transition-opacity duration-500 ease-out"
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
            <pattern id="bentley-matrix-hatch-v6" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="7" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.8" />
            </pattern>

            {/* Radial Fade Scrim */}
            <radialGradient id="bentley-fade-v6" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="65%" stopColor="#fff" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="bentley-mask-v6">
              <rect width="1400" height="620" fill="url(#bentley-fade-v6)" />
            </mask>
          </defs>

          <g mask="url(#bentley-mask-v6)">
            {/* ================= STAGE 01: GROUND PLANE & AUTOMOTIVE STATION LINES ================= */}
            <line
              x1="100" y1="440" x2="1300" y2="440"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="1400"
              style={{ animation: 'cadDrawGround 50s ease-in-out infinite' }}
            />

            {/* Automotive Station Planes (STA Lines) */}
            {[180, 280, 380, 480, 580, 680, 780, 880, 980, 1080, 1180, 1260].map((x) => (
              <g key={x}>
                <line
                  x1={x} y1="110" x2={x} y2="470"
                  stroke="rgba(255, 255, 255, 0.16)"
                  strokeWidth="0.8"
                  strokeDasharray="600"
                  style={{ animation: 'cadDrawGround 50s ease-in-out infinite' }}
                />
                <text x={x + 3} y="482" fill="rgba(255, 255, 255, 0.45)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  STA {x}
                </text>
              </g>
            ))}

            {/* Waterline Slices (WL 100 - WL 400) */}
            {[190, 250, 310, 370, 430].map((y, idx) => (
              <g key={y}>
                <line
                  x1="120" y1={y} x2="1280" y2={y}
                  stroke="rgba(255, 255, 255, 0.14)"
                  strokeWidth="0.8"
                  strokeDasharray="1200"
                  style={{ animation: 'cadDrawGround 50s ease-in-out infinite' }}
                />
                <text x="125" y={y - 4} fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="JetBrains Mono, monospace">
                  WL {400 - idx * 75}
                </text>
              </g>
            ))}

            {/* ================= STAGE 02: MAIN COACHWORK SILHOUETTE (SLOW REAL-TIME DRAWING) ================= */}
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
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2.0"
              strokeDasharray="3400"
              style={{ animation: 'cadDrawBody 50s ease-in-out infinite' }}
            />

            {/* Digital Laser Stylus Plotter Head (Slowly and gracefully traces the car contour) */}
            <g style={{ animation: 'cadLaserSweep 50s cubic-bezier(0.25, 1, 0.5, 1) infinite' }}>
              <circle cx="0" cy="0" r="3.5" fill="#38bdf8" />
              <circle cx="0" cy="0" r="8" stroke="#38bdf8" strokeWidth="0.9" strokeDasharray="3 2" className="animate-spin" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="rgba(56, 189, 248, 0.9)" strokeWidth="0.8" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(56, 189, 248, 0.9)" strokeWidth="0.8" />
            </g>

            {/* Flying "B" Mascot & Bonnet Spine Datum */}
            <line
              x1="240" y1="268" x2="490" y2="260"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.2"
              strokeDasharray="300"
              style={{ animation: 'cadDrawBody 50s ease-in-out infinite' }}
            />
            {/* Hood Emblem Mascot Retractable Crosshair */}
            <g transform="translate(198, 275)">
              <circle cx="0" cy="0" r="4.5" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" />
              <path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.8" />
            </g>

            {/* ================= STAGE 03: SIGNATURE BENTLEY POWER LINE & REAR HAUNCH ================= */}
            <path
              d="M 194 285 
                 C 230 265, 300 250, 360 250 
                 C 430 250, 520 280, 680 300 
                 L 830 305"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="1.8"
              strokeDasharray="1000"
              style={{ animation: 'cadDrawPowerLine 50s ease-in-out infinite' }}
            />

            <path
              d="M 760 310 
                 C 820 270, 900 240, 970 240 
                 C 1060 240, 1140 260, 1220 290 
                 L 1255 310"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="2.0"
              strokeDasharray="900"
              style={{ animation: 'cadDrawHaunch 50s ease-in-out infinite' }}
            />

            {/* Razor-sharp Waistline / Shoulder Tornado Line */}
            <line
              x1="245" y1="285" x2="1220" y2="288"
              stroke="rgba(255, 255, 255, 0.55)"
              strokeWidth="0.9"
              strokeDasharray="1000"
              style={{ animation: 'cadDrawPowerLine 50s ease-in-out infinite' }}
            />

            {/* ================= STAGE 04: FRONT FASCIA, JEWEL OPTICS & MATRIX PROW ================= */}
            <rect
              x="172" y="275" width="22" height="110"
              fill="url(#bentley-matrix-hatch-v6)"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.4"
              rx="3"
              strokeDasharray="400"
              style={{ animation: 'cadDrawJewels 50s ease-in-out infinite' }}
            />
            <line
              x1="183" y1="275" x2="183" y2="385"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="1.6"
              strokeDasharray="200"
              style={{ animation: 'cadDrawJewels 50s ease-in-out infinite' }}
            />

            {/* Lower Bumper Matrix Splitter & Aero Air Curtain Inlets */}
            <rect
              x="174" y="392" width="65" height="18"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.1"
              rx="2"
              strokeDasharray="200"
              style={{ animation: 'cadDrawJewels 50s ease-in-out infinite' }}
            />
            <line x1="168" y1="412" x2="250" y2="412" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.4" />
            <line x1="256" y1="365" x2="256" y2="400" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" strokeDasharray="2 2" />

            {/* Bentley Twin Crystal Jewel Headlamps (Diamond-Cut Matrix Rings) */}
            <g style={{ animation: 'cadDrawJewels 50s ease-in-out infinite' }}>
              <circle cx="218" cy="295" r="15" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.5" strokeDasharray="200" />
              <circle cx="218" cy="295" r="10" stroke="rgba(255, 255, 255, 0.65)" strokeWidth="1.0" strokeDasharray="3 3" />
              <circle cx="218" cy="295" r="4.5" fill="rgba(255, 255, 255, 0.85)" />
              
              <circle cx="248" cy="292" r="10" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.3" strokeDasharray="150" />
              <circle cx="248" cy="292" r="3.5" fill="rgba(255, 255, 255, 0.75)" />
            </g>

            {/* ================= STAGE 05: GREENHOUSE, WINDOWS & INTERIOR ERGONOMIC CONTOUR ================= */}
            <path
              d="M 525 248 
                 C 580 182, 660 152, 750 145 
                 C 870 135, 970 158, 1035 204 
                 C 1070 228, 1095 255, 1105 268 
                 L 525 248 Z"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.4"
              strokeDasharray="1800"
              style={{ animation: 'cadDrawGreenhouse 50s ease-in-out infinite' }}
            />
            <line x1="770" y1="145" x2="760" y2="280" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.4" />
            <line x1="930" y1="165" x2="920" y2="275" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeDasharray="4 3" />
            
            {/* Interior Mulliner Fluted Headrest Silhouettes */}
            <path d="M 670 200 C 665 185, 685 185, 680 200 Z" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" />
            <path d="M 850 205 C 845 192, 863 192, 858 205 Z" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />

            {/* Flush Door Handle with Sensor Touch Mark */}
            <rect x="580" y="292" width="28" height="6" rx="3" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1" />
            <circle cx="586" cy="295" r="1.2" fill="rgba(255, 255, 255, 0.9)" />

            {/* Door Cutlines */}
            <line x1="510" y1="260" x2="480" y2="415" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" strokeDasharray="4 3" />
            <line x1="775" y1="290" x2="760" y2="415" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" strokeDasharray="4 3" />

            {/* ================= STAGE 06: ACTIVE AERODYNAMICS, DIFFUSER & EXHAUST ================= */}
            <g style={{ animation: 'cadDrawAero 50s ease-in-out infinite' }}>
              <path
                d="M 1190 270 C 1225 240, 1260 235, 1290 245"
                stroke="rgba(56, 189, 248, 0.85)"
                strokeWidth="1.4"
                strokeDasharray="400"
              />
              <path
                d="M 1240 250 L 1240 270 M 1270 245 L 1265 280"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="0.9"
                strokeDasharray="2 2"
              />
              <path d="M 1290 245 C 1315 250, 1340 270, 1360 280" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" strokeDasharray="3 3" />
            </g>

            {/* Rear Diffuser Underbody Strakes */}
            <line x1="1200" y1="415" x2="1245" y2="410" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <line x1="1215" y1="415" x2="1215" y2="425" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
            <line x1="1235" y1="412" x2="1235" y2="423" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />

            {/* Twin Elliptical Oval Tailpipes */}
            <ellipse cx="1248" cy="385" rx="11" ry="6.5" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" strokeDasharray="100" style={{ animation: 'cadDrawAero 50s ease-in-out infinite' }} />
            <ellipse cx="1248" cy="385" rx="7" ry="4" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" />

            {/* ================= STAGE 07: 22" MULLINER TURBINE WHEELS & 10-PISTON BRAKES ================= */}
            {/* FRONT WHEEL ASSEMBLY (STA 330) */}
            <g transform="translate(330, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.8" strokeDasharray="600" style={{ animation: 'cadDrawWheels 50s ease-in-out infinite' }} />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.9" strokeDasharray="4 3" />
              
              {/* 420mm Cross-Drilled Carbon-Silicon Carbide (CSiC) Rotor */}
              <circle cx="0" cy="0" r="46" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.9" strokeDasharray="200" style={{ animation: 'cadDrawBrakes 50s ease-in-out infinite' }} />
              {[15, 60, 105, 150, 195, 240, 285, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={Math.cos((deg * Math.PI) / 180) * 38}
                  cy={Math.sin((deg * Math.PI) / 180) * 38}
                  r="1.2"
                  fill="rgba(255, 255, 255, 0.6)"
                />
              ))}

              {/* Front 10-Piston Caliper Wireframe */}
              <path
                d="M -35 -30 C -42 -15, -42 15, -35 30 L -22 24 C -28 12, -28 -12, -22 -24 Z"
                fill="rgba(0, 0, 0, 0.5)"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.2"
                style={{ animation: 'cadDrawBrakes 50s ease-in-out infinite' }}
              />

              {/* Directional Turbine Alloy Spokes */}
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 16;
                const y1 = Math.sin(rad) * 16;
                const x2 = Math.cos(rad + 0.16) * 54;
                const y2 = Math.sin(rad + 0.16) * 54;
                return (
                  <line
                    key={deg}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="1.1"
                    strokeDasharray="100"
                    style={{ animation: 'cadDrawWheels 50s ease-in-out infinite' }}
                  />
                );
              })}
              
              <circle cx="0" cy="0" r="16" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" fill="rgba(0,0,0,0.7)" />
              <text x="0" y="3.5" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                B
              </text>
            </g>

            {/* REAR WHEEL ASSEMBLY (STA 980) */}
            <g transform="translate(980, 415)">
              <circle cx="0" cy="0" r="70" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.8" strokeDasharray="600" style={{ animation: 'cadDrawWheels 50s ease-in-out infinite' }} />
              <circle cx="0" cy="0" r="54" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.9" strokeDasharray="4 3" />
              
              <circle cx="0" cy="0" r="44" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.9" strokeDasharray="200" style={{ animation: 'cadDrawBrakes 50s ease-in-out infinite' }} />
              <path
                d="M -32 -22 C -38 -10, -38 10, -32 22 L -22 17 C -26 8, -26 -8, -22 -17 Z"
                fill="rgba(0, 0, 0, 0.5)"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.1"
                style={{ animation: 'cadDrawBrakes 50s ease-in-out infinite' }}
              />

              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = Math.cos(rad) * 16;
                const y1 = Math.sin(rad) * 16;
                const x2 = Math.cos(rad + 0.16) * 54;
                const y2 = Math.sin(rad + 0.16) * 54;
                return (
                  <line
                    key={deg}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="1.1"
                    strokeDasharray="100"
                    style={{ animation: 'cadDrawWheels 50s ease-in-out infinite' }}
                  />
                );
              })}
              <circle cx="0" cy="0" r="16" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" fill="rgba(0,0,0,0.7)" />
              <text x="0" y="3.5" textAnchor="middle" fill="rgba(255, 255, 255, 0.95)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
                B
              </text>
            </g>

            {/* Center of Gravity (CG) Technical Balance Datum */}
            <g transform="translate(650, 345)">
              <circle cx="0" cy="0" r="11" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.1" />
              <path d="M 0 -16 L 0 16 M -16 0 L 16 0" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#38bdf8" />
              <text x="18" y="4" fill="rgba(255, 255, 255, 0.85)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                {cgSpec.text}
                {cgSpec.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* ================= STAGE 08: REAL-TIME TYPED CAD CALLOUTS & TELEMETRY ================= */}
            {/* Wheelbase Dimension Line */}
            <g transform="translate(0, 500)">
              <line x1="330" y1="0" x2="980" y2="0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeDasharray="1000" style={{ animation: 'cadDrawDimensions 50s ease-in-out infinite' }} />
              <path d="M 330 -5 L 330 5 M 980 -5 L 980 5" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.2" />
              <path d="M 336 -3 L 330 0 L 336 3 M 974 -3 L 980 0 L 974 3" fill="rgba(255, 255, 255, 0.7)" />
              <text x="655" y="-9" textAnchor="middle" fill="rgba(255, 255, 255, 0.9)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.16em">
                {wheelbase.text}
                {wheelbase.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Total Length & Track */}
            <g transform="translate(0, 535)">
              <line x1="172" y1="0" x2="1255" y2="0" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" strokeDasharray="5 3" />
              <path d="M 172 -4 L 172 4 M 1255 -4 L 1255 4" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <text x="715" y="-7" textAnchor="middle" fill="rgba(255, 255, 255, 0.75)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
                {totalLength.text}
                {totalLength.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Overall Height Callout */}
            <g transform="translate(110, 0)">
              <line x1="0" y1="130" x2="0" y2="440" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
              <path d="M -4 130 L 4 130 M -4 440 L 4 440" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
              <text x="-8" y="295" textAnchor="end" fill="rgba(255, 255, 255, 0.75)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em" transform="rotate(-90 -8 295)">
                {roofHeight.text}
                {roofHeight.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Fastback Haunch Aerodynamic Spec (Top Right Callout) */}
            <g transform="translate(860, 95)">
              <line x1="0" y1="0" x2="50" y2="-30" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" />
              <line x1="50" y1="-30" x2="220" y2="-30" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="2.8" fill="#38bdf8" />
              <text x="55" y="-35" fill="rgba(255, 255, 255, 0.9)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                {haunchSpec.text}
                {haunchSpec.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Matrix Prow Rake Spec (Front Left Callout) */}
            <g transform="translate(240, 220)">
              <line x1="0" y1="0" x2="-40" y2="-35" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" />
              <line x1="-40" y1="-35" x2="-180" y2="-35" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="2.8" fill="#38bdf8" />
              <text x="-180" y="-40" fill="rgba(255, 255, 255, 0.9)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.12em">
                {prowSpec.text}
                {prowSpec.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Active Aero Callout (Rear Decklid) */}
            <g transform="translate(1190, 260)">
              <line x1="0" y1="0" x2="40" y2="-40" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="0.9" />
              <line x1="40" y1="-40" x2="160" y2="-40" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
              <text x="45" y="-46" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                {activeAero.text}
                {activeAero.isTyping && <tspan fill="#ffffff">_</tspan>}
              </text>
            </g>

            {/* Brake Rotor Callout */}
            <g transform="translate(380, 470)">
              <line x1="0" y1="0" x2="30" y2="35" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <line x1="30" y1="35" x2="160" y2="35" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
              <text x="35" y="31" fill="rgba(255, 255, 255, 0.8)" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
                {brakeSpec.text}
                {brakeSpec.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>
            </g>

            {/* Studio Release Terminal Block (Top Right) */}
            <g transform="translate(1040, 42)">
              <rect x="0" y="0" width="310" height="74" fill="rgba(0, 0, 0, 0.75)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.1" rx="4" />
              <circle cx="12" cy="16" r="3" fill="#22c55e" className="animate-pulse" />
              
              <text x="24" y="19" fill="rgba(255, 255, 255, 0.95)" fontSize="9.5" fontFamily="JetBrains Mono, monospace" fontWeight="600" letterSpacing="0.14em">
                {studioTitle.text}
                {studioTitle.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>

              <text x="24" y="34" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="500">
                {stageRelease.text}
                {stageRelease.isTyping && <tspan fill="#ffffff">_</tspan>}
              </text>

              <text x="24" y="47" fill="rgba(148, 163, 184, 0.9)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                {powertrain.text}
                {powertrain.isTyping && <tspan fill="#38bdf8">_</tspan>}
              </text>

              <text x="24" y="60" fill="rgba(148, 163, 184, 0.75)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                {suspension.text}
                {suspension.isTyping && <tspan fill="#38bdf8">_</tspan>}
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
