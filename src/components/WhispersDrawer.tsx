import React, { useState } from 'react';
import { X, MessageCircle, Calendar, FileText, Phone, Mail, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface WhispersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const WhispersDrawer: React.FC<WhispersDrawerProps> = ({
  isOpen,
  onClose,
  vehicles,
  onSelectVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'viewing' | 'dossier' | 'bidding'>('viewing');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Mombasa — Tangana Road Atelier',
    vehicleId: vehicles[0]?.id || '',
    date: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCar = vehicles.find((v) => v.id === formData.vehicleId);
    const carName = selectedCar?.name || 'Selected Fleet Marque';

    let message = '';
    if (activeTab === 'viewing') {
      message = `Salutations Alberka Motors Whispers Concierge. My name is ${formData.name} (${formData.phone}). I wish to commission a private viewing for the ${carName} (${selectedCar?.stockNo || ''}) at your ${formData.location} suite on ${formData.date || 'the earliest available date'}. Additional Notes: ${formData.notes || 'None'}.`;
    } else if (activeTab === 'dossier') {
      message = `Salutations Alberka Motors. My name is ${formData.name} (${formData.phone}). Please furnish the authentic Japanese Auction Dossier (USS Tokyo / CAA Inspection Sheet & Export Certificate) for the ${carName} (${selectedCar?.stockNo || ''}).`;
    } else {
      message = `Salutations Alberka Motors Sourcing Atelier. My name is ${formData.name} (${formData.phone}). I wish to commission a direct Japanese auction bid for a specific model / specification: ${formData.notes || carName}.`;
    }

    window.open(`https://wa.me/254714333888?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080809]/90 backdrop-blur-xl flex justify-end">
      
      {/* Click outside backdrop */}
      <div className="flex-1 hidden md:block" onClick={onClose} />

      {/* The Aristocratic Drawer Panel */}
      <div className="w-full max-w-[560px] h-full bg-[#131316] border-l border-[rgba(197,168,128,0.3)] flex flex-col justify-between overflow-y-auto">
        
        {/* Header Bar */}
        <div>
          <div className="p-6 border-b border-[rgba(197,168,128,0.2)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-[0.25em] block">
                PRIVATE LIAISON & COMMISSION
              </span>
              <h2 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] tracking-wider uppercase">
                WHISPERS CONCIERGE
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Service Pillar Tabs */}
          <div className="grid grid-cols-3 border-b border-[rgba(197,168,128,0.15)] bg-[#0f0714]">
            <button
              onClick={() => {
                setActiveTab('viewing');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center font-['Cinzel'] text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'viewing'
                  ? 'text-[#dfc7a5] border-b-2 border-[#c5a880] bg-[#160a1d]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              PRIVATE VIEWING
            </button>
            <button
              onClick={() => {
                setActiveTab('dossier');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center font-['Cinzel'] text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'dossier'
                  ? 'text-[#dfc7a5] border-b-2 border-[#c5a880] bg-[#160a1d]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              AUCTION DOSSIER
            </button>
            <button
              onClick={() => {
                setActiveTab('bidding');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center font-['Cinzel'] text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'bidding'
                  ? 'text-[#dfc7a5] border-b-2 border-[#c5a880] bg-[#160a1d]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              CUSTOM BIDDING
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {isSubmitted ? (
              <div className="p-8 text-center bg-[#0f0714] border border-[#c5a880] space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#c5a880] mx-auto" />
                <h3 className="font-['Cinzel'] text-[18px] text-[#f5f5f7] tracking-wider uppercase">
                  CONCIERGE TICKET DISPATCHED
                </h3>
                <p className="text-[13.5px] text-[#8c8a94] font-light leading-relaxed">
                  Your private viewing liaison has been routed directly to our senior directors on WhatsApp. You will receive an aristocratic confirmation momentarily.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-rr-ghost !py-2 !px-4 !text-[10px]"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                    CLIENT FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.G. CHARLES OTENO"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                    WHATSAPP MOBILE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-mono tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                {activeTab !== 'bidding' && (
                  <div>
                    <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                      MARQUE OF INTEREST
                    </label>
                    <select
                      value={formData.vehicleId}
                      onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.stockNo}) — KES {v.priceKes.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === 'viewing' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                          PREFERRED SUITE
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                        >
                          <option value="Mombasa — Tangana Road Atelier">MOMBASA TANGANA ATELIER</option>
                          <option value="Mombasa — Nyali Suite">MOMBASA NYALI SUITE</option>
                          <option value="Nairobi — Westlands Suite">NAIROBI WESTLANDS SUITE</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                          DATE OF VIEWING
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-mono tracking-wider text-[#dfc7a5] focus:outline-none focus:border-[#dfc7a5]"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1.5">
                    {activeTab === 'bidding' ? 'DESIRED MARQUE, YEAR & BUDGET' : 'BESPOKE INQUIRIES OR NOTES (OPTIONAL)'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      activeTab === 'bidding'
                        ? 'E.g. Toyota Prado TX-L 2.8 Diesel, 2021, Pearl White, under KES 8.5M'
                        : 'E.g. Request hoist inspection, test drive route, or trade-in appraisal at same time'
                    }
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-rr-solid w-full justify-center !py-3 text-[11px]"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>
                      {activeTab === 'viewing'
                        ? 'TRANSMIT VIEWING COMMISSION'
                        : activeTab === 'dossier'
                        ? 'REQUEST ORIGINAL AUCTION PDF'
                        : 'TRANSMIT CUSTOM BID SPECIFICATION'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Contact Details */}
        <div className="p-6 bg-[#0f0714] border-t border-[rgba(197,168,128,0.2)] space-y-3">
          <span className="font-['Cinzel'] text-[9px] text-[#c5a880] uppercase tracking-[0.2em] block">
            DIRECT TELEPHONE COMMUNICATIONS
          </span>
          <div className="grid grid-cols-2 gap-4 text-[12px] font-mono">
            <div>
              <span className="text-[#8c8a94] text-[10px] block">MOMBASA ATELIER:</span>
              <a href="tel:+254714333888" className="text-[#f5f5f7] hover:text-[#dfc7a5] transition-colors">+254 714 333888</a>
            </div>
            <div>
              <span className="text-[#8c8a94] text-[10px] block">NAIROBI SUITE:</span>
              <a href="tel:+254748999333" className="text-[#f5f5f7] hover:text-[#dfc7a5] transition-colors">+254 748 999333</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
