import React, { useState } from 'react';
import { Volume2, X } from 'lucide-react';

interface NoticeBannerProps {
  noticeText: string;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ noticeText }) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !noticeText) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white px-4 py-2.5 shadow-sm border-b border-blue-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-bold text-yellow-400 shrink-0 flex items-center gap-1">
            <Volume2 className="w-4 h-4 animate-pulse" />
            Notice:
          </span>
          <p className="truncate text-slate-100 font-medium">
            {noticeText}
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-white p-1 shrink-0 rounded transition-colors cursor-pointer"
          title="Dismiss notice"
          id="dismiss-notice-btn"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
