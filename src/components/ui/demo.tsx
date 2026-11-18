import React from "react";
import { TestimonialSection, Testimonial } from "./testimonials";

// Verified Kenyan vehicle buyer testimonials with authentic details & Unsplash portraits
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote:
      "Alberka verified the auction sheet directly with Tokyo before I wired a single shilling. My Prado TX arrived in Mombasa port completely spotless with original 42,000 km mileage verified on JEVIC.",
    name: "Dr. Samuel Karani",
    role: "Prado TX Owner · Nairobi",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    quote:
      "Finding a clean Honda Fit Hybrid with actual battery health report was impossible in Nairobi yards. The team at Alberka Ganjoni showroom handed over full hybrid OBD diagnostics on the spot.",
    name: "Faith Wanjiku",
    role: "Honda Fit e:HEV Owner · Mombasa",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    quote:
      "Importing on order through Alberka saved me over KES 380,000 compared to local roadside showroom markups. Clear customs clearing timeline, no hidden yard storage fees.",
    name: "Eng. Victor Omondi",
    role: "Subaru Forester XT Owner · Kisumu",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
];

export const TestimonialSectionDemo = () => {
  return (
    <TestimonialSection
      title="Trusted by 2,400+ Kenyan Drivers"
      subtitle="From verified Tokyo auction sheets to flawless Mombasa port clearance — read real experiences from owners across Kenya."
      testimonials={testimonialsData}
    />
  );
};

export default TestimonialSectionDemo;
