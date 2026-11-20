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
      href={`https://wa.me/254180423075?text=${encodeURIComponent('Hello Alberka Enterprises, I am inquiring about vehicles at your showroom next to Ganjoni Primary School, Mombasa.')}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat with Alberka Enterprises on WhatsApp (0180 423 075)"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-8 right-3.5 sm:right-6 z-40 bg-[#222222] hover:bg-black text-white font-medium px-4 py-2.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.25)] border border-black/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs group"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-4 h-4 fill-white text-white drop-shadow-sm" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
      </div>
      <span className="text-xs font-semibold tracking-tight text-white drop-shadow-sm">WhatsApp Us</span>
    </a>
  );
};
