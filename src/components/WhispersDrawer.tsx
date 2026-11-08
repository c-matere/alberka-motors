import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageCircle, Calendar, FileText, Phone, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    location: 'Mombasa — Tangana Road Showroom',
    vehicleId: vehicles[0]?.id || '',
    date: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCar = vehicles.find((v) => v.id === formData.vehicleId);
    const carName = selectedCar?.name || 'Selected Vehicle';

    let message = '';
    if (activeTab === 'viewing') {
      message = `Hello Alberka Motors, my name is ${formData.name} (${formData.phone}). I would like to book a test drive for the ${carName} (${selectedCar?.stockNo || ''}) at your ${formData.location} showroom on ${formData.date || 'the earliest available date'}. Notes: ${formData.notes || 'None'}.`;
    } else if (activeTab === 'dossier') {
      message = `Hello Alberka Motors, my name is ${formData.name} (${formData.phone}). Please send me the authentic Japanese Auction Sheet and export inspection certificate for the ${carName} (${selectedCar?.stockNo || ''}).`;
    } else {
      message = `Hello Alberka Motors, my name is ${formData.name} (${formData.phone}). I would like to import a specific vehicle on order from Japan: ${formData.notes || carName}.`;
    }

    window.open(`https://wa.me/254714333888?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-[#09090b]/90 backdrop-blur-md flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Click outside backdrop */}
      <div className="flex-1 hidden md:block" />

      {/* Drawer Panel */}
      <div 
        className="w-full max-w-[540px] h-full bg-[#121215] border-l border-[#27272a] flex flex-col justify-between overflow-y-auto text-[#f4f4f5] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div>
          <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">
                  DIRECT CONCIERGE
                </span>
              </div>
              <h2 className="text-[20px] font-bold text-white tracking-tight">
                Chat with Alberka Motors
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#a1a1aa] hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Simple Tabs */}
          <div className="grid grid-cols-3 border-b border-[#27272a] bg-[#09090b]">
            <button
              onClick={() => {
                setActiveTab('viewing');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'viewing'
                  ? 'text-white border-b-2 border-white bg-[#121215]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Test Drive
            </button>
            <button
              onClick={() => {
                setActiveTab('dossier');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'dossier'
                  ? 'text-white border-b-2 border-white bg-[#121215]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Auction Sheet
            </button>
            <button
              onClick={() => {
                setActiveTab('bidding');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'bidding'
                  ? 'text-white border-b-2 border-white bg-[#121215]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Import on Order
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="p-8 text-center bg-[#18181c] border border-[#27a644] rounded-[4px] space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#27a644] mx-auto" />
                <h3 className="text-[18px] font-bold text-white">Message Dispatched!</h3>
                <p className="text-[14px] text-[#a1a1aa]">
                  We are opening WhatsApp with your details. Our sales team in Mombasa will assist you right away.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-ghost !text-[12px] !py-2 !px-4 mt-2"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                {activeTab !== 'bidding' && (
                  <div>
                    <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">Car Model</label>
                    <select
                      value={formData.vehicleId}
                      onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
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
                    <div>
                      <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">Preferred Showroom</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                      >
                        <option value="Mombasa — Tangana Road Showroom">Mombasa (Tangana Road Flagship)</option>
                        <option value="Mombasa — Nyali Branch">Mombasa (Nyali Branch)</option>
                        <option value="Nairobi — Westlands (Mwanzi Rd)">Nairobi (Westlands Mwanzi Rd)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1">
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
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-white w-full py-3 text-[14px] justify-center cursor-pointer font-semibold">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Contact Info */}
        <div className="p-6 border-t border-[#27272a] bg-[#09090b] space-y-2 text-[13px] text-[#a1a1aa]">
          <div className="flex items-center justify-between">
            <span>Direct WhatsApp Helpline:</span>
            <a href="tel:+254714333888" className="text-white font-mono hover:text-zinc-300">0714 333 888</a>
          </div>
          <div className="flex items-center justify-between">
            <span>Nairobi Branch Line:</span>
            <a href="tel:+254748999333" className="text-white font-mono hover:text-zinc-300">0748 999 333</a>
          </div>
          <div className="text-[11px] text-[#71717a] pt-1">
            Mombasa: Tangana Rd · Nairobi: Mwanzi Rd, Westlands
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
