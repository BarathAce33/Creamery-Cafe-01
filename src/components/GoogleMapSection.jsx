import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Instagram, ExternalLink, Compass, Car } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function GoogleMapSection() {
  const [userLocation, setUserLocation] = useState('Gandhipuram');

  const distances = {
    'Gandhipuram': '12 mins (4.2 km)',
    'RS Puram': '18 mins (6.8 km)',
    'Saibaba Colony': '20 mins (7.5 km)',
    'Fun Republic Mall': '6 mins (1.8 km)',
    'TIDEL Park': '8 mins (2.5 km)',
  };

  return (
    <section id="location" className="py-20 relative bg-[#07130C]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#F5BF42]" />
            Peelamedu Flagship Location
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-gold-gradient drop-shadow-md">
            FIND CREAMERY CAFÉ IN COIMBATORE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C1E1CE]">
            Located in the heart of Peelamedu. Drop by for fresh milkshakes, burgers, and cozy vibes.
          </p>
        </div>

        {/* Grid: Map Embed + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Preview Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden border border-[#F5BF42]/30 relative flex flex-col justify-between min-h-[380px] bg-[#0F271B]/90">
            
            {/* Map Visual Mockup */}
            <div className="relative w-full h-full min-h-[320px] bg-[#07130C]/80 p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Pin Marker */}
              <div className="relative z-10 my-auto mx-auto text-center flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-2 bg-[#F5BF42] rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-14 h-14 rounded-full bg-[#07130C] border-2 border-[#F5BF42] flex items-center justify-center text-[#F5BF42] shadow-2xl">
                    <img src="/logo.jpg" alt="Pin" className="w-11 h-11 rounded-full object-cover" />
                  </div>
                </div>

                <div className="mt-4 bg-[#0F271B]/90 px-4 py-2 rounded-xl border border-[#F5BF42]/40 backdrop-blur-md shadow-lg">
                  <h4 className="font-serif font-bold text-gold-gradient text-sm">CREAMERY CAFÉ PEELAMEDU</h4>
                  <p className="text-[10px] text-[#A7F3D0] font-mono">124, Ram Lakshman Nagar, Peelamedu</p>
                </div>
              </div>

              {/* Direct Google Maps Navigation Button */}
              <div className="relative z-10 flex justify-center mt-4">
                <a
                  href={cafeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-xs tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(245,191,66,0.6)] transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Live Google Maps Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

          {/* Location Info & Distance Calculator */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address & Hours */}
            <div className="glass-panel p-6 rounded-2xl border border-[#F5BF42]/20 space-y-4 bg-[#0F271B]/80">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#F5BF42]/10 text-[#F5BF42]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F5BF42] uppercase">Address</h4>
                  <p className="text-sm font-semibold text-[#EAF4EE] mt-0.5 leading-snug">
                    {cafeInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#F5BF42]/10 pt-3">
                <div className="p-2.5 rounded-xl bg-[#10B981]/10 text-[#10B981]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#34D399] uppercase">Operating Hours</h4>
                  <p className="text-sm font-semibold text-[#EAF4EE] mt-0.5">
                    {cafeInfo.openingHours}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full border border-[#10B981]/40">
                    OPEN NOW • WALK-INS WELCOME
                  </span>
                </div>
              </div>

            </div>

            {/* Distance Estimator */}
            <div className="glass-panel p-6 rounded-2xl border border-[#F5BF42]/20 space-y-3 bg-[#0F271B]/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#F5BF42] uppercase flex items-center gap-1.5">
                  <Car className="w-4 h-4" />
                  Estimated Drive Time:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(distances).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setUserLocation(loc)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-semibold transition ${
                      userLocation === loc
                        ? 'bg-[#F5BF42] text-[#07130C] font-bold shadow-md'
                        : 'bg-[#07130C]/80 text-[#C1E1CE] border border-[#F5BF42]/20'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#07130C] border border-[#F5BF42]/20 flex items-center justify-between">
                <span className="text-xs text-[#C1E1CE]">From {userLocation}:</span>
                <span className="font-mono text-sm font-bold text-[#F5BF42]">
                  {distances[userLocation]}
                </span>
              </div>
            </div>

            {/* Quick Contact & Instagram Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="glass-panel p-4 rounded-xl border border-[#F5BF42]/20 hover:border-[#F5BF42]/50 flex items-center gap-3 text-xs font-bold text-[#EAF4EE] hover:text-[#F5BF42] transition bg-[#0F271B]/80"
              >
                <Phone className="w-4 h-4 text-[#F5BF42]" />
                <span>Call Café</span>
              </a>

              <a
                href={cafeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border border-[#F5BF42]/20 hover:border-[#F5BF42]/50 flex items-center gap-3 text-xs font-bold text-[#EAF4EE] hover:text-[#F5BF42] transition bg-[#0F271B]/80"
              >
                <Instagram className="w-4 h-4 text-[#F5BF42]" />
                <span>@creamery_cbe</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
