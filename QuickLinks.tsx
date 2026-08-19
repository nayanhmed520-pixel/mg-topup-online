import React from 'react';
import { Send, Users, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface QuickLinksProps {
  config: SiteConfig;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ config }) => {
  return (
    <div className="grid grid-cols-3 gap-2.5 my-3">
      {/* Telegram Support */}
      <a
        href={config.support.telegramSupport}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left"
        id="quick-link-telegram-support"
      >
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wider text-sky-200 font-bold leading-none">
            SUPPORT
          </p>
          <p className="text-xs sm:text-sm font-bold truncate">
            Telegram
          </p>
        </div>
      </a>

      {/* Join Group */}
      <a
        href={config.support.telegramGroup}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left"
        id="quick-link-join-group"
      >
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wider text-indigo-200 font-bold leading-none">
            GROUP
          </p>
          <p className="text-xs sm:text-sm font-bold truncate">
            Join Group
          </p>
        </div>
      </a>

      {/* WhatsApp Chat */}
      <a
        href={`https://wa.me/${config.support.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left"
        id="quick-link-whatsapp-chat"
      >
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wider text-blue-200 font-bold leading-none">
            CHAT
          </p>
          <p className="text-xs sm:text-sm font-bold truncate">
            WhatsApp
          </p>
        </div>
      </a>
    </div>
  );
};
