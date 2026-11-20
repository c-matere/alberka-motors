import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageCircle, Calendar, FileText, Phone, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface WhispersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  initialVehicleId?: string;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const WhispersDrawer: React.FC<WhispersDrawerProps> = ({
  isOpen,
  onClose,
  vehicles,
  initialVehicleId,
  onSelectVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'viewing' | 'dossier' | 'bidding'>('viewing');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Next to Ganjoni Primary School, Mombasa',
    vehicleId: initialVehicleId || vehicles[0]?.id || '',
    date: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const activeId = initialVehicleId || vehicles[0]?.id || '';
      setFormData((prev) => ({
        ...prev,
        vehicleId: activeId,
      }));
      setIsSubmitted(false);
    }
  }, [initialVehicleId, isOpen, vehicles]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCar = vehicles.find((v) => v.id === formData.vehicleId) || vehicles.find((v) => v.id === initialVehicleId) || vehicles[0];
    const carName = selectedCar ? `${selectedCar.year} ${selectedCar.name}` : 'Selected Vehicle';
    const stockId = selectedCar?.sbtStockId || selectedCar?.stockNo || 'N/A';

    // 1. Persist lead directly into Payload CMS database
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          vehicleName: carName,
          vehicleStockNo: stockId,
          type: activeTab === 'viewing' ? 'test-drive' : activeTab === 'bidding' ? 'custom-import' : 'inquiry',
          notes: `Showroom: Next to Ganjoni Primary School, Mombasa | Preferred Date: ${formData.date || 'Earliest available'} | Notes: ${formData.notes || 'None'}`,
        }),
      }).catch((err) => console.warn('Lead capture:', err));
    } catch {}

    // 2. Format detailed message for WhatsApp
    let message = '';
    const priceText = selectedCar?.priceKes ? `KES ${selectedCar.priceKes.toLocaleString()}` : '';
    if (activeTab === 'viewing') {
      message = `Hello Alberka Enterprises,\n\nI would like to book a Test Drive / Showroom Viewing:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Vehicle: ${carName} (Stock ID: ${stockId}) — ${priceText}\n• Showroom Location: Next to Ganjoni Primary School, Mombasa\n• Preferred Date: ${formData.date || 'Earliest available'}\n• Notes: ${formData.notes || 'None'}`;
    } else if (activeTab === 'dossier') {
      message = `Hello Alberka Enterprises,\n\nI would like the Japanese Auction Sheet Dossier:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Vehicle: ${carName} (Stock ID: ${stockId}) — ${priceText}\n• Showroom Location: Next to Ganjoni Primary School, Mombasa\n• Request: Authentic Japanese Auction Sheet, JEVIC Odometer Certificate & 100-Point Inspection Dossier`;
    } else {
      const targetVehicleText = formData.notes.trim() ? formData.notes.trim() : `${carName} (Stock ID: ${stockId}) — ${priceText}`;
      message = `Hello Alberka Enterprises,\n\nI would like to Import on Order from Japan:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Target Vehicle & Desired Specs: ${targetVehicleText}\n• Showroom: Next to Ganjoni Primary School, Mombasa\n• Inquiry: Please advise on available Japanese auction units and CIF Mombasa pricing`;
    }

    // 3. Open WhatsApp and transition drawer state
    window.open(`https://wa.me/254180423075?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-xs flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Click outside backdrop */}
      <div className="flex-1 hidden md:block" />

      {/* Drawer Panel */}
      <div 
        className="w-full max-w-[500px] h-full bg-white border-l border-[#ebebeb] flex flex-col justify-between overflow-y-auto text-[#222222] shadow-[0_0_40px_rgba(0,0,0,0.12)] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div>
          <div className="px-6 py-5 border-b border-[#ebebeb] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block">
                DIRECT CONCIERGE
              </span>
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] tracking-tight">
                Chat with Alberka Motors
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Simple Underlined Tabs */}
          <div className="grid grid-cols-3 border-b border-[#ebebeb] bg-white px-6">
            <button
              onClick={() => {
                setActiveTab('viewing');
                setIsSubmitted(false);
              }}
              className={`py-3.5 px-2 text-center text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'viewing'
                  ? 'text-[#222222] border-[#222222]'
                  : 'text-[#6a6a6a] hover:text-[#222222] border-transparent'
              }`}
            >
              Test Drive
            </button>
            <button
              onClick={() => {
                setActiveTab('dossier');
                setIsSubmitted(false);
              }}
              className={`py-3.5 px-2 text-center text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'dossier'
                  ? 'text-[#222222] border-[#222222]'
                  : 'text-[#6a6a6a] hover:text-[#222222] border-transparent'
              }`}
            >
              Auction Sheet
            </button>
            <button
              onClick={() => {
                setActiveTab('bidding');
                setIsSubmitted(false);
              }}
              className={`py-3.5 px-2 text-center text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeTab === 'bidding'
                  ? 'text-[#222222] border-[#222222]'
                  : 'text-[#6a6a6a] hover:text-[#222222] border-transparent'
              }`}
            >
              Import on Order
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="p-8 text-center bg-white border border-[#ebebeb] rounded-xl space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#ff385c] mx-auto" />
                <h3 className="text-lg font-semibold text-[#222222]">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-[#6a6a6a]">
                  We are opening WhatsApp with your details. Our sales team will assist you right away.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-4 py-2 text-xs font-medium text-[#222222] border border-[#ebebeb] hover:bg-[#f7f7f7] rounded-full transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#222222] block mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm text-[#222222] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#222222] block mb-1.5">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm font-mono text-[#222222] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors"
                  />
                </div>

                {activeTab !== 'bidding' && (
                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Car Model</label>
                    <select
                      value={formData.vehicleId}
                      onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors cursor-pointer"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.year} {v.name} ({v.sbtStockId || v.stockNo}) — KES {v.priceKes.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === 'viewing' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-[#222222] block mb-1.5">Showroom Location</label>
                      <div className="w-full px-3.5 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-lg text-sm font-medium text-[#222222]">
                        Next to Ganjoni Primary School, Mombasa
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#222222] block mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm font-mono text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-xs font-medium text-[#222222] block mb-1.5">
                    {activeTab === 'bidding' ? 'Car Model & Specifications Desired' : 'Special Notes or Questions'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={
                      activeTab === 'bidding'
                        ? 'e.g. Looking for a 2019 Toyota Prado TX-L White with sunroof, budget KES 5.5M'
                        : 'Any specific requests, financing questions, or trade-in info...'
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm text-[#222222] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#222222] hover:bg-black text-white font-medium text-sm rounded-full shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white fill-white" />
                    </span>
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Contact Info */}
        <div className="p-6 border-t border-[#ebebeb] bg-[#f7f7f7] space-y-2 text-xs text-[#6a6a6a]">
          <div className="flex items-center justify-between">
            <span>Direct WhatsApp Helpline:</span>
            <a href="tel:0180423075" className="text-[#222222] font-semibold font-mono hover:underline">0180 423 075</a>
          </div>
          <div className="flex items-center justify-between">
            <span>Showroom Desk:</span>
            <span className="text-[#222222] font-medium">Mon – Sat: 8AM – 6PM</span>
          </div>
          <div className="text-[11px] text-[#6a6a6a] pt-1 font-mono">
            Showroom: Next to Ganjoni Primary School, Mombasa
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
