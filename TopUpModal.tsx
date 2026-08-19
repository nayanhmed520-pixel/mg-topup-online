import React, { useState } from 'react';
import { TopupProduct, TopupPackage, UserProfile } from '../types';
import { X, Sparkles, Check, Wallet, ShieldCheck, AlertCircle, ShoppingCart } from 'lucide-react';

interface TopUpModalProps {
  product: TopupProduct | null;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onOrderSuccess: (orderData: {
    product: TopupProduct;
    pkg: TopupPackage;
    playerUid: string;
    server?: string;
    paymentMethod: 'Wallet' | 'bKash' | 'Nagad' | 'Rocket';
  }) => void;
  onOpenAddMoney: () => void;
  onOpenLogin: () => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  product,
  isOpen,
  onClose,
  user,
  onOrderSuccess,
  onOpenAddMoney,
  onOpenLogin,
}) => {
  if (!isOpen || !product) return null;

  const [selectedPkg, setSelectedPkg] = useState<TopupPackage>(
    product.packages[0] || { id: 'default', name: 'Standard Pack', price: 50 }
  );
  const [playerUid, setPlayerUid] = useState<string>('');
  const [server, setServer] = useState<string>('BD');
  const [error, setError] = useState<string>('');
  const [paymentType, setPaymentType] = useState<'wallet' | 'direct'>('wallet');
  const [directMethod, setDirectMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenLogin();
      return;
    }
    if (product.requiresUid && (!playerUid.trim() || playerUid.trim().length < 5)) {
      setError('সঠিক Free Fire Player ID (UID) দিন');
      return;
    }
    if (paymentType === 'wallet' && user.walletBalance < selectedPkg.price) {
      setError(`ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই! প্রয়োজন ৳${selectedPkg.price}, বর্তমান ব্যালেন্স ৳${user.walletBalance}`);
      return;
    }

    setError('');
    onOrderSuccess({
      product,
      pkg: selectedPkg,
      playerUid: playerUid.trim(),
      server: product.requiresServer ? server : undefined,
      paymentMethod: paymentType === 'wallet' ? 'Wallet' : directMethod,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative h-32 bg-slate-950 overflow-hidden flex items-end p-4 text-white shrink-0">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            <span className="inline-block bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {product.badge || 'Instant Topup'}
            </span>
            <h3 className="text-xl font-black text-white">{product.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleBuy} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* UID Input */}
          {product.requiresUid && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Free Fire Player ID (UID) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={playerUid}
                onChange={(e) => setPlayerUid(e.target.value)}
                placeholder="e.g. 1928472910"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-800"
                id="topup-player-uid-input"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                আপনার গেম প্রোফাইল থেকে প্লেয়ার আইডি কপি করে এখানে বসান।
              </p>
            </div>
          )}

          {/* Server selector if applicable */}
          {product.requiresServer && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Game Server
              </label>
              <select
                value={server}
                onChange={(e) => setServer(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-slate-800 bg-white"
              >
                <option value="BD">Bangladesh Server</option>
                <option value="ID">Indonesia Server</option>
                <option value="SG">Singapore Server</option>
                <option value="MY">Malaysia Server</option>
              </select>
            </div>
          )}

          {/* Package Selection Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              প্যাকেজ নির্বাচন করুন (Select Package)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.packages.map((pkg) => {
                const isSelected = selectedPkg.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPkg(pkg)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                    <p className="text-xs font-bold text-slate-800 pr-3">{pkg.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xs font-extrabold text-blue-700">
                        ৳{pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ৳{pkg.originalPrice}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              পেমেন্ট মাধ্যম (Payment Method)
            </label>
            <div className="space-y-2">
              {/* Wallet Pay */}
              <div
                onClick={() => setPaymentType('wallet')}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentType === 'wallet'
                    ? 'border-blue-600 bg-blue-50/80'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      ওয়ালেট ব্যালেন্স থেকে দিন (Instant 1-Click)
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      বর্তমান ব্যালেন্স: ৳{user?.walletBalance.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === 'wallet'}
                  onChange={() => setPaymentType('wallet')}
                  className="accent-blue-600"
                />
              </div>

              {/* Direct bKash / Nagad / Rocket */}
              <div
                onClick={() => setPaymentType('direct')}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentType === 'direct'
                    ? 'border-blue-600 bg-blue-50/80'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                    ৳
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      সরাসরি বিকাশ / নগদ / রকেটে পেমেন্ট করুন
                    </p>
                    <p className="text-[10px] text-slate-500">
                      অটো ভেরিফিকেশন সহ
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === 'direct'}
                  onChange={() => setPaymentType('direct')}
                  className="accent-blue-600"
                />
              </div>

              {paymentType === 'direct' && (
                <div className="flex gap-2 pt-1 pl-2">
                  {(['bKash', 'Nagad', 'Rocket'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDirectMethod(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        directMethod === m
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Insufficient balance hint */}
          {user && paymentType === 'wallet' && user.walletBalance < selectedPkg.price && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-800">
              <span>ব্যালেন্স কম আছে!</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAddMoney();
                }}
                className="font-bold underline text-blue-700"
              >
                Add Money করুন
              </button>
            </div>
          )}

          {error && (
            <p className="text-xs bg-red-50 text-red-700 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="confirm-topup-order-btn"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>অর্ডার সম্পন্ন করুন (৳{selectedPkg.price})</span>
          </button>
        </form>
      </div>
    </div>
  );
};
