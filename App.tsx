
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import WaterParticles from './components/WaterParticles';
import { SERVICES, BUSINESS_INFO } from './constants';
import { CheckCircle2, Waves, Wind, Sun, ArrowRight, X, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
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
      { threshold: 0.1 }
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

const ServiceModal: React.FC<{ service: ServiceItem | null, onClose: () => void }> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
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
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{service.name}</h3>
              <p className="text-2xl font-black text-blue-600 mt-2">{service.price}/= <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">per {service.unit}</span></p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Process & Care</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description || "Our premium cleaning cycle for this item includes double-filtration washing, specialized fabric softener, and professional steaming to ensure crisp results and garment longevity."}
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-3 text-blue-700 mb-2">
                <Sparkles size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Expert Care Tip</span>
              </div>
              <p className="text-xs text-blue-600/80 leading-relaxed font-medium">
                To keep your {service.name.toLowerCase()} looking new, we recommend a cool-water wash and natural air drying. Avoid harsh bleaches!
              </p>
            </div>

            <button 
              onClick={() => {
                onClose();
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              Add to Estimator
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
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={() => onSelect(s)}
      className={`group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-50">
        <img 
          src={s.image} 
          alt={s.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-white/50">
          <div className="text-blue-600 font-black text-base leading-none">{s.price}/=</div>
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 text-center">per {s.unit}</div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-1">
           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">{s.category}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{s.name}</h3>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium opacity-80 line-clamp-2">
          Specialized cleaning cycles tailored for maximum freshness and garment longevity.
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 text-blue-600 font-black text-[9px] uppercase tracking-widest">
            <ShieldCheck size={12} />
            <span>Eco-Friendly</span>
          </div>
          <div className="text-slate-300 group-hover:text-blue-600 transition-colors group-hover:translate-x-1 duration-300">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen">
      <WaterParticles />
      <Navbar />
      
      <main>
        <Hero />

        {/* Compact Features Grid */}
        <section className="py-12 px-6 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: <Waves className="text-blue-500" />, title: "Fluid Care", desc: "Gentle cleaning" },
                { icon: <Wind className="text-blue-400" />, title: "Turbo Dry", desc: "Delicate air-flow" },
                { icon: <ShieldCheck className="text-green-500" />, title: "QC Tested", desc: "Expert inspection" },
                { icon: <Sun className="text-yellow-500" />, title: "Sun Fresh", desc: "UV-sanitized" },
              ].map((f, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="group p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-500 h-full">
                    <div className="bg-white w-10 h-10 flex items-center justify-center rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-4">
                      {React.cloneElement(f.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <h3 className="font-black text-lg text-slate-900 mb-1">{f.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{f.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Services Section */}
        <section id="services" className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 reveal active">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-[0.3em] border border-blue-100">
                Garment Menu
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Specialty Services</h2>
              <p className="text-base text-slate-500 font-light max-w-xl mx-auto">Click any service to view specialized process details and care tips.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

        <Calculator />
      </main>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <Footer />

      {/* Persistent Floating WhatsApp */}
      <a 
        href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
        target="_blank"
        className="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl floating-whatsapp hover:scale-110 transition-transform active:scale-95 flex items-center gap-2 group border-4 border-white/50"
      >
        <MessageCircle size={32} fill="currentColor" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black whitespace-nowrap text-sm ml-2">
          Chat Live
        </span>
      </a>
    </div>
  );
};

export default App;
