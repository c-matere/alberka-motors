import React, { useMemo } from 'react';

interface StarlightCanopyProps {
  density?: number;
  className?: string;
}

export const StarlightCanopy: React.FC<StarlightCanopyProps> = ({
  density = 45,
  className = '',
}) => {
  // Generate deterministic subtle star points
  const stars = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const top = ((i * 37) % 100);
      const left = ((i * 73 + 13) % 100);
      const size = (i % 3 === 0) ? 2 : 1.5;
      const opacity = 0.25 + ((i % 5) * 0.15);
      const duration = 3 + (i % 4) * 2;
      const delay = (i % 7) * 0.8;

      return {
        id: i,
        top: `${top}%`,
        left: `${left}%`,
        size,
        opacity,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      };
    });
  }, [density]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-[#dfc7a5] rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            boxShadow: star.size > 1.8 ? '0 0 4px rgba(223, 199, 165, 0.6)' : 'none',
          }}
        />
      ))}
    </div>
  );
};
