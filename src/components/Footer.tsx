import React from 'react';
import { Vehicle } from '../data/vehicles';
import { MessageCircle, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { CmsSiteSettings } from '../services/cmsContent';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  settings?: CmsSiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
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
              src="/alberka-logo-cropped.png"
              alt="Alberka Enterprises Kenya"
              className="h-9 w-auto object-contain"
            />
            <div className="border-l border-zinc-200 pl-4 text-left">
              <span className="font-bold text-sm tracking-tight text-zinc-950 block leading-tight">
                {settings?.businessName?.toUpperCase() || 'ALBERKA ENTERPRISES (KENYA) LTD'}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-zinc-600 mt-0.5 block">
                {settings?.tagline?.toUpperCase() || 'DIRECT JAPANESE IMPORTS · EST. 2000'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=${encodeURIComponent('Hello Alberka Enterprises, I have an inquiry regarding vehicles at your showroom next to Ganjoni Primary School, Mombasa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crimson py-2.5 px-4 text-xs font-semibold inline-flex items-center gap-2"
            >
              <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
              </span>
              <span>WhatsApp Us ({settings?.phone || '0180 423 075'})</span>
            </a>
          </div>
        </div>

        {/* Physical Showroom Location Banner */}
        <div className="bg-[#f8f9fa] border border-zinc-200/90 rounded-2xl p-5 sm:p-7 mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-600">
                  Physical Showroom Location
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Mon – Sat · 8:00 AM – 6:00 PM
                </span>
              </div>
              <h3 className="font-bold text-zinc-950 text-base sm:text-lg tracking-tight">
                Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa
              </h3>
              <p className="text-xs sm:text-[13px] text-zinc-600 max-w-2xl leading-relaxed">
                Tour our certified Japanese import fleet in person, inspect vehicles on our mechanical lift with your independent mechanic, or initiate direct Tokyo auction bidding with our Mombasa team.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 font-bold text-xs rounded-xl inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-red-600" />
              <span>Get Directions</span>
            </a>
            <button
              onClick={() => onNavigate('locations')}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
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
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Why Choose Alberka
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Japanese Auction Grades
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
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
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Car Tracking & Vessel ETA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Damage Condition Report
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Shipping Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
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
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Our Company
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Company Profile & Provenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-950 font-semibold hover:text-red-600 text-left cursor-pointer transition-colors">
                  Mombasa Showroom (Sole Office)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Anti-Tampering Mileage Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
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
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Vehicle Request (Japan Order)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Private Showroom Viewing
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=${encodeURIComponent('Hello Alberka Enterprises, I have an inquiry regarding vehicles in stock.')}`}
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
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Connect With Us</span>
            </h4>
            <ul className="space-y-2.5">
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

        </div>

        {/* SBT Japan Policy Strip */}
        <div className="pt-6 pb-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-600 font-mono">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="hover:text-zinc-950 cursor-pointer">Terms of Use</span>
            <span>·</span>
            <span className="hover:text-zinc-950 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-zinc-950 cursor-pointer">Claims & Inspection Policy</span>
            <span>·</span>
            <span className="hover:text-zinc-950 cursor-pointer">Basic Policy Against Anti-Social Forces</span>
            <span>·</span>
            <span className="hover:text-zinc-950 cursor-pointer">Security Export Control</span>
          </div>

          <div className="text-zinc-700 font-bold">
            Sole Office & Yard: Mombasa, Kenya
          </div>
        </div>

        {/* Bottom Copyright Strip with Gradient Feather Divider */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600 font-mono">
          <p>{settings?.footerNotice || `© ${new Date().getFullYear()} Alberka Enterprises (Kenya) Ltd. Direct Japanese Imports. All Rights Reserved.`}</p>
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
