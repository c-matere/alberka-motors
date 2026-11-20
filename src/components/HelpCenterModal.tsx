import React, { useState } from 'react';
import { X, Search, ShieldCheck, HelpCircle, Phone, MessageCircle, MapPin, ChevronDown, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { CmsSiteSettings } from '../services/cmsContent';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'faq' | 'policies' | 'contact';
  settings?: CmsSiteSettings;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'faq',
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'policies' | 'contact'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>('mileage');

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How does Alberka verify vehicle condition and guarantee genuine mileage?',
      a: 'Every vehicle undergoes strict pre-shipment inspection in Japan by QISJ (Quality Inspection Services Japan) or JEVIC before loading in Yokohama or Kobe. They verify genuine odometer readings against national Japanese registration databases, confirm structural chassis integrity, test vehicle emissions, and issue the official certificate required by Kenya Bureau of Standards (KEBS KS 1515:2000). You receive the original Japanese Export Certificate (Massha-sho) and translated auction sheet.',
      category: 'verification',
    },
    {
      q: 'What is included in the delivered cash price (KES)?',
      a: 'All listed vehicle prices in Kenya Shillings (KES) are 100% all-inclusive delivered cash prices. This covers: 16% VAT, KRA Import Duty (assessed strictly on the official KRA CRSP schedule), Excise Duty, Railway Development Levy (RDL), Import Declaration Fee (IDF), Kilindini Harbour wharfage, CFS terminal gate charges, and original NTSA TIMS logbook transfer directly into your personal or corporate eCitizen account.',
      category: 'pricing',
    },
    {
      q: 'Can I inspect the vehicle on a mechanical lift before purchase?',
      a: 'Yes, absolutely. We have an on-site mechanical inspection bay with a hydraulic vehicle lift at our showroom next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa. You are welcome to inspect undercarriage components, suspension, chassis rails, and connect your independent computerized OBD scan tool, or bring your personal mechanic.',
      category: 'inspection',
    },
    {
      q: 'How long does ocean transit and customs clearance take?',
      a: 'Pure car carrier ocean transit from Yokohama or Kobe to Kilindini Harbour Mombasa takes 28 to 35 days inside covered RoRo ship decks (NYK Line, MOL, or K-Line). Upon arrival in Mombasa, KRA customs clearance and CFS release take approximately 4 to 7 working days. Physical NTSA inspection and allocation of the latest KDx series metallic number plates take 2 to 3 days.',
      category: 'shipping',
    },
    {
      q: 'Do you deliver vehicles to Nairobi, Kisumu, Eldoret, or Nakuru?',
      a: 'Yes. Following our comprehensive 100-point workshop overhaul (fresh Castrol synthetic fluids, OEM filters, diagnostic scan, and steam extraction detailing), you can collect your car in Mombasa or opt for insured flatbed carrier delivery straight to your doorstep anywhere in Kenya.',
      category: 'delivery',
    },
    {
      q: 'How do I place a custom order for a car from Tokyo auctions?',
      a: 'We provide direct bidding access to over 150,000 weekly lots across USS Tokyo, TAA Yokohama, CAA Chubu, and ARAI. We translate the auction sheet line-by-line, inspect high-resolution chassis photos, agree on your maximum bid ceiling, and secure the vehicle without broker markups.',
      category: 'auction',
    },
  ];

  const policies = [
    {
      id: 'mileage',
      title: 'Anti-Tampering Mileage Policy',
      content:
        'Alberka Enterprises enforces a strict zero-tolerance anti-tampering policy. Every vehicle imported by Alberka has its odometer verified against official Japanese national registration records by QISJ or JEVIC. We back this with a 100% legal refund guarantee. If any unit supplied by Alberka is ever proven to have had its mileage rolled back prior to handover, the buyer is entitled to a full refund.',
    },
    {
      id: 'inspection',
      title: 'Claims & Inspection Policy (KS 1515:2000)',
      content:
        'All units strictly comply with Kenya Bureau of Standards (KEBS) KS 1515:2000 standards. Pre-shipment radiation screening, biosecurity chemical wash, emissions compliance testing, and structural chassis integrity checks are executed at Japanese export yards before ocean bills of lading are issued. Any transit damages are covered under our comprehensive marine CIF cargo insurance.',
    },
    {
      id: 'antisocial',
      title: 'Basic Policy Against Anti-Social Forces',
      content:
        'In strict compliance with Japanese export governance and Kenyan anti-money laundering (AML/CFT) regulations, Alberka Enterprises maintains zero tolerance for interactions with unlawful entities or anti-social forces. All transactions are routed through regulated commercial banking rails with verified KRA tax documentation.',
    },
    {
      id: 'export',
      title: 'Security Export Control Policy',
      content:
        'We adhere to the Foreign Exchange and Foreign Trade Act of Japan (FEFTA) and international maritime cargo protocols. Vehicles are verified against national stolen vehicle databases (Japan National Police Agency) prior to deregistration and export certificate issuance.',
    },
    {
      id: 'privacy',
      title: 'Privacy Policy & Data Protection',
      content:
        'Client identification documents, KRA PIN certificates, and eCitizen portal credentials provided for NTSA TIMS logbook conveyancing are encrypted and handled exclusively by our licensed conveyancing officers. Data is never shared with third parties.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-red-600 uppercase tracking-widest font-bold block">
                ALBERKA SUPPORT & DOCUMENTATION
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                Help Center & Official Policies
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 sm:px-6 pt-3 pb-2 border-b border-zinc-100 flex items-center gap-2 bg-white">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
              activeTab === 'faq'
                ? 'bg-red-50 text-red-700 border-red-200 shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border-transparent'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Buyer FAQs</span>
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
              activeTab === 'policies'
                ? 'bg-red-50 text-red-700 border-red-200 shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Policies</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
              activeTab === 'contact'
                ? 'bg-red-50 text-red-700 border-red-200 shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border-transparent'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Showroom Concierge</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search questions (mileage, customs, shipping, inspection)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-800">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-2.5">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-zinc-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-zinc-50/80 transition-colors cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-bold text-zinc-950 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-red-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-3">
              {policies.map((p) => {
                const isOpen = expandedPolicy === p.id;
                return (
                  <div key={p.id} className="border border-zinc-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedPolicy(isOpen ? null : p.id)}
                      className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-zinc-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-zinc-950">{p.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-red-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-[13px] text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/40">
                        {p.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Physical Showroom (Sole Office)</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-950">
                  Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Open Monday to Saturday, 8:00 AM – 6:00 PM. On-site vehicle hydraulic lift available for independent chassis and engine inspections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Direct Phone</span>
                  <a href="tel:0180423075" className="text-sm font-mono font-bold text-zinc-950 hover:text-red-600 block">
                    0180 423 075
                  </a>
                  <span className="text-[11px] text-zinc-500">Call anytime during showroom hours</span>
                </div>

                <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Email Desk</span>
                  <a href="mailto:sales@alberkamotors.co.ke" className="text-sm font-mono font-bold text-zinc-950 hover:text-red-600 block truncate">
                    sales@alberkamotors.co.ke
                  </a>
                  <span className="text-[11px] text-zinc-500">Tokyo CIF and auction dossier requests</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=${encodeURIComponent('Hello Alberka Enterprises Support, I have an inquiry regarding vehicles in stock.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#222222] hover:bg-black text-white font-medium text-xs sm:text-sm rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Directly on WhatsApp Desk (+254 180 423 075)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>KRA CRSP · QISJ / JEVIC Verified</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
