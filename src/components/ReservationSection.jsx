import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, CheckCircle, QrCode, Share2, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cafeInfo } from '../data/menuData';

export default function ReservationSection({ onTriggerReservationAutomation }) {
  const [reservationDate, setReservationDate] = useState('2026-08-05');
  const [reservationTime, setReservationTime] = useState('07:30 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingZone, setSeatingZone] = useState('lounge');
  const [occasion, setOccasion] = useState('Casual Dining');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const [confirmedPass, setConfirmedPass] = useState(null);

  const timeSlots = [
    '12:30 PM', '01:40 PM', '04:00 PM', '06:00 PM', '07:30 PM', '09:00 PM', '10:15 PM'
  ];

  const seatingZones = [
    { id: 'lounge', name: 'Emerald Lounge', tag: 'Indoor AC • Ambient Lighting', icon: '🛋️' },
    { id: 'terrace', name: 'Garden Terrace', tag: 'Outdoor Breezy • Peelamedu View', icon: '🌿' },
    { id: 'vip', name: 'Gold VIP Booth', tag: 'Private Soft Leather Seating', icon: '👑' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number for the table reservation pass.');
      return;
    }

    const passData = {
      id: `CR-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      date: reservationDate,
      time: reservationTime,
      guests: guestsCount,
      zone: seatingZones.find(z => z.id === seatingZone)?.name || 'Main Lounge',
      occasion,
      note: specialNote,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConfirmedPass(passData);

    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });

    if (onTriggerReservationAutomation) {
      onTriggerReservationAutomation(passData);
    }
  };

  const handleWhatsAppSharePass = () => {
    if (!confirmedPass) return;
    const msg = `🎉 *CREAMERY CAFÉ TABLE RESERVATION PASS* 🎉\n` +
      `Pass ID: *${confirmedPass.id}*\n` +
      `Guest Name: *${confirmedPass.name}*\n` +
      `Guests: *${confirmedPass.guests} Persons*\n` +
      `Date & Time: *${confirmedPass.date} at ${confirmedPass.time}*\n` +
      `Zone: *${confirmedPass.zone}*\n` +
      `Location: Peelamedu, Coimbatore\n` +
      `_Status: AUTO-CONFIRMED & RESERVED_`;
    window.open(`https://wa.me/${confirmedPass.phone.replace(/[^0-9]/g, '') || cafeInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="reservations" className="py-20 relative bg-[#07130C]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <CalendarIcon className="w-3.5 h-3.5 text-[#F5BF42]" />
            Instant Booking Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-gold-gradient drop-shadow-md">
            RESERVE A VIP TABLE AT PEELAMEDU
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C1E1CE]">
            Skip the waiting queue. Select your preferred seating zone, date & time to generate your instant digital reservation pass.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#F5BF42]/30">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Date & Time Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#07130C]/90 border border-[#F5BF42]/30 text-sm text-[#EAF4EE] font-mono focus:border-[#F5BF42] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2">
                    Guest Count ({guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}):
                  </label>
                  <div className="flex items-center gap-3 bg-[#07130C]/90 p-2 rounded-xl border border-[#F5BF42]/30">
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      className="w-full accent-[#F5BF42]"
                    />
                    <span className="font-mono text-sm font-bold text-[#F5BF42] min-w-[28px] text-center">
                      {guestsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Slots Pills */}
              <div>
                <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2.5">
                  Available Time Slot:
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setReservationTime(slot)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition ${
                        reservationTime === slot
                          ? 'bg-[#F5BF42] text-[#07130C] shadow-[0_0_15px_rgba(245,191,66,0.5)]'
                          : 'bg-[#07130C]/80 text-[#C1E1CE] border border-[#F5BF42]/20 hover:border-[#F5BF42]/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Zone Cards */}
              <div>
                <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-2.5">
                  Seating Ambiance:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {seatingZones.map((zone) => (
                    <div
                      key={zone.id}
                      onClick={() => setSeatingZone(zone.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        seatingZone === zone.id
                          ? 'bg-[#1A3E2B] border-[#F5BF42] text-[#F5BF42]'
                          : 'bg-[#07130C]/80 border-[#F5BF42]/20 text-[#C1E1CE] hover:border-[#F5BF42]/40'
                      }`}
                    >
                      <div className="text-xl mb-1">{zone.icon}</div>
                      <h4 className="text-xs font-bold text-[#EAF4EE] font-serif">{zone.name}</h4>
                      <p className="text-[10px] text-[#A7F3D0] mt-0.5">{zone.tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07130C]/90 border border-[#F5BF42]/30 text-xs text-[#EAF4EE] focus:border-[#F5BF42] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-1">
                    Mobile Number (For Pass):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07130C]/90 border border-[#F5BF42]/30 text-xs text-[#EAF4EE] focus:border-[#F5BF42] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Occasion & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-1">
                    Occasion:
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07130C]/90 border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                  >
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Birthday Celebration">Birthday Party 🎉</option>
                    <option value="Anniversary">Anniversary 💕</option>
                    <option value="Business Meet">Business Meet 💼</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block mb-1">
                    Special Requests:
                  </label>
                  <input
                    type="text"
                    placeholder="Quiet corner, high chair, cake setup..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07130C]/90 border border-[#F5BF42]/30 text-xs text-[#EAF4EE]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5BF42] to-[#E5B239] text-[#07130C] font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(245,191,66,0.4)] hover:shadow-[0_0_35px_rgba(245,191,66,0.7)] transition"
              >
                Generate Instant Digital VIP Pass
              </button>

            </form>
          </div>

          {/* Digital VIP Pass Render Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {confirmedPass ? (
              <div className="w-full glass-panel rounded-2xl border-2 border-[#F5BF42] p-6 shadow-2xl animate-fadeIn relative overflow-hidden bg-[#0F271B]">
                
                {/* Pass Header */}
                <div className="flex items-center justify-between border-b border-[#F5BF42]/20 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="Logo" className="w-9 h-9 rounded-full border border-[#F5BF42]" />
                    <div>
                      <h4 className="font-serif font-bold text-gold-gradient text-sm">CREAMERY VIP PASS</h4>
                      <p className="text-[10px] text-[#34D399] font-mono">RESERVATION VERIFIED</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#F5BF42] font-bold bg-[#07130C] px-2.5 py-1 rounded-full border border-[#F5BF42]/40">
                    {confirmedPass.id}
                  </span>
                </div>

                {/* Pass Content Grid */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#C1E1CE] font-mono">Guest Name:</span>
                    <span className="font-bold text-[#EAF4EE] font-serif">{confirmedPass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C1E1CE] font-mono">Party Size:</span>
                    <span className="font-mono font-bold text-[#F5BF42]">{confirmedPass.guests} Persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C1E1CE] font-mono">Date & Time:</span>
                    <span className="font-mono font-bold text-[#EAF4EE]">{confirmedPass.date} @ {confirmedPass.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C1E1CE] font-mono">Reserved Zone:</span>
                    <span className="font-bold text-[#34D399]">{confirmedPass.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C1E1CE] font-mono">Location:</span>
                    <span className="text-[#EAF4EE]">Peelamedu, Coimbatore</span>
                  </div>
                </div>

                {/* Mock QR Code */}
                <div className="mt-6 p-4 rounded-xl bg-[#07130C] flex flex-col items-center justify-center space-y-2 border border-[#F5BF42]/30">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center text-[#07130C]">
                    <QrCode className="w-28 h-28 stroke-[1.5]" />
                  </div>
                  <p className="text-[10px] font-mono text-[#F5BF42] font-bold tracking-wider">
                    SCAN AT RECEPTION FOR EXPRESS ENTRY
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleWhatsAppSharePass}
                    className="flex-1 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Send Pass to WhatsApp
                  </button>

                  <button
                    onClick={() => setConfirmedPass(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#07130C] text-[#C1E1CE] hover:text-[#F5BF42] font-bold text-xs border border-[#F5BF42]/30"
                  >
                    New Booking
                  </button>
                </div>

              </div>
            ) : (
              /* Preview Mock Pass State */
              <div className="w-full glass-panel rounded-2xl border border-[#F5BF42]/20 p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-xl bg-[#F5BF42]/10 border border-[#F5BF42]/30 flex items-center justify-center text-[#F5BF42]">
                  <QrCode className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#EAF4EE]">
                  Instant VIP Pass Generation
                </h4>
                <p className="text-xs text-[#C1E1CE] max-w-xs leading-relaxed">
                  Fill in your preferred dining time & guest count to generate your custom encrypted QR Pass for instant entry at Creamery Café Peelamedu.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
