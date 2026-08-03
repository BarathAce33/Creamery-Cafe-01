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
    <section id="reservations" className="py-20 relative theme-bg-main">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-bg-sec border theme-border theme-text-gold font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <CalendarIcon className="w-3.5 h-3.5" />
            Instant Booking Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif theme-text-gold drop-shadow-md">
            RESERVE A VIP TABLE AT PEELAMEDU
          </h2>
          <p className="mt-3 text-sm sm:text-base theme-text-sub">
            Skip the waiting queue. Select your preferred seating zone, date & time to generate your instant digital reservation pass.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reservation Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border theme-border">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Date & Time Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-2">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl theme-bg-input border theme-border text-sm theme-text-main font-mono focus:border-current focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-2">
                    Guest Count ({guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}):
                  </label>
                  <div className="flex items-center gap-3 theme-bg-input p-2 rounded-xl border theme-border">
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      className="w-full accent-current theme-text-gold"
                    />
                    <span className="font-mono text-sm font-bold theme-text-gold min-w-[28px] text-center">
                      {guestsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Slots Pills */}
              <div>
                <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-2.5">
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
                          ? 'theme-btn-primary shadow-md font-bold'
                          : 'theme-bg-input theme-text-sub border theme-border hover:theme-text-gold'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Zone Cards */}
              <div>
                <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-2.5">
                  Seating Ambiance:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {seatingZones.map((zone) => (
                    <div
                      key={zone.id}
                      onClick={() => setSeatingZone(zone.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        seatingZone === zone.id
                          ? 'theme-bg-sec border-current theme-text-gold font-bold shadow-md'
                          : 'theme-bg-input border-transparent theme-text-sub hover:theme-border'
                      }`}
                    >
                      <div className="text-xl mb-1">{zone.icon}</div>
                      <h4 className="text-xs font-bold theme-text-main font-serif">{zone.name}</h4>
                      <p className="text-[10px] theme-text-sub mt-0.5">{zone.tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Mobile Number (For Pass):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Occasion & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Occasion:
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl theme-bg-input border theme-border text-xs theme-text-main font-semibold"
                  >
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Birthday Celebration">Birthday Party 🎉</option>
                    <option value="Anniversary">Anniversary 💕</option>
                    <option value="Business Meet">Business Meet 💼</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Special Requests:
                  </label>
                  <input
                    type="text"
                    placeholder="Quiet corner, high chair, cake setup..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl theme-bg-input border theme-border text-xs theme-text-main"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl theme-btn-primary font-extrabold text-sm sm:text-base shadow-lg transition hover:scale-[1.01]"
              >
                Generate Instant Digital VIP Pass
              </button>

            </form>
          </div>

          {/* Digital VIP Pass Render Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {confirmedPass ? (
              <div className="w-full glass-panel rounded-2xl border-2 theme-border p-6 shadow-2xl animate-fadeIn relative overflow-hidden theme-bg-sec">
                
                {/* Pass Header */}
                <div className="flex items-center justify-between border-b theme-border pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <img src="/logo.jpg" alt="Logo" className="w-9 h-9 rounded-full border border-[#F5BF42]" />
                    <div>
                      <h4 className="font-serif font-bold theme-text-gold text-sm">CREAMERY VIP PASS</h4>
                      <p className="text-[10px] theme-text-sub font-mono font-bold">RESERVATION VERIFIED</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs theme-text-gold font-bold theme-bg-main px-2.5 py-1 rounded-full border theme-border">
                    {confirmedPass.id}
                  </span>
                </div>

                {/* Pass Content Grid */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="theme-text-sub font-mono">Guest Name:</span>
                    <span className="font-bold theme-text-main font-serif">{confirmedPass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-sub font-mono">Party Size:</span>
                    <span className="font-mono font-bold theme-text-gold">{confirmedPass.guests} Persons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-sub font-mono">Date & Time:</span>
                    <span className="font-mono font-bold theme-text-main">{confirmedPass.date} @ {confirmedPass.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-sub font-mono">Reserved Zone:</span>
                    <span className="font-bold theme-text-gold">{confirmedPass.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="theme-text-sub font-mono">Location:</span>
                    <span className="theme-text-main">Peelamedu, Coimbatore</span>
                  </div>
                </div>

                {/* Mock QR Code */}
                <div className="mt-6 p-4 rounded-xl theme-bg-main flex flex-col items-center justify-center space-y-2 border theme-border">
                  <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center text-[#07130C]">
                    <QrCode className="w-28 h-28 stroke-[1.5]" />
                  </div>
                  <p className="text-[10px] font-mono theme-text-gold font-bold tracking-wider">
                    SCAN AT RECEPTION FOR EXPRESS ENTRY
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleWhatsAppSharePass}
                    className="flex-1 py-2.5 rounded-xl theme-btn-primary font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Send Pass to WhatsApp
                  </button>

                  <button
                    onClick={() => setConfirmedPass(null)}
                    className="px-4 py-2.5 rounded-xl theme-bg-main theme-text-sub hover:theme-text-gold font-bold text-xs border theme-border"
                  >
                    New Booking
                  </button>
                </div>

              </div>
            ) : (
              /* Preview Mock Pass State */
              <div className="w-full glass-panel rounded-2xl border theme-border p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-xl theme-bg-sec border theme-border flex items-center justify-center theme-text-gold">
                  <QrCode className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-base font-bold theme-text-main">
                  Instant VIP Pass Generation
                </h4>
                <p className="text-xs theme-text-sub max-w-xs leading-relaxed font-medium">
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
