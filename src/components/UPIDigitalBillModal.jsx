import React, { useState } from 'react';
import { QrCode, X, CheckCircle2, ShieldCheck, Share2, Receipt, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UPIDigitalBillModal({ isOpen, onClose, billData }) {
  const [paymentDone, setPaymentDone] = useState(false);

  if (!isOpen || !billData) return null;

  const handleSimulatePaymentSuccess = () => {
    setPaymentDone(true);
    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md animate-fadeIn flex items-center justify-center p-4">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-[#F5BF42]/30 bg-[#0F271B] text-[#EAF4EE] overflow-hidden shadow-2xl p-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#07130C] text-[#C1E1CE] hover:text-[#F5BF42] border border-[#F5BF42]/20"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentDone ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center text-[#10B981] mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-gold-gradient">
              Payment Verified!
            </h3>
            <p className="text-xs text-[#C1E1CE]">
              Digital GST Receipt generated and dispatched to your WhatsApp number.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#F5BF42] text-[#07130C] font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#07130C] border border-[#F5BF42]/30 flex items-center justify-center text-[#F5BF42]">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gold-gradient">
                  TABLE DIGITAL BILL & UPI
                </h3>
                <p className="text-xs text-[#A7F3D0] font-mono">
                  Bill #{billData.billId || 'CR-8821'} • Table 4
                </p>
              </div>
            </div>

            {/* Bill breakdown */}
            <div className="p-4 rounded-2xl bg-[#07130C] border border-[#F5BF42]/20 space-y-2 text-xs">
              <div className="flex justify-between font-mono font-bold text-[#EAF4EE]">
                <span>Gold Lotus Biscoff Shake x2</span>
                <span>₹440</span>
              </div>
              <div className="flex justify-between font-mono font-bold text-[#EAF4EE]">
                <span>BBQ Chicken Burger x1</span>
                <span>₹230</span>
              </div>
              <div className="pt-2 border-t border-[#F5BF42]/20 flex justify-between font-mono font-extrabold text-sm text-[#F5BF42]">
                <span>Total Due:</span>
                <span>₹670</span>
              </div>
            </div>

            {/* Mock Dynamic QR Code */}
            <div className="p-4 rounded-2xl bg-[#07130C] border border-[#F5BF42]/20 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center text-[#07130C]">
                <QrCode className="w-32 h-32 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-mono text-[#F5BF42] font-bold">
                Scan with GPay / PhonePe / Paytm / BHIM UPI
              </span>
            </div>

            {/* Simulate Payment Button */}
            <button
              onClick={handleSimulatePaymentSuccess}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-xs shadow-lg transition"
            >
              Simulate Instant UPI Payment (₹670)
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
