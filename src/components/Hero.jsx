import React, { useEffect, useRef } from 'react';
import { Sparkles, ShoppingBag, Calendar, Star, ChevronDown, Flame, Zap, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function Hero({ onOpenCart, onOpenDemo }) {
  const canvasRef = useRef(null);

  // Animated background particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.4 ? '#F5BF42' : '#10B981',
      alpha: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReservation = () => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-cyber-grid bg-[#07130C]">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Futuristic Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#F5BF42]/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F271B]/90 border border-[#F5BF42]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(245,191,66,0.2)] mb-8 animate-float">
          <div className="flex items-center gap-1.5 text-[#F5BF42] font-mono text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-[#F5BF42] text-[#F5BF42]" />
            <span>4.9 / 5.0 Rating</span>
          </div>
          <span className="text-[#F5BF42]/40">•</span>
          <span className="text-[#34D399] font-mono text-xs font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            PEELAMEDU, COIMBATORE
          </span>
        </div>

        {/* Main Hero Logo Emblem & Typography */}
        <div className="relative mb-6">
          <div className="relative flex items-center justify-center mx-auto w-32 h-32 sm:w-40 sm:h-40 group mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#F5BF42] via-[#10B981] to-[#F5BF42] rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
            <img 
              src="/logo.jpg" 
              alt="Creamery Cafe Classic Logo" 
              style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
              className="relative w-full h-full aspect-square flex-shrink-0 rounded-full border-4 border-[#F5BF42] shadow-[0_0_40px_rgba(245,191,66,0.5)] transform transition hover:scale-105 duration-500"
            />
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="block font-serif text-gold-gradient drop-shadow-[0_4px_25px_rgba(245,191,66,0.4)]">
              THE GOLD STANDARD
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 text-[#EAF4EE] font-cinzel font-light tracking-wider">
              IN MILKSHAKES & GOURMET CAFÉ
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#B4D6C1] leading-relaxed font-normal">
            Welcome to <strong className="text-[#F5BF42]">Creamery Café</strong>. Indulge in Peelamedu’s finest artisanal Lotus Biscoff thickshakes, fresh fruit creams, charcoal burgers, steamed momos, and automated 1-click ordering.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          
          {/* Order Menu Button */}
          <button
            onClick={scrollToMenu}
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#F5BF42] via-[#E5B239] to-[#D49819] text-[#07130C] font-extrabold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(245,191,66,0.5)] hover:shadow-[0_0_45px_rgba(245,191,66,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-[#07130C] animate-spin-slow" />
            <span>Explore Online Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          {/* Book Table Button */}
          <button
            onClick={scrollToReservation}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#0F271B]/80 hover:bg-[#1A3E2B] text-[#EAF4EE] border border-[#F5BF42]/40 backdrop-blur-xl font-bold text-sm sm:text-base shadow-lg hover:border-[#F5BF42] hover:shadow-[0_0_25px_rgba(245,191,66,0.25)] hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 text-[#F5BF42]" />
            <span>Reserve Table</span>
          </button>

          {/* Staff Portal Button */}
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-[#047857]/30 hover:from-[#10B981]/30 hover:to-[#047857]/40 text-[#34D399] border border-[#10B981]/50 backdrop-blur-xl font-mono font-bold text-sm sm:text-base hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-[#34D399]" />
            <span>Staff Portal & KDS</span>
          </button>

        </div>

        {/* Feature Grid Highlights */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          
          <div className="glass-panel glass-panel-hover p-4 rounded-2xl border border-[#F5BF42]/20">
            <div className="w-10 h-10 rounded-xl bg-[#F5BF42]/10 flex items-center justify-center text-[#F5BF42] mb-3">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#EAF4EE]">Gold Standard Shakes</h4>
            <p className="text-xs text-[#A7F3D0]/80 mt-1">Lotus Biscoff, Nutella & Real Sitaphal Creams</p>
          </div>

          <div className="glass-panel glass-panel-hover p-4 rounded-2xl border border-[#F5BF42]/20">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#EAF4EE]">WhatsApp Ordering</h4>
            <p className="text-xs text-[#A7F3D0]/80 mt-1">Direct kitchen ticket & instant receipt generation</p>
          </div>

          <div className="glass-panel glass-panel-hover p-4 rounded-2xl border border-[#F5BF42]/20">
            <div className="w-10 h-10 rounded-xl bg-[#F5BF42]/10 flex items-center justify-center text-[#F5BF42] mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#EAF4EE]">Smart Table Booking</h4>
            <p className="text-xs text-[#A7F3D0]/80 mt-1">Instant QR Reservation Pass for Peelamedu</p>
          </div>

          <div className="glass-panel glass-panel-hover p-4 rounded-2xl border border-[#F5BF42]/20">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#EAF4EE]">Custom Café Automation</h4>
            <p className="text-xs text-[#A7F3D0]/80 mt-1">Simulated real-time kitchen & customer workflows</p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={scrollToMenu} 
            className="text-[#F5BF42]/60 hover:text-[#F5BF42] transition animate-bounce p-2"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
