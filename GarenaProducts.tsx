import React from 'react';
import { TopupProduct } from '../types';
import { Flame } from 'lucide-react';

interface GarenaProductsProps {
  products: TopupProduct[];
  onSelectProduct: (product: TopupProduct) => void;
}

export const GarenaProducts: React.FC<GarenaProductsProps> = ({ products, onSelectProduct }) => {
  const garenaList = products.filter((p) => p.category === 'garena');

  return (
    <section className="my-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-rose-500" />
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Garena
        </h2>
        <Flame className="w-5 h-5 text-rose-500" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {garenaList.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            className="group cursor-pointer flex flex-col items-center text-center transition-all active:scale-95"
            id={`garena-product-${prod.id}`}
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-blue-500 transition-all">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              <div className="absolute top-1.5 left-1.5 bg-blue-600/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                AUTO DELIVERY
              </div>

              {prod.packages && prod.packages.length > 0 && (
                <div className="absolute bottom-1.5 right-1.5 bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                  ৳{prod.packages[0].price}
                </div>
              )}
            </div>

            <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase leading-tight line-clamp-2">
              {prod.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
