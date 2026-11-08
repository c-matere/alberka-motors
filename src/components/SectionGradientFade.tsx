import React from 'react';

interface SectionGradientFadeProps {
  className?: string;
}

/**
 * Atmospheric gradient transition divider between sections.
 * Replaces harsh solid border lines with a graceful fade into obsidian black (#09090c)
 * with a center-luminous hairline gradient feather.
 */
export const SectionGradientFade: React.FC<SectionGradientFadeProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full py-6 sm:py-10 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}
    >
      {/* Center-feathering hairline light bar fading smoothly into transparency */}
      <div className="w-full max-w-[1240px] px-6 sm:px-10 relative z-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
    </div>
  );
};
