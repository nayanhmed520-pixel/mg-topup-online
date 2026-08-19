import React from 'react';
import { MessageCircle, Send, Clock, Heart } from 'lucide-react';
import { SiteConfig } from '../types';

interface SupportCenterProps {
  config: SiteConfig;
}

export const SupportCenter: React.FC<SupportCenterProps> = ({ config }) => {
  return (
    <footer className="mt-8 mb-20 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-lg font-black tracking-wider text-white uppercase">
          SUPPORT CENTER
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          যেকোনো অর্ডার বা পেমেন্ট সমস্যায় আমাদের হেল্পলাইনে যোগাযোগ করুন
        </p>
      </div>

      <div className="space-y-3">
        {/* WhatsApp Helpline Card */}
        <a
          href={`https://wa.me/${config.support.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 hover:border-emerald-500/50 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Help line [{config.support.supportTime}]</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Whatsapp HelpLine
            </p>
          </div>
        </a>

        {/* Telegram Helpline Card */}
        <a
          href={config.support.telegramSupport}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 hover:border-sky-500/50 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
            <Send className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Help line [{config.support.supportTime}]</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
              টেলিগ্রামে সাপোর্ট
            </p>
          </div>
        </a>
      </div>

      {/* Copyright Footer text */}
      <div className="mt-8 pt-6 border-t border-slate-850 text-center text-xs text-slate-400 space-y-1">
        <p>© {config.siteName} 2026 | All Rights Reserved</p>
        <p className="text-[11px] text-slate-300">
          Developed for Fast & Secure Gaming TopUp
        </p>
      </div>
    </footer>
  );
};
