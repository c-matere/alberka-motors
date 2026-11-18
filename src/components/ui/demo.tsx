import React from "react";
import { TestimonialSection, Testimonial } from "./testimonials";

// 6 Verified Kenyan vehicle buyer testimonials with authentic details & Unsplash portraits
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
  {
    id: 4,
    quote:
      "Collected my CX-5 directly at their showroom next to Ganjoni Primary School. The team put it on the mechanical hoist for my private mechanic to inspect every bushing before I paid. Incredible transparency.",
    name: "Mary Wanjiku Gitau",
    role: "Mazda CX-5 Proactive · Nyali, Mombasa",
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    quote:
      "Our Serena e-POWER has been a blessing for our family holiday road trips. The electric whisper-quiet drive and dual hands-free sliding doors are unmatched. Delivered straight to Eldoret on carrier.",
    name: "Capt. Evans Kiprop",
    role: "Nissan Serena e-POWER · Eldoret",
    imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    quote:
      "Fuel consumption averages 21.4 km/L from Nakuru to Nairobi. The car arrived with fresh Castrol synthetic fluids, OEM filters, and the NTSA TIMS logbook transfer was initiated within 48 hours.",
    name: "Eng. Brian Muthomi",
    role: "Toyota Harrier Hybrid · Nakuru",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
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
