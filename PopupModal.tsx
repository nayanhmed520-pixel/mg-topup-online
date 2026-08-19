import React from 'react';
import { SiteConfig } from '../types';
import { X, ExternalLink, Sparkles, Send, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onOpenTutorial: () => void;
}

export const PopupModal: React.FC<PopupModalProps> = ({
  isOpen,
  onClose,
  config,
  onOpenTutorial,
}) => {
  if (!isOpen || !config.popup.enabled) return null;

  const handleAction = () => {
    if (config.popup.buttonLink) {
      window.open(config.popup.buttonLink, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          id="entry-popup-modal"
        >
          {/* Top banner visual representation */}
          <div className="relative w-full h-56 sm:h-64 bg-slate-950 overflow-hidden flex flex-col justify-end p-4 text-white">
            {/* Background Image */}
            <img
              src={config.popup.imageUrl}
              alt="Promo Banner"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85 brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay for high readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Glowing Diamonds decorative art */}
            <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL 24/7 OFFER</span>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              aria-label="Close"
              id="popup-top-close-btn"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Banner text overlay */}
            <div className="relative z-10 space-y-1 text-center">
              <div className="inline-block bg-gradient-to-r from-amber-400 via-rose-500 to-amber-300 text-slate-950 text-xs font-black px-3 py-0.5 rounded-sm uppercase tracking-wide shadow-sm">
                MG TOPUP 24 HOUR
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-snug">
                {config.popup.title}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-5 text-center space-y-4 bg-white">
            <p className="text-slate-700 text-sm sm:text-base font-semibold leading-relaxed">
              {config.popup.subtitle}
            </p>

            <div className="flex flex-col gap-2 pt-1">
              {/* Main Action Button */}
              <button
                onClick={handleAction}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                id="popup-action-btn"
              >
                <Send className="w-4 h-4" />
                <span>{config.popup.buttonText}</span>
              </button>

              {/* Video Tutorial Alternative Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenTutorial();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                id="popup-video-tutorial-btn"
              >
                <PlayCircle className="w-4 h-4 text-rose-600" />
                <span>টপআপ নিয়ম ভিডিও দেখুন</span>
              </button>
            </div>

            {/* Bottom Close Button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                id="popup-bottom-close-btn"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
