import React from 'react';
import { TopupProduct } from '../types';
import { Sparkles, Zap, Flame } from 'lucide-react';

interface SpecialOffersProps {
  products: TopupProduct[];
  onSelectProduct: (product: TopupProduct) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ products, onSelectProduct }) => {
  const specialList = products.filter((p) => p.category === 'special');

  if (specialList.length === 0) return null;

  return (
    <section className="my-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight uppercase">
          SPECIAL OFFER
        </h2>
        <Sparkles className="w-5 h-5 text-amber-500" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {specialList.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            className="group cursor-pointer flex flex-col items-center text-center transition-all active:scale-95"
            id={`special-product-${prod.id}`}
          >
            {/* Card Graphic Container */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-rose-400 transition-all">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Delivery Tag / Badge */}
              <div className="absolute top-1.5 left-1.5 bg-rose-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                {prod.badge || 'OFFER'}
              </div>

              {/* Lowest price tag overlay */}
              {prod.packages && prod.packages.length > 0 && (
                <div className="absolute bottom-1.5 right-1.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                  ৳{prod.packages[0].price}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors uppercase leading-tight line-clamp-2">
              {prod.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
