import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubmarineService from './components/SubmarineService';
import CarCard from './components/CarCard';
import CartDrawer from './components/CartDrawer';
import ReviewsSection from './components/ReviewsSection';
import { GTA_CARS, INITIAL_REVIEWS } from './data';
import { CartItem, Review } from './types';
import { Star, ShieldCheck, Zap, DollarSign, Send, Gamepad2, Layers } from 'lucide-react';

export default function App() {
  // Sync state with LocalStorage for flawless offline-first experience
  const [psnId, setPsnId] = useState<string>(() => {
    return localStorage.getItem('trk_psn_id') || '';
  });

  const [submarineCount, setSubmarineCount] = useState<number>(() => {
    const saved = localStorage.getItem('trk_submarine_count');
    return saved ? parseInt(saved, 10) : 1; // starts with 1 run so the user notices the visual calculator
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('trk_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('trk_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem('trk_psn_id', psnId);
  }, [psnId]);

  useEffect(() => {
    localStorage.setItem('trk_submarine_count', submarineCount.toString());
  }, [submarineCount]);

  useEffect(() => {
    localStorage.setItem('trk_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('trk_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Methods
  const handleAddCarToCart = (carId: string) => {
    const existing = cartItems.find(item => item.id === carId);
    const carInfo = GTA_CARS.find(c => c.id === carId);
    if (!carInfo) return;

    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === carId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: carId,
        name: carInfo.name,
        arabicName: carInfo.arabicName,
        price: carInfo.price,
        quantity: 1,
        type: 'car'
      }]);
    }
  };

  const handleRemoveCarFromCart = (carId: string) => {
    const existing = cartItems.find(item => item.id === carId);
    if (!existing) return;

    if (existing.quantity === 1) {
      setCartItems(cartItems.filter(item => item.id !== carId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === carId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const handleUpdateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const ReviewWithId: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'الآن'
    };
    setReviews([ReviewWithId, ...reviews]);
  };

  // Cart total counts (cars count + submarine exists)
  const cartBadgeCount = cartItems.reduce((acc, item) => acc + item.quantity, 0) + (submarineCount > 0 ? 1 : 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-purple-600 selection:text-black">
      
      {/* Header Navigation */}
      <Header 
        cartCount={cartBadgeCount} 
        onOpenCart={() => setIsCartOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pb-28 border-b border-purple-900/10">
        {/* Animated Cyber Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute top-10 right-10 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[80px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 px-4 py-1.5 text-xs font-bold text-purple-300 mb-6 shadow-md">
            <Star className="h-4.5 w-4.5 fill-purple-500 text-purple-500 shrink-0" />
            <span>متجر TRK لخدمات قراند 5 المحسنة على سوني 5</span>
          </div>

          {/* Main Hero Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            عالم السيطرة والثراء في <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              قراند 5 النسخة المحسنة سوني 5
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed">
            احصل على ملايين الدولارات بلمح البصر وبأرخص الأسعار مع خدمة <strong className="text-white font-bold">مهمة الغواصة بـ 3 ريال فقط!</strong> بالإضافة لأقوى سيارات اللعبة المسلحة والمعدلة الجاهزة فوراً لطلبك.
          </p>

          {/* Quick Stats Grid */}
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-4">
              <span className="block text-2xl font-black text-purple-400 font-mono">15 د</span>
              <span className="mt-0.5 block text-xs text-zinc-500 font-bold">متوسط وقت التسليم</span>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-4">
              <span className="block text-2xl font-black text-purple-400 font-mono">3 ريال</span>
              <span className="mt-0.5 block text-xs text-zinc-500 font-bold">سعر الغواصة الواحدة</span>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-zinc-900 bg-zinc-900/20 p-4">
              <span className="block text-2xl font-black text-purple-400 font-mono">100%</span>
              <span className="mt-0.5 block text-xs text-zinc-500 font-bold">آمن ومضمون من الباند</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('submarine')}
              className="rounded-xl bg-purple-600 px-8 py-4 text-sm font-extrabold text-black transition-all hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-600/25 cursor-pointer"
            >
              اطلب مهمة الغواصة الآن
            </button>
            <button
              onClick={() => scrollToSection('cars')}
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-8 py-4 text-sm font-extrabold text-zinc-300 hover:border-purple-500/50 hover:text-white transition-all cursor-pointer"
            >
              تصفح سيارات قراند المتاحة
            </button>
          </div>

        </div>
      </section>

      {/* Main Sections Wrapper */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Submarine Service Section */}
        <section id="submarine" className="scroll-mt-20">
          <div className="mb-6 text-right">
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <span className="text-purple-500">01.</span> الخدمة الأكثر طلباً
            </h2>
            <div className="mt-1 h-1 w-12 bg-purple-600 rounded-full" />
          </div>

          <SubmarineService 
            psnId={psnId}
            onChangePsnId={setPsnId}
            submarineCount={submarineCount}
            onChangeCount={setSubmarineCount}
            pricePerSubmarine={3}
          />
        </section>

        {/* Cars Showcase / Cart Shopping Section */}
        <section id="cars" className="scroll-mt-20 space-y-8" dir="rtl">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="text-right">
                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-purple-500">02.</span> سيارات قراند 5 المتاحة
                </h2>
                <div className="mt-1 h-1 w-12 bg-purple-600 rounded-full" />
                <p className="mt-2 text-xs md:text-sm text-zinc-400">
                  يمكنك إضافة أي موتر من هذه القائمة الفخمة مباشرة إلى سلة التسوق لتسليمها لك في اللعبة.
                </p>
              </div>

              {/* Mini counter hint */}
              {cartItems.length > 0 && (
                <div className="rounded-xl bg-purple-950/20 border border-purple-500/30 px-3.5 py-1.5 text-xs text-purple-300 font-bold self-start md:self-auto">
                  🛒 لديك {cartItems.length} سيارات مميزة في السلة
                </div>
              )}
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GTA_CARS.map(car => {
              const currentItem = cartItems.find(item => item.id === car.id);
              const qty = currentItem ? currentItem.quantity : 0;
              return (
                <CarCard
                  key={car.id}
                  car={car}
                  quantityInCart={qty}
                  onAdd={() => handleAddCarToCart(car.id)}
                  onRemove={() => handleRemoveCarFromCart(car.id)}
                />
              );
            })}
          </div>
        </section>

        {/* Dynamic Reviews Section */}
        <section id="reviews" className="scroll-mt-20 border-t border-zinc-900 pt-16">
          <ReviewsSection 
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        </section>

      </main>

      {/* Callout Info Section - Security & Delivery */}
      <section className="bg-zinc-950 border-t border-zinc-900 py-12" dir="rtl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/20 text-purple-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-right">
              <h4 className="font-extrabold text-sm text-white">حماية قصوى للحساب</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">طرق التسليم لدينا مخصصة بالكامل لتجنب الباند أو تصفير الأموال وبأعلى مستويات السرية والأمان.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/20 text-purple-400">
              <Zap className="h-6 w-6" />
            </div>
            <div className="space-y-1 text-right">
              <h4 className="font-extrabold text-sm text-white">تنفيذ وتسليم فوري</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">بمجرد التحقق والتواصل على الواتس، ننسق معك للتوصيل السريع داخل اللعبة في غضون 15 دقيقة فقط.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/20 text-purple-400">
              <Send className="h-6 w-6 transform rotate-180" />
            </div>
            <div className="space-y-1 text-right">
              <h4 className="font-extrabold text-sm text-white">تواصل واتساب مباشر</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">صاحب المتجر متاح لتسهيل العملية وتأكيد الشراء بلمسة واحدة لراحة العملاء التامة.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer copyright */}
      <footer className="border-t border-zinc-900 bg-black py-8 text-center text-xs text-zinc-600" dir="rtl">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} متجر TRK لخدمات قراند 5 المحسنة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">سوني 5 - PS5 Expanded & Enhanced</span>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar Overlay Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        submarineCount={submarineCount}
        psnId={psnId}
        setSubmarineCount={setSubmarineCount}
        setPsnId={setPsnId}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
