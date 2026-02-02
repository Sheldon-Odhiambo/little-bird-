import React, { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import WaterParticles from './components/WaterParticles';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { SERVICES } from './constants';
import { Waves, Wind, ShieldCheck, Sun, ArrowRight, X, Sparkles, Bird, ShoppingBag } from 'lucide-react';
import { ServiceItem } from './types';

const RevealOnScroll: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal ${isVisible ? 'active' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ServiceModal: React.FC<{ 
  service: ServiceItem | null, 
  onClose: () => void,
  onAdd: (id: string) => void 
}> = ({ service, onClose, onAdd }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-full relative">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
          <div className="p-10 space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">{service.category}</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{service.name}</h3>
              <p className="text-2xl font-black text-blue-600 mt-2">{service.price}/= <span className="text-sm text-slate-400 font-black uppercase tracking-widest">per {service.unit}</span></p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Process & Care</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our premium cleaning cycle for {service.name.toLowerCase()} includes multi-stage filtration and professional steaming.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-3 text-blue-700 mb-2">
                <Bird size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Seal of Quality</span>
              </div>
              <p className="text-xs text-blue-600/80 leading-relaxed font-bold">
                Every {service.name.toLowerCase()} is hand-inspected for a spotless finish.
              </p>
            </div>

            <button 
              onClick={() => {
                onAdd(service.id);
                onClose();
              }}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              Add to Estimate
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

const AnimatedServiceCard: React.FC<{ service: ServiceItem, index: number, onSelect: (s: ServiceItem) => void }> = ({ service: s, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={() => onSelect(s)}
      className={`group bg-white/90 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${(index % 3) * 50}ms` }}
    >
      <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
        <Bird size={16} />
      </div>
      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-50">
        <img 
          src={s.image} 
          alt={s.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
          <div className="text-blue-600 font-black text-lg leading-none">{s.price}/=</div>
          <div className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mt-0.5 text-center">per {s.unit}</div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-2">
           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">{s.category}</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">{s.name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium opacity-80 line-clamp-2">
          Specialized cleaning cycles tailored for maximum freshness.
        </p>
        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest">
            <ShieldCheck size={14} />
            <span>Luxe Guaranteed</span>
          </div>
          <div className="text-slate-300 group-hover:text-blue-600 transition-colors group-hover:translate-x-1 duration-300">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [counts, setCounts] = useState<{ [id: string]: number }>({});
  const [address, setAddress] = useState('');

  const total = useMemo(() => {
    return (Object.entries(counts) as [string, number][]).reduce((acc, [id, count]) => {
      const service = SERVICES.find(s => s.id === id);
      return acc + (service ? service.price * count : 0);
    }, 0);
  }, [counts]);

  const updateCount = (id: string, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const addToEstimate = (id: string) => {
    updateCount(id, 1);
  };

  const resetOrder = () => {
    setCounts({});
    setAddress('');
  };

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <WaterParticles />
      <Navbar />
      
      <main>
        <Hero />

        {/* Features Row */}
        <section className="py-16 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: <Waves className="text-blue-500" />, title: "Fluid Care", desc: "Eco-gentle washing" },
                { icon: <Wind className="text-blue-400" />, title: "Turbo Dry", desc: "Delicate air-flow" },
                { icon: <ShieldCheck className="text-green-500" />, title: "QC Tested", desc: "3rd point inspection" },
                { icon: <Sun className="text-yellow-500" />, title: "Sun Fresh", desc: "UV-sanitized finish" },
              ].map((f, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="group p-8 rounded-[2rem] bg-white/80 backdrop-blur-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                    <div className="bg-blue-50 w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-6">
                      {React.cloneElement(f.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <h3 className="font-black text-xl text-slate-900 mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{f.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 pb-48 relative overflow-visible">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal active">
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 shadow-sm">
                The Cleaning Menu
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Garment Specialists</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((s, index) => (
                <AnimatedServiceCard 
                  key={s.id} 
                  service={s} 
                  index={index} 
                  onSelect={setSelectedService}
                />
              ))}
            </div>
          </div>
        </section>

        <Calculator 
          counts={counts} 
          updateCount={updateCount} 
          address={address} 
          setAddress={setAddress}
          total={total}
          onBooked={resetOrder}
        />
      </main>

      {/* Floating Total Bar */}
      {total > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] animate-in slide-in-from-bottom-10">
          <button 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-slate-900/90 backdrop-blur-xl text-white px-8 py-4 rounded-full shadow-2xl border border-white/10 flex items-center gap-4 hover:bg-blue-600 transition-all group scale-100 hover:scale-105 active:scale-95"
          >
            <div className="bg-blue-500 p-2 rounded-lg">
              <ShoppingBag size={18} />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Total Estimate</span>
              <span className="text-lg font-black">{total}/=</span>
            </div>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        onAdd={addToEstimate}
      />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default App;