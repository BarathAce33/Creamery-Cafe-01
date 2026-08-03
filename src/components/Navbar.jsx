import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, MapPin, Sparkles, PhoneCall, Cpu, Award, Wand2, Menu as MenuIcon, X, Palette } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function Navbar({ cartCount, onOpenCart, onOpenDemo, onOpenStudio, onOpenLoyalty, activeSection, setActiveSection, currentTheme, setCurrentTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Online Menu', icon: Sparkles },
    { id: 'reservations', label: 'Book Table', icon: Calendar },
    { id: 'location', label: 'Find Us', icon: MapPin },
    { id: 'enquiry', label: 'Contact', icon: PhoneCall },
  ];

  const themes = [
    { id: 'gold-emerald', name: 'Emerald & Gold (Classic)', icon: '🟢', badge: 'Active Brand' },
    { id: 'vanilla-rose', name: 'Vanilla & Rose Pink', icon: '🌸', badge: 'Pastel Gourmet' },
    { id: 'espresso-caramel', name: 'Espresso & Caramel', icon: '☕', badge: 'Midnight Cocoa' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#07130C]/90 backdrop-blur-xl border-b border-[#F5BF42]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-gradient-to-b from-[#07130C]/90 via-[#07130C]/50 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F5BF42] to-[#10B981] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <img 
              src="/logo.jpg" 
              alt="Creamery Cafe Logo" 
              style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
              className="relative w-full h-full aspect-square flex-shrink-0 rounded-full border-2 border-[#F5BF42] shadow-lg group-hover:scale-105 transition duration-300"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gold-gradient drop-shadow-md">
                CREAMERY
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono font-semibold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 rounded-full">
                Peelamedu
              </span>
            </div>
            <p className="text-[10px] text-[#A7F3D0] tracking-wider uppercase font-medium">
              The Gold Standard in Milkshakes
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0F271B]/70 border border-[#F5BF42]/20 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5BF42] to-[#D49819] text-[#07130C] shadow-[0_0_15px_rgba(245,191,66,0.5)] font-bold'
                    : 'text-[#C1E1CE] hover:text-[#F5BF42] hover:bg-[#1A3E2B]/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Live Theme Toggle Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0F271B] border border-[#F5BF42]/40 text-xs font-mono font-bold text-[#F5BF42] hover:bg-[#F5BF42]/20 transition shadow-md"
              title="Switch Café Design Theme"
            >
              <Palette className="w-3.5 h-3.5 text-[#F5BF42] animate-pulse" />
              <span className="hidden sm:inline">Theme</span>
              <span className="text-[10px] bg-[#F5BF42] text-[#07130C] px-1.5 py-0.5 rounded-full font-extrabold">
                {themes.find(t => t.id === currentTheme)?.icon || '🟢'}
              </span>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0F271B] border border-[#F5BF42]/30 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-2xl animate-fadeIn">
                <span className="text-[10px] font-mono text-[#F5BF42] uppercase px-3 py-1 block font-bold">
                  Select Theme Skin:
                </span>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTheme(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      currentTheme === t.id
                        ? 'bg-[#F5BF42] text-[#07130C] font-bold shadow-md'
                        : 'text-[#C1E1CE] hover:bg-[#07130C] hover:text-[#F5BF42]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span>{t.name}</span>
                    </div>
                    <span className="text-[9px] font-mono opacity-80">{t.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Shake Studio Button */}
          <button
            onClick={onOpenStudio}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0F271B] border border-[#F5BF42]/30 text-xs font-mono font-bold text-[#F5BF42] hover:bg-[#F5BF42]/15 transition"
            title="Open Build-Your-Own Shake Studio"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#F5BF42]" />
            <span>Shake Studio</span>
          </button>

          {/* Gold Loyalty Rewards Button */}
          <button
            onClick={onOpenLoyalty}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0F271B] border border-[#10B981]/30 text-xs font-mono font-bold text-[#34D399] hover:bg-[#10B981]/15 transition"
            title="View Creamery Gold Rewards"
          >
            <Award className="w-3.5 h-3.5 text-[#34D399]" />
            <span>340 Coins</span>
          </button>

          {/* Staff Portal Button */}
          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            title="Open Staff & Kitchen Portal"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#F5BF42] to-[#10B981] rounded-full animate-shimmer"></span>
            <span className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#07130C] text-xs font-mono font-bold text-[#F5BF42] group-hover:bg-[#0F271B] transition-all">
              <Cpu className="w-3.5 h-3.5 text-[#10B981] animate-spin-slow" />
              <span className="hidden sm:inline">Staff Portal</span>
              <span className="sm:hidden">Staff</span>
            </span>
          </button>

          {/* WhatsApp Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-bold text-xs shadow-[0_0_20px_rgba(245,191,66,0.35)] hover:shadow-[0_0_30px_rgba(245,191,66,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline ml-1.5">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white font-mono text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#07130C] animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0F271B] border border-[#F5BF42]/30 text-[#F5BF42]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07130C]/95 border-b border-[#F5BF42]/20 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#EAF4EE] hover:bg-[#0F271B] hover:text-[#F5BF42] border border-transparent hover:border-[#F5BF42]/30 transition"
              >
                <Icon className="w-4 h-4 text-[#F5BF42]" />
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-[#F5BF42]/20 space-y-2">
            <span className="text-[10px] font-mono text-[#F5BF42] uppercase block font-bold">Switch Theme Skin:</span>
            <div className="grid grid-cols-3 gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTheme(t.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center border transition ${
                    currentTheme === t.id
                      ? 'bg-[#F5BF42] text-[#07130C] border-[#F5BF42]'
                      : 'bg-[#0F271B] text-[#C1E1CE] border-[#F5BF42]/20'
                  }`}
                >
                  {t.icon} {t.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
