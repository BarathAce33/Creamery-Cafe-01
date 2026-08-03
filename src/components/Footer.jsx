import React from 'react';
import { MapPin, Phone, Instagram, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function Footer({ onOpenDemo }) {
  return (
    <footer className="theme-bg-sec theme-text-main pt-16 pb-12 relative overflow-hidden border-t theme-border">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#F5BF42] overflow-hidden flex-shrink-0">
                <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold theme-text-gold">CREAMERY CAFÉ</h3>
                <p className="text-[10px] theme-text-sub font-mono tracking-widest uppercase font-semibold">The Classic Café • Peelamedu</p>
              </div>
            </div>

            <p className="text-xs theme-text-sub max-w-sm leading-relaxed">
              Coimbatore’s gold standard in thickshakes, fresh strawberry creams, charcoal burgers, and steamed momos. Crafted with passion, served with perfection.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={cafeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl theme-bg-main border theme-border theme-text-gold hover:opacity-80 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2.5 rounded-xl theme-bg-main border theme-border theme-text-gold hover:opacity-80 transition"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDemo}
                className="px-4 py-2 rounded-xl theme-bg-main border theme-border theme-text-gold font-mono text-xs font-bold hover:opacity-80 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Staff Portal & KDS
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold theme-text-gold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs theme-text-sub">
              <li><a href="#menu" className="hover:theme-text-gold transition">Online Menu & Shakes</a></li>
              <li><a href="#reservations" className="hover:theme-text-gold transition">Table Reservations</a></li>
              <li><a href="#location" className="hover:theme-text-gold transition">Find Us (Peelamedu)</a></li>
              <li><a href="#enquiry" className="hover:theme-text-gold transition">Catering & Enquiries</a></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold theme-text-gold uppercase tracking-wider">Visit Us</h4>
            <p className="text-xs theme-text-sub leading-relaxed">
              124, Ram Lakshman Nagar, Peelamedu,<br />
              Coimbatore, Tamil Nadu 641004
            </p>
            <p className="text-xs theme-text-gold font-mono font-semibold">
              Open Daily: 11:00 AM – 11:30 PM
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t theme-border flex flex-col sm:flex-row items-center justify-between text-xs theme-text-sub space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Creamery Café Coimbatore. All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-mono text-[11px] theme-text-gold font-bold">
            Creamery Café • Peelamedu Flagship Platform
          </p>
        </div>

      </div>
    </footer>
  );
}
