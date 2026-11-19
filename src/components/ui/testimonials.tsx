import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// TypeScript interface for a single testimonial object
export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

// TypeScript interface for the component's props
export interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

/**
 * A responsive auto-scrolling testimonial marquee section.
 * Features a single-row infinite track scrolling smoothly from right to left.
 * Retains an authentic light background canvas per user requirements.
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the 6 cards so the right-to-left marquee loops infinitely with zero stutter
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-24 border-t border-zinc-200 overflow-hidden relative">
      <div className="container mx-auto max-w-6xl px-4 text-center mb-10 sm:mb-14">
        {/* Section Header */}
        <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-2">
          CLIENT EXPERIENCES · ALBERKA ENTERPRISES LIMITED
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-600">
          {subtitle}
        </p>
      </div>

      {/* Single-Row Auto-Scrolling Marquee Track (Right to Left) */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Ambient Vignette Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10" />

        <motion.div
          className="flex gap-6 w-max px-4"
          animate={{
            x: isPaused ? undefined : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 36,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="relative w-[310px] sm:w-[380px] shrink-0 overflow-hidden rounded-2xl bg-white border border-zinc-200/90 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 group text-left select-none"
            >
              <div className="relative h-96 sm:h-[420px] w-full overflow-hidden bg-zinc-100">
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-full w-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
              </div>

              {/* Content within the card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white pointer-events-none">
                <Quote
                  className="mb-3 h-7 w-7 text-white/50"
                  aria-hidden="true"
                />
                <blockquote className="text-sm sm:text-[15px] font-medium leading-relaxed text-white drop-shadow-sm">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 pt-3 border-t border-white/20">
                  <p className="font-semibold text-white text-sm">
                    {testimonial.name}
                    <span className="ml-1.5 text-zinc-300 font-normal">
                      · {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Interaction Hint */}
      <div className="mt-6 text-center">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          Auto-scrolling single row · Hover or touch to pause
        </span>
      </div>
    </section>
  );
};

export default TestimonialSection;
