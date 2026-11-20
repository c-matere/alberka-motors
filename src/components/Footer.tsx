import React from 'react';
import { Vehicle } from '../data/vehicles';
import { MessageCircle, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { CmsSiteSettings } from '../services/cmsContent';
import alberkaLogo from '../assets/alberka-logo.png';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenHelpCenter?: (tab?: 'faq' | 'policies' | 'contact') => void;
  settings?: CmsSiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenHelpCenter,
  settings,
}) => {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 relative text-zinc-600 text-xs sm:text-[13px] py-16 px-4 sm:px-8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Disclaimers & Consumer Assurance */}
        <div className="pb-8 mb-10 space-y-2.5 leading-relaxed text-xs text-zinc-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-zinc-200 after:via-zinc-100 after:to-transparent">
          <p>
            1. <strong className="text-zinc-950">100-Point Pre-Delivery Overhaul:</strong> Every vehicle undergoes comprehensive mechanical inspection, fresh fluids service, filter renewal, and electronic diagnostic scan at our Mombasa workshop prior to client handover.
          </p>
          <p>
            2. <strong className="text-zinc-950">All-Inclusive Delivered Pricing:</strong> All listed prices in Kenya Shillings (KES) include 16% VAT, KRA Import Duty, Excise Duty, and Railway Development Levy. NTSA TIMS logbook transfer executed directly by our conveyancing desk.
          </p>
          <p>
            3. <strong className="text-zinc-950">Japanese Auction Verification:</strong> Every unit is accompanied by the original Japanese export certificate and verified QISJ or JEVIC odometer verification sheet.
          </p>
        </div>

        {/* Brand Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-zinc-200 after:via-zinc-100 after:to-transparent">
          <div className="flex items-center gap-4">
            <img
              src={alberkaLogo}
              alt="Alberka Enterprises Limited"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="border-l border-zinc-200 pl-4 text-left">
              <span className="font-bold text-sm tracking-tight text-zinc-950 block leading-tight">
                {settings?.businessName?.toUpperCase() || 'ALBERKA ENTERPRISES LIMITED'}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-zinc-600 mt-0.5 block">
                {settings?.tagline?.toUpperCase() || 'DIRECT JAPANESE IMPORTS · MOMBASA SHOWROOM & YARD'}
              </span>
            </div>
          </div>
        </div>

        {/* Physical Showroom Location Banner (Background matches section background white) */}
        <div className="bg-white border border-[#ebebeb] rounded-[14px] p-5 sm:p-7 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fff1f3] border border-[#ffccd5] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-6 h-6 text-[#ff385c]" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ff385c]">
                  Physical Showroom Location
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#f7f7f7] text-[#222222] border border-[#ebebeb]">
                  Mon – Sat · 8:00 AM – 6:00 PM
                </span>
              </div>
              <h3 className="font-bold text-[#222222] text-base sm:text-lg tracking-tight">
                Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6a6a6a] max-w-2xl leading-relaxed">
                Tour our certified Japanese import fleet in person, inspect vehicles on our mechanical lift with your independent mechanic, or initiate direct Tokyo auction bidding with our Mombasa team.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] text-[#222222] font-semibold text-xs rounded-full inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-[#ff385c]" />
              <span>Get Directions</span>
            </a>
            <button
              onClick={() => onNavigate('locations')}
              className="px-4 py-2.5 bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] font-semibold text-xs rounded-full inline-flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Showroom Bay Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Multi-Column Directory (1:1 SBT Japan Automotive Export Directory Structure - Sole Mombasa Office) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-14 text-xs text-left">
          
          {/* 1. Buying */}
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Buying</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Find Cars (Stock)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'why-choose-alberka')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Why Choose Alberka
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('overview', 'customer-reviews')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-auction-grades')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Japanese Auction Grades
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-overhaul')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  100-Point Pre-Delivery Overhaul
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Support & Verification */}
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Support</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('faq') : onNavigate('about'))}
                  className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-tracking')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Car Tracking & Vessel ETA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-damage-report')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Damage Condition Report
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-shipping')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Shipping Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'stage-jevic')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Chassis & Odometer Check (JEVIC)
                </button>
              </li>
            </ul>
          </div>

          {/* 3. About Us (Strictly 1 Office - Mombasa Showroom) */}
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>About Us</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('about', 'about-provenance')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Our Company
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'about-provenance')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Company Profile & Provenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'about-showroom-location')} className="text-zinc-950 font-semibold hover:text-red-600 text-left cursor-pointer transition-colors">
                  Mombasa Showroom (Sole Office)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'anti-tampering-policy')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Anti-Tampering Mileage Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'csr-policy')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  CSR Policy
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Inquiry */}
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Inquiry</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('about', 'about-showroom-location')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop', 'custom-import-form')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Vehicle Request (Japan Order)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about', 'test-drive-booking')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Private Showroom Viewing
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=${encodeURIComponent('Hello Alberka Enterprises, I have an inquiry regarding vehicles at your showroom next to Ganjoni Primary School, Mombasa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>WhatsApp Direct Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 5. Connect & News */}
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>Connect With Us</span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('blog')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                    The Alberka Journal (Blog)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                    Tokyo Auction Weekly Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                    Showroom Clearance Alerts
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('sitemap')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                    Sitemap
                  </button>
                </li>
              </ul>
            </div>

            {/* Official Social Media Channels: B/W by default, color on hover */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-emerald-50 hover:border-[#25D366]/40 hover:text-[#25D366] hover:scale-110 shadow-2xs cursor-pointer"
                  title="WhatsApp Direct Desk"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/alberka_enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-pink-50 hover:border-[#E1306C]/40 hover:text-[#E1306C] hover:scale-110 shadow-2xs cursor-pointer"
                  title="Instagram Profile"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-blue-50 hover:border-[#1877F2]/40 hover:text-[#1877F2] hover:scale-110 shadow-2xs cursor-pointer"
                  title="Facebook Page"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-zinc-200 hover:border-black/50 hover:text-black hover:scale-110 shadow-2xs cursor-pointer"
                  title="TikTok Showroom Reels"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-red-50 hover:border-[#FF0000]/40 hover:text-[#FF0000] hover:scale-110 shadow-2xs cursor-pointer"
                  title="YouTube Fleet Channel"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 flex items-center justify-center text-zinc-600 transition-all duration-300 group hover:bg-zinc-200 hover:border-zinc-400 hover:text-zinc-950 hover:scale-110 shadow-2xs cursor-pointer"
                  title="X (Twitter)"
                  aria-label="X"
                >
                  <svg className="w-5 h-5 fill-current grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* SBT Japan Policy Strip */}
        <div className="pt-6 pb-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-600 font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about', 'anti-tampering-policy'))}
              className="hover:text-zinc-950 cursor-pointer text-left"
            >
              Terms of Use
            </button>
            <span>·</span>
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about', 'anti-tampering-policy'))}
              className="hover:text-zinc-950 cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about', 'anti-tampering-policy'))}
              className="hover:text-zinc-950 cursor-pointer text-left"
            >
              Claims & Inspection Policy
            </button>
            <span>·</span>
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about', 'anti-tampering-policy'))}
              className="hover:text-zinc-950 cursor-pointer text-left"
            >
              Basic Policy Against Anti-Social Forces
            </button>
            <span>·</span>
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about', 'anti-tampering-policy'))}
              className="hover:text-zinc-950 cursor-pointer text-left"
            >
              Security Export Control
            </button>
          </div>

          <div className="text-zinc-700 font-bold">
            Sole Office & Yard: Mombasa, Kenya
          </div>
        </div>

        {/* Bottom Copyright Strip with Gradient Feather Divider */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 font-mono">
          <p>{settings?.footerNotice || `© ${new Date().getFullYear()} Alberka Enterprises Limited. Direct Japanese Imports. All Rights Reserved.`}</p>
          <div className="flex items-center gap-3">
            <span>Next to Ganjoni Primary School, Mombasa</span>
            <span>·</span>
            <span>KRA & QISJ Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
