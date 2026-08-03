import React, { useState } from 'react';
import { Mail, PhoneCall, Send, CheckCircle2, MessageSquare, PartyPopper, Store, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EnquirySection() {
  const [topic, setTopic] = useState('Party Catering');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const topics = [
    { id: 'Party Catering', label: 'Party & Event Catering 🎉' },
    { id: 'Bulk Shake Orders', label: 'Bulk Shake Orders 🥤' },
    { id: 'Franchise Enquiry', label: 'Franchise & Business 🏢' },
    { id: 'Customer Feedback', label: 'Feedback / Complaints 💬' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setSubmitted(true);
    confetti({
      particleCount: 30,
      spread: 50,
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });
  };

  return (
    <section id="enquiry" className="py-20 relative theme-bg-main">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full theme-bg-sec border theme-border theme-text-gold font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Connect With Creamery Café
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif theme-text-gold drop-shadow-md">
            CUSTOMER ENQUIRIES & CATERING
          </h2>
          <p className="mt-3 text-sm sm:text-base theme-text-sub">
            Planning a birthday bash, bulk milkshake delivery for college/office events, or interested in franchise options? Send us your message below.
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border theme-border shadow-2xl theme-bg-sec">
          
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full theme-bg-main border theme-border flex items-center justify-center theme-text-gold mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-serif theme-text-gold">
                Enquiry Dispatched Successfully!
              </h3>
              <div className="max-w-md mx-auto p-4 rounded-xl theme-bg-main border theme-border text-left space-y-2">
                <span className="text-[10px] font-mono theme-text-gold font-bold uppercase block">
                  Automated Ticket Generated:
                </span>
                <p className="text-xs theme-text-sub leading-relaxed">
                  "Hi <strong>{name}</strong>, thank you for reaching out regarding <strong>{topic}</strong>. Our Peelamedu store manager has received your request and will call you back on <strong>{phone}</strong> within 30 minutes."
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-6 px-6 py-2.5 rounded-xl theme-btn-primary font-bold text-xs shadow-md"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Topic Selector */}
              <div>
                <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-2.5">
                  Select Enquiry Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTopic(t.id)}
                      className={`p-3 rounded-xl text-xs font-semibold text-center border transition ${
                        topic === t.id
                          ? 'theme-btn-primary font-bold shadow-md'
                          : 'theme-bg-main theme-text-sub border-transparent hover:theme-border'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                    Email Address (Optional):
                  </label>
                  <input
                    type="email"
                    placeholder="priyan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                  />
                </div>
              </div>

              {/* Message Area */}
              <div>
                <label className="text-xs font-mono font-bold theme-text-gold uppercase tracking-wider block mb-1">
                  Enquiry Details & Event Date:
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your event, estimated guest count, or feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl theme-bg-input border theme-border text-xs theme-text-main focus:border-current focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl theme-btn-primary font-extrabold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Submit Customer Enquiry</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
