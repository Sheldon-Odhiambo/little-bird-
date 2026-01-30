
import React from 'react';
import { Sparkles, MessageCircle, Clock, Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-6 min-h-[80vh] flex items-center mesh-gradient">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 reveal active">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/60 text-blue-700 rounded-full text-xs font-black border border-blue-100 shadow-sm backdrop-blur-sm">
            <Sparkles size={14} className="text-yellow-500" />
            <span className="tracking-widest uppercase">Nairobi's Choice</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Breathe <br />
              <span className="text-blue-600">Fresh.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-md leading-relaxed font-normal">
              Experience sophisticated garment care. We combine advanced chemistry with artisan folding to keep you looking sharp.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8">
             <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">24hr</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Return Time</div>
             </div>
             <div className="w-[1px] h-10 bg-slate-200" />
             <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">4.9★</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">User Rating</div>
             </div>
             <div className="w-[1px] h-10 bg-slate-200" />
             <div className="space-y-1">
                <div className="text-3xl font-black text-slate-900 tracking-tighter">Free</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Pick & Drop</div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
            >
              <span>Estimate Cost</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
              className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#20ba5a] transition-all shadow-xl shadow-green-100/50"
            >
              <MessageCircle size={24} fill="currentColor" />
              <span>WhatsApp Now</span>
            </a>
          </div>
        </div>

        <div className="relative reveal active" style={{ transitionDelay: '400ms' }}>
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-slate-900 aspect-[4/5] lg:aspect-auto ring-1 ring-slate-100 group">
            <img 
              src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1200" 
              alt="Clean folded laundry" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 brightness-90 contrast-110"
            />
            {/* Heavier darkening overlay for text legibility */}
            <div className="absolute inset-0 bg-slate-900/30 transition-opacity duration-500 group-hover:opacity-20" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 text-white z-10">
               <h3 className="text-3xl font-black mb-1 drop-shadow-md">Spotless Result.</h3>
               <p className="text-sm opacity-95 font-medium drop-shadow-md">Eco-friendly care for every fiber.</p>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute top-8 -left-8 z-20 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 animate-float hidden md:block">
             <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg">
                   <Clock size={24} />
                </div>
                <div>
                   <div className="text-lg font-black text-slate-900">{BUSINESS_INFO.hours.weekdays}</div>
                   <div className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em]">Open Weekdays</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
