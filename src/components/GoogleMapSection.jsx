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
    <section id="location" className="py-20 relative theme-bg-main">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-bg-sec border theme-border theme-text-gold font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Peelamedu Flagship Location
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif theme-text-gold drop-shadow-md">
            FIND CREAMERY CAFÉ IN COIMBATORE
          </h2>
          <p className="mt-3 text-sm sm:text-base theme-text-sub">
            Located in the heart of Peelamedu. Drop by for fresh milkshakes, burgers, and cozy vibes.
          </p>
        </div>

        {/* Grid: Map Embed + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Preview Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden border theme-border relative flex flex-col justify-between min-h-[380px] theme-bg-sec">
            
            {/* Map Visual Mockup */}
            <div className="relative w-full h-full min-h-[320px] theme-bg-main p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Pin Marker */}
              <div className="relative z-10 my-auto mx-auto text-center flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#F5BF42] to-[#10B981] rounded-full blur-md opacity-60 animate-pulse"></div>
                  <div className="relative w-14 h-14 rounded-full theme-bg-main border-2 border-[#F5BF42] flex items-center justify-center theme-text-gold shadow-2xl">
                    <img src="/logo.jpg" alt="Pin" className="w-11 h-11 rounded-full object-cover" />
                  </div>
                </div>

                <div className="mt-4 theme-bg-sec px-4 py-2 rounded-xl border theme-border backdrop-blur-md shadow-lg">
                  <h4 className="font-serif font-bold theme-text-gold text-sm">CREAMERY CAFÉ PEELAMEDU</h4>
                  <p className="text-[10px] theme-text-sub font-mono font-bold">124, Ram Lakshman Nagar, Peelamedu</p>
                </div>
              </div>

              {/* Direct Google Maps Navigation Button */}
              <div className="relative z-10 flex justify-center mt-4">
                <a
                  href={cafeInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl theme-btn-primary font-extrabold text-xs tracking-wide shadow-lg hover:scale-105 transition"
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
            <div className="glass-panel p-6 rounded-2xl border theme-border space-y-4 theme-bg-sec">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl theme-bg-main theme-text-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold theme-text-gold uppercase">Address</h4>
                  <p className="text-sm font-semibold theme-text-main mt-0.5 leading-snug">
                    {cafeInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t theme-border pt-3">
                <div className="p-2.5 rounded-xl theme-bg-main theme-text-gold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold theme-text-gold uppercase">Operating Hours</h4>
                  <p className="text-sm font-semibold theme-text-main mt-0.5">
                    {cafeInfo.openingHours}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold theme-text-gold theme-bg-main px-2 py-0.5 rounded-full border theme-border">
                    OPEN NOW • WALK-INS WELCOME
                  </span>
                </div>
              </div>

            </div>

            {/* Distance Estimator */}
            <div className="glass-panel p-6 rounded-2xl border theme-border space-y-3 theme-bg-sec">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold theme-text-gold uppercase flex items-center gap-1.5">
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
                        ? 'theme-btn-primary font-bold shadow-md'
                        : 'theme-bg-main theme-text-sub border theme-border'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl theme-bg-main border theme-border flex items-center justify-between">
                <span className="text-xs theme-text-sub">From {userLocation}:</span>
                <span className="font-mono text-sm font-bold theme-text-gold">
                  {distances[userLocation]}
                </span>
              </div>
            </div>

            {/* Quick Contact & Instagram Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${cafeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="glass-panel p-4 rounded-xl border theme-border flex items-center gap-3 text-xs font-bold theme-text-main hover:theme-text-gold transition theme-bg-sec"
              >
                <Phone className="w-4 h-4 theme-text-gold" />
                <span>Call Café</span>
              </a>

              <a
                href={cafeInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-xl border theme-border flex items-center gap-3 text-xs font-bold theme-text-main hover:theme-text-gold transition theme-bg-sec"
              >
                <Instagram className="w-4 h-4 theme-text-gold" />
                <span>@creamery_cbe</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
