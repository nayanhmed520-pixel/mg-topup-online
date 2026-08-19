import { SiteConfig, UserProfile, TopupProduct, OrderItem, AddMoneyTransaction, RankTier, BannerItem } from '../types';

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'banner-1',
    title: 'গিভওয়ে ও সকল অফার সম্পর্কে জানতে',
    subtitle: 'টেলিগ্রাম চ্যানেলে জয়েন্ট করুন',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    linkUrl: 'https://t.me/mgtopup_official',
    active: true,
    tag: 'MG TOPUP OFFICIAL',
    badgeColor: 'bg-blue-600',
  },
  {
    id: 'banner-2',
    title: 'Free Fire আইডি কোড টপআপ',
    subtitle: 'মাত্র ৫ সেকেন্ডে অটো ডেলিভারি',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
    linkUrl: 'https://t.me/mgtopup_official',
    active: true,
    tag: 'INSTANT 24/7 AUTO',
    badgeColor: 'bg-rose-600',
  },
  {
    id: 'banner-3',
    title: 'বিকাশ, নগদ ও রকেট পেমেন্টে',
    subtitle: 'সহজে অ্যাড মানি করুন ও ডিসকাউন্ট নিন',
    imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop',
    linkUrl: 'https://t.me/mgtopup_official',
    active: true,
    tag: 'SECURE PAYMENT BD',
    badgeColor: 'bg-emerald-600',
  },
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: 'MG Topup',
  logoText: 'MG TOPUP',
  noticeText: 'MG Topup এ ২৪ ঘণ্টাই টপআপ চালু থাকে....!!! যেকোনো সমস্যায় আমাদের টেলিগ্রাম মেসেজ করেন',
  warningNoticeText: `আমাদের সাইট ২৪ ঘণ্টাই চালু
(যেকোন সমস্যা হলে টেলিগ্রাম এ মেসেজ দিবেন, আমাদের বিকাশ/নগদ নাম্বারে কল দিবেন না প্লিজ)
ফ্যামিলির ফোন থেকে টাকা চুরি করে অর্ডার করলে তার বিরুদ্ধে ব্যবস্থা নেওয়া হবে`,
  banners: INITIAL_BANNERS,
  popup: {
    enabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    title: 'টপ আপ করুন রাত দিন ২৪ ঘণ্টায় মাত্র ৫ সেকেন্ডে',
    subtitle: 'গিভওয়ে এবং অফার আপডেট পেতে যুক্ত থাকুন আমাদের টেলিগ্রাম চ্যানেলে',
    buttonText: 'ক্লিক করুন',
    buttonLink: 'https://t.me/mgtopup_official',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  support: {
    telegramSupport: 'https://t.me/mgtopup_support',
    telegramGroup: 'https://t.me/mgtopup_community',
    whatsapp: '01700000000',
    email: 'nayanhmed520@gmail.com',
    supportTime: '9AM-12PM',
  },
  paymentNumbers: {
    bKash: '01626159041',
    nagad: '01855123456',
    rocket: '01912345678',
    bkashType: 'Personal (সেন্ড মানি)',
    nagadType: 'Personal (সেন্ড মানি)',
    rocketType: 'Personal (সেন্ড মানি)',
  },
  tutorialVideo: {
    title: 'MG Topup থেকে যেভাবে টপআপ করবেন ও টাকা অ্যাড করবেন',
    description: 'নিজের টপআপ নিজেই করতে চাইলে, Watch Video তে ক্লিক করে ভিডিওটি দেখুন।',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  adminPin: '778899',
};

export const INITIAL_USER: UserProfile = {
  id: 'user_105279',
  name: 'Nayan AHMED',
  email: 'nayanhmed520@gmail.com',
  phone: '01626159041',
  userId: '105279',
  supportPin: '105279',
  walletBalance: 0,
  totalSpend: 0,
  weeklySpend: 0,
  ordersCount: 0,
  rank: 'Bronze',
  isVerified: true,
  role: 'user',
  joinedAt: '2026-08-01',
};

export const INITIAL_ALL_USERS: UserProfile[] = [
  INITIAL_USER,
  {
    id: 'user_108921',
    name: 'Fathema Akter',
    email: 'fathema@gmail.com',
    phone: '01711223344',
    userId: '108921',
    supportPin: '482910',
    walletBalance: 1250,
    totalSpend: 5400,
    weeklySpend: 948,
    ordersCount: 8,
    rank: 'Gold',
    isVerified: true,
    role: 'user',
    joinedAt: '2026-07-15',
  },
  {
    id: 'user_107412',
    name: 'mobarak husen',
    email: 'mobarak@gmail.com',
    phone: '01899887766',
    userId: '107412',
    supportPin: '391024',
    walletBalance: 180,
    totalSpend: 820,
    weeklySpend: 40,
    ordersCount: 3,
    rank: 'Silver',
    isVerified: true,
    role: 'user',
    joinedAt: '2026-08-05',
  },
  {
    id: 'user_103398',
    name: 'MISTY AKTER',
    email: 'misty@gmail.com',
    phone: '01922334455',
    userId: '103398',
    supportPin: '581920',
    walletBalance: 450,
    totalSpend: 2300,
    weeklySpend: 90,
    ordersCount: 12,
    rank: 'Gold',
    isVerified: true,
    role: 'user',
    joinedAt: '2026-06-20',
  },
  {
    id: 'user_109923',
    name: 'Admin Nayan (Super Admin)',
    email: 'admin@mgtopup.com',
    phone: '01626159041',
    userId: '778899',
    supportPin: '778899',
    walletBalance: 99999,
    totalSpend: 0,
    weeklySpend: 0,
    ordersCount: 0,
    rank: 'Grand Master',
    isVerified: true,
    role: 'admin',
    joinedAt: '2026-01-01',
  },
];

export const RANK_TIERS: RankTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    rangeText: '0 - 100 Tk',
    minSpend: 0,
    maxSpend: 100,
    color: 'from-amber-600 to-amber-800',
    iconName: 'Shield',
    unlockedPerks: 'Standard Topup Speed & Normal Rates',
  },
  {
    id: 'silver',
    name: 'Silver',
    rangeText: '101 - 1,000 Tk',
    minSpend: 101,
    maxSpend: 1000,
    color: 'from-slate-300 to-slate-500',
    iconName: 'ShieldCheck',
    unlockedPerks: '1% Extra Cashback on Diamond Topups',
  },
  {
    id: 'gold',
    name: 'Gold',
    rangeText: '1,001 - 5,000 Tk',
    minSpend: 1001,
    maxSpend: 5000,
    color: 'from-yellow-400 to-amber-500',
    iconName: 'Award',
    unlockedPerks: '2% Discount + Priority Order Processing',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    rangeText: '5,001 - 10,000 Tk',
    minSpend: 5001,
    maxSpend: 10000,
    color: 'from-cyan-400 to-blue-600',
    iconName: 'Sparkles',
    unlockedPerks: 'Low-rate Exclusive Event Packages',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    rangeText: '10,001 - 25,000 Tk',
    minSpend: 10001,
    maxSpend: 25000,
    color: 'from-purple-400 to-indigo-600',
    iconName: 'Gem',
    unlockedPerks: 'Instant VIP Queue + Free Monthly Crate',
  },
  {
    id: 'heroic',
    name: 'Heroic',
    rangeText: '25,001 - 50,000 Tk',
    minSpend: 25001,
    maxSpend: 50000,
    color: 'from-red-500 to-rose-700',
    iconName: 'Flame',
    unlockedPerks: 'Wholesale Diamond Pricing + Direct Helpline',
  },
  {
    id: 'master',
    name: 'Master',
    rangeText: '50,001 - 100,000 Tk',
    minSpend: 50001,
    maxSpend: 100000,
    color: 'from-rose-600 to-purple-800',
    iconName: 'Crown',
    unlockedPerks: 'Master Special Bonus + Custom Profile Badge',
  },
  {
    id: 'grandmaster',
    name: 'Grand Master',
    rangeText: '100,000+ Tk',
    minSpend: 100000,
    maxSpend: 9999999,
    color: 'from-amber-400 to-red-600',
    iconName: 'Trophy',
    unlockedPerks: 'Ultimate VIP Status, Zero Fees, 24/7 dedicated manager',
  },
];

export const INITIAL_PRODUCTS: TopupProduct[] = [
  // Special Offers
  {
    id: 'mystery-box',
    title: 'MYSTERY BOX',
    subtitle: 'Surprise Diamonds & Emotes',
    category: 'special',
    badge: 'Special',
    imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Instant',
    requiresUid: true,
    packages: [
      { id: 'mb-1', name: 'Starter Mystery Box', price: 99, originalPrice: 150, popular: true },
      { id: 'mb-2', name: 'Mega Mystery Box (500+ Dia Chance)', price: 199, originalPrice: 300 },
      { id: 'mb-3', name: 'Legendary Mystery Crate', price: 399, originalPrice: 550 },
    ],
  },
  {
    id: 'ff-auto-like',
    title: 'FF AUTO LIKE',
    subtitle: '99999 Free Fire Likes',
    category: 'special',
    badge: '99999 Likes',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'al-1', name: '1000 Auto Likes', price: 30, originalPrice: 50 },
      { id: 'al-2', name: '5000 Auto Likes', price: 80, originalPrice: 120, popular: true },
      { id: 'al-3', name: '10,000 Auto Likes', price: 150, originalPrice: 220 },
      { id: 'al-4', name: '50,000 Auto Likes (Ultra Boost)', price: 490, originalPrice: 700 },
    ],
  },
  {
    id: 'free-25-diamond',
    title: 'Free 25 Daimont Voucher',
    subtitle: 'Promotional Reward Offer',
    category: 'special',
    badge: 'Gift Card',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'fd-1', name: '25 Diamond Claim Code', price: 10, originalPrice: 25, popular: true },
      { id: 'fd-2', name: '50 Diamond Bonus Voucher', price: 25, originalPrice: 40 },
    ],
  },

  // Garena Core Products
  {
    id: 'level-up-pass',
    title: 'LEVEL UP PASS',
    subtitle: 'Free Fire 800 Diamonds Pass',
    category: 'garena',
    badge: 'Auto Delivery',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'lup-1', name: 'Level Up Pass (Level 1-30 Rewards)', price: 140, originalPrice: 170, popular: true },
      { id: 'lup-2', name: 'Level Up Package - Level 6', price: 40, originalPrice: 50 },
      { id: 'lup-3', name: 'Level Up Package - Level 10', price: 65, originalPrice: 85 },
      { id: 'lup-4', name: 'Full Level Up Bundle', price: 190, originalPrice: 230 },
    ],
  },
  {
    id: 'ff-topup-bd',
    title: 'FF TopUp [BD]',
    subtitle: 'Player ID (UID) Instant Topup',
    category: 'garena',
    badge: 'আইডি কোড টপআপ',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'ff-25', name: '25 Diamond', diamonds: 25, price: 20, originalPrice: 25 },
      { id: 'ff-50', name: '50 Diamond', diamonds: 50, price: 35, originalPrice: 45 },
      { id: 'ff-115', name: '115 Diamond', diamonds: 115, price: 80, originalPrice: 95, popular: true },
      { id: 'ff-240', name: '240 Diamond', diamonds: 240, price: 160, originalPrice: 190 },
      { id: 'ff-355', name: '355 Diamond', diamonds: 355, price: 240, originalPrice: 280 },
      { id: 'ff-610', name: '610 Diamond', diamonds: 610, price: 400, originalPrice: 470, popular: true },
      { id: 'ff-1240', name: '1240 Diamond', diamonds: 1240, price: 800, originalPrice: 920 },
      { id: 'ff-2530', name: '2530 Diamond', diamonds: 2530, price: 1600, originalPrice: 1850 },
      { id: 'ff-5060', name: '5060 Diamond (Mega Pack)', diamonds: 5060, price: 3150, originalPrice: 3600 },
    ],
  },
  {
    id: 'unipin-voucher-bd',
    title: 'Unipin Voucher [BD]',
    subtitle: 'Redeem code delivered in seconds',
    category: 'garena',
    badge: 'UNIPIN',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Instant',
    requiresUid: false,
    packages: [
      { id: 'uni-100', name: '100 UC / Diamond Voucher', price: 75, originalPrice: 90 },
      { id: 'uni-300', name: '310 UC / Diamond Voucher', price: 225, originalPrice: 260, popular: true },
      { id: 'uni-500', name: '520 UC / Diamond Voucher', price: 375, originalPrice: 420 },
      { id: 'uni-1000', name: '1060 UC / Diamond Voucher', price: 740, originalPrice: 830 },
    ],
  },
  {
    id: 'weekly-monthly-offer',
    title: 'Weekly/Monthly Offer',
    subtitle: 'Free Fire Membership Cards',
    category: 'garena',
    badge: 'উইকলি মান্থলি',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'wm-w', name: 'Weekly Membership (450 Diamonds)', price: 158, originalPrice: 190, popular: true },
      { id: 'wm-2w', name: '2X Weekly Membership', price: 316, originalPrice: 380 },
      { id: 'wm-m', name: 'Monthly Membership (2600 Diamonds)', price: 790, originalPrice: 890, popular: true },
      { id: 'wm-wm', name: '1 Weekly + 1 Monthly Combo', price: 948, originalPrice: 1080, popular: true },
      { id: 'wm-super', name: 'Super VIP Membership (3 Month)', price: 2290, originalPrice: 2600 },
    ],
  },
  {
    id: 'weekly-lite-bd',
    title: 'Weekly Lite (BD Server)',
    subtitle: 'Mini weekly pack for instant diamonds',
    category: 'garena',
    badge: 'উইকলি লাইট',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Auto',
    requiresUid: true,
    packages: [
      { id: 'wl-1', name: 'Weekly Lite Pack', price: 40, originalPrice: 50, popular: true },
      { id: 'wl-2', name: '2X Weekly Lite Pack', price: 80, originalPrice: 100 },
      { id: 'wl-3', name: 'Monthly Lite Pack', price: 155, originalPrice: 190 },
    ],
  },
  {
    id: 'indonesia-server-uid',
    title: 'Indonesia Server [UID]',
    subtitle: 'Special Indo Server Diamonds & Pass',
    category: 'garena',
    badge: 'ইন্দোনেশিয়া সার্ভার',
    imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=400&auto=format&fit=crop',
    deliveryType: 'Instant',
    requiresUid: true,
    requiresServer: true,
    packages: [
      { id: 'id-70', name: '70 Diamonds (Indo)', price: 65, originalPrice: 80 },
      { id: 'id-140', name: '140 Diamonds (Indo)', price: 120, originalPrice: 145, popular: true },
      { id: 'id-355', name: '355 Diamonds (Indo)', price: 280, originalPrice: 330 },
      { id: 'id-720', name: '720 Diamonds (Indo)', price: 540, originalPrice: 620 },
      { id: 'id-weekly', name: 'Weekly Membership (Indo)', price: 165, originalPrice: 200 },
    ],
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-9821',
    userName: 'Fathema Akter',
    userEmail: 'fathema@gmail.com',
    itemTitle: 'Weekly/Monthly Offer',
    packageDetails: '1Weekly + 1Monthly',
    amount: 948,
    playerUid: '249102847',
    status: 'Completed',
    createdAt: 'Just now',
    paymentMethod: 'Wallet',
  },
  {
    id: 'ORD-9820',
    userName: 'mobarak husen',
    userEmail: 'mobarak@gmail.com',
    itemTitle: 'Level Up Pass',
    packageDetails: 'Level Up Package - Level 6',
    amount: 40,
    playerUid: '381920194',
    status: 'Completed',
    createdAt: '1 min ago',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-9819',
    userName: 'MISTY AKTER',
    userEmail: 'misty@gmail.com',
    itemTitle: 'FF TopUp [BD]',
    packageDetails: '25 Diamond',
    amount: 20,
    playerUid: '102948271',
    status: 'Completed',
    createdAt: '2 mins ago',
    paymentMethod: 'Nagad',
  },
  {
    id: 'ORD-9818',
    userName: 'MISTY AKTER',
    userEmail: 'misty@gmail.com',
    itemTitle: 'FF TopUp [BD]',
    packageDetails: '50 Diamond',
    amount: 35,
    playerUid: '102948271',
    status: 'Completed',
    createdAt: '4 mins ago',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-9817',
    userName: 'MISTY AKTER',
    userEmail: 'misty@gmail.com',
    itemTitle: 'FF TopUp [BD]',
    packageDetails: '50 Diamond',
    amount: 35,
    playerUid: '102948271',
    status: 'Completed',
    createdAt: '5 mins ago',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-9816',
    userName: 'Siyam Ahmed',
    userEmail: 'siyam@gmail.com',
    itemTitle: 'Weekly/Monthly Offer',
    packageDetails: 'Weekly',
    amount: 158,
    playerUid: '581938201',
    status: 'Completed',
    createdAt: '7 mins ago',
    paymentMethod: 'Rocket',
  },
  {
    id: 'ORD-9815',
    userName: 'tamim king',
    userEmail: 'tamim@gmail.com',
    itemTitle: 'Weekly/Monthly Offer',
    packageDetails: '2X Weekly',
    amount: 316,
    playerUid: '984028172',
    status: 'Completed',
    createdAt: '10 mins ago',
    paymentMethod: 'Wallet',
  },
  {
    id: 'ORD-9814',
    userName: 'Md Rahul',
    userEmail: 'rahul@gmail.com',
    itemTitle: 'Weekly/Monthly Offer',
    packageDetails: 'Monthly',
    amount: 790,
    playerUid: '194820194',
    status: 'Completed',
    createdAt: '12 mins ago',
    paymentMethod: 'bKash',
  },
  {
    id: 'ORD-9813',
    userName: 'AS Arif Hasan Shanto',
    userEmail: 'shanto@gmail.com',
    itemTitle: 'Weekly/Monthly Offer',
    packageDetails: '2X Weekly',
    amount: 316,
    playerUid: '839201948',
    status: 'Completed',
    createdAt: '15 mins ago',
    paymentMethod: 'Nagad',
  },
];

export const INITIAL_TRANSACTIONS: AddMoneyTransaction[] = [
  {
    id: 'TXN-101',
    userId: '105279',
    userName: 'Nayan AHMED',
    userPhone: '01626159041',
    method: 'bKash',
    amount: 500,
    trxId: 'BLQ879201J',
    status: 'Approved',
    createdAt: 'Today, 02:40 PM',
  },
];

// Local Storage helpers
export function loadSiteConfig(): SiteConfig {
  try {
    const saved = localStorage.getItem('mg_topup_site_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_SITE_CONFIG;
}

export function saveSiteConfig(config: SiteConfig) {
  try {
    localStorage.setItem('mg_topup_site_config', JSON.stringify(config));
  } catch (e) {
    console.error(e);
  }
}

export function loadUserProfile(): UserProfile {
  try {
    const saved = localStorage.getItem('mg_topup_user_profile');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_USER;
}

export function saveUserProfile(user: UserProfile) {
  try {
    localStorage.setItem('mg_topup_user_profile', JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}

export function loadProducts(): TopupProduct[] {
  try {
    const saved = localStorage.getItem('mg_topup_products');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_PRODUCTS;
}

export function saveProducts(products: TopupProduct[]) {
  try {
    localStorage.setItem('mg_topup_products', JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
}

export function loadOrders(): OrderItem[] {
  try {
    const saved = localStorage.getItem('mg_topup_orders');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ORDERS;
}

export function saveOrders(orders: OrderItem[]) {
  try {
    localStorage.setItem('mg_topup_orders', JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}

export function loadTransactions(): AddMoneyTransaction[] {
  try {
    const saved = localStorage.getItem('mg_topup_transactions');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_TRANSACTIONS;
}

export function saveTransactions(transactions: AddMoneyTransaction[]) {
  try {
    localStorage.setItem('mg_topup_transactions', JSON.stringify(transactions));
  } catch (e) {
    console.error(e);
  }
}

export function loadAllUsers(): UserProfile[] {
  try {
    const saved = localStorage.getItem('mg_topup_all_users');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ALL_USERS;
}

export function saveAllUsers(users: UserProfile[]) {
  try {
    localStorage.setItem('mg_topup_all_users', JSON.stringify(users));
  } catch (e) {
    console.error(e);
  }
}

