import React, { useState } from 'react';
import { UserProfile, SiteConfig } from '../types';
import { LogIn, UserPlus, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { SupportCenter } from './SupportCenter';

interface LoginModalProps {
  onLogin: (user: UserProfile) => void;
  config: SiteConfig;
  onNavigateHome: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, config, onNavigateHome }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('nayanhmed520@gmail.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Nayan AHMED');
  const [phone, setPhone] = useState('01626159041');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: 'user_' + Math.floor(100000 + Math.random() * 900000),
      name: name || 'Nayan AHMED',
      email: email || 'nayanhmed520@gmail.com',
      phone: phone || '01626159041',
      userId: '105279',
      supportPin: '105279',
      walletBalance: 0,
      totalSpend: 0,
      weeklySpend: 0,
      ordersCount: 0,
      rank: 'Bronze',
      isVerified: true,
      role: email.includes('admin') ? 'admin' : 'user',
    };
    onLogin(newUser);
  };

  const handleGoogleLogin = () => {
    const googleUser: UserProfile = {
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
    };
    onLogin(googleUser);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between max-w-md mx-auto py-6 px-4">
      {/* Login Card matching Screenshot 3 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
        <h2 className="text-2xl font-black text-slate-900 mb-6">
          {isRegister ? 'Create Account' : 'Login'}
        </h2>

        {/* Login with Google Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer"
          id="google-login-btn"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Login with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-xs text-slate-500 font-medium">
            Or sign in with credentials
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-800"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-800"
              id="login-email-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-slate-800"
              id="login-password-input"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md active:scale-98 transition-all mt-2 cursor-pointer"
            id="login-submit-btn"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Toggle Login / Register */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            {isRegister
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      {/* Support Center at bottom */}
      <SupportCenter config={config} />
    </div>
  );
};
