import React from 'react';
import { SiteConfig } from '../types';
import { X, PlayCircle, HelpCircle, CheckCircle2, Video } from 'lucide-react';
import { SupportCenter } from './SupportCenter';

interface TutorialModalProps {
  config: SiteConfig;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ config, onClose }) => {
  return (
    <div className="max-w-md mx-auto py-4 px-3 space-y-4">
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900">
              ভিডিও টিউটোরিয়াল
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-800">
          <iframe
            src={config.tutorialVideo.youtubeUrl}
            title={config.tutorialVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-slate-800">
            {config.tutorialVideo.title}
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {config.tutorialVideo.description}
          </p>
        </div>

        {/* Step by step guide */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <p className="font-bold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            টপআপ করার সহজ ৩টি ধাপ:
          </p>
          <div className="space-y-2 pl-1">
            <p>1. প্রথমে <strong>Add Money</strong> অপশন থেকে বিকাশ, নগদ বা রকেটে ওয়ালেটে টাকা অ্যাড করে নিন।</p>
            <p>2. এরপর আপনার পছন্দের টপআপ প্যাকেজে ক্লিক করে Free Fire <strong>Player ID (UID)</strong> দিন।</p>
            <p>3. <strong>অর্ডার সম্পন্ন করুন</strong> বাটনে চাপলেই ৫-১০ সেকেন্ডের মধ্যে আইডিতে ডায়মন্ড পৌঁছে যাবে।</p>
          </div>
        </div>
      </div>

      <SupportCenter config={config} />
    </div>
  );
};
