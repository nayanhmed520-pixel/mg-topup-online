import React from 'react';
import { Facebook, Instagram, Youtube, Mail, PlayCircle, ExternalLink } from 'lucide-react';
import { SiteConfig } from '../types';

interface StayConnectedProps {
  config: SiteConfig;
  onOpenTutorial: () => void;
}

export const StayConnected: React.FC<StayConnectedProps> = ({ config, onOpenTutorial }) => {
  return (
    <section className="my-6 bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg border border-slate-800">
      <h3 className="text-lg font-black tracking-wide text-white uppercase mb-1">
        STAY CONNECTED
      </h3>
      <p className="text-xs text-slate-300 mb-4 font-medium">
        নিজের টপআপ নিজেই করতে চাইলে,{' '}
        <button
          onClick={onOpenTutorial}
          className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          Watch Video <PlayCircle className="w-3.5 h-3.5 inline" />
        </button>{' '}
        তে ক্লিক করে ভিডিওটি দেখুন
      </p>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-3">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <button
          onClick={onOpenTutorial}
          className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm cursor-pointer"
          aria-label="YouTube Tutorial"
        >
          <Youtube className="w-5 h-5" />
        </button>
        <a
          href={`mailto:${config.support.email}`}
          className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-300 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
