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
