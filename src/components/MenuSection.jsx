import React, { useState } from 'react';
import { menuCategories, menuItems } from '../data/menuData';
import { Sparkles, Search, Filter, Star, Plus, Check, ShoppingBag, X, Milk, Sandwich, IceCream, UtensilsCrossed, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Sparkles,
  Milk,
  Sandwich,
  IceCream,
  UtensilsCrossed,
  Coffee,
};

export default function MenuSection({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);

  // Filtering Logic
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietFilter === 'all' || 
                        (dietFilter === 'veg' && item.isVeg) || 
                        (dietFilter === 'non-veg' && !item.isVeg);
    const matchesBestseller = !showBestsellersOnly || item.isBestseller;
    return matchesCategory && matchesSearch && matchesDiet && matchesBestseller;
  });

  const openCustomization = (item) => {
    setCustomizingItem(item);
    setSelectedAddons([]);
    setItemQuantity(1);
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmAddToCart = () => {
    if (!customizingItem) return;

    onAddToCart(customizingItem, itemQuantity, selectedAddons);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });

    setCustomizingItem(null);
  };

  return (
    <section id="menu" className="py-20 relative bg-[#07130C]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5BF42]" />
            Curated Artisanal Menu
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-gold-gradient drop-shadow-md">
            EXPLORE CREAMERY SPECIALTIES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C1E1CE]">
            Select from our world-famous thickshakes, gourmet charcoal burgers, tender momos & fresh fruit creams. Customized for instant WhatsApp ordering.
          </p>
        </div>

        {/* Search & Diet Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 border border-[#F5BF42]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5BF42]" />
            <input
              type="text"
              placeholder="Search shakes, burgers, momos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#07130C]/80 border border-[#F5BF42]/30 text-xs sm:text-sm text-[#EAF4EE] placeholder-[#C1E1CE]/50 focus:outline-none focus:border-[#F5BF42]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C1E1CE]/60 hover:text-[#F5BF42]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Diet & Bestseller Toggles */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            
            {/* Diet Filter */}
            <div className="bg-[#07130C]/80 p-1 rounded-xl border border-[#F5BF42]/20 flex items-center text-xs font-semibold">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  dietFilter === 'all' ? 'bg-[#F5BF42] text-[#07130C] font-bold' : 'text-[#C1E1CE] hover:text-[#F5BF42]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  dietFilter === 'veg' ? 'bg-[#10B981] text-white font-bold' : 'text-[#C1E1CE] hover:text-[#F5BF42]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                Pure Veg
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                  dietFilter === 'non-veg' ? 'bg-[#EF4444] text-white font-bold' : 'text-[#C1E1CE] hover:text-[#F5BF42]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                Non-Veg
              </button>
            </div>

            {/* Bestseller Toggle */}
            <button
              onClick={() => setShowBestsellersOnly(!showBestsellersOnly)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                showBestsellersOnly
                  ? 'bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] border-[#F5BF42] font-bold shadow-md'
                  : 'bg-[#0F271B] border-[#F5BF42]/30 text-[#F5BF42] hover:bg-[#F5BF42]/10'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-[#F5BF42] text-[#F5BF42]" />
              Bestsellers
            </button>

          </div>

        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {menuCategories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-bold shadow-[0_0_15px_rgba(245,191,66,0.4)]'
                    : 'bg-[#0F271B]/80 text-[#C1E1CE] border border-[#F5BF42]/20 hover:border-[#F5BF42]/60 hover:text-[#F5BF42]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-[#F5BF42]/20">
            <p className="text-[#C1E1CE] text-lg">No culinary items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietFilter('all');
                setShowBestsellersOnly(false);
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#F5BF42] text-[#07130C] font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-[#F5BF42]/20 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-[#07130C]">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Diet Indicator Badge */}
                    <div className="absolute top-3 left-3 bg-[#07130C]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></span>
                      <span className="text-[10px] font-mono font-bold text-white uppercase">
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>

                    {/* Bestseller Flag */}
                    {item.isBestseller && (
                      <div className="absolute top-3 right-3 bg-[#F5BF42] text-[#07130C] border border-[#F5BF42] text-[10px] font-mono font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#07130C]" />
                        GOLD FAVORITE
                      </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 bg-[#07130C]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#F5BF42]/30 text-[#F5BF42] text-xs font-mono font-bold flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-[#F5BF42] text-[#F5BF42]" />
                      {item.rating} ({item.reviewsCount})
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5">
                    <span className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider block font-medium">
                      {item.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-[#EAF4EE] mt-1 font-serif group-hover:text-[#F5BF42] transition">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#C1E1CE]/80 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Price & Add Button */}
                <div className="p-5 pt-0 flex items-center justify-between mt-2 border-t border-[#F5BF42]/10 pt-4">
                  <div>
                    <span className="text-[10px] text-[#C1E1CE]/60 block uppercase font-mono">Price</span>
                    <span className="text-xl font-extrabold text-[#F5BF42] font-mono">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => openCustomization(item)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-bold text-xs shadow-md hover:shadow-[0_0_20px_rgba(245,191,66,0.5)] hover:scale-105 transition active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0F271B] rounded-3xl border border-[#F5BF42]/30 overflow-hidden shadow-2xl p-6">
            
            {/* Modal Close */}
            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#07130C] text-[#C1E1CE] hover:text-[#F5BF42] border border-[#F5BF42]/30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <img 
                src={customizingItem.image} 
                alt={customizingItem.name} 
                className="w-16 h-16 rounded-2xl object-cover border border-[#F5BF42]/30"
              />
              <div>
                <span className="text-[10px] font-mono text-[#34D399] font-bold uppercase">
                  {customizingItem.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
                <h3 className="text-lg font-bold text-[#EAF4EE] font-serif">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-[#F5BF42] font-mono font-bold">
                  Base Price: ₹{customizingItem.price}
                </p>
              </div>
            </div>

            {/* Addons Selection */}
            {customizingItem.customizations && customizingItem.customizations.length > 0 && (
              <div className="mt-6">
                <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-3">
                  Customize & Add Extras:
                </label>
                <div className="space-y-2">
                  {customizingItem.customizations.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.name === addon.name);
                    return (
                      <div
                        key={addon.name}
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          isSelected
                            ? 'bg-[#1A3E2B] border-[#F5BF42] text-[#F5BF42]'
                            : 'bg-[#07130C]/80 border-[#F5BF42]/20 text-[#C1E1CE] hover:border-[#F5BF42]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-xs font-semibold">
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                            isSelected ? 'bg-[#F5BF42] border-[#F5BF42] text-[#07130C]' : 'border-[#F5BF42]/30'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#34D399] font-bold">
                          {addon.price > 0 ? `+₹${addon.price}` : 'Free'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Total */}
            <div className="mt-6 pt-4 border-t border-[#F5BF42]/20 flex items-center justify-between">
              
              <div className="flex items-center gap-3 bg-[#07130C] p-1.5 rounded-xl border border-[#F5BF42]/30">
                <button
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  className="w-8 h-8 rounded-lg bg-[#0F271B] text-[#F5BF42] font-bold flex items-center justify-center hover:bg-[#F5BF42]/20"
                >
                  -
                </button>
                <span className="font-mono text-sm font-bold text-[#EAF4EE] px-2">
                  {itemQuantity}
                </span>
                <button
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#0F271B] text-[#F5BF42] font-bold flex items-center justify-center hover:bg-[#F5BF42]/20"
                >
                  +
                </button>
              </div>

              {/* Total Calculation */}
              <div className="text-right">
                <span className="text-[10px] text-[#C1E1CE]/60 block uppercase font-mono">Item Total</span>
                <span className="text-xl font-extrabold text-[#F5BF42] font-mono">
                  ₹{(customizingItem.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)) * itemQuantity}
                </span>
              </div>

            </div>

            {/* Confirm Add Button */}
            <button
              onClick={handleConfirmAddToCart}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-sm shadow-lg hover:shadow-[0_0_25px_rgba(245,191,66,0.6)] transition"
            >
              Add to WhatsApp Order Cart
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
