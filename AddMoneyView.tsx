import React, { useState } from 'react';
import { SiteConfig, UserProfile, AddMoneyTransaction } from '../types';
import {
  ShieldCheck,
  Copy,
  Check,
  ArrowLeft,
  Smartphone,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { SupportCenter } from './SupportCenter';

interface AddMoneyViewProps {
  user: UserProfile;
  config: SiteConfig;
  onSuccess: (amount: number, method: 'bKash' | 'Nagad' | 'Rocket', trxId: string) => void;
  onBack: () => void;
}

export const AddMoneyView: React.FC<AddMoneyViewProps> = ({
  user,
  config,
  onSuccess,
  onBack,
}) => {
  const [step, setStep] = useState<'select' | 'details' | 'success'>('select');
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('500');
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [trxId, setTrxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const predefinedAmounts = [50, 100, 200, 500, 1000, 2000];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount(val.toString());
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleCopyNumber = () => {
    const num = config.paymentNumbers[method.toLowerCase() as keyof typeof config.paymentNumbers] || '01626159041';
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim() || trxId.trim().length < 6) {
      setError('সঠিক ট্রানজেকশন আইডি (কমপক্ষে ৬-১০ অক্ষরের) দিন');
      return;
    }
    setError('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onSuccess(amount, method, trxId.trim().toUpperCase());
      setStep('success');
    }, 1200);
  };

  // Method styling configs
  const methodConfig = {
    bKash: {
      name: 'bKash',
      color: 'bg-[#e2136e]',
      textColor: 'text-[#e2136e]',
      borderColor: 'border-[#e2136e]',
      bgLight: 'bg-[#e2136e]/10',
      ussd: '*247#',
      number: config.paymentNumbers.bKash || '01626159041',
    },
    Nagad: {
      name: 'Nagad',
      color: 'bg-[#f7941d]',
      textColor: 'text-[#f7941d]',
      borderColor: 'border-[#f7941d]',
      bgLight: 'bg-[#f7941d]/10',
      ussd: '*167#',
      number: config.paymentNumbers.nagad || '01855123456',
    },
    Rocket: {
      name: 'Rocket',
      color: 'bg-[#8c3494]',
      textColor: 'text-[#8c3494]',
      borderColor: 'border-[#8c3494]',
      bgLight: 'bg-[#8c3494]/10',
      ussd: '*322#',
      number: config.paymentNumbers.rocket || '01912345678',
    },
  }[method];

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto py-8 px-4 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md animate-pulse">
          <Clock className="w-8 h-8 stroke-[2.5]" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-slate-900">
            রিকোয়েস্ট জমা হয়েছে!
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            আপনার <span className="font-bold text-slate-900">৳{amount}</span> এর অ্যাড মানি রিকোয়েস্টটি এডমিন প্যানেলে পাঠানো হয়েছে।
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-left text-xs text-amber-900 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
            <span className="font-bold">স্ট্যাটাস:</span>
            <span className="bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full font-black text-[10px]">
              ⏳ পেন্ডিং (Pending Approval)
            </span>
          </div>
          <p><span className="font-semibold">পেমেন্ট মেথড:</span> {method}</p>
          <p><span className="font-semibold">ট্রানজেকশন আইডি:</span> <span className="font-mono font-bold text-slate-900">{trxId.toUpperCase()}</span></p>
          <p className="text-[11px] text-amber-800 pt-1 border-t border-amber-200/60">
            💡 এডমিন আপনার TrxID টি যাচাই করে এপ্রুভ করলেই সরাসরি আপনার ওয়ালেট ব্যালেন্সে টাকা যুক্ত হবে।
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-4 px-3 space-y-4">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={step === 'details' ? () => setStep('select') : onBack}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-1 text-xs font-bold cursor-pointer"
          id="add-money-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 'details' ? 'Change Method' : 'Back'}</span>
        </button>
        <span className="text-xs font-bold text-slate-500">
          Wallet: ৳{user.walletBalance.toLocaleString()}
        </span>
      </div>

      {step === 'select' ? (
        /* STEP 1: Method and Amount Selection matching Screenshot 5 */
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-5">
          {/* Secure Payment Emblem */}
          <div className="text-center space-y-1">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Secure Payment
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              অটোমেটিক অ্যাড মানি গেটওয়ে
            </p>
          </div>

          {/* Amount Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              টাকার পরিমাণ নির্বাচন করুন (Amount)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {predefinedAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleAmountSelect(val)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                    amount === val && customAmount === val.toString()
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ৳ {val}
                </button>
              ))}
            </div>

            <div className="relative mt-2">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ৳
              </span>
              <input
                type="number"
                min="10"
                max="50000"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="অন্য পরিমাণ লিখুন"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-800"
                id="custom-amount-input"
              />
            </div>
          </div>

          {/* Mobile Banking Header Tab */}
          <div className="space-y-3">
            <div className="w-full py-2.5 px-4 rounded-xl bg-blue-700 text-white text-center font-bold text-xs tracking-wide shadow-xs">
              Mobile Banking
            </div>

            {/* Methods Grid matching Screenshot 5 */}
            <div className="grid grid-cols-2 gap-3">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setMethod('bKash')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'bKash'
                    ? 'border-[#e2136e] bg-[#e2136e]/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                id="select-bkash-method"
              >
                <div className="text-xl font-black text-[#e2136e] tracking-tight flex items-center gap-1">
                  <span>bKash</span>
                  <span className="text-xs">⚡</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500">বিকাশ সেন্ড মানি</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setMethod('Nagad')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  method === 'Nagad'
                    ? 'border-[#f7941d] bg-[#f7941d]/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                id="select-nagad-method"
              >
                <div className="text-xl font-black text-[#f7941d] tracking-tight flex items-center gap-1">
                  <span>নগদ</span>
                  <span className="text-xs">⚡</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500">নগদ সেন্ড মানি</span>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setMethod('Rocket')}
                className={`col-span-2 p-3.5 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  method === 'Rocket'
                    ? 'border-[#8c3494] bg-[#8c3494]/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                id="select-rocket-method"
              >
                <span className="text-lg font-black text-[#8c3494]">রকেট (Rocket)</span>
                <span className="text-xs text-slate-500 font-bold">• সেন্ড মানি</span>
              </button>
            </div>
          </div>

          {/* Pay Button matching Screenshot 5 */}
          <button
            onClick={() => setStep('details')}
            disabled={amount <= 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-md active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            id="proceed-pay-btn"
          >
            Pay {amount.toFixed(2)}
          </button>
        </div>
      ) : (
        /* STEP 2: Instruction and TrxID Verification screen matching Screenshot 6 */
        <div className="space-y-4">
          {/* Method Logo Header & Amount Banner matching Screenshot 6 */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 text-center space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black ${methodConfig.textColor}`}>
                  {method}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Secure Payment
              </span>
            </div>

            <div className="py-2 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-2xl font-black text-slate-900">
                ৳ {amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Styled Instruction Form Box matching Screenshot 6 */}
          <div
            className={`rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 ${
              method === 'bKash'
                ? 'bg-[#e2136e]'
                : method === 'Nagad'
                ? 'bg-[#f7941d]'
                : 'bg-[#8c3494]'
            }`}
          >
            <h3 className="text-base sm:text-lg font-black text-center text-white tracking-wide">
              ট্রানজেকশন আইডি দিন
            </h3>

            {/* TrxID Input Field */}
            <input
              type="text"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              placeholder="ট্রানজেকশন আইডি দিন (e.g. BLQ879201J)"
              className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 font-bold text-center text-sm shadow-inner focus:outline-none focus:ring-4 focus:ring-white/40"
              id="trxid-input"
            />

            {error && (
              <p className="text-xs bg-red-950/80 text-red-200 font-bold p-2 rounded-lg text-center flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}

            {/* Step-by-step instructions in Bengali matching Screenshot 6 */}
            <div className="text-xs font-medium space-y-2.5 text-white/95 leading-relaxed pt-2 border-t border-white/20">
              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  <span className="font-bold text-yellow-200">{methodConfig.ussd}</span> ডায়াল করে আপনার {method} মোবাইল মেনুতে যান অথবা {method} অ্যাপে যান।
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  <span className="font-bold text-yellow-200">"Send Money"</span> -এ ক্লিক করুন।
                </p>
              </div>

              {/* Receiver Number with Copy button */}
              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <div className="flex-1">
                  <p>প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুনঃ</p>
                  <div className="mt-1 flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-xl">
                    <span className="font-black text-sm tracking-wider text-yellow-300">
                      {methodConfig.number}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="ml-auto inline-flex items-center gap-1 bg-white text-slate-900 px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                      id="copy-payment-number-btn"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-700" />
                      )}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  টাকার পরিমাণঃ <span className="font-extrabold text-yellow-200">{amount}</span>
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  নিশ্চিত করতে এখন আপনার {method} মোবাইল মেনু পিন লিখুন।
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  সবকিছু ঠিক থাকলে, আপনি {method} থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-yellow-300 font-bold">•</span>
                <p>
                  এখন উপরের বক্সে আপনার <span className="font-bold text-yellow-200">Transaction ID</span> দিন এবং নিচের <span className="font-bold text-yellow-200">VERIFY</span> বাটনে ক্লিক করুন।
                </p>
              </div>
            </div>
          </div>

          {/* Big VERIFY Button matching Screenshot 6 */}
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-4 rounded-2xl bg-red-700 hover:bg-red-800 active:scale-98 text-white font-black text-lg tracking-wider uppercase shadow-xl transition-all disabled:opacity-60 cursor-pointer"
            id="verify-trxid-btn"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                VERIFYING...
              </span>
            ) : (
              'VERIFY'
            )}
          </button>
        </div>
      )}

      {/* Support Center at bottom */}
      <SupportCenter config={config} />
    </div>
  );
};
