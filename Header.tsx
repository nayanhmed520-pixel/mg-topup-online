import React from 'react';
import { UserProfile } from '../types';
import { User, Wallet, ShieldAlert, Sparkles, LogIn } from 'lucide-react';

interface HeaderProps {
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  onOpenAddMoney: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  siteName: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenLogin,
  onOpenProfile,
  onOpenAddMoney,
  onOpenAdmin,
  onNavigateHome,
  siteName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-4xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-left group focus:outline-none cursor-pointer"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-rose-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md group-hover:scale-105 transition-transform">
            <span className="text-xl tracking-tighter">MG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight flex items-center">
                <span className="text-rose-600">MG</span>
                <span className="text-slate-800 ml-1">TOPUP</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                24/7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium -mt-1">
              Official TopUp Platform
            </p>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {/* Balance button */}
              <button
                onClick={onOpenAddMoney}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                id="header-wallet-balance-btn"
              >
                <Wallet className="w-3.5 h-3.5 text-blue-600" />
                <span>৳ {user.walletBalance.toLocaleString()}</span>
                <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black">
                  +
                </span>
              </button>

              {/* User profile avatar */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 focus:outline-none cursor-pointer"
                id="header-user-avatar-btn"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 text-white font-bold text-sm flex items-center justify-center ring-2 ring-white shadow-sm hover:ring-rose-400 transition-all">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              id="header-login-btn"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
