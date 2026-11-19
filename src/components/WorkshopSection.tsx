import React, { useState, useEffect } from 'react';
import { CmsPage } from '../services/cmsContent';
import {
  Ship,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calculator,
  FileText,
  MapPin,
  MessageCircle,
  Search,
  Award,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  DollarSign
} from 'lucide-react';

interface WorkshopSectionProps {
  pageData?: CmsPage;
  onOpenWhispers?: () => void;
  onExploreFleet?: () => void;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = ({
  pageData,
  onOpenWhispers,
  onExploreFleet,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    targetCar: 'Toyota Land Cruiser Prado TX-L',
    maxBudgetKes: '3,800,000',
    preferredYear: '2018 - 2019',
    fuelPreference: 'Petrol / Hybrid',
    notes: '',
  });

  // Hash-based stage synchronization for footer deep links
  useEffect(() => {
    const syncStageFromHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('auction-grades') || hash.includes('stage-01') || hash.includes('stage-auction-grades')) {
        setActiveStep(0);
      } else if (hash.includes('damage-report') || hash.includes('jevic') || hash.includes('stage-02') || hash.includes('stage-damage-report') || hash.includes('stage-jevic')) {
        setActiveStep(1);
      } else if (hash.includes('shipping') || hash.includes('tracking') || hash.includes('stage-03') || hash.includes('stage-shipping') || hash.includes('stage-tracking')) {
        setActiveStep(2);
      } else if (hash.includes('customs') || hash.includes('stage-04')) {
        setActiveStep(3);
      } else if (hash.includes('ntsa') || hash.includes('stage-05')) {
        setActiveStep(4);
      } else if (hash.includes('overhaul') || hash.includes('stage-06') || hash.includes('stage-overhaul')) {
        setActiveStep(5);
      }
    };
    syncStageFromHash();
    window.addEventListener('hashchange', syncStageFromHash);
    return () => window.removeEventListener('hashchange', syncStageFromHash);
  }, []);

  // The 6-Stage Japanese Direct Import Protocol
  const importSteps = [
    {
      id: 'auction-selection',
      number: '01',
      title: 'Tokyo Auction Sourcing & Live Bidding',
      tagline: 'Access 150,000+ verified vehicles weekly across USS Tokyo, TAA, CAA, and JU',
      duration: 'Day 1 – 4',
      badge: 'JAPANESE AUCTION HALLS',
      description:
        'We connect you directly to the premier Japanese auto auctions (USS Tokyo, TAA Yokohama, CAA Chubu, and ARAI). Every car is personally vetted with its original Japanese auction inspection sheet translated line-by-line before auction day. We lock your maximum bid limit in advance — you never pay a single yen above your agreed budget.',
      checklist: [
        'Live access to 150,000+ weekly lots across USS Tokyo, TAA, CAA, & JAA',
        'Certified auction grades 4.0, 4.5, 5.0, and S only (zero R/accident cars)',
        'Full Japanese auction inspector notes translated (undercarriage, tire wear, options)',
        'Pre-bidding deposit locked with transparent fixed fee structure',
      ],
      deliverable: 'Original Japanese Auction Sheet & Translated Condition Dossier',
    },
    {
      id: 'pre-export-inspection',
      number: '02',
      title: 'Pre-Export JEVIC / QISJ Certification',
      tagline: 'Mandatory KEBS KS 1515:2000 roadworthiness & verified mileage testing',
      duration: 'Day 5 – 10',
      badge: 'YOKOHAMA / KOBE PORT',
      description:
        'Before any vehicle is loaded onto an ocean vessel, it undergoes strict pre-shipment inspection in Japan by QISJ (Quality Inspection Services Japan) or JEVIC. They verify genuine odometer readings against national Japanese registration databases, confirm structural chassis integrity, test vehicle emissions, and issue the official certificate required by Kenya Bureau of Standards (KEBS).',
      checklist: [
        'QISJ or JEVIC Odometer Certification (zero rollbacks guaranteed)',
        'KEBS KS 1515:2000 8-year age rule compliance verification',
        'Radiation level screening and biosecurity chemical wash at port yard',
        'Acquisition of original Japanese Export Certificate (Massha-sho)',
      ],
      deliverable: 'Official QISJ / JEVIC Roadworthiness & Odometer Certificate',
    },
    {
      id: 'roro-shipping',
      number: '03',
      title: 'RoRo Ocean Shipping to Mombasa',
      tagline: '28 to 35-day voyage on dedicated pure car carriers with full marine transit insurance',
      duration: 'Day 12 – 40',
      badge: 'INDIAN OCEAN TRANSIT',
      description:
        'Your car is loaded inside dedicated Roll-on/Roll-off (RoRo) pure car carriers operated by top global maritime lines (NYK Line, MOL, or K-Line). Every vehicle is parked inside covered ship decks to protect against ocean salt spray and weather. Comprehensive marine transit insurance covers the vehicle against total loss, damage, or maritime general average from Yokohama to Kilindini Harbour.',
      checklist: [
        'Covered internal ship deck parking on pure car carriers (NYK / MOL / K-Line)',
        'Full marine cargo transit insurance (CIF coverage to Port of Mombasa)',
        'Real-time vessel tracking via AIS satellite transponder',
        'Original Bill of Lading (B/L) issued and dispatched via international courier',
      ],
      deliverable: 'Original Ocean Bill of Lading (B/L) & Marine Insurance Certificate',
    },
    {
      id: 'port-clearance',
      number: '04',
      title: 'Mombasa Port & KRA Customs Clearing',
      tagline: 'Transparent CRSP valuation, duty payment, and licensed CFS handling',
      duration: 'Day 41 – 47',
      badge: 'KILINDINI HARBOUR / CFS',
      description:
        'Upon arrival at the Port of Mombasa, our in-house licensed clearing agents lodge the customs entry on KRA Simba / iCMS. Duty is assessed transparently against the published KRA Current Retail Selling Price (CRSP) schedule without arbitrary markups. We settle Port Authority (KPA) wharfage, CFS terminal handling, and radiation clearance smoothly to avoid costly demurrage.',
      checklist: [
        'KRA Customs declaration lodged via iCMS / Simba system',
        'Accurate duty assessment using official KRA CRSP schedule',
        'KPA port handling, CFS gate charges, and terminal fees cleared',
        'Zero demurrage guarantee through pre-arrival documentation lodging',
      ],
      deliverable: 'KRA Customs Clearance Entry, Payment Receipts & Port Gate Pass',
    },
    {
      id: 'ntsa-registration',
      number: '05',
      title: 'NTSA Inspection & Registration (KDx Series)',
      tagline: 'Official TIMS inspection, new generation metallic number plates & logbook transfer',
      duration: 'Day 48 – 50',
      badge: 'NTSA PORTAL REGISTRATION',
      description:
        'The vehicle is presented for physical inspection by the National Transport and Safety Authority (NTSA) at the Mombasa inspection center. We process the latest KDx series metallic number plates, secure the third license sticker, and facilitate the electronic logbook transfer directly into your personal or corporate eCitizen TIMS account.',
      checklist: [
        'Physical NTSA vehicle inspection clearance',
        'Allocation of latest KDx series metallic number plates',
        'Third license sticker mounted on front windscreen',
        'Direct online logbook transfer to your eCitizen / TIMS account',
      ],
      deliverable: 'Original NTSA Logbook & KDx Series Number Plates',
    },
    {
      id: 'handover-delivery',
      number: '06',
      title: '100-Point Overhaul & Nationwide Delivery',
      tagline: 'Fresh Castrol synthetic fluids, OBD scan, detailing, and showroom collection or carrier drop',
      duration: 'Day 51 – 52',
      badge: 'GANJONI SHOWROOM / DOOR-TO-DOOR',
      description:
        'Before you drive away, your vehicle arrives at our technical workshop next to Ganjoni Primary School, Mombasa. Our certified technicians execute a 100-point mechanical overhaul: fresh Castrol EDGE synthetic oil, OEM filters, hybrid battery diagnostics, and deep steam extraction detailing. Collect your keys in Mombasa or receive flatbed carrier delivery straight to Nairobi, Kisumu, Eldoret, or Nakuru.',
      checklist: [
        '100-point bumper-to-bumper mechanical and electrical overhaul',
        'Fresh Castrol EDGE synthetic engine oil and genuine OEM filter',
        'Deep steam detailing, paint sealant, and interior sanitization',
        'Collection at our Mombasa showroom or flatbed carrier delivery nationwide',
      ],
      deliverable: 'Signed 100-Point Inspection Dossier & Clean Vehicle Handover',
    },
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Persist to CMS Leads database
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inquiryData.name,
        phone: inquiryData.phone,
        vehicleName: inquiryData.targetCar,
        type: 'custom-import',
        status: 'new',
        notes: `Custom Import Request: Budget KES ${inquiryData.maxBudgetKes}, Preferred Year: ${inquiryData.preferredYear}, Fuel: ${inquiryData.fuelPreference}. Notes: ${inquiryData.notes}`,
      }),
    }).catch(() => {});

    // Open formatted WhatsApp message
    const msg = encodeURIComponent(
      `Hello Alberka Enterprises Concierge, my name is ${inquiryData.name} (${inquiryData.phone}).\n\nI would like to inquire about importing on order:\n• Vehicle: ${inquiryData.targetCar}\n• Target Year: ${inquiryData.preferredYear}\n• Budget: KES ${inquiryData.maxBudgetKes}\n• Fuel: ${inquiryData.fuelPreference}\n${inquiryData.notes ? `• Special Notes: ${inquiryData.notes}\n` : ''}\nPlease share the latest Tokyo auction options and estimated CIF Mombasa breakdown.`
    );
    window.open(`https://wa.me/254180423075?text=${msg}`, '_blank');
    setInquirySubmitted(true);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-24 px-4 sm:px-8 text-zinc-900 relative">
      <div className="max-w-[1280px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold">
              {pageData?.badge || 'DIRECT JAPANESE SOURCING · PORT OF MOMBASA'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.05]">
            {pageData?.heroTitle || 'The Direct Japanese Import Process'}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {pageData?.heroSubtitle || 'From Tokyo auction halls to Kilindini Harbour customs clearance and nationwide handover. Zero broker markups, genuine auction sheets, and complete transparency.'}
          </p>
        </div>

        {/* Cinematic Cinema Stage — Mobile Responsive Aspect Ratio */}
        <div className="space-y-6">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[320px] sm:min-h-[440px] md:min-h-[520px] max-h-[620px] overflow-hidden relative bg-zinc-950 border border-zinc-200/90 rounded-2xl shadow-xl group">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover scale-100 group-hover:scale-102 transition-transform duration-700 ease-out"
            >
              <source src="/videos/flatbed-delivery.mp4" type="video/mp4" />
            </video>

            {/* Subtle Gradient Scrim for Legible Typography on all Devices */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 flex flex-col justify-end p-5 sm:p-8 md:p-12 pointer-events-none">
              <div className="text-left max-w-2xl space-y-2 drop-shadow-md">
                <span className="font-mono text-[9.5px] sm:text-xs text-red-400 uppercase tracking-widest font-bold block">
                  NATIONWIDE FLATBED CARRIER TRANSIT · 100-POINT OVERHAUL
                </span>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                  Precision Overhaul & Nationwide Flatbed Delivery
                </h2>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-xl font-normal">
                  Every vehicle is inspected on Japanese soil, shipped in covered car carriers, cleared through KRA customs, fully overhauled at our Mombasa facility, and delivered safely to your doorstep.
                </p>
              </div>
            </div>
          </div>

          {/* Key Import Pillars Matrix (Apple Design System Soft Clean Strip) */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">WEEKLY AUCTION FLEET</span>
              <span className="text-base sm:text-xl font-bold text-zinc-950 block">150,000+ Cars</span>
              <span className="text-xs text-zinc-600">USS Tokyo, TAA, CAA, JU</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">OCEAN TRANSIT DURATION</span>
              <span className="text-base sm:text-xl font-bold text-zinc-950 block">28 – 35 Days</span>
              <span className="text-xs text-zinc-600">Yokohama/Kobe to Mombasa</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">EXPORT VERIFICATION</span>
              <span className="text-base sm:text-xl font-bold text-zinc-950 block">100% QISJ / JEVIC</span>
              <span className="text-xs text-zinc-600">Certified genuine mileage</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">CUSTOMS DUTY PRICING</span>
              <span className="text-base sm:text-xl font-bold text-red-600 block">KRA CRSP Sched.</span>
              <span className="text-xs text-zinc-600">No arbitrary broker markups</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Timeline Protocol */}
        <div id="import-timeline" className="space-y-6 text-left scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
                STEP-BY-STEP PROVENANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                The 6-Stage Import Timeline
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Select any stage to inspect the safeguards, official documentation, and timelines.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('custom-import-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-mono font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Calculate Custom Import Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Minimalist Stage Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {importSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 text-left rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between h-24 border ${
                    isActive
                      ? 'bg-red-50/80 border-red-500 text-zinc-950 shadow-sm ring-1 ring-red-500/30'
                      : 'bg-white/70 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-red-600">
                      STEP {step.number}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {step.duration.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-xs font-semibold leading-snug line-clamp-2">
                    {step.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown Box */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-zinc-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-red-600 font-bold uppercase tracking-widest">
                    STAGE {importSteps[activeStep].number} OF 06 · {importSteps[activeStep].badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                  {importSteps[activeStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                  Standard Timeline: <span className="font-bold text-zinc-900">{importSteps[activeStep].duration}</span>
                </p>
              </div>

              <div className="font-mono text-[11px] font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg w-fit flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>100% VERIFIED PROTOCOL</span>
              </div>
            </div>

            <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed max-w-3xl font-normal">
              {importSteps[activeStep].description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block font-bold">
                KEY SAFEGUARDS & ACTIONS:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {importSteps[activeStep].checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Documentation Pass */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-semibold text-zinc-900">Official Document Issued:</span>
                <span className="text-zinc-600 font-mono">{importSteps[activeStep].deliverable}</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">Provided to client at handover</span>
            </div>
          </div>
        </div>

        {/* Transparent Cost Breakdown & Kenya Import Duty Guide */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-10 space-y-8 text-left shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="max-w-2xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold block">
              TAX & DUTY TRANSPARENCY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              How Kenyan Import Duty & Costs Are Calculated
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We operate with 100% open accounting. Unlike street brokers who add arbitrary "clearing fees," every Kenyan tax component is derived strictly from KRA published CRSP valuations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 block">01 · IMPORT DUTY</span>
              <span className="text-2xl font-black text-zinc-950 font-mono block">25%</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Calculated on the KRA Current Retail Selling Price (CRSP) after legal age depreciation deductions.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 block">02 · EXCISE DUTY</span>
              <span className="text-2xl font-black text-zinc-950 font-mono block">20% – 35%</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                20% for engines under 1,500cc; 25% for 1,500cc – 2,500cc; 35% for high-displacement & luxury luxury SUVs.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 block">03 · VALUE ADDED TAX</span>
              <span className="text-2xl font-black text-zinc-950 font-mono block">16% VAT</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Applied on Customs Value + Import Duty + Excise Duty per Kenya Revenue Authority tax statutes.
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono font-bold text-red-600 block">04 · LEVIES & NTSA</span>
              <span className="text-2xl font-black text-zinc-950 font-mono block">IDF + RDL</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                3.5% Import Declaration Fee + 2.0% Railway Development Levy + standard NTSA number plate registration.
              </p>
            </div>
          </div>
        </div>

        {/* Required Documents Checklist for Buyers */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-0.5">
                CLEARANCE PREREQUISITES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">
                Documents You Need to Provide
              </h3>
            </div>
            <span className="font-mono text-xs text-zinc-700 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-200 font-semibold w-fit">
              Simple 3-Item Client Checklist
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">KRA PIN Certificate</h4>
                <p className="text-xs text-zinc-600 mt-0.5">Required for Simba / iCMS customs clearance and eCitizen duty payment receipts.</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">National ID or Passport</h4>
                <p className="text-xs text-zinc-600 mt-0.5">Valid government identification for NTSA TIMS motor vehicle registration.</p>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-950">eCitizen TIMS Account</h4>
                <p className="text-xs text-zinc-600 mt-0.5">Your personal or company eCitizen profile where the digital logbook is transferred.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Import on Order Consultation Form */}
        <div
          id="custom-import-form"
          className="relative bg-white p-8 sm:p-12 border border-zinc-200 rounded-3xl space-y-8 text-left shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold block">
              DIRECT AUCTION CONCIERGE
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
              Import Your Dream Japanese Car on Order
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Tell our Mombasa desk what make, model, year, and trim you desire. We will pull current live Tokyo auction sales data, verify typical winning bid prices, and provide a full landed cost estimate to Port of Mombasa.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="bg-zinc-50 border border-zinc-200 p-8 text-center text-zinc-950 space-y-3 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 mx-auto text-red-600" />
              <h4 className="text-xl font-bold">Import Inquiry Dispatched Successfully</h4>
              <p className="text-sm text-zinc-600 max-w-lg mx-auto">
                Our Mombasa import desk is reviewing your requirements on WhatsApp right now. We will send matching auction lots and full landed cost sheets within 1 hour.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 text-xs font-mono font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
              >
                Submit another vehicle request
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="e.g. Dr. Samuel Karani"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-mono text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    Target Vehicle Model
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.targetCar}
                    onChange={(e) => setInquiryData({ ...inquiryData, targetCar: e.target.value })}
                    placeholder="e.g. Toyota Prado TX / Mazda CX-5"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    Target Budget (KES Delivered)
                  </label>
                  <input
                    type="text"
                    value={inquiryData.maxBudgetKes}
                    onChange={(e) => setInquiryData({ ...inquiryData, maxBudgetKes: e.target.value })}
                    placeholder="e.g. 3,500,000"
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-mono text-zinc-950 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    Preferred Model Year
                  </label>
                  <select
                    value={inquiryData.preferredYear}
                    onChange={(e) => setInquiryData({ ...inquiryData, preferredYear: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-950 focus:outline-none focus:border-red-600 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="2018 - 2019">2018 – 2019 (Max 8-Year KEBS Rule)</option>
                    <option value="2020 - 2021">2020 – 2021 (Modern Low Mileage)</option>
                    <option value="2022 - 2023">2022 – 2023 (Near-New / Executive)</option>
                    <option value="2024 - 2025">2024 – 2025 (Latest Facelift)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                    Drivetrain / Fuel
                  </label>
                  <select
                    value={inquiryData.fuelPreference}
                    onChange={(e) => setInquiryData({ ...inquiryData, fuelPreference: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-950 focus:outline-none focus:border-red-600 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Petrol / Hybrid">Hybrid / Self-Charging e:HEV</option>
                    <option value="Petrol Normal">Petrol (Standard ICE)</option>
                    <option value="Diesel Turbo">Diesel Turbo (4WD / SUV)</option>
                    <option value="Full Electric">Full Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-bold">
                  Special Options or Preferences (Optional)
                </label>
                <textarea
                  rows={3}
                  value={inquiryData.notes}
                  onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                  placeholder="e.g. Leather interior, sunroof, 360-degree camera, Pearl White or Black color, under 50,000 km..."
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-8 rounded-xl text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white fill-white" />
                  </span>
                  <span>Request Custom Import Quote via WhatsApp</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Showroom Desk: Mon – Sat: 8:00 AM – 6:00 PM</span>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
