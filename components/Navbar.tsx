
import React from 'react';
import { Bird, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full glass-nav px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Bird size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-none tracking-tighter uppercase">Little Bird</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-blue-600 font-black mt-0.5">Luxe Laundry</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <button onClick={() => scrollTo('services')} className="hover:text-blue-600 transition-all hover:tracking-[0.15em] outline-none">Services</button>
          <button onClick={() => scrollTo('calculator')} className="hover:text-blue-600 transition-all hover:tracking-[0.15em] outline-none">Estimator</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-blue-600 transition-all hover:tracking-[0.15em] outline-none">Locate</button>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
             <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Call Now</div>
             <a href={`tel:${BUSINESS_INFO.phone}`} className="text-md font-black text-slate-900 hover:text-blue-600 transition-colors">
               {BUSINESS_INFO.phone}
             </a>
          </div>
          <a 
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
            target="_blank"
            className="hidden sm:flex items-center gap-2.5 bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all"
          >
            <MessageSquare size={16} fill="currentColor" />
            <span>PICKUP</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
