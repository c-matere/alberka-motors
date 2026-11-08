import React, { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';

interface ScrollRevealBoxProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 75 | 150 | 225 | 300;
}

export const ScrollRevealBox: React.FC<ScrollRevealBoxProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const delayClass = delay ? `delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${delayClass} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
