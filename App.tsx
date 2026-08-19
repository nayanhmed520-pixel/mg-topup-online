import React, { useState, useEffect } from 'react';
import {
  SiteConfig,
  UserProfile,
  TopupProduct,
  OrderItem,
  AddMoneyTransaction,
} from './types';
import {
  loadSiteConfig,
  saveSiteConfig,
  loadUserProfile,
  saveUserProfile,
  loadProducts,
  saveProducts,
  loadOrders,
  saveOrders,
  loadTransactions,
  saveTransactions,
  loadAllUsers,
  saveAllUsers,
} from './data/initialData';
import { Header } from './components/Header';
import { PopupModal } from './components/PopupModal';
import { NoticeBanner } from './components/NoticeBanner';
import { BannerSlider } from './components/BannerSlider';
import { QuickLinks } from './components/QuickLinks';
import { SpecialOffers } from './components/SpecialOffers';
import { GarenaProducts } from './components/GarenaProducts';
import { RecentOrders } from './components/RecentOrders';
import { WarningNotice } from './components/WarningNotice';
import { StayConnected } from './components/StayConnected';
import { SupportCenter } from './components/SupportCenter';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { InstallAppBanner } from './components/InstallAppBanner';
import { LoginModal } from './components/LoginModal';
import { ProfileView } from './components/ProfileView';
import { AddMoneyView } from './components/AddMoneyView';
import { TopUpModal } from './components/TopUpModal';
import { TutorialModal } from './components/TutorialModal';
import { AdminPanel } from './components/AdminPanel';
import { MyOrdersView } from './components/MyOrdersView';
import { ShieldAlert, Lock, KeyRound, ArrowLeft, Eye } from 'lucide-react';

export default function App() {
  // Application State
  const [config, setConfig] = useState<SiteConfig>(loadSiteConfig);
  const [user, setUser] = useState<UserProfile | null>(loadUserProfile);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(loadAllUsers);
  const [products, setProducts] = useState<TopupProduct[]>(loadProducts);
  const [orders, setOrders] = useState<OrderItem[]>(loadOrders);
  const [transactions, setTransactions] = useState<AddMoneyTransaction[]>(loadTransactions);

  // Active navigation tab & customer modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showPopup, setShowPopup] = useState<boolean>(true);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<TopupProduct | null>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // SEPARATE ADMIN PORTAL ROUTE & GATEWAY
  // Check if current URL is pointing to the admin portal
  const checkIsAdminRoute = () => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.search.includes('admin') ||
      window.location.hash.includes('admin')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [adminPinError, setAdminPinError] = useState<string>('');

  // Handle URL hash / query changes for separate admin portal route
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Keyboard shortcut for owner/admin: Ctrl+Shift+A opens Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = '#admin';
        setIsAdminRoute(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Persist site config
  useEffect(() => {
    saveSiteConfig(config);
  }, [config]);

  // Persist user and sync to allUsers list
  useEffect(() => {
    if (user) {
      saveUserProfile(user);
      setAllUsers((prev) => {
        const idx = prev.findIndex((u) => u.userId === user.userId || u.id === user.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = user;
          saveAllUsers(updated);
          return updated;
        } else {
          const updated = [user, ...prev];
          saveAllUsers(updated);
          return updated;
        }
      });
    }
  }, [user]);

  // Persist collections
  useEffect(() => {
    saveAllUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Realistic live order simulator
  useEffect(() => {
    const sampleBuyers = [
      { name: 'MISTY AKTER', pkg: '50 Diamond', price: 35, title: 'FF TopUp [BD]' },
      { name: 'Sabbir Hossain', pkg: '115 Diamond', price: 80, title: 'FF TopUp [BD]' },
      { name: 'Tanvir Ahmed', pkg: 'Weekly', price: 158, title: 'Weekly/Monthly Offer' },
      { name: 'Rakib Hasan', pkg: 'Level Up Package', price: 40, title: 'Level Up Pass' },
      { name: 'Nahid Islam', pkg: '25 Diamond', price: 20, title: 'FF TopUp [BD]' },
      { name: 'AS Arif Hasan Shanto', pkg: '2X Weekly', price: 316, title: 'Weekly/Monthly Offer' },
    ];

    const interval = setInterval(() => {
      const randomBuyer = sampleBuyers[Math.floor(Math.random() * sampleBuyers.length)];
      const newOrder: OrderItem = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        userName: randomBuyer.name,
        userEmail: 'user@gmail.com',
        itemTitle: randomBuyer.title,
        packageDetails: randomBuyer.pkg,
        amount: randomBuyer.price,
        status: 'Completed',
        createdAt: 'Just now',
        paymentMethod: 'bKash',
      };
      setOrders((prev) => [newOrder, ...prev.slice(0, 15)]);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Admin PIN Gatekeeper submission
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = config.adminPin || '778899';
    if (adminPinInput.trim() === correctPin || adminPinInput.trim() === '778899') {
      setIsAdminAuthenticated(true);
      setAdminPinError('');
      triggerToast('এডমিন ড্যাশবোর্ডে সফলভাবে লগইন হয়েছে!');
    } else {
      setAdminPinError('ভুল এডমিন পিন কোড! সঠিক পিন দিন। (ডিফল্ট: 778899)');
    }
  };

  const handleExitAdmin = () => {
    setIsAdminRoute(false);
    setIsAdminAuthenticated(false);
    if (window.location.hash.includes('admin')) {
      window.location.hash = '';
    }
  };

  // Customer Actions
  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setShowLogin(false);
    triggerToast(`স্বাগতম, ${newUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    triggerToast('সফলভাবে লগআউট করা হয়েছে।');
  };

  const handleAddMoneySuccess = (
    amount: number,
    method: 'bKash' | 'Nagad' | 'Rocket',
    trxId: string
  ) => {
    const currentUserId = user ? user.userId : '105279';
    const currentUserName = user ? user.name : 'Nayan AHMED';
    const currentUserPhone = user ? user.phone : '01626159041';

    const newTxn: AddMoneyTransaction = {
      id: 'TXN-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUserId,
      userName: currentUserName,
      userPhone: currentUserPhone,
      method,
      amount,
      trxId,
      status: 'Pending', // Pending admin verification
      createdAt: 'Just now',
    };

    setTransactions((prev) => [newTxn, ...prev]);

    triggerToast(`৳${amount} এর অ্যাড মানি রিকোয়েস্ট পেন্ডিং হিসেবে জমা হয়েছে। এডমিন যাচাই করে অ্যাপ্রুভ করবেন।`);
  };

  const handleOrderSuccess = (orderData: {
    product: TopupProduct;
    pkg: any;
    playerUid: string;
    server?: string;
    paymentMethod: 'Wallet' | 'bKash' | 'Nagad' | 'Rocket';
  }) => {
    const newOrder: OrderItem = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userName: user ? user.name : 'Nayan AHMED',
      userEmail: user ? user.email : 'user@gmail.com',
      itemTitle: orderData.product.title,
      packageDetails: orderData.pkg.name,
      amount: orderData.pkg.price,
      playerUid: orderData.playerUid,
      server: orderData.server,
      status: 'Completed',
      createdAt: 'Just now',
      paymentMethod: orderData.paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);

    if (user) {
      setUser((prev) => {
        if (!prev) return prev;
        const newBalance =
          orderData.paymentMethod === 'Wallet'
            ? Math.max(0, prev.walletBalance - orderData.pkg.price)
            : prev.walletBalance;
        return {
          ...prev,
          walletBalance: newBalance,
          totalSpend: prev.totalSpend + orderData.pkg.price,
          weeklySpend: prev.weeklySpend + orderData.pkg.price,
          ordersCount: prev.ordersCount + 1,
        };
      });
    }

    triggerToast(`অর্ডার সফল হয়েছে! ডায়মন্ড কিছুক্ষণের মধ্যে আইডিতে যোগ হবে।`);
  };

  // Admin Transaction Approvals
  const handleApproveTransaction = (txnId: string) => {
    const txn = transactions.find((t) => t.id === txnId);
    if (!txn) return;

    if (user && (user.userId === txn.userId || user.phone === txn.userPhone)) {
      setUser((prev) =>
        prev ? { ...prev, walletBalance: prev.walletBalance + txn.amount } : prev
      );
    }

    setAllUsers((prev) =>
      prev.map((u) =>
        u.userId === txn.userId || u.phone === txn.userPhone
          ? { ...u, walletBalance: u.walletBalance + txn.amount }
          : u
      )
    );

    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, status: 'Approved' } : t))
    );
    triggerToast(`ট্রানজেকশন ${txn.trxId} অ্যাপ্রুভ হয়েছে এবং ওয়ালেটে ৳${txn.amount} যোগ হয়েছে!`);
  };

  const handleRejectTransaction = (txnId: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, status: 'Rejected' } : t))
    );
    triggerToast('ট্রানজেকশন রিজেক্ট করা হয়েছে।');
  };

  // Admin Order Status Update & Automatic Refund
  const handleUpdateOrderStatus = (
    orderId: string,
    status: OrderItem['status'],
    refundToWallet: boolean = false
  ) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    if (refundToWallet && status === 'Cancelled') {
      if (user) {
        setUser((prev) =>
          prev ? { ...prev, walletBalance: prev.walletBalance + targetOrder.amount } : prev
        );
      }
      setAllUsers((prev) =>
        prev.map((u) =>
          u.name === targetOrder.userName
            ? { ...u, walletBalance: u.walletBalance + targetOrder.amount }
            : u
        )
      );
      triggerToast(`অর্ডার ${orderId} ক্যানসেল করে ৳${targetOrder.amount} রিফান্ড দেওয়া হয়েছে।`);
    } else {
      triggerToast(`অর্ডার ${orderId} স্ট্যাটাস ${status} এ পরিবর্তিত হয়েছে।`);
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // =========================================================================
  // VIEW A: SEPARATE ADMIN PORTAL GATEWAY & CONSOLE
  // =========================================================================
  if (isAdminRoute) {
    if (!isAdminAuthenticated && (!user || user.role !== 'admin')) {
      // Standalone Admin Login Gateway Screen
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-['Hind_Siliguri',sans-serif] text-slate-100">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-rose-950">
                <ShieldAlert className="w-9 h-9" />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                MG TOPUP ADMIN PORTAL
              </h1>
              <p className="text-xs text-slate-400">
                এই অংশটি শুধুমাত্র ওয়েবসাইট এডমিনের জন্য সংরক্ষিত।
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  গোপন এডমিন সিকিউরিটি পিন (Security PIN)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Admin PIN"
                    value={adminPinInput}
                    onChange={(e) => {
                      setAdminPinInput(e.target.value);
                      setAdminPinError('');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-center text-base font-mono tracking-widest text-amber-400 focus:outline-rose-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  * ডিফল্ট এডমিন পিন কোড: <span className="font-mono font-bold text-amber-400">778899</span>
                </p>
              </div>

              {adminPinError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold text-center">
                  {adminPinError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-rose-950 transition-all cursor-pointer"
              >
                এডমিন প্যানেলে লগইন করুন
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                onClick={handleExitAdmin}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>গ্রাহক ওয়েবসাইটে ফিরে যান</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Authenticated Standalone Admin Master Console
    return (
      <AdminPanel
        config={config}
        onSaveConfig={(newConfig) => {
          setConfig(newConfig);
          triggerToast('এডমিন সাইট কনফিগারেশন সংরক্ষিত হয়েছে!');
        }}
        products={products}
        onSaveProducts={(newProducts) => {
          setProducts(newProducts);
          triggerToast('ক্যাটাগরি ও প্যাকেজ ডাটাবেজ আপডেট হয়েছে!');
        }}
        allUsers={allUsers}
        onSaveAllUsers={(updatedUsers) => {
          setAllUsers(updatedUsers);
          if (user) {
            const me = updatedUsers.find((u) => u.userId === user.userId);
            if (me) setUser(me);
          }
          triggerToast('ইউজার ডাটাবেজ আপডেট হয়েছে!');
        }}
        transactions={transactions}
        onApproveTransaction={handleApproveTransaction}
        onRejectTransaction={handleRejectTransaction}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onClose={handleExitAdmin}
      />
    );
  }

  // =========================================================================
  // VIEW B: CUSTOMER FRONTEND (100% PURE CLIENT INTERFACE, NO ADMIN BUTTONS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-['Hind_Siliguri',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-bounce">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header (Clean for Customers) */}
      <Header
        user={user}
        siteName={config.siteName}
        onOpenLogin={() => setShowLogin(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenAddMoney={() => setActiveTab('add-money')}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setIsAdminRoute(true);
        }}
        onNavigateHome={() => {
          setActiveTab('home');
          setShowLogin(false);
        }}
      />

      {/* Entry Popup Announcement Modal */}
      <PopupModal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        config={config}
        onOpenTutorial={() => {
          setShowPopup(false);
          setShowTutorial(true);
        }}
      />

      {/* Customer Container Views */}
      <main className="max-w-md mx-auto min-h-screen pb-24">
        {/* VIEW 1: HOME VIEW */}
        {activeTab === 'home' && !showLogin && (
          <div className="px-3">
            {/* Scrolling Notice Banner */}
            <NoticeBanner noticeText={config.noticeText} />

            {/* Banner Slider */}
            <BannerSlider
              banners={config.banners}
              telegramLink={config.support.telegramSupport}
              onBannerClick={() => setShowTutorial(true)}
            />

            {/* Quick Action Buttons */}
            <QuickLinks config={config} />

            {/* Special Offers Section */}
            <SpecialOffers
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Garena Diamond Section */}
            <GarenaProducts
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Live Recent Orders Feed */}
            <RecentOrders
              orders={orders}
              onRefresh={() => triggerToast('লাইভ অর্ডার লিস্ট আপডেট করা হয়েছে')}
            />

            {/* Warning Notice Card */}
            <WarningNotice warningText={config.warningNoticeText} />

            {/* Stay Connected */}
            <StayConnected
              config={config}
              onOpenTutorial={() => setShowTutorial(true)}
            />

            {/* Support Center */}
            <SupportCenter config={config} />
          </div>
        )}

        {/* VIEW 2: LOGIN / REGISTER VIEW */}
        {showLogin && (
          <LoginModal
            config={config}
            onLogin={handleLogin}
            onNavigateHome={() => setShowLogin(false)}
          />
        )}

        {/* VIEW 3: PROFILE / MY ACCOUNT */}
        {activeTab === 'profile' && !showLogin && (
          user ? (
            <ProfileView
              user={user}
              config={config}
              onOpenAddMoney={() => setActiveTab('add-money')}
              onLogout={handleLogout}
              onRefreshUser={() => triggerToast('ব্যালেন্স রিফ্রেশ হয়েছে')}
            />
          ) : (
            <LoginModal
              config={config}
              onLogin={handleLogin}
              onNavigateHome={() => setActiveTab('home')}
            />
          )
        )}

        {/* VIEW 4: ADD MONEY VIEW */}
        {activeTab === 'add-money' && !showLogin && (
          <AddMoneyView
            user={
              user || {
                id: 'guest',
                name: 'Guest User',
                email: 'guest@mgtopup.com',
                phone: '01XXXXXXXXX',
                userId: '105279',
                supportPin: '105279',
                walletBalance: 0,
                totalSpend: 0,
                weeklySpend: 0,
                ordersCount: 0,
                rank: 'Bronze',
                isVerified: true,
                role: 'user',
              }
            }
            config={config}
            onSuccess={handleAddMoneySuccess}
            onBack={() => setActiveTab('home')}
          />
        )}

        {/* VIEW 5: TUTORIAL VIEW */}
        {activeTab === 'tutorial' && !showLogin && (
          <TutorialModal
            config={config}
            onClose={() => setActiveTab('home')}
          />
        )}

        {/* VIEW 6: MY ORDERS VIEW */}
        {activeTab === 'orders' && !showLogin && (
          <MyOrdersView
            orders={orders}
            transactions={transactions}
            config={config}
          />
        )}
      </main>

      {/* Product TopUp Purchase Modal */}
      <TopUpModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        user={user}
        onOrderSuccess={handleOrderSuccess}
        onOpenAddMoney={() => {
          setSelectedProduct(null);
          setActiveTab('add-money');
        }}
        onOpenLogin={() => {
          setSelectedProduct(null);
          setShowLogin(true);
        }}
      />

      {/* Tutorial Modal overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/80 backdrop-blur-xs">
          <div className="w-full max-w-lg">
            <TutorialModal
              config={config}
              onClose={() => setShowTutorial(false)}
            />
          </div>
        </div>
      )}

      {/* Floating Install App Banner */}
      <InstallAppBanner />

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setShowLogin(false);
          setActiveTab(tab);
        }}
        user={user}
      />
    </div>
  );
}
