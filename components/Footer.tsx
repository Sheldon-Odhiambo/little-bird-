
import React from 'react';
import { Bird, Mail, Phone, MapPin, Instagram, Facebook, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className=" p-2.5  flex items-center justify-center">
                      <img
                        src="/assets/2.png"
                        alt="Little Bird Laundry Logo"
                        className="h-14 w-14 object-contain"
                      />
                    </div>

              <h2 className="text-xl font-black text-blue-900 leading-tight tracking-tighter uppercase">Little Bird</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Nairobi's premier professional laundry service. We prioritize garment longevity and eco-friendly practices in every wash cycle.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Services</h4>
            <ul className="space-y-3 text-sm text-slate-500 font-bold">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Wash & Fold</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Premium Ironing</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Household Textile Care</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Pickup & Delivery</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Operations</h4>
            <div className="space-y-3 text-sm text-slate-500 font-bold">
              <div className="flex justify-between">
                <span>Weekdays:</span>
                <span className="text-slate-900">{BUSINESS_INFO.hours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-slate-900">{BUSINESS_INFO.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-blue-600">{BUSINESS_INFO.hours.sunday}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Connect</h4>
            <div className="space-y-4 font-bold">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone size={16} />
                </div>
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500 group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={16} />
                </div>
                <span>Nairobi Wide Coverage</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 group">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={16} />
                </div>
                <span>care@littlebird.co.ke</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
              <Bird size={14} className="text-blue-200" />
              <p>© 2026 Little Bird Laundry. Freshness Delivered.</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">
              <span>Made with</span>
              <Heart size={10} className="text-red-500 fill-current animate-pulse" />
              <span>by Burny Tech</span>
            </div>
          </div>
          <div className="flex gap-8 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Care</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;