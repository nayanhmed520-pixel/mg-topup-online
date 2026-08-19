import React from 'react';
import { OrderItem, AddMoneyTransaction, SiteConfig } from '../types';
import { ShoppingBag, CheckCircle2, Clock, DollarSign, Package, AlertCircle } from 'lucide-react';
import { SupportCenter } from './SupportCenter';

interface MyOrdersViewProps {
  orders: OrderItem[];
  transactions: AddMoneyTransaction[];
  config: SiteConfig;
}

export const MyOrdersView: React.FC<MyOrdersViewProps> = ({ orders, transactions, config }) => {
  return (
    <div className="max-w-md mx-auto py-4 px-3 space-y-4">
      {/* Topup Orders Section */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">
            টপআপ অর্ডার হিস্ট্রি
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-400 font-medium">
              আপনার কোনো সক্রিয় টপআপ অর্ডার নেই
            </p>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="py-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {ord.itemTitle}
                  </h4>
                  <p className="text-[11px] text-blue-600 font-semibold truncate">
                    {ord.packageDetails}
                  </p>
                  {ord.playerUid && (
                    <p className="text-[10px] text-slate-500 font-medium">
                      Player UID: <span className="font-bold text-slate-700">{ord.playerUid}</span>
                    </p>
                  )}
                  <p className="text-[10px] text-slate-400">
                    {ord.createdAt} • Via {ord.paymentMethod}
                  </p>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <span className="text-xs font-extrabold text-slate-900 block">
                    ৳{ord.amount}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Done
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Money History */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <h2 className="text-base font-extrabold text-slate-900">
            অ্যাড মানি হিস্ট্রি
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-400">
              কোনো লেনদেন নেই
            </p>
          ) : (
            transactions.map((txn) => (
              <div key={txn.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">
                    {txn.method} - ৳{txn.amount}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    TrxID: {txn.trxId}
                  </p>
                  <p className="text-[9px] text-slate-400">{txn.createdAt}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
                    txn.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : txn.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {txn.status === 'Approved' && '✓ Approved'}
                  {txn.status === 'Pending' && '⏳ Pending (যাচাই চলছে)'}
                  {txn.status === 'Rejected' && '✕ Rejected'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <SupportCenter config={config} />
    </div>
  );
};
