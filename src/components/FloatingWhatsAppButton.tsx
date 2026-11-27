import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  isOpen?: boolean;
  unreadCount?: number;
  onToggleChat?: () => void;
  onOpenWhispers?: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  isOpen = false,
  unreadCount = 0,
  onToggleChat,
  onOpenWhispers,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onToggleChat) {
      e.preventDefault();
      onToggleChat();
      return;
    }
    if (onOpenWhispers) {
      e.preventDefault();
      onOpenWhispers();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isOpen ? 'Close live chat' : 'Chat live with Alberka Motors'}
      aria-expanded={isOpen}
      title="Chat live with Alberka Enterprises (0180 423 075)"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-8 right-3.5 sm:right-6 z-40 bg-[#222222] hover:bg-black text-white font-medium px-4 py-2.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.28)] border border-white/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs group"
    >
      <div className="relative flex items-center justify-center">
        {isOpen ? (
          <X className="w-4 h-4 text-white" />
        ) : (
          <MessageCircle className="w-4 h-4 fill-white text-white drop-shadow-sm" />
        )}
        {!isOpen && (
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#222222] ${
              unreadCount > 0 ? 'bg-[#DC2626] animate-pulse' : 'bg-emerald-400'
            }`}
          />
        )}
      </div>
      <span className="text-xs font-semibold tracking-tight text-white drop-shadow-sm">
        {isOpen ? 'Close Chat' : 'Chat Live'}
      </span>
      {!isOpen && unreadCount > 0 && (
        <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold leading-none">
          {unreadCount}
        </span>
      )}
    </button>
  );
};
