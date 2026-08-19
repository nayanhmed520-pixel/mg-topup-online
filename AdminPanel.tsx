import React, { useState } from 'react';
import {
  SiteConfig,
  UserProfile,
  AddMoneyTransaction,
  OrderItem,
  TopupProduct,
  BannerItem,
  TopupPackage,
} from '../types';
import {
  ShieldAlert,
  Save,
  Image as ImageIcon,
  Video,
  CreditCard,
  Bell,
  Check,
  X,
  Plus,
  Trash2,
  DollarSign,
  Layers,
  Sparkles,
  Users,
  Search,
  ExternalLink,
  Eye,
  Lock,
  LogOut,
  RefreshCw,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  ShoppingBag,
  Gift,
  HelpCircle,
  Radio,
  UserCheck,
  UserX,
  PlusCircle,
} from 'lucide-react';

interface AdminPanelProps {
  config: SiteConfig;
  onSaveConfig: (config: SiteConfig) => void;
  products: TopupProduct[];
  onSaveProducts: (products: TopupProduct[]) => void;
  allUsers: UserProfile[];
  onSaveAllUsers: (users: UserProfile[]) => void;
  transactions: AddMoneyTransaction[];
  onApproveTransaction: (txnId: string) => void;
  onRejectTransaction: (txnId: string) => void;
  orders: OrderItem[];
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status'], refundToWallet?: boolean) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  config,
  onSaveConfig,
  products,
  onSaveProducts,
  allUsers,
  onSaveAllUsers,
  transactions,
  onApproveTransaction,
  onRejectTransaction,
  orders,
  onUpdateOrderStatus,
  onClose,
}) => {
  // Navigation tabs for the Admin Portal
  type AdminTab =
    | 'dashboard'
    | 'banners'
    | 'categories'
    | 'popup'
    | 'orders'
    | 'addmoney'
    | 'payments'
    | 'users'
    | 'video_notices'
    | 'security';

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [productList, setProductList] = useState<TopupProduct[]>(products);
  const [userList, setUserList] = useState<UserProfile[]>(allUsers);
  const [savedToast, setSavedToast] = useState<string>('');

  // Search & Filter states
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [userSearch, setUserSearch] = useState<string>('');
  const [txnFilter, setTxnFilter] = useState<string>('all');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<TopupProduct | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState<boolean>(false);

  // New banner state
  const [newBanner, setNewBanner] = useState<Partial<BannerItem>>({
    title: '',
    subtitle: '',
    imageUrl: '',
    linkUrl: 'https://t.me/mgtopup_official',
    tag: 'OFFER',
    active: true,
  });

  // User Balance Adjust modal state
  const [selectedUserForBalance, setSelectedUserForBalance] = useState<UserProfile | null>(null);
  const [balanceAmountInput, setBalanceAmountInput] = useState<string>('100');
  const [balanceActionType, setBalanceActionType] = useState<'add' | 'deduct'>('add');

  // New User manual create modal state
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    walletBalance: 0,
    userId: '',
  });

  // Security PIN change state
  const [adminPinInput, setAdminPinInput] = useState<string>(config.adminPin || '778899');

  const showNotification = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(''), 3500);
  };

  const handleSaveConfig = () => {
    onSaveConfig(formData);
    showNotification('সাইট কনফিগারেশন ও সেটিংস সংরক্ষিত হয়েছে!');
  };

  const handleSaveProducts = (updatedProducts: TopupProduct[]) => {
    setProductList(updatedProducts);
    onSaveProducts(updatedProducts);
    showNotification('প্রোডাক্ট ও ক্যাটাগরি ডাটাবেজ আপডেট হয়েছে!');
  };

  const handleSaveUsers = (updatedUsers: UserProfile[]) => {
    setUserList(updatedUsers);
    onSaveAllUsers(updatedUsers);
    showNotification('ইউজার ডাটাবেজ আপডেট হয়েছে!');
  };

  // Banner Actions
  const handleAddBanner = () => {
    if (!newBanner.imageUrl) {
      alert('দয়া করে ব্যানার ইমেজ URL দিন!');
      return;
    }
    const bannerItem: BannerItem = {
      id: 'banner-' + Date.now(),
      title: newBanner.title || 'MG TopUp স্পেশাল অফার',
      subtitle: newBanner.subtitle || 'অটো ডেলিভারি মাত্র ৫ সেকেন্ডে',
      imageUrl: newBanner.imageUrl,
      linkUrl: newBanner.linkUrl || 'https://t.me/mgtopup_official',
      tag: newBanner.tag || 'NEW OFFER',
      active: true,
    };

    const updatedBanners = [...(formData.banners || []), bannerItem];
    const newConfig = { ...formData, banners: updatedBanners };
    setFormData(newConfig);
    onSaveConfig(newConfig);
    setNewBanner({
      title: '',
      subtitle: '',
      imageUrl: '',
      linkUrl: 'https://t.me/mgtopup_official',
      tag: 'OFFER',
      active: true,
    });
    showNotification('নতুন ব্যানার সফলভাবে যুক্ত হয়েছে!');
  };

  const handleDeleteBanner = (bannerId: string) => {
    const updatedBanners = (formData.banners || []).filter((b) => b.id !== bannerId);
    const newConfig = { ...formData, banners: updatedBanners };
    setFormData(newConfig);
    onSaveConfig(newConfig);
    showNotification('ব্যানার ডিলিট করা হয়েছে!');
  };

  const handleToggleBanner = (bannerId: string) => {
    const updatedBanners = (formData.banners || []).map((b) =>
      b.id === bannerId ? { ...b, active: !b.active } : b
    );
    const newConfig = { ...formData, banners: updatedBanners };
    setFormData(newConfig);
    onSaveConfig(newConfig);
  };

  // Product Package Actions
  const handleAddPackageToEditingProduct = () => {
    if (!editingProduct) return;
    const newPkg: TopupPackage = {
      id: 'pkg-' + Date.now(),
      name: '100 Diamond',
      diamonds: 100,
      price: 75,
      originalPrice: 90,
      popular: false,
    };
    setEditingProduct({
      ...editingProduct,
      packages: [...editingProduct.packages, newPkg],
    });
  };

  const handleRemovePackageFromEditingProduct = (pkgId: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      packages: editingProduct.packages.filter((p) => p.id !== pkgId),
    });
  };

  const handleSaveEditingProduct = () => {
    if (!editingProduct) return;
    let updated: TopupProduct[];
    if (isAddingNewProduct) {
      updated = [...productList, editingProduct];
    } else {
      updated = productList.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }
    handleSaveProducts(updated);
    setEditingProduct(null);
    setIsAddingNewProduct(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('আপনি কি নিশ্চিত এই ক্যাটাগরি/প্রোডাক্টটি ডিলিট করতে চান?')) {
      const updated = productList.filter((p) => p.id !== productId);
      handleSaveProducts(updated);
    }
  };

  // User Balance Actions
  const handleApplyUserBalanceChange = () => {
    if (!selectedUserForBalance) return;
    const val = parseFloat(balanceAmountInput);
    if (isNaN(val) || val <= 0) {
      alert('সঠিক টাকার পরিমাণ লিখুন!');
      return;
    }

    const updated = userList.map((u) => {
      if (u.id === selectedUserForBalance.id || u.userId === selectedUserForBalance.userId) {
        const newBalance =
          balanceActionType === 'add'
            ? u.walletBalance + val
            : Math.max(0, u.walletBalance - val);
        return { ...u, walletBalance: newBalance };
      }
      return u;
    });

    handleSaveUsers(updated);
    setSelectedUserForBalance(null);
    showNotification(
      `ইউজার ${selectedUserForBalance.name} এর ওয়ালেটে ৳${val} ${
        balanceActionType === 'add' ? 'যোগ' : 'কর্তন'
      } করা হয়েছে!`
    );
  };

  const handleToggleUserBan = (user: UserProfile) => {
    const updated = userList.map((u) =>
      u.id === user.id ? { ...u, isBanned: !u.isBanned } : u
    );
    handleSaveUsers(updated);
    showNotification(`ইউজার ${user.name} কে ${user.isBanned ? 'আনব্যান' : 'ব্যান'} করা হয়েছে!`);
  };

  const handleCreateNewUser = () => {
    if (!newUserData.name || !newUserData.phone) {
      alert('নাম এবং ফোন নম্বর দেওয়া বাধ্যতামূলক!');
      return;
    }
    const createdUserId = newUserData.userId || Math.floor(100000 + Math.random() * 900000).toString();
    const newUser: UserProfile = {
      id: 'user_' + createdUserId,
      userId: createdUserId,
      name: newUserData.name,
      email: newUserData.email || `${createdUserId}@gmail.com`,
      phone: newUserData.phone,
      supportPin: Math.floor(100000 + Math.random() * 900000).toString(),
      walletBalance: Number(newUserData.walletBalance) || 0,
      totalSpend: 0,
      weeklySpend: 0,
      ordersCount: 0,
      rank: 'Bronze',
      isVerified: true,
      role: 'user',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    handleSaveUsers([newUser, ...userList]);
    setShowAddUserModal(false);
    setNewUserData({ name: '', email: '', phone: '', walletBalance: 0, userId: '' });
    showNotification(`নতুন ইউজার ID ${createdUserId} তৈরি হয়েছে!`);
  };

  // Metrics Calculations
  const totalRevenue = orders
    .filter((o) => o.status === 'Completed')
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const pendingTxnCount = transactions.filter((t) => t.status === 'Pending').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.userName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (o.playerUid && o.playerUid.includes(orderSearch)) ||
      o.itemTitle.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus =
      orderStatusFilter === 'all' || o.status.toLowerCase() === orderStatusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Filtered Users
  const filteredUsers = userList.filter((u) => {
    return (
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.userId.includes(userSearch) ||
      u.phone.includes(userSearch) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  });

  // Filtered Transactions
  const filteredTxns = transactions.filter((t) => {
    if (txnFilter === 'all') return true;
    return t.status.toLowerCase() === txnFilter.toLowerCase();
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-['Hind_Siliguri',sans-serif]">
      {/* Top Notification Toast */}
      {savedToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center gap-2 border border-emerald-400 animate-bounce text-sm">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Admin Master Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-rose-950">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                MG TOPUP ADMIN MASTER PORTAL
              </h1>
              <span className="bg-rose-500/20 text-rose-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-500/30 uppercase">
                Separate Admin Console
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              ব্যানার, প্রোডাক্ট, পপআপ, বিকাশ/নগদ নম্বর, ইউজার ট্র্যাকার ও অর্ডার কন্ট্রোল সিস্টেম
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Website Button */}
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">গ্রাহক ওয়েবসাইট দেখুন</span>
            <span className="sm:hidden">ওয়েবসাইট</span>
          </button>

          {/* Quick Save All Button */}
          <button
            onClick={handleSaveConfig}
            className="px-3.5 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>সেভ করুন</span>
          </button>

          {/* Exit / Logout */}
          <button
            onClick={onClose}
            title="লগআউট / বন্ধ করুন"
            className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-20 sm:w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="p-3 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-wider hidden sm:block">
              মেইন মেনু ও কন্ট্রোল
            </div>

            {[
              { id: 'dashboard', label: 'ড্যাশবোর্ড ওভারভিউ', icon: TrendingUp, badge: null },
              {
                id: 'banners',
                label: 'ব্যানার ইমেজ ও স্লাইডার',
                icon: ImageIcon,
                badge: formData.banners?.length || 0,
              },
              {
                id: 'categories',
                label: 'ক্যাটাগরি ও প্রোডাক্ট',
                icon: ShoppingBag,
                badge: productList.length,
              },
              { id: 'popup', label: 'প্রবেশদ্বার পপআপ ইমেজ', icon: Radio, badge: formData.popup.enabled ? 'ON' : 'OFF' },
              {
                id: 'orders',
                label: 'অর্ডার লিস্ট (এপ্রুভ/ক্যানসেল)',
                icon: Layers,
                badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} New` : orders.length,
                badgeColor: pendingOrdersCount > 0 ? 'bg-rose-600' : 'bg-slate-700',
              },
              {
                id: 'addmoney',
                label: 'অ্যাড মানি রিকোয়েস্ট',
                icon: DollarSign,
                badge: pendingTxnCount > 0 ? `${pendingTxnCount} New` : transactions.length,
                badgeColor: pendingTxnCount > 0 ? 'bg-amber-600' : 'bg-slate-700',
              },
              {
                id: 'payments',
                label: 'বিকাশ/নগদ/রকেট নম্বর',
                icon: CreditCard,
                badge: null,
              },
              {
                id: 'users',
                label: 'ইউজার ও লগইন আইডি',
                icon: Users,
                badge: userList.length,
              },
              {
                id: 'video_notices',
                label: 'ভিডিও ও নোটিশ সেটিংস',
                icon: Video,
                badge: null,
              },
              {
                id: 'security',
                label: 'এডমিন সিকিউরিটি পিন',
                icon: Lock,
                badge: null,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950 font-black'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline truncate">{tab.label}</span>
                  {tab.badge !== null && (
                    <span
                      className={`ml-auto hidden sm:inline-block text-[10px] font-black px-2 py-0.5 rounded-full ${
                        tab.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300')
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer info */}
          <div className="p-3 border-t border-slate-800 hidden sm:block bg-slate-950/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold text-slate-400">অটো সিঙ্ক এক্টিভ</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">সব পরিবর্তন সাথে সাথে সাইটে লাইভ হয়</p>
          </div>
        </aside>

        {/* Right Content View Area */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-3xl border border-slate-700 shadow-xl">
                <div>
                  <h2 className="text-xl font-black text-white">স্বাগতম, এডমিন প্যানেল কন্ট্রোল সেন্টারে!</h2>
                  <p className="text-xs text-slate-300 mt-1">
                    এখান থেকে আপনি ওয়েবসাইটের প্রতিটি ব্যানার, ছবি, ক্যাটাগরি, বিকাশ/নগদ নম্বর এবং অর্ডার নিয়ন্ত্রণ করতে পারবেন।
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4" />
                    <span>অর্ডার দেখুন ({orders.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('banners')}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>ব্যানার পরিবর্তন</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                    <span>মোট বিক্রয় ও আয়</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400">৳{totalRevenue.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400 mt-1">সফল অর্ডার থেকে অর্জিত</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                    <span>পেন্ডিং অর্ডার</span>
                    <Layers className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-rose-400">{pendingOrdersCount} টি</div>
                  <div className="text-[11px] text-slate-400 mt-1">অ্যাপ্রুভালের অপেক্ষায়</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                    <span>অ্যাড মানি রিকোয়েস্ট</span>
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400">{pendingTxnCount} টি</div>
                  <div className="text-[11px] text-slate-400 mt-1">যাচাইয়ের অপেক্ষায়</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                    <span>মোট রেজিস্টার্ড ইউজার</span>
                    <Users className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-sky-400">{userList.length} জন</div>
                  <div className="text-[11px] text-slate-400 mt-1">লগইন করা আইডি সমূহ</div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('banners')}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-sm">ব্যানার ও স্লাইডার পরিবর্তন</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    হোমপেজের স্লাইডার ইমেজ URL দিয়ে যেকোনো নতুন ব্যানার ও অফার লিংক যুক্ত করুন।
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('categories')}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-sm">ক্যাটাগরি ছবি ও প্যাকেজ</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Free Fire, Unipin, Membership এর ইমেজ ও ডায়মন্ড প্যাকেজের দাম পরিবর্তন করুন।
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('payments')}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-3xl transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-sm">বিকাশ ও নগদ নম্বর আপডেট</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    আপনার পার্সোনাল বিকাশ, নগদ ও রকেট সেন্ড মানি নম্বর পরিবর্তন করুন।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BANNERS & SLIDERS MANAGER (User's primary request) */}
          {activeTab === 'banners' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-rose-500" />
                      হোমপেজ স্লাইডার ব্যানার ইমেজ কন্ট্রোল
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      URL এর মাধ্যমে সহজেই নতুন ব্যানার ছবি ও রিডাইরেক্ট লিংক পরিবর্তন করুন
                    </p>
                  </div>
                </div>

                {/* Current Active Banners List */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    বর্তমানে চালু থাকা ব্যানার সমূহ ({formData.banners?.length || 0})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.banners?.map((b, idx) => (
                      <div
                        key={b.id || idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          b.active
                            ? 'bg-slate-800/80 border-slate-700'
                            : 'bg-slate-900/50 border-slate-800 opacity-60'
                        }`}
                      >
                        {/* Banner Image Preview */}
                        <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-black">
                          <img
                            src={b.imageUrl}
                            alt={b.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 right-2 flex gap-1.5">
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${
                                b.active ? 'bg-emerald-600' : 'bg-slate-700'
                              }`}
                            >
                              {b.active ? 'Active' : 'Hidden'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-white truncate">{b.title}</p>
                          <p className="text-slate-400 truncate">{b.subtitle}</p>
                          <p className="text-[11px] text-amber-400 truncate font-mono">🔗 {b.linkUrl}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/60">
                          <button
                            type="button"
                            onClick={() => handleToggleBanner(b.id)}
                            className={`text-xs font-bold px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                              b.active
                                ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                                : 'bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300'
                            }`}
                          >
                            {b.active ? 'লুকিয়ে রাখুন' : 'সক্রিয় করুন'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBanner(b.id)}
                            className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-600/30 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Banner Form */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    নতুন ব্যানার ইমেজ যুক্ত করুন (Add New Banner)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        ব্যানার ইমেজ URL (Image Link) *
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={newBanner.imageUrl || ''}
                        onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        রিডাইরেক্ট লিংক (Button/Telegram Link)
                      </label>
                      <input
                        type="url"
                        placeholder="https://t.me/mgtopup_official"
                        value={newBanner.linkUrl || ''}
                        onChange={(e) => setNewBanner({ ...newBanner, linkUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        ব্যানার টাইটেল (Title)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: বিশেষ অফার চলছে"
                        value={newBanner.title || ''}
                        onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        সাবটাইটেল / অফার টেক্সট
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: মাত্র ৫ সেকেন্ডে আইডি কোড টপআপ"
                        value={newBanner.subtitle || ''}
                        onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-rose-500"
                      />
                    </div>
                  </div>

                  {/* Live Preview if Image URL is provided */}
                  {newBanner.imageUrl && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[11px] font-bold text-slate-400 mb-1.5">ইমেজ লাইভ প্রিভিউ:</p>
                      <div className="h-28 w-full max-w-sm rounded-lg overflow-hidden border border-slate-700">
                        <img
                          src={newBanner.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAddBanner}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ব্যানার যোগ করুন</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES & PRODUCTS MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-purple-500" />
                      ক্যাটাগরি ছবি, টাইটেল ও প্যাকেজ প্রাইস কন্ট্রোল
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      যেকোনো ক্যাটাগরির ইমেজ URL পরিবর্তন করুন এবং ডায়মন্ড প্যাকেজের রেট সেট করুন
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newProd: TopupProduct = {
                        id: 'prod-' + Date.now(),
                        title: 'নতুন গেম / অফার',
                        subtitle: 'ইনস্ট্যান্ট ডেলিভারি',
                        category: 'garena',
                        imageUrl:
                          'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
                        deliveryType: 'Auto',
                        requiresUid: true,
                        packages: [
                          { id: 'pkg-1', name: '100 Diamond', price: 80, originalPrice: 95 },
                        ],
                      };
                      setEditingProduct(newProd);
                      setIsAddingNewProduct(true);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>নতুন ক্যাটাগরি তৈরি</span>
                  </button>
                </div>

                {/* Product List Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productList.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-3.5 hover:border-slate-700 transition-all"
                    >
                      {/* Product Category Image Preview */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-white text-xs truncate">{prod.title}</h4>
                          <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md font-bold">
                            {prod.packages.length} Packages
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 truncate">{prod.subtitle}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Category: <span className="text-slate-300">{prod.category}</span>
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            onClick={() => {
                              setEditingProduct(JSON.parse(JSON.stringify(prod)));
                              setIsAddingNewProduct(false);
                            }}
                            className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>এডিট করুন</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                            title="ক্যাটাগরি ডিলিট"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Product Modal */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 my-8 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <Edit2 className="w-4 h-4 text-purple-400" />
                        {isAddingNewProduct ? 'নতুন ক্যাটাগরি তৈরি করুন' : 'ক্যাটাগরি ও প্যাকেজ এডিট করুন'}
                      </h3>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingNewProduct(false);
                        }}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          ক্যাটাগরি টাইটেল (Title)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.title}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, title: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          সাবটাইটেল (Subtitle)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.subtitle || ''}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, subtitle: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          ক্যাটাগরি ইমেজ লিংক (Image URL) *
                        </label>
                        <input
                          type="url"
                          value={editingProduct.imageUrl}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        {editingProduct.imageUrl && (
                          <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden border border-slate-700">
                            <img
                              src={editingProduct.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">সেকশন</label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="special">স্পেশাল অফার (Special Offers)</option>
                          <option value="garena">গারেনা ডায়মন্ড (Garena Core)</option>
                          <option value="voucher">ভাউচার (Vouchers)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          ডেলিভারি ব্যাজ
                        </label>
                        <input
                          type="text"
                          value={editingProduct.badge || ''}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, badge: e.target.value })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Packages Inside this Category */}
                    <div className="pt-3 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">ডায়মন্ড / অফার প্যাকেজ তালিকা</h4>
                        <button
                          type="button"
                          onClick={handleAddPackageToEditingProduct}
                          className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>প্যাকেজ যোগ করুন</span>
                        </button>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {editingProduct.packages.map((pkg, idx) => (
                          <div
                            key={pkg.id || idx}
                            className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={pkg.name}
                              placeholder="Package Name"
                              onChange={(e) => {
                                const newPackages = [...editingProduct.packages];
                                newPackages[idx].name = e.target.value;
                                setEditingProduct({ ...editingProduct, packages: newPackages });
                              }}
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                            />
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-slate-400">৳</span>
                              <input
                                type="number"
                                value={pkg.price}
                                placeholder="Price"
                                onChange={(e) => {
                                  const newPackages = [...editingProduct.packages];
                                  newPackages[idx].price = Number(e.target.value);
                                  setEditingProduct({ ...editingProduct, packages: newPackages });
                                }}
                                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePackageFromEditingProduct(pkg.id)}
                              className="p-1 text-rose-400 hover:bg-rose-600/20 rounded cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(null);
                          setIsAddingNewProduct(false);
                        }}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveEditingProduct}
                        className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                      >
                        সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: POPUP ANNOUNCEMENT MANAGER */}
          {activeTab === 'popup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Radio className="w-5 h-5 text-rose-500" />
                      প্রবেশদ্বার পপআপ ইমেজ ও নোটিশ কন্ট্রোল
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ব্যবহারকারী ওয়েবসাইটে ঢোকার সাথে সাথে যে বড় পপআপটি দেখতে পায়
                    </p>
                  </div>

                  <label className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer">
                    <span className="text-xs font-bold text-slate-300">পপআপ চালু:</span>
                    <input
                      type="checkbox"
                      checked={formData.popup.enabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, enabled: e.target.checked },
                        })
                      }
                      className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      পপআপ ব্যানার ইমেজ URL (Image Link) *
                    </label>
                    <input
                      type="url"
                      value={formData.popup.imageUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, imageUrl: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      পপআপ মূল শিরোনাম (Headline)
                    </label>
                    <input
                      type="text"
                      value={formData.popup.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, title: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      পপআপ সাবটাইটেল (Subtitle)
                    </label>
                    <input
                      type="text"
                      value={formData.popup.subtitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, subtitle: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      অ্যাকশন বাটন টেক্সট
                    </label>
                    <input
                      type="text"
                      value={formData.popup.buttonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, buttonText: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      বাটন রিডাইরেক্ট লিংক (যেমন টেলিগ্রাম চ্যানেল)
                    </label>
                    <input
                      type="url"
                      value={formData.popup.buttonLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          popup: { ...formData.popup, buttonLink: e.target.value },
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Popup Live Preview Box */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    পপআপ লাইভ প্রিভিউ (Live Preview):
                  </p>
                  <div className="max-w-sm mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl p-3 text-center space-y-2">
                    <img
                      src={formData.popup.imageUrl}
                      alt="Popup"
                      className="w-full h-36 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-sm font-black text-white">{formData.popup.title}</h4>
                    <p className="text-xs text-slate-300">{formData.popup.subtitle}</p>
                    <button
                      type="button"
                      className="w-full py-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      {formData.popup.buttonText}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveConfig}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    পপআপ সেটিংস সেভ করুন
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ORDERS MANAGEMENT (Approve / Cancel Orders) */}
          {activeTab === 'orders' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-rose-500" />
                      কাস্টমার অর্ডার ম্যানেজমেন্ট (Approve / Cancel)
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      অর্ডার এপ্রুভ করুন, প্রসেসিং মার্ক করুন অথবা ক্যানসেল করে কাস্টমারের ওয়ালেটে রিফান্ড দিন
                    </p>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="UID, নাম বা Order ID..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 w-48"
                      />
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    >
                      <option value="all">সকল অর্ডার ({orders.length})</option>
                      <option value="pending">পেন্ডিং (Pending)</option>
                      <option value="completed">কমপ্লিট (Completed)</option>
                      <option value="processing">প্রসেসিং (Processing)</option>
                      <option value="cancelled">ক্যানসেল্ড (Cancelled)</option>
                    </select>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">Order ID</th>
                        <th className="p-3">ইউজার ও প্লেয়ার UID</th>
                        <th className="p-3">আইটেম ও প্যাকেজ</th>
                        <th className="p-3">মূল্য ও মেথড</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">একশন (Approve/Cancel)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            কোনো অর্ডার পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono font-bold text-amber-400">{ord.id}</td>
                            <td className="p-3">
                              <p className="font-bold text-white">{ord.userName}</p>
                              {ord.playerUid && (
                                <p className="text-[11px] text-rose-400 font-mono font-bold">
                                  UID: {ord.playerUid}
                                </p>
                              )}
                            </td>
                            <td className="p-3">
                              <p className="font-semibold text-slate-200">{ord.itemTitle}</p>
                              <p className="text-[11px] text-slate-400">{ord.packageDetails}</p>
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-emerald-400">৳{ord.amount}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{ord.paymentMethod}</p>
                            </td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                                  ord.status === 'Completed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : ord.status === 'Pending'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : ord.status === 'Processing'
                                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                              {ord.status !== 'Completed' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'Completed')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] cursor-pointer"
                                  title="এপ্রুভ করুন"
                                >
                                  Approve
                                </button>
                              )}

                              {ord.status !== 'Processing' && ord.status !== 'Completed' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'Processing')}
                                  className="px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-[11px] cursor-pointer"
                                  title="প্রসেসিং মার্ক করুন"
                                >
                                  Process
                                </button>
                              )}

                              {ord.status !== 'Cancelled' && (
                                <button
                                  onClick={() => {
                                    if (confirm('অর্ডারটি ক্যানসেল করে কাস্টমারের ওয়ালেটে টাকা ফেরত দিতে চান?')) {
                                      onUpdateOrderStatus(ord.id, 'Cancelled', true);
                                    }
                                  }}
                                  className="px-2 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg font-bold text-[11px] cursor-pointer"
                                  title="ক্যানসেল ও রিফান্ড"
                                >
                                  Cancel & Refund
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ADD MONEY REQUESTS VERIFICATION */}
          {activeTab === 'addmoney' && (
            <div className="space-y-5 max-w-5xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-amber-500" />
                      অ্যাড মানি যাচাই ও ব্যালেন্স অ্যাপ্রুভ
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      গ্রাহকের পাঠানো বিকাশ, নগদ ও রকেট TrxID যাচাই করে ১ ক্লিকে একাউন্টে টাকা যোগ করুন
                    </p>
                  </div>

                  <select
                    value={txnFilter}
                    onChange={(e) => setTxnFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                  >
                    <option value="all">সকল রিকোয়েস্ট ({transactions.length})</option>
                    <option value="pending">পেন্ডিং (Pending)</option>
                    <option value="approved">এপ্রুভড (Approved)</option>
                    <option value="rejected">রিজেক্টেড (Rejected)</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">Trx ID</th>
                        <th className="p-3">ইউজার তথ্য</th>
                        <th className="p-3">মেথড</th>
                        <th className="p-3">টাকার পরিমাণ</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">একশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredTxns.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            কোনো ট্রানজেকশন পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredTxns.map((txn) => (
                          <tr key={txn.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono font-bold text-amber-400">{txn.trxId}</td>
                            <td className="p-3">
                              <p className="font-bold text-white">{txn.userName}</p>
                              <p className="text-[11px] text-slate-400 font-mono">📱 {txn.userPhone}</p>
                            </td>
                            <td className="p-3">
                              <span className="font-bold text-slate-200">{txn.method}</span>
                            </td>
                            <td className="p-3 font-black text-emerald-400 text-sm">৳{txn.amount}</td>
                            <td className="p-3">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                                  txn.status === 'Approved'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : txn.status === 'Pending'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                }`}
                              >
                                {txn.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                              {txn.status === 'Pending' ? (
                                <>
                                  <button
                                    onClick={() => onApproveTransaction(txn.id)}
                                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs cursor-pointer"
                                  >
                                    Approve & Add
                                  </button>
                                  <button
                                    onClick={() => onRejectTransaction(txn.id)}
                                    className="px-3 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg font-bold text-xs cursor-pointer"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span className="text-slate-400 text-[11px]">প্রসেসড</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PAYMENT GATEWAY NUMBERS (bKash / Nagad / Rocket) */}
          {activeTab === 'payments' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="pb-4 border-b border-slate-800">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-rose-500" />
                    বিকাশ, নগদ ও রকেট পেমেন্ট নম্বর সেটিংস
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    গ্রাহক অ্যাড মানি করার সময় যে নম্বরগুলোতে টাকা সেন্ড মানি করবে
                  </p>
                </div>

                {/* bKash Configuration */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950/40 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-black text-sm">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span>বিকাশ (bKash) সেটিংস</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        বিকাশ নম্বর (Phone Number) *
                      </label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.bKash}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, bKash: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">একাউন্ট টাইপ</label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.bkashType || 'Personal (সেন্ড মানি)'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, bkashType: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Nagad Configuration */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-amber-950/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span>নগদ (Nagad) সেটিংস</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        নগদ নম্বর (Phone Number) *
                      </label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.nagad}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, nagad: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">একাউন্ট টাইপ</label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.nagadType || 'Personal (সেন্ড মানি)'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, nagadType: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Rocket Configuration */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-purple-950/40 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-black text-sm">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>রকেট (Rocket) সেটিংস</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        রকেট নম্বর (Phone Number) *
                      </label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.rocket}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, rocket: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">একাউন্ট টাইপ</label>
                      <input
                        type="text"
                        value={formData.paymentNumbers.rocketType || 'Personal (সেন্ড মানি)'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentNumbers: { ...formData.paymentNumbers, rocketType: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveConfig}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    পেমেন্ট নম্বর সেভ করুন
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: USER MANAGEMENT & LOGIN LOGS */}
          {activeTab === 'users' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-sky-500" />
                      ইউজার একাউন্ট ও লগইন আইডি ট্র্যাকার
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      কোন কোন ইউজার ওয়েবসাইটে যুক্ত আছেন, তাদের আইডি, ব্যালেন্স ও সরাসরি টাকা যোগ/কর্তন করুন
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="নাম, ফোন বা User ID..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 w-48"
                      />
                    </div>

                    <button
                      onClick={() => setShowAddUserModal(true)}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>নতুন ইউজার তৈরি</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        <th className="p-3">User ID</th>
                        <th className="p-3">নাম ও ইমেইল</th>
                        <th className="p-3">ফোন ও সাপোর্ট পিন</th>
                        <th className="p-3">ওয়ালেট ব্যালেন্স</th>
                        <th className="p-3">মোট খরচ ও অর্ডার</th>
                        <th className="p-3">রোল ও স্ট্যাটাস</th>
                        <th className="p-3 text-right">একশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-mono font-black text-amber-400">
                            #{u.userId}
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-white flex items-center gap-1.5">
                              {u.name}
                              {u.role === 'admin' && (
                                <span className="bg-rose-500/20 text-rose-400 text-[9px] px-1.5 py-0.5 rounded font-mono font-black">
                                  ADMIN
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                          </td>
                          <td className="p-3 font-mono">
                            <p className="text-slate-200">{u.phone}</p>
                            <p className="text-[10px] text-slate-400">PIN: {u.supportPin}</p>
                          </td>
                          <td className="p-3">
                            <span className="font-black text-emerald-400 text-sm">
                              ৳{u.walletBalance}
                            </span>
                          </td>
                          <td className="p-3">
                            <p className="text-slate-200 font-semibold">৳{u.totalSpend}</p>
                            <p className="text-[10px] text-slate-400">{u.ordersCount} Orders</p>
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                u.isBanned
                                  ? 'bg-rose-500/20 text-rose-400'
                                  : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                            >
                              {u.isBanned ? 'Banned' : 'Active'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setSelectedUserForBalance(u);
                                setBalanceAmountInput('100');
                                setBalanceActionType('add');
                              }}
                              className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg font-bold text-xs cursor-pointer"
                              title="ব্যালেন্স পরিবর্তন"
                            >
                              টাকা যোগ/কর্তন
                            </button>

                            {u.role !== 'admin' && (
                              <button
                                onClick={() => handleToggleUserBan(u)}
                                className={`px-2 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                                  u.isBanned
                                    ? 'bg-emerald-600/20 text-emerald-400'
                                    : 'bg-rose-600/20 text-rose-400'
                                }`}
                              >
                                {u.isBanned ? 'Unban' : 'Ban'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Balance Adjustment Modal */}
              {selectedUserForBalance && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="text-sm font-black text-white flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        ওয়ালেট ব্যালেন্স নিয়ন্ত্রণ: {selectedUserForBalance.name}
                      </h3>
                      <button
                        onClick={() => setSelectedUserForBalance(null)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-slate-400">User ID: <span className="font-bold text-white">#{selectedUserForBalance.userId}</span></p>
                      <p className="text-slate-400">বর্তমান ব্যালেন্স: <span className="font-black text-emerald-400">৳{selectedUserForBalance.walletBalance}</span></p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBalanceActionType('add')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          balanceActionType === 'add'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        + ব্যালেন্স যোগ করুন
                      </button>
                      <button
                        type="button"
                        onClick={() => setBalanceActionType('deduct')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          balanceActionType === 'deduct'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        - ব্যালেন্স কর্তন করুন
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        টাকার পরিমাণ (Amount in ৳)
                      </label>
                      <input
                        type="number"
                        value={balanceAmountInput}
                        onChange={(e) => setBalanceAmountInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base font-black text-emerald-400"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUserForBalance(null)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyUserBalanceChange}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        কনফার্ম করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add User Modal */}
              {showAddUserModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="text-sm font-black text-white flex items-center gap-2">
                        <PlusCircle className="w-4 h-4 text-sky-400" />
                        নতুন ইউজার তৈরি করুন
                      </h3>
                      <button
                        onClick={() => setShowAddUserModal(false)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">ইউজারের নাম *</label>
                        <input
                          type="text"
                          placeholder="যেমন: Sabbir Hossain"
                          value={newUserData.name}
                          onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">ফোন নম্বর *</label>
                        <input
                          type="text"
                          placeholder="017xxxxxxxx"
                          value={newUserData.phone}
                          onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">ইমেইল</label>
                        <input
                          type="email"
                          placeholder="user@gmail.com"
                          value={newUserData.email}
                          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">প্রাথমিক ওয়ালেট ব্যালেন্স (৳)</label>
                        <input
                          type="number"
                          value={newUserData.walletBalance}
                          onChange={(e) =>
                            setNewUserData({ ...newUserData, walletBalance: Number(e.target.value) })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddUserModal(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        বাতিল
                      </button>
                      <button
                        type="button"
                        onClick={handleCreateNewUser}
                        className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        তৈরি করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: VIDEO TUTORIAL & NOTICES */}
          {activeTab === 'video_notices' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                <div className="pb-4 border-b border-slate-800">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-amber-500" />
                    অ্যাড মানি ভিডিও ও ওয়েবসাইট নোটিশ সেটিংস
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ইউটিউব ভিডিও টিউটোরিয়াল ও স্ক্রোলিং নোটিশ টেক্সট নিয়ন্ত্রণ
                  </p>
                </div>

                {/* Video Tutorial Settings */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    ভিডিও টিউটোরিয়াল (Add Money Video Guide)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        ইউটিউব ভিডিও লিংক (YouTube Embed URL)
                      </label>
                      <input
                        type="url"
                        value={formData.tutorialVideo.youtubeUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tutorialVideo: { ...formData.tutorialVideo, youtubeUrl: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও টাইটেল</label>
                      <input
                        type="text"
                        value={formData.tutorialVideo.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tutorialVideo: { ...formData.tutorialVideo, title: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও বিবরণ</label>
                      <textarea
                        rows={2}
                        value={formData.tutorialVideo.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tutorialVideo: { ...formData.tutorialVideo, description: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Scrolling & Warning Notices */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-black text-rose-400 uppercase tracking-wider">
                    হোমপেজ নোটিশ ও সতর্কবার্তা
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      স্ক্রোলিং নোটিশ টেক্সট (Top Marquee Notice)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.noticeText}
                      onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      লাল সতর্কবার্তা নোটিশ (Warning Notice)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.warningNoticeText}
                      onChange={(e) => setFormData({ ...formData, warningNoticeText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Support Helpline Links */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-black text-sky-400 uppercase tracking-wider">
                    কাস্টমার সাপোর্ট ও হেল্পলাইন
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        টেলিগ্রাম সাপোর্ট লিংক
                      </label>
                      <input
                        type="url"
                        value={formData.support.telegramSupport}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            support: { ...formData.support, telegramSupport: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        টেলিগ্রাম চ্যানেল লিংক
                      </label>
                      <input
                        type="url"
                        value={formData.support.telegramGroup}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            support: { ...formData.support, telegramGroup: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        হোয়াটসঅ্যাপ নম্বর
                      </label>
                      <input
                        type="text"
                        value={formData.support.whatsapp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            support: { ...formData.support, whatsapp: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        সাপোর্ট সময়
                      </label>
                      <input
                        type="text"
                        value={formData.support.supportTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            support: { ...formData.support, supportTime: e.target.value },
                          })
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveConfig}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    সকল নোটিশ ও লিংক সেভ করুন
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: ADMIN SECURITY PIN */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="pb-3 border-b border-slate-800">
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-rose-500" />
                    এডমিন সিকিউরিটি পিন (Admin Access PIN)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    এডমিন প্যানেলে প্রবেশের গোপন পিন কোড পরিবর্তন করুন
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      সিকিউরিটি পিন (বর্তমান: {config.adminPin || '778899'})
                    </label>
                    <input
                      type="text"
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-base text-amber-400 font-mono font-black"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    * এই পিনটি দিয়ে আপনি যেকোনো সময় ওয়েবসাইট থেকে সরাসরি আলাদা এডমিন প্যানেল আনলক করতে পারবেন।
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (!adminPinInput) {
                        alert('দয়া করে পিন লিখুন!');
                        return;
                      }
                      const updatedConfig = { ...formData, adminPin: adminPinInput };
                      setFormData(updatedConfig);
                      onSaveConfig(updatedConfig);
                      showNotification('এডমিন সিকিউরিটি পিন সফলভাবে আপডেট হয়েছে!');
                    }}
                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-950 cursor-pointer"
                  >
                    পিন পরিবর্তন সংরক্ষণ করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
