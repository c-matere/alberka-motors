import { useState, useEffect, useRef } from 'react';

/**
 * Hook to trigger animation when element scrolls into viewport
 */
export function useScrollReveal(options: { threshold?: number; rootMargin?: string } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not supported, reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.05,
        rootMargin: options.rootMargin ?? '0px 0px 50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

/**
 * Hook to smoothly animate a number upwards/downwards to a target value
 */
export function useAnimatedNumber(target: number, duration: number = 300) {
  const [current, setCurrent] = useState(target);
  const startRef = useRef(target);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = current;
    startTimeRef.current = null;

    let animId: number;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Apple ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextVal = Math.round(startRef.current + (target - startRef.current) * ease);

      setCurrent(nextVal);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [target, duration]);

  return current;
}
