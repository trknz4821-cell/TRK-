import React from 'react';
import { ShoppingCart, Gamepad2, Send, MessageSquare } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ cartCount, onOpenCart, scrollToSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" dir="rtl">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 font-black text-black shadow-lg shadow-purple-600/30 transition-transform duration-300 hover:scale-105">
            <span className="text-xl tracking-wider font-sans font-extrabold">TRK</span>
            <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 opacity-60 blur" />
          </div>
          <span className="text-2xl font-black text-white hover:text-purple-400 transition-colors duration-300">
            TRK <span className="text-purple-500 text-sm font-medium">STORE</span>
          </span>
        </div>

        {/* Navigation - Hidden on mobile, beautiful on desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button 
            onClick={() => scrollToSection('submarine')} 
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-purple-400 cursor-pointer"
          >
            <Gamepad2 className="h-4 w-4 text-purple-500" />
            <span>مهمة الغواصة</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('cars')} 
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-purple-400 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 text-purple-500" />
            <span>معرض السيارات</span>
          </button>
          
          <button 
            onClick={() => scrollToSection('reviews')} 
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-purple-400 cursor-pointer"
          >
            <MessageSquare className="h-4 w-4 text-purple-500" />
            <span>آراء العملاء</span>
          </button>

          <a 
            href="https://wa.me/966510610036" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors duration-200 hover:text-purple-400"
          >
            <Send className="h-4 w-4 text-purple-500 transform rotate-180" />
            <span>تواصل معنا</span>
          </a>
        </nav>

        {/* Cart Trigger */}
        <div className="flex items-center gap-3">
          <button
            id="cart-toggle-btn"
            onClick={onOpenCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-zinc-950 text-purple-400 transition-all duration-300 hover:bg-purple-950/30 hover:text-purple-300 hover:border-purple-500 cursor-pointer focus:outline-none"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white shadow-md shadow-purple-600/50 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Mobile WhatsApp Button */}
          <a
            href="https://wa.me/966510610036"
            target="_blank"
            rel="noopener noreferrer"
            className="flex md:hidden items-center justify-center rounded-xl bg-purple-600 px-3 py-2 text-xs font-bold text-black transition-all hover:bg-purple-500"
          >
            واتساب
          </a>
        </div>
      </div>
    </header>
  );
}
