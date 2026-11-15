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
    location: 'Tangana Road Flagship',
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
      message = `Hello Alberka Enterprises, my name is ${formData.name} (${formData.phone}). I would like to book a test drive for the ${carName} (${selectedCar?.stockNo || ''}) at your ${formData.location} showroom on ${formData.date || 'the earliest available date'}. Notes: ${formData.notes || 'None'}.`;
    } else if (activeTab === 'dossier') {
      message = `Hello Alberka Enterprises, my name is ${formData.name} (${formData.phone}). Please send me the authentic Japanese Auction Sheet and export inspection certificate for the ${carName} (${selectedCar?.stockNo || ''}).`;
    } else {
      message = `Hello Alberka Enterprises, my name is ${formData.name} (${formData.phone}). I would like to import a specific vehicle on order from Japan: ${formData.notes || carName}.`;
    }

    window.open(`https://wa.me/254714333888?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitted(true);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-zinc-50/40 backdrop-blur-md flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Click outside backdrop */}
      <div className="flex-1 hidden md:block" />

      {/* Drawer Panel */}
      <div 
        className="w-full max-w-[540px] h-full bg-white border-l border-zinc-200 flex flex-col justify-between overflow-y-auto text-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.15)] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div>
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider font-semibold block">
                  DIRECT CONCIERGE
                </span>
              </div>
              <h2 className="text-[20px] font-bold text-zinc-950 tracking-tight">
                Chat with Alberka Enterprises
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-700 hover:text-zinc-950 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Simple Tabs */}
          <div className="grid grid-cols-3 border-b border-zinc-200 bg-zinc-100">
            <button
              onClick={() => {
                setActiveTab('viewing');
                setIsSubmitted(false);
              }}
              className={`py-3 px-2 text-center text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'viewing'
                  ? 'text-zinc-950 border-b-2 border-zinc-950 bg-white font-bold'
                  : 'text-zinc-500 hover:text-zinc-950'
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
                  ? 'text-zinc-950 border-b-2 border-zinc-950 bg-white font-bold'
                  : 'text-zinc-700 hover:text-zinc-950'
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
                  ? 'text-zinc-950 border-b-2 border-zinc-950 bg-white font-bold'
                  : 'text-zinc-700 hover:text-zinc-950'
              }`}
            >
              Import on Order
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="p-8 text-center bg-white border border-emerald-500/30 rounded-xl space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-zinc-950">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-zinc-600">
                  We are opening WhatsApp with your details. Our sales team will assist you right away.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-ghost !text-xs !py-2 !px-4 mt-2"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm font-mono text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {activeTab !== 'bidding' && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">Car Model</label>
                    <select
                      value={formData.vehicleId}
                      onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors cursor-pointer"
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
                      <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">Preferred Showroom</label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors cursor-pointer"
                      >
                        <option value="Tangana Road Showroom">Tangana Road Flagship</option>
                        <option value="Nyali Branch">Nyali Branch</option>
                        <option value="Westlands Mwanzi Rd">Westlands Mwanzi Rd Hub</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm font-mono text-zinc-950 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1">
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
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-white/15 rounded-lg text-[16px] sm:text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-white w-full py-3 text-xs sm:text-sm justify-center cursor-pointer font-semibold rounded-lg shadow-lg inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Contact Info */}
        <div className="p-6 border-t border-zinc-200 bg-zinc-100 space-y-2 text-[13px] text-zinc-700">
          <div className="flex items-center justify-between">
            <span>Direct WhatsApp Helpline:</span>
            <a href="tel:+254714333888" className="text-zinc-950 font-mono hover:text-zinc-700">0714 333 888</a>
          </div>
          <div className="flex items-center justify-between">
            <span>Executive Branch Line:</span>
            <a href="tel:+254748999333" className="text-zinc-950 font-mono hover:text-zinc-700">0748 999 333</a>
          </div>
          <div className="text-[11px] text-zinc-600 pt-1">
            Tangana Rd Flagship · Mwanzi Rd, Westlands
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
