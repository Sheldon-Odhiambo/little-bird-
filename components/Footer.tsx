
import React from 'react';
import { Bird, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Bird size={24} />
              </div>
              <h2 className="text-xl font-bold text-blue-900 leading-tight">Little Bird Laundry</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              We provide professional laundry services with a focus on quality, speed, and customer satisfaction. Your clothes deserve the best.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-slate-900">Services</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Wash & Fold</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Dry Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Curtain Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Bedding Care</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-slate-900">Working Hours</h4>
            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex justify-between">
                <span>Weekdays:</span>
                <span className="font-semibold text-slate-700">{BUSINESS_INFO.hours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-slate-700">{BUSINESS_INFO.hours.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-slate-700">{BUSINESS_INFO.hours.sunday}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-slate-900">Contact Us</h4>
            <div className="space-y-4">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                <Phone size={18} className="text-blue-500" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPin size={18} className="text-blue-500" />
                <span>Pickup & Delivery Services</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={18} className="text-blue-500" />
                <span>hello@littlebirdlaundry.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
          <p>© 2026 Little Bird Laundry. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
