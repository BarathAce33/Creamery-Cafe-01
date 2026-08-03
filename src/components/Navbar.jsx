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
    { id: 'oat-honey', name: 'Oat Milk & Honey Gold', icon: '🌾', badge: 'Warm Light Mode' },
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
        ? 'theme-bg-main border-b theme-border py-3 shadow-lg' 
        : 'theme-bg-main opacity-95 border-b theme-border py-4'
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
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight theme-text-gold drop-shadow-sm">
                CREAMERY
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono font-semibold theme-bg-sec theme-text-gold border theme-border rounded-full">
                Peelamedu
              </span>
            </div>
            <p className="text-[10px] theme-text-sub tracking-wider uppercase font-medium">
              The Gold Standard in Milkshakes
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 theme-bg-sec border theme-border rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'theme-btn-primary font-bold shadow-md'
                    : 'theme-text-sub hover:theme-text-gold'
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-full theme-bg-sec border theme-border text-xs font-mono font-bold theme-text-gold hover:opacity-90 transition shadow-md"
              title="Switch Café Design Theme"
            >
              <Palette className="w-3.5 h-3.5 theme-text-gold animate-pulse" />
              <span className="hidden sm:inline">Theme</span>
              <span className="text-[10px] theme-btn-primary px-1.5 py-0.5 rounded-full font-extrabold">
                {themes.find(t => t.id === currentTheme)?.icon || '🟢'}
              </span>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 theme-bg-sec border theme-border rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-2xl animate-fadeIn">
                <span className="text-[10px] font-mono theme-text-gold uppercase px-3 py-1 block font-bold">
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
                        ? 'theme-btn-primary font-bold shadow-md'
                        : 'theme-text-sub hover:theme-bg-main hover:theme-text-gold'
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full theme-bg-sec border theme-border text-xs font-mono font-bold theme-text-gold hover:opacity-90 transition"
            title="Open Build-Your-Own Shake Studio"
          >
            <Wand2 className="w-3.5 h-3.5 theme-text-gold" />
            <span>Shake Studio</span>
          </button>

          {/* Gold Loyalty Rewards Button */}
          <button
            onClick={onOpenLoyalty}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full theme-bg-sec border theme-border text-xs font-mono font-bold theme-text-gold hover:opacity-90 transition"
            title="View Creamery Gold Rewards"
          >
            <Award className="w-3.5 h-3.5 theme-text-gold" />
            <span>340 Coins</span>
          </button>

          {/* Staff Portal Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full theme-btn-primary text-xs font-mono font-bold hover:scale-105 transition-all shadow-md"
            title="Open Staff & Kitchen Portal"
          >
            <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden sm:inline">Staff Portal</span>
            <span className="sm:hidden">Staff</span>
          </button>

          {/* WhatsApp Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 sm:px-3.5 sm:py-2 rounded-full theme-btn-primary font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline ml-1.5">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white font-mono text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl theme-bg-sec border theme-border theme-text-gold"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden theme-bg-main border-b theme-border backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold theme-text-main hover:theme-bg-sec hover:theme-text-gold border border-transparent hover:theme-border transition"
              >
                <Icon className="w-4 h-4 theme-text-gold" />
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-2 border-t theme-border space-y-2">
            <span className="text-[10px] font-mono theme-text-gold uppercase block font-bold">Switch Theme Skin:</span>
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
                      ? 'theme-btn-primary font-bold'
                      : 'theme-bg-sec theme-text-sub theme-border'
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
