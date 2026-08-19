import React, { useState } from 'react';
import { OrderItem } from '../types';
import { ShoppingBag, RefreshCw, CheckCircle2 } from 'lucide-react';

interface RecentOrdersProps {
  orders: OrderItem[];
  onRefresh?: () => void;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders, onRefresh }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsSpinning(false), 600);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-emerald-100 text-emerald-800 border-emerald-300',
      'bg-blue-100 text-blue-800 border-blue-300',
      'bg-amber-100 text-amber-800 border-amber-300',
      'bg-rose-100 text-rose-800 border-rose-300',
      'bg-purple-100 text-purple-800 border-purple-300',
      'bg-teal-100 text-teal-800 border-teal-300',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[hash % colors.length];
  };

  return (
    <section className="my-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              Recent Orders
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </h3>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Refresh orders"
          id="refresh-recent-orders-btn"
        >
          <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin text-blue-600' : ''}`} />
        </button>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        {orders.slice(0, 10).map((order) => {
          const initials = order.userName
            ? order.userName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()
            : 'U';

          return (
            <div
              key={order.id}
              className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-1 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${getAvatarColor(
                    order.userName
                  )}`}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                    {order.userName}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate font-medium">
                    {order.packageDetails} - <span className="font-bold text-slate-700">৳{order.amount}</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Done
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
