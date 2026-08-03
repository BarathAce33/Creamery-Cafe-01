import React, { useState } from 'react';
import { Cpu, X, Printer, TrendingUp, Sliders, Lock, KeyRound, CheckCircle2, ShieldCheck, RefreshCw, Send, PhoneCall, Palette } from 'lucide-react';

export default function AutomationDemoHub({ isOpen, onClose, kitchenOrders, reservationPasses, currentTheme, setCurrentTheme }) {
  const [activeTab, setActiveTab] = useState('kds');
  const [pinEntered, setPinEntered] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [pinError, setPinError] = useState(false);
  
  const [rules, setRules] = useState([
    { id: 'r1', name: 'WhatsApp Receipt Auto-Generator', desc: 'Instantly format & dispatch WhatsApp order confirmation to customer.', active: true },
    { id: 'r2', name: 'Auto-Send 10% Discount Coupon', desc: 'When order total > ₹500, send WhatsApp coupon code for next visit.', active: true },
    { id: 'r3', name: 'Google Review WhatsApp Prompt', desc: 'Auto-send Google Review link 1 hour after table reservation completed.', active: true },
    { id: 'r4', name: 'Low Milkshake Stock Alert', desc: 'Notify kitchen manager when Biscoff/Nutella inventory drops below threshold.', active: true },
    { id: 'r5', name: 'Automated Table Assignment', desc: 'Auto-assign VIP Booth based on party size & occasion tags.', active: true },
  ]);

  const defaultOrders = [
    { id: 'CR-1092', customerName: 'Karthik Raja', phone: '+91 98422 11223', orderType: 'dine-in', tableNumber: 'Table 4', items: [{ name: 'Gold Standard Lotus Biscoff Shake', quantity: 2, price: 220 }], total: 440, timestamp: '10 mins ago', status: 'In Kitchen' },
    { id: 'CR-1091', customerName: 'Divya & Friends', phone: '+91 97900 44332', orderType: 'takeaway', items: [{ name: 'Creamery BBQ Chicken Burger', quantity: 2, price: 230 }, { name: 'Ferrero Rocher Deluxe Shake', quantity: 1, price: 250 }], total: 710, timestamp: '22 mins ago', status: 'Ready for Pickup' },
  ];

  const [orderList, setOrderList] = useState(kitchenOrders.length > 0 ? kitchenOrders : defaultOrders);

  const toggleRule = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinEntered === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrderList(orderList.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handlePrintThermalTicket = (ord) => {
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Kitchen Ticket #${ord.id}</title>
          <style>
            body { font-family: monospace; padding: 10px; width: 280px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 8px; margin-bottom: 8px; }
            .title { font-weight: bold; font-size: 16px; }
            .item { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px; }
            .total { border-top: 1px dashed #000; margin-top: 8px; padding-top: 8px; font-weight: bold; font-size: 14px; text-align: right; }
            .footer { text-align: center; margin-top: 12px; font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">CREAMERY CAFÉ</div>
            <div>PEELAMEDU POS TICKET</div>
            <div>Ticket #${ord.id}</div>
            <div>${new Date().toLocaleString()}</div>
          </div>
          <div>Customer: ${ord.customerName}</div>
          <div>Type: ${ord.orderType.toUpperCase()} ${ord.tableNumber ? '(' + ord.tableNumber + ')' : ''}</div>
          <hr style="border: 0.5px dashed #000; margin: 8px 0;" />
          ${ord.items.map(i => `<div class="item"><span>${i.name} x${i.quantity}</span><span>Rs.${(i.price || 200) * i.quantity}</span></div>`).join('')}
          <div class="total">TOTAL: Rs.${ord.total}</div>
          <div class="footer">*** KITCHEN COPY ***</div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn flex items-center justify-center p-3 sm:p-6">
      
      {/* Outer Container */}
      <div className="relative w-full max-w-5xl rounded-3xl border theme-border theme-bg-sec theme-text-main overflow-hidden shadow-2xl flex flex-col h-[90vh] max-h-[800px]">
        
        {/* Header Bar */}
        <div className="p-5 theme-bg-main border-b theme-border flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl theme-bg-sec border theme-border flex items-center justify-center theme-text-gold">
              <Cpu className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif font-bold text-lg theme-text-gold">
                  CREAMERY CAFÉ STAFF & KITCHEN PORTAL
                </h2>
                <span className="bg-[#10B981]/20 text-[#34D399] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#10B981]/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  LIVE PRODUCTION SYSTEM
                </span>
              </div>
              <p className="text-xs theme-text-sub">
                Peelamedu Branch KDS Stream, POS Thermal Ticket Printer & Sales Management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {setCurrentTheme && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl theme-bg-sec border theme-border">
                <Palette className="w-3.5 h-3.5 theme-text-gold" />
                <select
                  value={currentTheme || 'gold-emerald'}
                  onChange={(e) => setCurrentTheme(e.target.value)}
                  className="bg-transparent theme-text-gold text-xs font-mono font-bold focus:outline-none cursor-pointer"
                  title="Switch Store Theme"
                >
                  <option value="gold-emerald" className="theme-bg-main theme-text-main">🟢 Emerald & Gold</option>
                  <option value="oat-honey" className="theme-bg-main theme-text-main">🌾 Oat & Honey Gold</option>
                  <option value="espresso-caramel" className="theme-bg-main theme-text-main">☕ Espresso Caramel</option>
                </select>
              </div>
            )}

            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className="p-2 rounded-xl theme-bg-sec theme-text-gold border theme-border text-xs font-mono font-bold flex items-center gap-1 transition hover:scale-105"
              title="Lock/Unlock Portal"
            >
              <Lock className="w-4 h-4 text-[#10B981]" />
              <span className="hidden sm:inline">{isAuthenticated ? 'Unlocked' : 'Locked'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full theme-bg-sec theme-text-sub hover:theme-text-gold border theme-border transition hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* PIN Security Gate */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full theme-bg-main border theme-border flex items-center justify-center theme-text-gold">
              <KeyRound className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif theme-text-gold">
              Staff PIN Verification Required
            </h3>
            <p className="text-xs theme-text-sub max-w-xs">
              Enter Peelamedu store manager PIN to access kitchen order stream & POS rules. Default PIN: <strong className="theme-text-gold font-mono">1234</strong>
            </p>

            <form onSubmit={handlePinSubmit} className="flex gap-2 w-full max-w-xs mt-2">
              <input
                type="password"
                maxLength="4"
                value={pinEntered}
                onChange={(e) => setPinEntered(e.target.value)}
                placeholder="PIN (1234)"
                className="w-full px-4 py-2.5 rounded-2xl theme-bg-input border theme-border text-center font-mono text-lg theme-text-gold focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl theme-btn-primary font-extrabold text-xs shadow-md"
              >
                Unlock
              </button>
            </form>

            {pinError && (
              <p className="text-xs text-red-400 font-mono">Invalid PIN. Try 1234.</p>
            )}
          </div>
        ) : (
          /* Authenticated Staff Portal */
          <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 px-6 pt-4 border-b theme-border theme-bg-main">
              <button
                onClick={() => setActiveTab('kds')}
                className={`px-4 py-2.5 rounded-t-2xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition ${
                  activeTab === 'kds'
                    ? 'theme-bg-sec theme-text-gold theme-border font-bold shadow-md'
                    : 'theme-text-sub border-transparent hover:theme-text-gold'
                }`}
              >
                <Printer className="w-4 h-4 theme-text-gold" />
                Kitchen Display System (KDS)
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2.5 rounded-t-2xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition ${
                  activeTab === 'analytics'
                    ? 'theme-bg-sec theme-text-gold theme-border font-bold shadow-md'
                    : 'theme-text-sub border-transparent hover:theme-text-gold'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#34D399]" />
                Live Store Analytics
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2.5 rounded-t-2xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition ${
                  activeTab === 'rules'
                    ? 'theme-bg-sec theme-text-gold theme-border font-bold shadow-md'
                    : 'theme-text-sub border-transparent hover:theme-text-gold'
                }`}
              >
                <Sliders className="w-4 h-4 theme-text-gold" />
                Automated Workflow Rules
              </button>


            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: Kitchen Order Display Stream */}
              {activeTab === 'kds' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider flex items-center gap-2">
                      <Printer className="w-4 h-4 theme-text-gold" />
                      Live Kitchen Order Queue (Peelamedu Branch)
                    </span>
                    <span className="text-[11px] font-mono text-[#34D399] font-bold">
                      {orderList.length} Active Orders
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orderList.map((ord, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl theme-bg-card border theme-border shadow-md space-y-3 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between border-b theme-border pb-3 gap-2">
                          <div>
                            <span className="font-mono text-sm font-extrabold theme-text-gold">
                              Ticket #{ord.id}
                            </span>
                            <span className="text-[10px] theme-text-sub block font-mono">
                              {ord.timestamp || 'Just now'} • {ord.orderType.toUpperCase()} {ord.tableNumber ? `(${ord.tableNumber})` : ''}
                            </span>
                          </div>
                          
                          {/* Status Dropdown */}
                          <select
                            value={ord.status || 'Received'}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className="theme-bg-sec theme-text-gold text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border theme-border shadow-sm"
                          >
                            <option value="Received">Received</option>
                            <option value="In Kitchen">In Kitchen 🍳</option>
                            <option value="Ready for Pickup">Ready for Pickup 🛵</option>
                            <option value="Completed">Completed ✅</option>
                          </select>
                        </div>

                        {/* Items */}
                        <div className="space-y-1.5 text-xs theme-text-main">
                          <span className="text-[10px] font-mono theme-text-sub block">Customer: {ord.customerName} ({ord.phone})</span>
                          {ord.items.map((item, i) => (
                            <div key={i} className="flex justify-between font-mono font-semibold">
                              <span>{item.name} x{item.quantity}</span>
                              <span className="theme-text-gold">₹{(item.price || 200) * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 border-t theme-border flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono font-extrabold theme-text-gold">
                            Total: ₹{ord.total}
                          </span>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handlePrintThermalTicket(ord)}
                              className="px-3 py-1.5 rounded-xl theme-bg-sec border theme-border theme-text-gold font-mono text-[10px] font-bold flex items-center gap-1 hover:opacity-80 transition"
                            >
                              <Printer className="w-3.5 h-3.5 theme-text-gold" />
                              <span>Print POS Ticket</span>
                            </button>

                            <button
                              onClick={() => alert(`WhatsApp notification sent to ${ord.phone}: "Your Creamery order #${ord.id} status is now: ${ord.status || 'In Kitchen'}"`)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-white font-mono text-[10px] font-bold shadow-md hover:bg-[#059669] transition flex items-center gap-1.5 whitespace-nowrap"
                            >
                              <Send className="w-3 h-3 fill-white" />
                              <span>WhatsApp Customer</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: Live Analytics */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass-panel p-5 rounded-2xl border theme-border theme-bg-card">
                      <span className="text-[10px] font-mono theme-text-sub uppercase">Today's Revenue</span>
                      <h3 className="text-2xl font-extrabold font-mono theme-text-gold mt-1">₹18,450</h3>
                      <span className="text-[10px] text-[#34D399] font-mono">↑ +24% vs Last Week</span>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border theme-border theme-bg-card">
                      <span className="text-[10px] font-mono theme-text-sub uppercase">Milkshakes Prepared</span>
                      <h3 className="text-2xl font-extrabold font-mono theme-text-gold mt-1">84 Shakes</h3>
                      <span className="text-[10px] text-[#34D399] font-mono">#1: Gold Lotus Biscoff</span>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border theme-border theme-bg-card">
                      <span className="text-[10px] font-mono theme-text-sub uppercase">WhatsApp Order Share</span>
                      <h3 className="text-2xl font-extrabold font-mono theme-text-gold mt-1">78% Orders</h3>
                      <span className="text-[10px] theme-text-sub font-mono">Zero Aggregator Fees</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Custom Rules Customizer */}
              {activeTab === 'rules' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      Store Automation & Customer Messaging Rules
                    </span>
                  </div>

                  <div className="space-y-3">
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="p-4 rounded-2xl theme-bg-card border theme-border flex items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-xs font-bold theme-text-main font-serif flex items-center gap-2">
                            {rule.name}
                            {rule.active && (
                              <span className="bg-[#10B981]/20 text-[#34D399] text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#10B981]/40">
                                ACTIVE
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] theme-text-sub mt-1">
                            {rule.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleRule(rule.id)}
                          className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                            rule.active ? 'theme-btn-primary justify-end' : 'theme-bg-sec border theme-border justify-start'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full theme-bg-main shadow-md" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}



            </div>
          </>
        )}

        {/* Footer Bar */}
        <div className="p-4 theme-bg-main border-t theme-border flex items-center justify-between text-xs theme-text-sub">
          <span>⚡ Creamery Café Store Management Suite</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl theme-btn-primary font-extrabold text-xs shadow-md hover:scale-105 transition"
          >
            Exit Staff Portal
          </button>
        </div>

      </div>
    </div>
  );
}
