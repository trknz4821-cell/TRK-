import React from 'react';
import { Car } from '../types';
import { Plus, Minus, ShoppingCart, Shield, Zap } from 'lucide-react';

interface CarCardProps {
  car: Car;
  quantityInCart: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function CarCard({ car, quantityInCart, onAdd, onRemove }: CarCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 relative flex flex-col justify-between" dir="rtl">
      {/* Top Banner & Price TAG */}
      <div>
        <div className="relative overflow-hidden rounded-xl bg-zinc-900 aspect-video mb-4">
          <img
            src={car.image}
            alt={car.arabicName}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-85" />
          
          {/* Price Badge */}
          <div className="absolute top-2.5 right-2.5 rounded-full bg-purple-600 px-3 py-1 text-xs font-extrabold text-black shadow-lg shadow-purple-600/30">
            {car.price} ريال
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-2 right-2.5 text-[11px] font-semibold text-zinc-300">
            {car.category}
          </div>
        </div>

        {/* Names */}
        <div className="space-y-1">
          <h4 className="text-lg font-black text-white transition-colors duration-300 group-hover:text-purple-400 text-right">
            {car.arabicName}
          </h4>
          <p className="text-xs text-zinc-500 font-mono text-right" dir="ltr">
            {car.name}
          </p>
        </div>

        {/* Short Text */}
        <p className="mt-2.5 text-xs text-zinc-400 text-right leading-relaxed h-11 line-clamp-2">
          {car.arabicDescription}
        </p>

        {/* Stats Progress Bars */}
        <div className="mt-4 space-y-2 border-t border-zinc-900 pt-3">
          {/* Speed Stat */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-purple-500" /> السرعة والتسارع
              </span>
              <span className="font-mono font-bold text-white">{car.speed}/100</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
              <div 
                className="h-full rounded-full bg-purple-600 transition-all duration-500" 
                style={{ width: `${car.speed}%` }} 
              />
            </div>
          </div>

          {/* Armor Stat */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-purple-400" /> تدريع الهيكل
              </span>
              <span className="font-mono font-bold text-white">{car.armor}/100</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
              <div 
                className="h-full rounded-full bg-indigo-500 transition-all duration-500" 
                style={{ width: `${car.armor}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Control Bottom Action */}
      <div className="mt-5 pt-3 border-t border-zinc-900 flex items-center justify-between">
        {quantityInCart > 0 ? (
          <div className="flex items-center justify-between w-full rounded-xl bg-purple-950/30 border border-purple-500/40 p-1">
            <button
              onClick={onRemove}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-purple-400 hover:text-white transition-colors cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm font-black text-white font-mono">{quantityInCart} في السلة</span>
            <button
              onClick={onAdd}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-black hover:bg-purple-500 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-zinc-900 py-2.5 text-xs font-extrabold text-white border border-zinc-800 transition-all duration-300 hover:border-purple-500 hover:bg-purple-950/20 hover:text-purple-300 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>إضافة إلى سلة الشراء</span>
          </button>
        )}
      </div>
    </div>
  );
}
