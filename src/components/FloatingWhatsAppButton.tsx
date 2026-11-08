import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  onOpenWhispers?: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ onOpenWhispers }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onOpenWhispers) {
      e.preventDefault();
      onOpenWhispers();
    }
  };

  return (
    <a
      href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20vehicles%20in%20your%20inventory."
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat with Alberka Motors on WhatsApp (0714 333 888)"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-8 right-3.5 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-zinc-950 font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.35)] flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs group"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-4 h-4 fill-zinc-950 text-zinc-950" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
      </div>
      <span className="text-xs font-bold tracking-tight">WhatsApp Us</span>
    </a>
  );
};
