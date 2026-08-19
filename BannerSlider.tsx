import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Send, Gift, ShieldCheck } from 'lucide-react';
import { BannerItem } from '../types';

interface BannerSliderProps {
  banners?: BannerItem[];
  onBannerClick?: () => void;
  telegramLink?: string;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ banners, onBannerClick, telegramLink }) => {
  const defaultSlides = [
    {
      id: 'd-1',
      title: 'গিভওয়ে ও সকল অফার সম্পর্কে জানতে',
      subtitle: 'টেলিগ্রাম চ্যানেলে জয়েন্ট করুন',
      tag: 'MG TOPUP OFFICIAL',
      color: 'from-blue-900 via-indigo-900 to-sky-950',
      accent: 'from-amber-400 to-yellow-300',
      icon: Gift,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
      linkUrl: telegramLink || 'https://t.me/mgtopup_official',
    },
    {
      id: 'd-2',
      title: 'Free Fire আইডি কোড টপআপ',
      subtitle: 'মাত্র ৫ সেকেন্ডে অটো ডেলিভারি',
      tag: 'INSTANT 24/7 AUTO',
      color: 'from-rose-950 via-purple-950 to-slate-950',
      accent: 'from-rose-400 to-amber-300',
      icon: Sparkles,
      imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop',
      linkUrl: telegramLink || 'https://t.me/mgtopup_official',
    },
    {
      id: 'd-3',
      title: 'বিকাশ, নগদ ও রকেট পেমেন্টে',
      subtitle: 'সহজে অ্যাড মানি করুন ও ডিসকাউন্ট নিন',
      tag: 'SECURE PAYMENT BD',
      color: 'from-emerald-950 via-teal-950 to-slate-950',
      accent: 'from-emerald-300 to-teal-200',
      icon: ShieldCheck,
      imageUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop',
      linkUrl: telegramLink || 'https://t.me/mgtopup_official',
    },
  ];

  const activeBanners = banners && banners.length > 0
    ? banners.filter((b) => b.active)
    : [];

  const slides = activeBanners.length > 0
    ? activeBanners.map((b, idx) => ({
        id: b.id || `b-${idx}`,
        title: b.title || 'MG TopUp অফার',
        subtitle: b.subtitle || 'সবচেয়ে কম মূল্যে ইনস্ট্যান্ট ডেলিভারি',
        tag: b.tag || 'EXCLUSIVE OFFER',
        color: idx % 3 === 0 ? 'from-blue-900 via-indigo-900 to-sky-950' : idx % 3 === 1 ? 'from-rose-950 via-purple-950 to-slate-950' : 'from-emerald-950 via-teal-950 to-slate-950',
        accent: idx % 3 === 0 ? 'from-amber-400 to-yellow-300' : idx % 3 === 1 ? 'from-rose-400 to-amber-300' : 'from-emerald-300 to-teal-200',
        icon: idx % 3 === 0 ? Gift : idx % 3 === 1 ? Sparkles : ShieldCheck,
        imageUrl: b.imageUrl,
        linkUrl: b.linkUrl || telegramLink || 'https://t.me/mgtopup_official',
      }))
    : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg my-3 group">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative h-44 sm:h-56 overflow-hidden cursor-pointer"
            onClick={() => {
              if (slide.linkUrl) {
                window.open(slide.linkUrl, '_blank', 'noopener,noreferrer');
              } else if (onBannerClick) {
                onBannerClick();
              }
            }}
          >
            {/* Background image & gradient overlay */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 group-hover:scale-100 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90`} />

            {/* Content overlay */}
            <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-amber-300 border border-white/20">
                  <slide.icon className="w-3.5 h-3.5" />
                  {slide.tag}
                </span>
                <span className="text-[11px] text-slate-300 font-medium bg-black/40 px-2 py-0.5 rounded">
                  {idx + 1} / {slides.length}
                </span>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-lg font-semibold text-slate-200">
                  {slide.title}
                </p>
                <h3 className={`text-lg sm:text-2xl font-black bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent leading-tight drop-shadow-md`}>
                  {slide.subtitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-full shadow-md">
                  <Send className="w-3 h-3" />
                  অফার লিংক দেখুন
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity z-20 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide((prev) => (prev + 1) % slides.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity z-20 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Pagination indicators */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

