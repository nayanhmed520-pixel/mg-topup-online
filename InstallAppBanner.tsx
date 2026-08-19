import React, { useState } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';

export const InstallAppBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  if (dismissed) return null;

  const handleInstall = () => {
    setInstalled(true);
    setTimeout(() => {
      setDismissed(true);
    }, 2000);
  };

  return (
    <div className="fixed bottom-18 left-4 right-4 z-40 max-w-md mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
            <Download className="w-4 h-4 animate-bounce" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold truncate flex items-center gap-1.5 text-white">
              Install MG TopUp App
            </h4>
            <p className="text-[10px] text-slate-300 truncate">
              দ্রুত টপআপ ও নোটিফিকেশন পান
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstall}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${
              installed
                ? 'bg-emerald-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
            }`}
          >
            {installed ? (
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Installed
              </span>
            ) : (
              'Install'
            )}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
