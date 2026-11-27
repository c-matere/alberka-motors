import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Send,
  MessageCircle,
  ExternalLink,
  Car,
  User,
  CheckCheck,
  Sparkles,
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';

export interface ChatMessageItem {
  id: string | number;
  sessionId: string;
  sender: 'visitor' | 'agent' | 'system';
  senderName?: string;
  visitorPhone?: string;
  vehicleName?: string;
  body: string;
  createdAt: string;
  pending?: boolean;
}

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle?: Vehicle | null;
  onUnreadChange?: (count: number) => void;
}

const SESSION_KEY = 'alberka_chat_session_id';
const NAME_KEY = 'alberka_chat_visitor_name';
const PHONE_KEY = 'alberka_chat_visitor_phone';
const LAST_READ_KEY = 'alberka_chat_last_read_count';

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'ssr-session';
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const fresh =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `alb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  window.localStorage.setItem(SESSION_KEY, fresh);
  return fresh;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onClose,
  selectedVehicle,
  onUnreadChange,
}) => {
  const [sessionId] = useState<string>(() => getOrCreateSessionId());
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState<string>(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(NAME_KEY) || '' : ''
  );
  const [visitorPhone, setVisitorPhone] = useState<string>(() =>
    typeof window !== 'undefined' ? window.localStorage.getItem(PHONE_KEY) || '' : ''
  );
  const [showProfileForm, setShowProfileForm] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeVehicleLabel = useMemo(() => {
    if (!selectedVehicle) return '';
    const price = selectedVehicle.priceKes
      ? ` • KES ${selectedVehicle.priceKes.toLocaleString()}`
      : '';
    return `${selectedVehicle.year} ${selectedVehicle.name}${price}`;
  }, [selectedVehicle]);

  const quickPrompts = useMemo(() => {
    if (selectedVehicle) {
      return [
        `Is the ${selectedVehicle.year} ${selectedVehicle.name} still available?`,
        `Can you send the Japanese auction sheet for this car?`,
        `I'd like to book a viewing at your Mombasa showroom`,
      ];
    }
    return [
      'What SUVs do you currently have in stock?',
      'Can I book a viewing at your Mombasa showroom?',
      'How does a Custom Japan Auction Order work?',
    ];
  }, [selectedVehicle]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/chat-messages?where[sessionId][equals]=${encodeURIComponent(
          sessionId
        )}&sort=createdAt&limit=100`,
        { cache: 'no-store' }
      );
      if (!res.ok) return;
      const json = await res.json();
      const docs: ChatMessageItem[] = Array.isArray(json?.docs) ? json.docs : [];
      setMessages(docs);

      const agentCount = docs.filter((m) => m.sender === 'agent').length;
      if (isOpen) {
        window.localStorage.setItem(LAST_READ_KEY, String(agentCount));
        onUnreadChange?.(0);
      } else {
        const lastRead = Number(window.localStorage.getItem(LAST_READ_KEY) || '0');
        onUnreadChange?.(Math.max(0, agentCount - lastRead));
      }
    } catch {
      // Silent retry on next poll interval
    }
  }, [isOpen, onUnreadChange, sessionId]);

  useEffect(() => {
    fetchMessages();
    const intervalMs = isOpen ? 3000 : 12000;
    const timer = window.setInterval(fetchMessages, intervalMs);
    return () => window.clearInterval(timer);
  }, [fetchMessages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, messages.length]);

  const handleSaveProfile = (name: string, phone: string) => {
    setVisitorName(name);
    setVisitorPhone(phone);
    window.localStorage.setItem(NAME_KEY, name);
    window.localStorage.setItem(PHONE_KEY, phone);
  };

  const sendMessage = async (textToSend: string) => {
    const clean = textToSend.trim();
    if (!clean || sending) return;

    setErrorMsg(null);
    setSending(true);
    setDraft('');

    const optimisticId = `temp-${Date.now()}`;
    const optimistic: ChatMessageItem = {
      id: optimisticId,
      sessionId,
      sender: 'visitor',
      senderName: visitorName.trim() || 'Website Visitor',
      visitorPhone: visitorPhone.trim() || undefined,
      vehicleName: activeVehicleLabel || undefined,
      body: clean,
      createdAt: new Date().toISOString(),
      pending: true,
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const res = await fetch('/api/chat-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          sender: 'visitor',
          senderName: visitorName.trim() || 'Website Visitor',
          visitorPhone: visitorPhone.trim() || '',
          vehicleName: activeVehicleLabel || '',
          body: clean,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      await fetchMessages();
    } catch {
      setErrorMsg('Could not send message. Please retry or open WhatsApp below.');
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setDraft(clean);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(draft);
  };

  if (!isOpen) return null;

  const waFallbackHref = `https://wa.me/254180423075?text=${encodeURIComponent(
    activeVehicleLabel
      ? `Hello Alberka Enterprises, I am inquiring about the ${activeVehicleLabel}.`
      : 'Hello Alberka Enterprises, I am inquiring from your website.'
  )}`;

  return createPortal(
    <div
      className="fixed inset-x-2.5 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:right-6 sm:bottom-24 z-[9998] sm:w-[390px] h-[72dvh] sm:h-[540px] max-h-[calc(100vh-7.5rem)] bg-white rounded-[22px] sm:rounded-[24px] shadow-[0_24px_70px_rgba(0,0,0,0.28)] border border-[#e5e5e5] flex flex-col overflow-hidden text-[#222222] animate-fadeIn"
      role="dialog"
      aria-label="Live Chat with Alberka Motors"
    >
      {/* Header */}
      <div className="bg-[#18181b] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-9 h-9 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0 font-bold text-sm">
            A
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#18181b]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-tight truncate">
              Alberka Live Concierge
            </h3>
            <p className="text-[11px] text-white/70 truncate">
              Direct to our Mombasa showroom team
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowProfileForm((v) => !v)}
            title="Your Name & Phone"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              showProfileForm ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'
            }`}
            aria-label="Edit your contact details"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close live chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Name / Phone Bar */}
      {showProfileForm && (
        <div className="bg-[#fafafa] border-b border-[#ebebeb] px-4 py-2.5 space-y-2 shrink-0">
          <p className="text-[11px] font-medium text-[#6a6a6a]">
            Optional: add your name &amp; WhatsApp number so our team can follow up.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={visitorName}
              onChange={(e) => handleSaveProfile(e.target.value, visitorPhone)}
              placeholder="Your name"
              className="px-2.5 py-1.5 text-xs bg-white border border-[#dddddd] rounded-lg outline-none focus:border-[#222222]"
            />
            <input
              type="tel"
              value={visitorPhone}
              onChange={(e) => handleSaveProfile(visitorName, e.target.value)}
              placeholder="07XX XXX XXX"
              className="px-2.5 py-1.5 text-xs bg-white border border-[#dddddd] rounded-lg outline-none focus:border-[#222222]"
            />
          </div>
        </div>
      )}

      {/* Vehicle Context Chip */}
      {activeVehicleLabel && (
        <div className="bg-[#f7f7f7] border-b border-[#ebebeb] px-4 py-2 flex items-center gap-2 text-[11px] text-[#444] shrink-0">
          <Car className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
          <span className="truncate font-medium">Inquiring about: {activeVehicleLabel}</span>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-[#f7f7f7] px-4 py-4 space-y-3">
        {/* Welcome Bubble */}
        <div className="flex items-start gap-2 max-w-[88%]">
          <div className="bg-white border border-[#ebebeb] rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-2xs text-xs leading-relaxed text-[#222222]">
            <p className="font-semibold text-[11px] text-[#DC2626] mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Alberka Motors
            </p>
            Karibu! Ask us anything about our Mombasa stock, Japanese auction sheets, financing, or viewing times — our team receives your message live.
          </div>
        </div>

        {/* Quick-Start Prompts when empty */}
        {messages.length === 0 && (
          <div className="pt-1 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="text-left text-[11px] font-medium px-3 py-1.5 rounded-full bg-white hover:bg-[#222222] hover:text-white border border-[#dddddd] text-[#222222] transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Conversation Thread */}
        {messages.map((msg) => {
          const isVisitor = msg.sender === 'visitor';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isVisitor ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap break-words ${
                  isVisitor
                    ? 'bg-[#222222] text-white rounded-br-sm'
                    : 'bg-white border border-[#ebebeb] text-[#222222] rounded-bl-sm shadow-2xs'
                }`}
              >
                {!isVisitor && msg.senderName && (
                  <p className="text-[10px] font-semibold text-[#DC2626] mb-0.5">
                    {msg.senderName}
                  </p>
                )}
                <p>{msg.body}</p>
              </div>
              <div className="mt-1 px-1 flex items-center gap-1 text-[10px] text-[#717171]">
                <span>{msg.pending ? 'Sending...' : formatTime(msg.createdAt)}</span>
                {isVisitor && !msg.pending && <CheckCheck className="w-3 h-3 text-emerald-600" />}
              </div>
            </div>
          );
        })}

        {errorMsg && (
          <p className="text-[11px] text-[#DC2626] bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {errorMsg}
          </p>
        )}

        <div ref={listEndRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-t border-[#ebebeb] px-3 py-2.5 shrink-0 space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-[#f7f7f7] border border-[#e5e5e5] focus:border-[#222222] rounded-full px-4 py-2.5 text-xs text-[#222222] placeholder:text-[#888] outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending}
            className="w-10 h-10 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between px-1 text-[10px] text-[#717171]">
          <span>Replies appear here live</span>
          <a
            href={waFallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#222222] hover:text-[#DC2626] transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Switch to WhatsApp</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </form>
    </div>,
    document.body
  );
};
