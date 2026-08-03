import React, { useState, useEffect } from 'react';
import { Wand2, Sparkles, Plus, Check, ShoppingBag, RotateCcw, X, Star, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VisualShakeStudio({ isOpen, onClose, onAddToCart }) {
  const [baseMilk, setBaseMilk] = useState('Whole Cream Milk');
  const [flavorBase, setFlavorBase] = useState('Lotus Biscoff Cream');
  const [sweetnessLevel, setSweetnessLevel] = useState('Balanced (75%)');
  const [toppings, setToppings] = useState(['Biscoff Crumbs', 'Whipped Cream']);
  const [shakeThickness, setShakeThickness] = useState('Ultra Thick & Rich');
  const [shakeName, setShakeName] = useState('My Signature Biscoff Creation');
  const [isPouring, setIsPouring] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsPouring(true);
      const timer = setTimeout(() => setIsPouring(false), 800);
      return () => clearTimeout(timer);
    }
  }, [flavorBase, baseMilk, shakeThickness, isOpen]);

  if (!isOpen) return null;

  const bases = [
    { id: 'Whole Cream Milk', label: 'Whole Cream Milk', extra: 0 },
    { id: 'Oat Milk (Dairy-Free)', label: 'Oat Milk (Vegan)', extra: 30 },
    { id: 'Almond Milk', label: 'Almond Milk', extra: 35 },
  ];

  const flavors = [
    { id: 'Lotus Biscoff Cream', label: 'Lotus Biscoff Crunch', price: 210, color: '#D49819', glow: '#F5BF42' },
    { id: 'Ferrero Rocher Hazelnut', label: 'Ferrero Rocher Fudge', price: 240, color: '#5D4037', glow: '#8D6E63' },
    { id: 'Mahabaleshwar Strawberry', label: 'Mahabaleshwar Strawberry', price: 220, color: '#E91E63', glow: '#F48FB1' },
    { id: 'Nutella Brownie Blast', label: 'Nutella Brownie Blast', price: 230, color: '#3E2723', glow: '#6D4C41' },
    { id: 'Real Sitaphal Fresh Cream', label: 'Sitaphal Custard Apple', price: 250, color: '#4CAF50', glow: '#81C784' },
  ];

  const availableToppings = [
    { id: 'Biscoff Crumbs', label: 'Biscoff Crumbs', price: 25, icon: '🍪' },
    { id: 'Whipped Cream', label: 'Vanilla Whipped Cream', price: 20, icon: '🍦' },
    { id: 'Nutella Drizzle', label: 'Nutella Drizzle', price: 30, icon: '🍫' },
    { id: 'Roasted Hazelnut Bits', label: 'Roasted Hazelnut Bits', price: 35, icon: '🌰' },
    { id: 'Belgian Chocolate Chunks', label: 'Belgian Chocolate Chunks', price: 30, icon: '🍬' },
  ];

  const toggleTopping = (toppingId) => {
    if (toppings.includes(toppingId)) {
      setToppings(toppings.filter(t => t !== toppingId));
    } else {
      setToppings([...toppings, toppingId]);
    }
  };

  const selectedFlavorObj = flavors.find(f => f.id === flavorBase) || flavors[0];
  const baseObj = bases.find(b => b.id === baseMilk) || bases[0];
  
  const toppingsPrice = toppings.reduce((sum, tId) => {
    const t = availableToppings.find(item => item.id === tId);
    return sum + (t ? t.price : 0);
  }, 0);

  const totalPrice = selectedFlavorObj.price + baseObj.extra + toppingsPrice;

  const handleAddCustomShakeToCart = () => {
    const customItem = {
      id: `custom-shake-${Date.now()}`,
      name: shakeName || `Custom ${selectedFlavorObj.label} Shake`,
      tagline: 'Custom Studio Creation',
      category: 'thickshakes',
      price: totalPrice,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      description: `Base: ${baseMilk} | Thickness: ${shakeThickness} | Toppings: ${toppings.join(', ')}`,
      isVeg: true,
      customizations: toppings.map(t => ({ name: t, price: 0 }))
    };

    onAddToCart(customItem, 1, []);

    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });

    onClose();
  };

  const liquidHeightPercent = shakeThickness === 'Ultra Thick & Rich' ? 86 : 74;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-[#F5BF42]/40 bg-[#0F271B] text-[#EAF4EE] overflow-hidden shadow-[0_0_60px_rgba(245,191,66,0.25)] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#07130C] border-b border-[#F5BF42]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5BF42]/10 border border-[#F5BF42]/30 flex items-center justify-center text-[#F5BF42] animate-bounce">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-gold-gradient">
                BUILD-YOUR-OWN SHAKE STUDIO
              </h2>
              <p className="text-xs text-[#A7F3D0]">
                Customize base milk, flavor profile, thickness & toppings in real-time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0F271B] text-[#C1E1CE] hover:text-[#F5BF42] border border-[#F5BF42]/20 transition hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Workspace */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Animated Visual Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#07130C]/90 border border-[#F5BF42]/20 relative shadow-inner overflow-hidden">
            
            {/* Ambient Backlight Glow */}
            <div 
              className="absolute w-48 h-48 rounded-full blur-[60px] opacity-60 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: selectedFlavorObj.glow }}
            />

            {/* Pouring Stream Animation */}
            {isPouring && (
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 rounded-full animate-pulse z-30 transition-all duration-300"
                style={{ 
                  height: '140px',
                  backgroundColor: selectedFlavorObj.color,
                  boxShadow: `0 0 15px ${selectedFlavorObj.glow}`
                }}
              />
            )}

            {/* Visual Glass Cup Render */}
            <div className="relative w-44 h-64 rounded-b-[40px] border-4 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-end overflow-hidden p-2 transition-all duration-500 bg-[#0F271B]/70 backdrop-blur-md">
              
              {/* Glass Reflection Highlight */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

              {/* Rising Effervescent Bubbles */}
              <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-white/30 absolute bottom-4 left-6 animate-bounce" style={{ animationDuration: '2.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 absolute bottom-8 right-8 animate-bounce" style={{ animationDuration: '1.8s' }} />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 absolute bottom-12 left-12 animate-bounce" style={{ animationDuration: '2.6s' }} />
              </div>

              {/* Animated Shake Liquid */}
              <div 
                className="w-full rounded-b-[32px] transition-all duration-700 ease-out relative overflow-hidden shadow-inner"
                style={{ 
                  height: `${liquidHeightPercent}%`,
                  backgroundColor: selectedFlavorObj.color,
                  boxShadow: `inset 0 0 20px rgba(0,0,0,0.4), 0 0 30px ${selectedFlavorObj.glow}60`
                }}
              >
                {/* Surface Liquid Wave */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-white/20 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/20 pointer-events-none" />
              </div>

              {/* Animated Whipped Cream Top */}
              {toppings.includes('Whipped Cream') && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-36 h-12 bg-white rounded-full blur-[0.5px] shadow-[0_5px_20px_rgba(255,255,255,0.6)] flex items-center justify-center animate-float z-25">
                  <span className="text-[11px] text-[#07130C] font-extrabold tracking-wider uppercase font-mono">
                    Vanilla Whipped
                  </span>
                </div>
              )}

              {/* Toppings Sprinkles Overlay */}
              <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 z-28 pointer-events-none">
                {toppings.filter(t => t !== 'Whipped Cream').map((tId) => {
                  const tObj = availableToppings.find(a => a.id === tId);
                  return (
                    <span key={tId} className="text-sm animate-bounce" style={{ animationDuration: '1.5s' }}>
                      {tObj?.icon || '✨'}
                    </span>
                  );
                })}
              </div>

            </div>

            {/* Title Input Field */}
            <div className="mt-6 text-center w-full px-2 z-10">
              <input
                type="text"
                value={shakeName}
                onChange={(e) => setShakeName(e.target.value)}
                className="w-full text-center font-serif text-base sm:text-lg font-bold text-[#F5BF42] bg-[#07130C] border-b-2 border-[#F5BF42]/40 focus:border-[#F5BF42] focus:outline-none px-3 py-1.5 rounded-t-xl transition shadow-md"
                placeholder="My Signature Creation"
              />
              <span className="font-mono text-2xl font-extrabold text-[#F5BF42] block mt-3 drop-shadow-[0_2px_10px_rgba(245,191,66,0.5)]">
                ₹{totalPrice}
              </span>
            </div>

          </div>

          {/* Right Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Base Flavor */}
            <div>
              <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2.5">
                1. Select Flavor Profile:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {flavors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFlavorBase(f.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-left border transition-all duration-200 flex items-center justify-between ${
                      flavorBase === f.id
                        ? 'bg-[#F5BF42] text-[#07130C] border-[#F5BF42] shadow-[0_0_18px_rgba(245,191,66,0.45)] font-bold scale-[1.02]'
                        : 'bg-[#07130C] text-[#C1E1CE] border-[#F5BF42]/20 hover:border-[#F5BF42]/50 hover:text-[#F5BF42]'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className="font-mono font-extrabold ml-1">₹{f.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Milk */}
            <div>
              <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2.5">
                2. Select Milk Base:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {bases.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBaseMilk(b.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition ${
                      baseMilk === b.id
                        ? 'bg-[#10B981] text-white font-bold border-[#10B981] shadow-md'
                        : 'bg-[#07130C] text-[#C1E1CE] border-[#F5BF42]/20 hover:border-[#F5BF42]/40'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings Selection */}
            <div>
              <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2.5">
                3. Choose Crunch & Toppings:
              </label>
              <div className="space-y-2">
                {availableToppings.map((t) => {
                  const isSelected = toppings.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#1A3E2B] border-[#F5BF42] text-[#F5BF42] shadow-sm'
                          : 'bg-[#07130C] border-[#F5BF42]/20 text-[#C1E1CE] hover:border-[#F5BF42]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? 'bg-[#F5BF42] border-[#F5BF42] text-[#07130C]' : 'border-[#F5BF42]/30'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="flex items-center gap-1.5">
                          <span>{t.icon}</span>
                          <span>{t.label}</span>
                        </span>
                      </div>
                      <span className="font-mono text-[#34D399] font-bold">+₹{t.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-5 bg-[#07130C] border-t border-[#F5BF42]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#C1E1CE] uppercase font-mono">Total Price:</span>
            <span className="font-mono text-xl font-extrabold text-[#F5BF42]">₹{totalPrice}</span>
          </div>
          <button
            onClick={handleAddCustomShakeToCart}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-xs shadow-[0_0_20px_rgba(245,191,66,0.4)] hover:shadow-[0_0_30px_rgba(245,191,66,0.7)] hover:scale-105 transition flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add Custom Creation to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
