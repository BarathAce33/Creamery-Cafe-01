import React, { useState } from 'react';
import { Award, Gift, Sparkles, X, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoyaltyRewardsModal({ isOpen, onClose }) {
  const [userCoins, setUserCoins] = useState(340);
  const [claimedRewards, setClaimedRewards] = useState([]);

  if (!isOpen) return null;

  const rewards = [
    { id: 'r1', name: 'Free Creamy Sitaphal Shot', coins: 150, category: 'Appetizer Shot' },
    { id: 'r2', name: '₹100 Off On Biscoff Shake', coins: 250, category: 'Discount Voucher' },
    { id: 'r3', name: 'Free Charcoal BBQ Burger', coins: 400, category: 'Gourmet Meal' },
    { id: 'r4', name: 'Creamery VIP Gold Badge & 20% Off', coins: 600, category: 'Tier Upgrade' },
  ];

  const handleRedeem = (reward) => {
    if (userCoins < reward.coins) {
      alert(`You need ${reward.coins - userCoins} more Creamery Gold Coins to claim this reward!`);
      return;
    }

    setUserCoins(userCoins - reward.coins);
    setClaimedRewards([...claimedRewards, reward.id]);

    confetti({
      particleCount: 40,
      spread: 60,
      colors: ['#F5BF42', '#10B981', '#E5B239'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-[#F5BF42]/40 bg-[#0F271B] text-[#EAF4EE] overflow-hidden shadow-[0_0_50px_rgba(245,191,66,0.2)] p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#07130C] text-[#C1E1CE] hover:text-[#F5BF42] border border-[#F5BF42]/20 transition hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F5BF42]/10 border border-[#F5BF42]/30 flex items-center justify-center text-[#F5BF42] animate-bounce">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-gold-gradient">
              CREAMERY GOLD REWARDS
            </h3>
            <p className="text-xs text-[#A7F3D0]">
              Earn 10 Gold Coins for every ₹100 spent at Peelamedu
            </p>
          </div>
        </div>

        {/* Coins Balance Box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#07130C] border border-[#F5BF42]/30 flex items-center justify-between shadow-inner">
          <div>
            <span className="text-[10px] font-mono text-[#C1E1CE] uppercase tracking-wider block">Your Balance</span>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-5 h-5 fill-[#F5BF42] text-[#F5BF42]" />
              <span className="font-mono text-2xl font-extrabold text-[#F5BF42]">
                {userCoins} Coins
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#34D399] px-3 py-1.5 rounded-full border border-[#10B981]/40 shadow-sm">
            GOLD MEMBER
          </span>
        </div>

        {/* Rewards List */}
        <div className="mt-6 space-y-3">
          <label className="text-xs font-mono font-bold text-[#F5BF42] uppercase tracking-wider block">
            Available Reward Unlocks:
          </label>

          {rewards.map((r) => {
            const isClaimed = claimedRewards.includes(r.id);
            const canAfford = userCoins >= r.coins;

            return (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-[#07130C]/90 border border-[#F5BF42]/20 flex items-center justify-between gap-3 shadow-sm hover:border-[#F5BF42]/40 transition"
              >
                <div className="flex-1 pr-2">
                  <span className="text-[10px] font-mono text-[#34D399] font-bold block">{r.category}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#EAF4EE] font-serif leading-snug mt-0.5">{r.name}</h4>
                  <span className="text-xs font-mono text-[#F5BF42] font-bold mt-1 block">
                    {r.coins} Gold Coins
                  </span>
                </div>

                {isClaimed ? (
                  <span className="text-xs font-mono text-[#10B981] font-bold flex items-center gap-1 bg-[#10B981]/15 px-3 py-2 rounded-xl border border-[#10B981]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                  </span>
                ) : (
                  <button
                    onClick={() => handleRedeem(r)}
                    disabled={!canAfford}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all duration-200 min-w-[110px] text-center flex items-center justify-center ${
                      canAfford
                        ? 'bg-[#F5BF42] text-[#07130C] hover:bg-[#E5B239] shadow-[0_0_15px_rgba(245,191,66,0.3)] hover:scale-105'
                        : 'bg-[#07130C]/60 text-gray-500 cursor-not-allowed border border-gray-800'
                    }`}
                  >
                    Claim Reward
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
