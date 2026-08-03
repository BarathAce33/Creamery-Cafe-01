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

  return (
    <div className="min-h-screen bg-[#07130C] text-[#EAF4EE] relative selection:bg-[#F5BF42] selection:text-[#07130C]">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section */}
      <Hero
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Interactive Menu Section */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* Table Reservation Section */}
      <ReservationSection
        onTriggerReservationAutomation={handleTriggerReservationAutomation}
      />

      {/* Google Maps & Location Section */}
      <GoogleMapSection />

      {/* Customer Enquiry Section */}
      <EnquirySection />

      {/* Footer */}
      <Footer onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Floating Toolbar (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsStudioOpen(true)}
          className="p-3 rounded-full bg-[#0F271B] border-2 border-[#F5BF42] text-[#F5BF42] shadow-[0_0_20px_rgba(245,191,66,0.4)] hover:scale-110 active:scale-95 transition"
          title="Build Custom Shake"
        >
          <Wand2 className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsLoyaltyOpen(true)}
          className="p-3 rounded-full bg-[#0F271B] border-2 border-[#10B981] text-[#34D399] shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition"
          title="Gold Loyalty Club"
        >
          <Award className="w-5 h-5" />
        </button>

        {cartItems.length > 0 && (
          <button
            onClick={() => setIsUPIDigitalBillOpen(true)}
            className="p-3 rounded-full bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold shadow-[0_0_25px_rgba(245,191,66,0.6)] hover:scale-110 active:scale-95 transition"
            title="Generate Table UPI Digital Bill"
          >
            <CreditCard className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Slide-over WhatsApp Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onTriggerKitchenOrder={handleTriggerKitchenOrder}
      />

      {/* Café Staff & Kitchen Portal */}
      <AutomationDemoHub
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        kitchenOrders={kitchenOrders}
        reservationPasses={reservationPasses}
      />

      {/* Build-Your-Own Shake Studio Modal */}
      <VisualShakeStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* UPI Digital Table Bill & QR Simulator */}
      <UPIDigitalBillModal
        isOpen={isUPIDigitalBillOpen}
        onClose={() => setIsUPIDigitalBillOpen(false)}
        cartItems={cartItems}
      />

      {/* Creamery Gold Club Loyalty Modal */}
      <LoyaltyRewardsModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
      />

    </div>
  );
}
