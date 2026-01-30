
import React, { useState, useMemo } from 'react';
import { Calculator as CalcIcon, Plus, Minus, Receipt, ShoppingCart } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../constants';
import { ServiceItem } from '../types';

const Calculator: React.FC = () => {
  const [counts, setCounts] = useState<{ [id: string]: number }>({});

  const updateCount = (id: string, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const total = useMemo(() => {
    return (Object.entries(counts) as [string, number][]).reduce((acc, [id, count]) => {
      const service = SERVICES.find(s => s.id === id);
      return acc + (service ? service.price * count : 0);
    }, 0);
  }, [counts]);

  const activeItems = useMemo(() => {
    return (Object.entries(counts) as [string, number][]).filter(([_, count]) => count > 0);
  }, [counts]);

  const handleBook = () => {
    const summary = activeItems.map(([id, count]) => {
      const service = SERVICES.find(s => s.id === id);
      return `${count}${service?.unit === 'kg' ? 'kg' : ''} x ${service?.name}`;
    }).join('%0A');
    
    const message = `Hello Little Bird Laundry! 🐦%0AI would like to book a service:%0A${summary}%0AEstimated Total: ${total}/=%0APlease let me know when you can pick up!`;
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="calculator" className="py-24 px-6 bg-slate-900 text-white rounded-[4rem] mx-4 my-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <CalcIcon size={32} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Cost Estimator</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Select your items below to get an instant estimate of your laundry bill. No hidden fees!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Service Grid */}
          <div className="lg:col-span-2 space-y-8">
            {['washing', 'household', 'special'].map((cat) => (
              <div key={cat} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">{cat} Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICES.filter(s => s.category === cat).map((service) => (
                    <div 
                      key={service.id} 
                      className={`group/item p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        counts[service.id] > 0 
                          ? 'bg-blue-600/20 border-blue-500 shadow-xl shadow-blue-900/40' 
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800 hover:-translate-y-1'
                      }`}
                      onClick={() => updateCount(service.id, 1)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg group-hover/item:text-blue-400 transition-colors">{service.name}</h4>
                          <p className="text-slate-400 text-sm">{service.price}/{service.unit === 'kg' ? 'kg' : 'unit'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => updateCount(service.id, -1)}
                          className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-xl font-bold min-w-[2rem] text-center">
                          {counts[service.id] || 0}
                        </span>
                        <button 
                          onClick={() => updateCount(service.id, 1)}
                          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 glass-morphism bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <Receipt className="text-blue-400" />
                <h3 className="text-2xl font-bold">Your Estimate</h3>
              </div>
              
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {activeItems.length === 0 ? (
                  <p className="text-slate-400 text-center italic py-10">No items selected yet...</p>
                ) : (
                  activeItems.map(([id, count]) => {
                    const s = SERVICES.find(item => item.id === id);
                    return (
                      <div key={id} className="flex justify-between items-center text-sm animate-in fade-in slide-in-from-left-2">
                        <span className="text-slate-300">
                          {count}{s?.unit === 'kg' ? 'kg' : ''} x {s?.name}
                        </span>
                        <span className="font-bold">{(s?.price || 0) * count}/=</span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-lg">Total Amount</span>
                  <span className="text-3xl font-bold text-blue-400 transition-all duration-500">{total}/=</span>
                </div>
                
                <button 
                  disabled={total === 0}
                  onClick={handleBook}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-blue-900/40"
                >
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Book Pickup Now</span>
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-semibold">
                  T&Cs Apply • Price may vary based on actual weight
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
