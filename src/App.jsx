import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import ReservationSection from './components/ReservationSection';
import GoogleMapSection from './components/GoogleMapSection';
import EnquirySection from './components/EnquirySection';
import AutomationDemoHub from './components/AutomationDemoHub';
import VisualShakeStudio from './components/VisualShakeStudio';
import UPIDigitalBillModal from './components/UPIDigitalBillModal';
import LoyaltyRewardsModal from './components/LoyaltyRewardsModal';
import Footer from './components/Footer';
import { Wand2, CreditCard, Award } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('menu');

  // Live Theme Switcher State: 'gold-emerald' | 'oat-honey' | 'espresso-caramel'
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('creamery_theme') || 'gold-emerald';
    } catch {
      return 'gold-emerald';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('creamery_theme', currentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  // Initialize state with localStorage persistence for production
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('creamery_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [kitchenOrders, setKitchenOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('creamery_kitchen_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reservationPasses, setReservationPasses] = useState(() => {
    try {
      const saved = localStorage.getItem('creamery_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isUPIDigitalBillOpen, setIsUPIDigitalBillOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('creamery_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('creamery_kitchen_orders', JSON.stringify(kitchenOrders));
    } catch (e) {
      console.error(e);
    }
  }, [kitchenOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('creamery_reservations', JSON.stringify(reservationPasses));
    } catch (e) {
      console.error(e);
    }
  }, [reservationPasses]);

  // Add Item to Cart
  const handleAddToCart = (item, quantity, selectedAddons) => {
    const existingIndex = cartItems.findIndex(
      (cItem) => cItem.id === item.id && 
                 JSON.stringify(cItem.addons) === JSON.stringify(selectedAddons)
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...item, quantity, addons: selectedAddons }]);
    }

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      const updated = [...cartItems];
      updated[index].quantity = newQty;
      setCartItems(updated);
    }
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleTriggerKitchenOrder = (newOrder) => {
    setKitchenOrders([newOrder, ...kitchenOrders]);
  };

  const handleTriggerReservationAutomation = (newPass) => {
    setReservationPasses([newPass, ...reservationPasses]);
  };

  const cartTotalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen theme-bg-main theme-text-main relative selection:bg-[#F5BF42] selection:text-[#07130C]">
      
      {/* Navigation Bar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />

      {/* Main Page Layout Sections */}
      <main>
        <Hero
          onOpenCart={() => setIsCartOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
        />

        <MenuSection
          onAddToCart={handleAddToCart}
        />

        <ReservationSection
          onTriggerReservationAutomation={handleTriggerReservationAutomation}
        />

        <GoogleMapSection />

        <EnquirySection />
      </main>

      {/* Footer */}
      <Footer onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Floating Action Quick Trigger Bar (Mobile & Desktop) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F271B]/95 border border-[#F5BF42]/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] animate-float">
        <button
          onClick={() => setIsStudioOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07130C] border border-[#F5BF42]/30 text-xs font-mono font-bold text-[#F5BF42] hover:bg-[#F5BF42]/20 transition"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#F5BF42]" />
          <span>Build Shake</span>
        </button>

        <span className="text-[#F5BF42]/30">•</span>

        <button
          onClick={() => setIsLoyaltyOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07130C] border border-[#10B981]/30 text-xs font-mono font-bold text-[#34D399] hover:bg-[#10B981]/20 transition"
        >
          <Award className="w-3.5 h-3.5 text-[#34D399]" />
          <span>340 Gold Coins</span>
        </button>

        <span className="text-[#F5BF42]/30">•</span>

        <button
          onClick={() => setIsUPIDigitalBillOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] text-xs font-mono font-extrabold shadow-md hover:scale-105 transition"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>UPI Bill</span>
        </button>
      </div>

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onTriggerKitchenOrder={handleTriggerKitchenOrder}
      />

      <AutomationDemoHub
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        kitchenOrders={kitchenOrders}
        reservationPasses={reservationPasses}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />

      <VisualShakeStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <UPIDigitalBillModal
        isOpen={isUPIDigitalBillOpen}
        onClose={() => setIsUPIDigitalBillOpen(false)}
        billData={{ billId: 'CR-8821', table: 'Table 4', total: 670 }}
      />

      <LoyaltyRewardsModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
      />

    </div>
  );
}
