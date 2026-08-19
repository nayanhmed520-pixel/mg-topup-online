import React from 'react';
import { UserProfile, SiteConfig } from '../types';
import { RANK_TIERS } from '../data/initialData';
import {
  CheckCircle2,
  Shield,
  Star,
  RefreshCw,
  Wallet,
  Sparkles,
  Lock,
  Check,
  User,
  Phone,
  Mail,
  FileText,
  LogOut,
  ShoppingBag,
  CircleDollarSign,
  Calendar,
  Award,
} from 'lucide-react';
import { SupportCenter } from './SupportCenter';

interface ProfileViewProps {
  user: UserProfile;
  config: SiteConfig;
  onOpenAddMoney: () => void;
  onLogout: () => void;
  onRefreshUser: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  config,
  onOpenAddMoney,
  onLogout,
  onRefreshUser,
}) => {
  // Calculate current rank & progress
  const currentTier =
    RANK_TIERS.find(
      (t) => user.totalSpend >= t.minSpend && user.totalSpend <= t.maxSpend
    ) || RANK_TIERS[0];

  const currentTierIndex = RANK_TIERS.findIndex((t) => t.id === currentTier.id);
  const nextTier = RANK_TIERS[currentTierIndex + 1] || null;

  const progressPercent = nextTier
    ? Math.min(
        100,
        Math.max(
          1,
          Math.round(((user.totalSpend - currentTier.minSpend) / (currentTier.maxSpend - currentTier.minSpend)) * 100)
        )
      )
    : 100;

  const needAmount = nextTier ? Math.max(0, nextTier.minSpend - user.totalSpend) : 0;

  return (
    <div className="max-w-md mx-auto py-4 px-3 space-y-4">
      {/* Profile Header Card matching Screenshot 4 */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 text-center relative">
        {/* Large Avatar */}
        <div className="relative inline-block mx-auto mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-rose-500 text-white text-3xl font-black flex items-center justify-center shadow-lg ring-4 ring-slate-100">
            {user.name ? user.name.charAt(0).toUpperCase() : 'N'}
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* User Name & Badges */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {user.name}
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Verified
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              Support PIN: {user.supportPin || '105279'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Verified Account
            </span>
          </div>
        </div>

        {/* Rank Member Badge */}
        <div className="mt-4 inline-flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
          <div className="w-7 h-7 rounded-lg bg-amber-700/20 text-amber-800 flex items-center justify-center font-black text-xs">
            🥉
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800">
              {currentTier.name} Member
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              Level {currentTierIndex + 1} / Current Rank
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Balance Card matching Screenshot 4 */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Wallet Balance
          </span>
          <button
            onClick={onRefreshUser}
            className="text-slate-400 hover:text-blue-600 p-1 transition-colors cursor-pointer"
            title="Refresh balance"
            id="refresh-wallet-btn"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-slate-500">Tk</span>
          <span className="text-3xl font-black text-slate-900">
            {user.walletBalance.toLocaleString()}
          </span>
        </div>

        <button
          onClick={onOpenAddMoney}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          id="profile-add-money-btn"
        >
          <Wallet className="w-4 h-4" />
          <span>Add Money</span>
        </button>
      </div>

      {/* Rank Journey Progress Card matching Screenshot 4 */}
      <div className="bg-gradient-to-b from-amber-900 via-amber-950 to-stone-950 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="text-center space-y-1 mb-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-800/40 border border-amber-600/40 flex items-center justify-center text-xl shadow-inner">
            🛡️
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400">
            CURRENT RANK
          </span>
          <h3 className="text-xl font-black text-white">{currentTier.name}</h3>
          <p className="text-xs text-amber-200/80">
            Start your journey from {currentTier.name}.
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 my-3">
          <div className="flex justify-between text-[11px] text-amber-200 font-bold">
            <span>
              {user.totalSpend} - {currentTier.maxSpend} Tk
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-amber-950/80 rounded-full overflow-hidden border border-amber-800/40">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {nextTier && (
            <p className="text-[11px] text-center text-amber-100 font-medium">
              Need only <span className="font-bold text-amber-400">{needAmount} Tk</span> to unlock{' '}
              <span className="font-bold text-amber-300">{nextTier.name}</span>
            </p>
          )}
        </div>

        {/* Unlock perk teaser */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-left text-xs">
            <p className="font-bold text-yellow-300">Unlock More Premium Products</p>
            <p className="text-[11px] text-amber-100/80 leading-relaxed mt-0.5">
              Top up more to increase your Total Spend and Rank, then unlock premium products, low-rate topups, verified profile icons, and future VIP benefits.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Stat Grid matching Screenshot 4 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold text-slate-400">ORDERS</p>
            <p className="text-base font-extrabold text-slate-800">{user.ordersCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CircleDollarSign className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold text-slate-400">TOTAL SPEND</p>
            <p className="text-base font-extrabold text-slate-800">{user.totalSpend} Tk</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold text-slate-400">WEEKLY SPEND</p>
            <p className="text-base font-extrabold text-slate-800">{user.weeklySpend} Tk</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase font-bold text-slate-400">RANK</p>
            <p className="text-base font-extrabold text-slate-800">{currentTier.name}</p>
          </div>
        </div>
      </div>

      {/* Rank Journey Tiers matching Screenshot 4 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              RANK JOURNEY
            </p>
            <h3 className="text-sm font-extrabold text-slate-900">Your Path</h3>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {currentTierIndex + 1}/{RANK_TIERS.length}
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {RANK_TIERS.map((tier, idx) => {
            const isCurrent = tier.id === currentTier.id;
            const isUnlocked = user.totalSpend >= tier.minSpend;

            return (
              <div
                key={tier.id}
                className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                  isCurrent
                    ? 'bg-blue-50/70 border-blue-200 shadow-xs'
                    : 'bg-slate-50/60 border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isUnlocked
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800">
                      {tier.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {tier.rangeText}
                    </p>
                  </div>
                </div>

                <div>
                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                      <Check className="w-3 h-3" /> Current
                    </span>
                  ) : isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                      <Check className="w-3 h-3" /> Reached
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-200/80 px-2 py-1 rounded-lg">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account: User Information Section matching Screenshot 4 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            ACCOUNT
          </p>
          <h3 className="text-sm font-extrabold text-slate-900">
            User Information
          </h3>
        </div>

        <div className="space-y-2.5 pt-1">
          {/* Name */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">NAME</p>
              <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">PHONE</p>
              <p className="text-xs font-bold text-slate-800 truncate">{user.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">EMAIL</p>
              <p className="text-xs font-bold text-slate-800 truncate">{user.email}</p>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">USER ID</p>
              <p className="text-xs font-bold text-slate-800 truncate">{user.userId}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full mt-2 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          id="logout-btn"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Account</span>
        </button>
      </div>

      {/* Support Center at bottom */}
      <SupportCenter config={config} />
    </div>
  );
};
