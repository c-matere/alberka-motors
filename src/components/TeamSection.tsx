import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ship,
  Wrench,
} from 'lucide-react';
import { TEAM_DESKS, TeamDeskIcon } from '../data/team';
import { CmsSiteSettings } from '../services/cmsContent';

const DESK_ICONS: Record<TeamDeskIcon, React.ComponentType<{ className?: string }>> = {
  sourcing: Ship,
  inspection: ClipboardCheck,
  workshop: Wrench,
  handover: MessageCircle,
};

interface TeamSectionProps {
  settings?: CmsSiteSettings;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ settings }) => {
  const phone = settings?.phone || '+254 180 423 075';
  const whatsapp = settings?.whatsappNumber || '254180423075';
  const email = settings?.email || 'yard@alberka.co.ke';

  const contacts = [
    {
      label: 'CALL THE DESK',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      icon: Phone,
    },
    {
      label: 'WHATSAPP',
      value: 'Chat with our client team',
      href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        'Hello Alberka Enterprises, I would like to speak to the team about a vehicle.',
      )}`,
      icon: MessageCircle,
    },
    {
      label: 'EMAIL',
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
  ];

  return (
    <>
      {/* The team behind the provenance */}
      <div id="our-team" className="pt-12 border-t border-zinc-200 scroll-mt-24">
        <div className="max-w-[820px] space-y-3 text-left">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600 font-semibold block">
            THE PEOPLE BEHIND THE PROVENANCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-[-0.03em] leading-tight">
            Four Desks. One Uncompromising Standard.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            A vehicle passes through four specialist desks before it reaches you. Each one owns a
            distinct part of the chain, and each one can be held accountable for it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-8">
          {TEAM_DESKS.map((desk) => {
            const Icon = DESK_ICONS[desk.icon];
            return (
              <article
                key={desk.id}
                className="bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-5 sm:p-6 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] text-left flex flex-col"
              >
                <div className="flex items-center justify-between">
                  {desk.photo ? (
                    <img
                      src={desk.photo}
                      alt={desk.name || desk.title}
                      loading="lazy"
                      className="w-11 h-11 rounded-full object-cover bg-[#f7f7f7] border border-[#ebebeb] shrink-0"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#DC2626]" />
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-zinc-400 tracking-widest">
                    {desk.index}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-zinc-500 block">
                    {desk.eyebrow}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-950 tracking-tight leading-snug">
                    {desk.title}
                  </h3>
                  {desk.name && (
                    <span className="text-[11px] font-semibold text-[#DC2626] block">{desk.name}</span>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed font-normal flex-1">
                  {desk.description}
                </p>

                <ul className="space-y-2 border-t border-[#ebebeb] pt-4">
                  {desk.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                      <span className="text-[11px] sm:text-xs text-zinc-700 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>

      {/* Reach the desk handling your file */}
      <div id="team-contact" className="scroll-mt-24">
        <div className="bg-white border border-[#ebebeb] rounded-[18px] p-6 sm:p-9 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#DC2626] font-semibold block">
                TALK TO THE TEAM
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-[#222222] tracking-[-0.03em] leading-tight">
                Your file has a name behind it.
              </h3>
              <p className="text-sm text-[#6a6a6a] leading-relaxed">
                Ask about a specific stock unit, request the original auction sheet, or arrange a
                showroom visit. The desk that owns your file will answer.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#6a6a6a] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                <span>{settings?.mombasaYardAddress || 'Next to Ganjoni Primary School, Mombasa'}</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group bg-[#f7f7f7] hover:bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-xl p-4 space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-4 h-4 text-[#DC2626]" />
                      <ArrowRight className="w-3.5 h-3.5 text-[#b0b0b0] group-hover:text-[#DC2626] transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#6a6a6a] block">
                        {contact.label}
                      </span>
                      <span className="text-xs sm:text-[13px] font-medium text-[#222222] break-words block">
                        {contact.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
