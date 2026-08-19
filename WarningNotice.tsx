import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface WarningNoticeProps {
  warningText: string;
}

export const WarningNotice: React.FC<WarningNoticeProps> = ({ warningText }) => {
  return (
    <div className="my-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 p-5 text-white border border-slate-800 shadow-lg text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
        <h3 className="text-base font-extrabold text-yellow-400 uppercase tracking-wide">
          নোটিশ
        </h3>
        <AlertTriangle className="w-5 h-5 text-yellow-400" />
      </div>

      <div className="text-xs sm:text-sm font-medium text-slate-200 whitespace-pre-line leading-relaxed space-y-1">
        {warningText}
      </div>
    </div>
  );
};
