import React from "react";
import { motion, type Variants } from "framer-motion";
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
 * A responsive section component to display customer testimonials.
 * It features a title, subtitle, and a grid of animated testimonial cards.
 * Retains an authentic light background canvas per user requirements.
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  // Animation variants for the container to orchestrate staggered children animations
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each testimonial card
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-24 border-t border-zinc-200">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-2">
          CLIENT EXPERIENCES · ALBERKA MOTORS
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-zinc-600">
          {subtitle}
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 group text-left"
              variants={itemVariants}
            >
              <div className="relative">
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-96 sm:h-104 w-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
              </div>

              {/* Content within the card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white pointer-events-none">
                <Quote
                  className="mb-3 h-7 w-7 text-white/50"
                  aria-hidden="true"
                />
                <blockquote className="text-sm sm:text-base font-medium leading-relaxed text-white">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 pt-3 border-t border-white/20">
                  <p className="font-semibold text-white text-sm">
                    {testimonial.name}
                    <span className="ml-1.5 text-white/80 font-normal">
                      · {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default TestimonialSection;
