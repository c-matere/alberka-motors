import React, { useState } from 'react';
import { Star, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, MapPin, X, ZoomIn } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  vehicleName: string;
  year: number;
  grade: string;
  odometer: string;
  date: string;
  avatar: string;
  rating: number;
  story: string;
  verified: boolean;
}

interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  vehicle: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Dr. Anthony Ochieng',
    location: 'Nairobi (Karen)',
    vehicleName: 'Toyota Land Cruiser Prado TX-L 4WD',
    year: 2018,
    grade: 'Grade 4.5',
    odometer: '48,000 KM Verified',
    date: 'Delivered October 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    story: 'I ordered the Prado through Alberka\'s direct Tokyo auction bidding. The original Japanese export sheet and JEVIC certificate matched down to the exact kilometer. Cleanest undercarriage in Nairobi. No middlemen, zero drama.',
    verified: true,
  },
  {
    id: 't2',
    clientName: 'Mary Wanjiku Gitau',
    location: 'Mombasa (Nyali)',
    vehicleName: 'Mazda CX-5 20S Proactive',
    year: 2019,
    grade: 'Grade 4.5',
    odometer: '38,500 KM Verified',
    date: 'Delivered January 2025',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    story: 'Collected my CX-5 directly at their showroom next to Ganjoni Primary School. The team put it on the mechanical lift for my private mechanic to inspect every bushing before I paid. Incredible transparency and dignity.',
    verified: true,
  },
  {
    id: 't3',
    clientName: 'Eng. Brian Muthomi',
    location: 'Nakuru / Nairobi',
    vehicleName: 'Toyota Harrier Hybrid E-Four AWD',
    year: 2019,
    grade: 'Grade 5.0',
    odometer: '42,000 KM Verified',
    date: 'Delivered November 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    story: 'Fuel consumption averages 21.4 km/L from Nakuru to Nairobi. The car arrived with fresh Castrol synthetic fluids, OEM filters, and the NTSA TIMS logbook transfer was initiated in 48 hours. Alberka sets the benchmark.',
    verified: true,
  },
  {
    id: 't4',
    clientName: 'Capt. Evans & Faith Kiprop',
    location: 'Eldoret',
    vehicleName: 'Nissan Serena Highway Star e-POWER',
    year: 2018,
    grade: 'Grade 4.5',
    odometer: '54,000 KM Verified',
    date: 'Delivered December 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    story: 'Our Serena e-POWER has been a blessing for our family holiday road trips. The electric whisper-quiet drive and dual hands-free sliding doors are unmatched. Delivered straight to Eldoret on carrier. Exceptional service!',
    verified: true,
  },
];

const HANDOVER_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    src: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Executive Prado TX Handover at Mombasa Showroom Bay',
    vehicle: 'Toyota Land Cruiser Prado TX-L',
    location: 'Next to Ganjoni Primary School, Mombasa',
  },
  {
    id: 'g2',
    src: 'https://images.pexels.com/photos/7144186/pexels-photo-7144186.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Key Ceremony & Welcome Toast for New Vehicle Owner',
    vehicle: 'Toyota Harrier Hybrid E-Four',
    location: 'Executive Handover Bay',
  },
  {
    id: 'g3',
    src: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Mazda CX-5 Delivery to Happy Family in Nairobi',
    vehicle: 'Mazda CX-5 20S Proactive',
    location: 'Doorstep Carrier Delivery, Nairobi',
  },
  {
    id: 'g4',
    src: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: '100-Point Pre-Delivery Hoist Inspection Review with Client',
    vehicle: 'Toyota RAV4 Adventure AWD',
    location: 'Workshop Inspection Hoist',
  },
  {
    id: 'g5',
    src: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Nissan Serena e-POWER Handover for Touring Clients',
    vehicle: 'Nissan Serena Highway Star',
    location: 'Showroom Delivery Deck',
  },
  {
    id: 'g6',
    src: 'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1200',
    caption: 'Subaru Forester XT Client Handover with Complete Japanese Dossier',
    vehicle: 'Subaru Forester 2.0XT EyeSight',
    location: 'Ganjoni Showroom Hub',
  },
];

interface HappyClientsSectionProps {
  onExploreFleet: () => void;
  onOpenWhispers?: () => void;
}

export const HappyClientsSection: React.FC<HappyClientsSectionProps> = ({
  onExploreFleet,
  onOpenWhispers,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const handleInquireClientDesk = () => {
    if (onOpenWhispers) {
      onOpenWhispers();
    } else {
      const msg = encodeURIComponent('Hello Alberka Motors, I would like to inquire about sourcing a verified Japanese vehicle like the ones in your client deliveries gallery.');
      window.open(`https://wa.me/254180423075?text=${msg}`, '_blank');
    }
  };

  return (
    <section className="w-full bg-white py-20 sm:py-28 px-4 sm:px-8 relative border-t border-zinc-200 text-zinc-900">
      <div className="max-w-[1520px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold">
              CUSTOMER TRUST & PROVENANCE · EST. 2000
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.08]">
            Customer Satisfaction Is Our North Star.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Every handover is a covenant of transparency. Over 4,000 Kenyan families, executives, and safari operators have sourced their certified Japanese vehicles through Alberka Motors. Here is what they have to say.
          </p>
        </div>

        {/* Trust Badges Strip (Apple Design System Soft Shadow) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 block font-mono">4.9 / 5.0</span>
            <span className="text-xs text-zinc-600 mt-1 block">Independent Customer Satisfaction</span>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-3xl font-black text-red-600 block font-mono">4,000+</span>
            <span className="text-xs font-bold text-zinc-900 block mt-1">Vehicles Delivered</span>
            <span className="text-xs text-zinc-500 block">Across all 47 counties in Kenya</span>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 block font-mono">100%</span>
            <span className="text-xs font-bold text-zinc-900 block mt-1">Genuine Odometer</span>
            <span className="text-xs text-zinc-500 block">QISJ & JEVIC Export Certified</span>
          </div>

          <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
            <span className="text-2xl sm:text-3xl font-black text-zinc-950 block font-mono">26 Years</span>
            <span className="text-xs font-bold text-zinc-900 block mt-1">Continuous Operations</span>
            <span className="text-xs text-zinc-500 block">Showroom & Workshop Hub in Mombasa</span>
          </div>
        </div>

        {/* Client Story Cards Grid */}
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-0.5">
                VERIFIED OWNER EXPERIENCES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Stories From Our Drivers
              </h3>
            </div>
            <button
              onClick={handleInquireClientDesk}
              className="text-xs font-mono font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>Connect with client concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-zinc-200 hover:border-red-600/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Card Header: Client info & Verified Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                        <img src={t.avatar} alt={t.clientName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-zinc-950 group-hover:text-red-600 transition-colors">
                          {t.clientName}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-zinc-500">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span>{t.location}</span>
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-semibold shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed font-normal italic">
                    "{t.story}"
                  </p>
                </div>

                {/* Card Footer: Vehicle Sourced info */}
                <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-950">{t.year} {t.vehicleName}</span>
                    <span className="bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-zinc-200">
                      {t.grade}
                    </span>
                  </div>
                  <span className="text-zinc-500">{t.odometer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Handover Gallery */}
        <div className="space-y-6 text-left pt-6 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-0.5">
                REAL KENYAN MOMENTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Handover & Delivery Gallery
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                A glimpse of recent handovers at our Mombasa showroom bay and nationwide door-to-door carrier drops.
              </p>
            </div>

            <button
              onClick={onExploreFleet}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 text-xs rounded-xl inline-flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore Available Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {HANDOVER_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                  <span className="text-[10px] font-mono font-bold truncate block">{photo.vehicle}</span>
                  <span className="text-[9px] text-zinc-300 truncate block">{photo.location}</span>
                </div>
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Consultation Banner (Solid White Canvas) */}
        <div className="relative bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 text-left overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
          
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold block">
              EXPERIENCE THE ALBERKA PROMISE
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
              Ready to Drive Your Verified Japanese Car?
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Join thousands of Kenyan owners who enjoy complete peace of mind. Tour our showroom next to Ganjoni Primary School, Mombasa, or let us bid on your dream vehicle directly from Tokyo.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleInquireClientDesk}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Client Concierge (0180 423 075)</span>
              </button>
              <button
                onClick={onExploreFleet}
                className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm border border-zinc-200 inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Browse Available Stock</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Handover Photos */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl relative animate-scaleIn text-left text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <img src={selectedPhoto.src} alt={selectedPhoto.caption} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                {selectedPhoto.vehicle}
              </span>
              <h4 className="text-lg font-bold text-zinc-950">
                {selectedPhoto.caption}
              </h4>
              <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{selectedPhoto.location}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
