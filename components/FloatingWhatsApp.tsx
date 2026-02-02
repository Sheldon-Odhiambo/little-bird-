import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[110] group flex items-center gap-3 flex-row-reverse"
      aria-label="Book via WhatsApp"
    >
      <div className="bg-[#25D366] text-white p-5 rounded-[2rem] shadow-2xl floating-whatsapp hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white">
        <MessageCircle size={32} fill="currentColor" />
      </div>
      <div className="bg-white px-6 py-3 rounded-2xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 pointer-events-none">
        <span className="text-[#25D366] font-black text-xs uppercase tracking-[0.2em] whitespace-nowrap">
          Book Pickup Now
        </span>
      </div>
    </a>
  );
};

export default FloatingWhatsApp;