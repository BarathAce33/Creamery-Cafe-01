import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Send, CheckCircle2, AlertCircle, Utensils, Home, Bike } from 'lucide-react';
import { cafeInfo } from '../data/menuData';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onTriggerKitchenOrder }) {
  const [orderType, setOrderType] = useState('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate Totals
  const subtotal = cartItems.reduce((sum, item) => {
    const addonsTotal = item.addons ? item.addons.reduce((aSum, a) => aSum + a.price, 0) : 0;
    return sum + (item.price + addonsTotal) * item.quantity;
  }, 0);

  const packingFee = orderType === 'delivery' ? 25 : 0;
  const grandTotal = subtotal + packingFee;

  const handleSendWhatsApp = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) return;

    let msg = `✨ *NEW ORDER - CREAMERY CAFÉ* ✨\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Customer Name:* ${customerName || 'Valued Guest'}\n`;
    if (customerPhone) msg += `📱 *Phone:* ${customerPhone}\n`;
    msg += `📍 *Order Type:* ${orderType.toUpperCase()} `;
    if (orderType === 'dine-in') msg += `(${tableNumber})`;
    if (orderType === 'delivery') msg += `\n🏠 *Address:* ${deliveryAddress || 'Peelamedu'}`;
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🛍️ *ORDER ITEMS:*\n\n`;

    cartItems.forEach((item, index) => {
      const addonsTotal = item.addons ? item.addons.reduce((aSum, a) => aSum + a.price, 0) : 0;
      const itemPriceTotal = (item.price + addonsTotal) * item.quantity;

      msg += `${index + 1}. *${item.name}* (x${item.quantity})\n`;
      if (item.addons && item.addons.length > 0) {
        msg += `   └ Extras: ${item.addons.map(a => a.name).join(', ')}\n`;
      }
      msg += `   └ Price: ₹${itemPriceTotal}\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    if (specialInstructions) msg += `📝 *Notes:* ${specialInstructions}\n`;
    msg += `💰 *TOTAL AMOUNT: ₹${grandTotal}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `⚡ _Sent via Creamery Café Automated Web Portal_`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/${cafeInfo.whatsappNumber}?text=${encodedMsg}`;

    if (onTriggerKitchenOrder) {
      onTriggerKitchenOrder({
        id: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName || 'Valued Guest',
        phone: customerPhone || '+91 98422 98765',
        orderType,
        tableNumber,
        items: cartItems,
        total: grandTotal,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    window.open(whatsappUrl, '_blank');

    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F271B] border-l border-[#F5BF42]/30 text-[#EAF4EE] flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-[#F5BF42]/20 flex items-center justify-between bg-[#07130C]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F5BF42]/10 border border-[#F5BF42]/30 flex items-center justify-center text-[#F5BF42]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-gold-gradient">
                  Your WhatsApp Cart
                </h2>
                <p className="text-xs text-[#A7F3D0]">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#0F271B] text-[#C1E1CE] hover:text-[#F5BF42] border border-[#F5BF42]/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Overlay */}
          {orderSuccess ? (
            <div className="p-8 text-center flex flex-col items-center justify-center my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center text-[#10B981] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-gold-gradient">
                Order Sent to WhatsApp!
              </h3>
              <p className="text-xs text-[#C1E1CE] max-w-xs">
                Your order details have been formatted and dispatched to Creamery Café WhatsApp. Kitchen display ticket has been auto-generated!
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="p-8 text-center flex flex-col items-center justify-center my-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#07130C] border border-[#F5BF42]/20 flex items-center justify-center text-[#F5BF42]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#EAF4EE]">Your Cart is Empty</h3>
              <p className="text-xs text-[#C1E1CE]/70 max-w-xs">
                Explore our legendary Lotus Biscoff milkshakes, burgers and momos to add items to your cart.
              </p>
            </div>
          ) : (
            /* Items List & Order Form */
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Cart Items List */}
              <div className="space-y-3">
                {cartItems.map((item, idx) => {
                  const addonsTotal = item.addons ? item.addons.reduce((sum, a) => sum + a.price, 0) : 0;
                  const itemPrice = (item.price + addonsTotal) * item.quantity;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#07130C]/80 border border-[#F5BF42]/20 flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#F5BF42]/30"
                      />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-[#EAF4EE] font-serif">
                          {item.name}
                        </h4>
                        {item.addons && item.addons.length > 0 && (
                          <p className="text-[10px] text-[#34D399] mt-0.5">
                            + {item.addons.map(a => a.name).join(', ')}
                          </p>
                        )}
                        <span className="text-xs font-mono text-[#F5BF42] font-bold mt-1 block">
                          ₹{itemPrice}
                        </span>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2 bg-[#0F271B] px-2 py-1 rounded-xl border border-[#F5BF42]/30">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="text-xs text-[#F5BF42] font-bold px-1 hover:scale-110"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono font-bold text-[#EAF4EE]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="text-xs text-[#F5BF42] font-bold px-1 hover:scale-110"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#EF4444] p-1.5 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Order Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block">
                  Order Preference:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                      orderType === 'dine-in'
                        ? 'bg-[#F5BF42] text-[#07130C] border-[#F5BF42]'
                        : 'bg-[#07130C] text-[#C1E1CE] border-[#F5BF42]/20'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    Dine-In
                  </button>

                  <button
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                      orderType === 'takeaway'
                        ? 'bg-[#F5BF42] text-[#07130C] border-[#F5BF42]'
                        : 'bg-[#07130C] text-[#C1E1CE] border-[#F5BF42]/20'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    Takeaway
                  </button>

                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                      orderType === 'delivery'
                        ? 'bg-[#F5BF42] text-[#07130C] border-[#F5BF42]'
                        : 'bg-[#07130C] text-[#C1E1CE] border-[#F5BF42]/20'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Delivery
                  </button>
                </div>
              </div>

              {/* Dynamic Order Details Inputs */}
              <div className="space-y-3 pt-2">
                
                {orderType === 'dine-in' && (
                  <div>
                    <label className="text-[11px] text-[#A7F3D0] font-mono block mb-1">Table Number:</label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#07130C] border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                    >
                      <option value="Table 1">Table 1 (Window Lounge)</option>
                      <option value="Table 2">Table 2 (Window Lounge)</option>
                      <option value="Table 3">Table 3 (Main Dining)</option>
                      <option value="Table 4">Table 4 (Main Dining)</option>
                      <option value="VIP Booth 1">VIP Booth 1 (Garden View)</option>
                    </select>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-[11px] text-[#A7F3D0] font-mono block mb-1">Delivery Address (Peelamedu area):</label>
                    <input
                      type="text"
                      placeholder="Street name, door no, landmark..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#07130C] border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-[#A7F3D0] font-mono block mb-1">Your Name:</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#07130C] border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#A7F3D0] font-mono block mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#07130C] border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#A7F3D0] font-mono block mb-1">Special Notes (optional):</label>
                  <input
                    type="text"
                    placeholder="Less sugar, extra spicy schezwan, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#07130C] border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                  />
                </div>

              </div>

            </div>
          )}

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && !orderSuccess && (
            <div className="p-6 border-t border-[#F5BF42]/20 bg-[#07130C] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#C1E1CE]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F5BF42]">₹{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#C1E1CE]">
                    <span>Packing & Express Delivery</span>
                    <span className="font-mono text-[#F5BF42]">₹{packingFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#EAF4EE] font-bold text-sm pt-2 border-t border-[#F5BF42]/20">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg text-[#F5BF42] font-extrabold">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-sm shadow-[0_0_25px_rgba(245,191,66,0.5)] hover:shadow-[0_0_35px_rgba(245,191,66,0.8)] transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-[#07130C]" />
                <span>Send WhatsApp Order & Generate Ticket</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
