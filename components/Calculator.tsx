
import React, { useMemo } from 'react';
import { Calculator as CalcIcon, Plus, Minus, Receipt, ShoppingCart, MapPin, Send, Bird, CheckCircle2 } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../constants';

interface CalculatorProps {
  counts: { [id: string]: number };
  updateCount: (id: string, delta: number) => void;
  address: string;
  setAddress: (address: string) => void;
  total: number;
  onBooked?: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ counts, updateCount, address, setAddress, total, onBooked }) => {
  const activeItems = useMemo(() => {
    return (Object.entries(counts) as [string, number][]).filter(([_, count]) => count > 0);
  }, [counts]);

  const handleBook = () => {
    if (activeItems.length === 0) {
      alert("Please add at least one item to your estimate.");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your pickup location so we can arrange your delivery!");
      return;
    }

    const summaryLine = activeItems.map(([id, count]) => {
      const service = SERVICES.find(s => s.id === id);
      const subtotal = (service?.price || 0) * count;
      const unitLabel = service?.unit === 'kg' ? 'kg' : '';
      return `• ${count}${unitLabel} x ${service?.name} (KSH ${subtotal}/=)`;
    }).join('\n');
    
    // Construct the full message in a readable string first
    const fullMessage = `*Jambo Little Bird Laundry!* 🐦

I'd like to book a professional cleaning service for the following items:

*ORDER SUMMARY:*
${summaryLine}

*ESTIMATED TOTAL:* KSH ${total}/=

*📍 PICKUP & DELIVERY ADDRESS:*
${address.trim()}

Can you please confirm your availability for a pickup?

_Sent via Little Bird Online Estimator_`;

    // CRITICAL: Encode the entire message at once to prevent characters like '&' in "Wash & Fold" from breaking the URL
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    if (onBooked) {
      setTimeout(() => {
        onBooked();
      }, 500);
    }
  };

  return (
    <section id="calculator" className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-4 my-12 overflow-hidden relative">
      <div className="absolute -bottom-20 -left-20 text-white/5 pointer-events-none rotate-12">
        <Bird size={400} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-5 rounded-3xl shadow-2xl relative animate-in zoom-in duration-700">
              <CalcIcon size={32} />
              <div className="absolute -top-3 -right-3 bg-white text-blue-600 p-1.5 rounded-xl shadow-xl rotate-12 scale-110 border-2 border-blue-50">
                <Bird size={18} />
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Cost Estimator</h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">Instant pricing for Nairobi's premier laundry service.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {['washing', 'household', 'special'].map((cat) => (
              <div key={cat} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 whitespace-nowrap">{cat} Specialties</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-5">
                  {SERVICES.filter(s => s.category === cat).map((service) => (
                    <div 
                      key={service.id} 
                      className={`group/item p-6 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer ${
                        counts[service.id] > 0 
                          ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-900/40 scale-[1.02]' 
                          : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-500 hover:bg-slate-800/80 hover:-translate-y-1'
                      }`}
                      onClick={() => updateCount(service.id, 1)}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="font-black text-xl group-hover/item:text-blue-400 transition-colors leading-tight tracking-tight">{service.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                             <span className="text-blue-500 font-black text-xs">{service.price}/=</span>
                             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">per {service.unit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => updateCount(service.id, -1)}
                          className="p-3.5 rounded-2xl bg-slate-700 hover:bg-red-500/80 transition-all active:scale-90 flex items-center justify-center"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-2xl font-black min-w-[3rem] text-center tabular-nums">
                          {counts[service.id] || 0}
                        </span>
                        <button 
                          onClick={() => updateCount(service.id, 1)}
                          className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all active:scale-110 shadow-lg shadow-blue-900/40 flex items-center justify-center"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <Receipt className="text-blue-400" />
                  <h3 className="text-2xl font-black tracking-tight">Your Order</h3>
                </div>
                {activeItems.length > 0 && (
                  <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {activeItems.length} Items
                  </div>
                )}
              </div>
              
              <div className="space-y-6 mb-10 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar">
                {activeItems.length === 0 ? (
                  <div className="py-16 text-center space-y-4 opacity-30">
                    <div className="bg-slate-800 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart size={32} />
                    </div>
                    <p className="text-slate-400 italic font-medium">Add services to generate a breakdown...</p>
                  </div>
                ) : (
                  activeItems.map(([id, count]) => {
                    const s = SERVICES.find(item => item.id === id);
                    const lineTotal = (s?.price || 0) * count;
                    return (
                      <div key={id} className="group animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                              <CheckCircle2 size={14} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-slate-200 font-bold text-sm leading-tight">
                                {count}{s?.unit === 'kg' ? 'kg' : ''} x {s?.name}
                              </span>
                              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">
                                {s?.price}/= per {s?.unit}
                              </span>
                            </div>
                          </div>
                          <span className="font-black text-blue-400 text-sm whitespace-nowrap">KSH {lineTotal}/=</span>
                        </div>
                        <div className="w-full h-px bg-white/5 mt-4" />
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mb-10 p-8 bg-blue-600/10 rounded-[2.5rem] border-2 border-blue-500/30 space-y-5 shadow-inner group-focus-within:ring-4 ring-blue-500/20 transition-all">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
                  <div className="bg-blue-600 p-2 rounded-xl text-white">
                    <MapPin size={16} className="animate-pulse" />
                  </div>
                  <span>Pickup & Delivery Address</span>
                </div>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Where should we pick up? (E.g. Kilimani, Galana Rd, House No. 4B)"
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-5 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 ring-blue-500/60 transition-all min-h-[140px] resize-none font-medium leading-relaxed shadow-lg"
                />
              </div>

              <div className="border-t border-white/10 pt-10 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Total Estimate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white transition-all duration-700 tabular-nums">{total}</span>
                      <span className="text-blue-500 font-black text-xl">/=</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-white text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg scale-90 sm:scale-100">
                      <Bird size={14} className="text-blue-600" />
                      <span>Luxe Approved</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  disabled={total === 0}
                  onClick={handleBook}
                  className="w-full bg-blue-600 text-white py-7 rounded-[2.5rem] font-black text-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] active:scale-95"
                >
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span>Book via WhatsApp</span>
                </button>
                
                <p className="text-[9px] text-center text-slate-500 uppercase tracking-[0.2em] font-black leading-relaxed">
                  Fast Pickup • 24hr Return • Verified Care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
