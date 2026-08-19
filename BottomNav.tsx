import React from 'react';
import { Home, PlaySquare, PlusCircle, LayoutGrid, User, ShoppingBag, Headphones, Shield } from 'lucide-react';
import { UserProfile } from '../types';

export type ActiveTab = 'home' | 'tutorial' | 'add-money' | 'topup' | 'profile' | 'orders' | 'admin';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab, user }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          id="bottom-nav-home"
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Home</span>
        </button>

        {/* Tutorial */}
        <button
          onClick={() => onChangeTab('tutorial')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            activeTab === 'tutorial' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          id="bottom-nav-tutorial"
        >
          <PlaySquare className={`w-5 h-5 ${activeTab === 'tutorial' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">Tutorial</span>
        </button>

        {/* Center Add Money Action */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={() => onChangeTab('add-money')}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-white active:scale-90 transition-all cursor-pointer"
            aria-label="Add Money"
            id="bottom-nav-add-money-center"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>

        {/* TopUp / Orders */}
        <button
          onClick={() => onChangeTab('orders')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          id="bottom-nav-orders"
        >
          <ShoppingBag className={`w-5 h-5 ${activeTab === 'orders' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">My Orders</span>
        </button>

        {/* My Account */}
        <button
          onClick={() => onChangeTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
          id="bottom-nav-account"
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5 font-medium">
            {user ? 'My Account' : 'Login'}
          </span>
        </button>
      </div>
    </nav>
  );
};
