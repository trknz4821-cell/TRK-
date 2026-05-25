import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Send, Gamepad2, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  submarineCount: number;
  psnId: string;
  setSubmarineCount: (count: number) => void;
  setPsnId: (id: string) => void;
  onUpdateCartItemQuantity: (id: string, quantity: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  submarineCount,
  psnId,
  setSubmarineCount,
  setPsnId,
  onUpdateCartItemQuantity,
  onRemoveCartItem,
  onClearCart
}: CartDrawerProps) {
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const SUBMARINE_PRICE = 3;

  // Calcul totals
  const carItemsCost = cartItems.reduce((acc, obj) => acc + (obj.price * obj.quantity), 0);
  const submarineCost = submarineCount * SUBMARINE_PRICE;
  const totalCost = carItemsCost + submarineCost;

  const handleCheckoutViaWhatsApp = () => {
    setValidationError(null);

    // Validation: Require PSN ID
    if (!psnId || psnId.trim() === '') {
      setValidationError('الرجاء إدخال آيدي سوني 5 (PSN ID) الخاص بك للمتابعة!');
      const inputEl = document.getElementById('psn-id-input-drawer');
      if (inputEl) inputEl.focus();
      return;
    }

    // Validation: Require at least one item
    if (submarineCount === 0 && cartItems.length === 0) {
      setValidationError('سلتك فارغة! يرجى إضافة غواصات أو سيارات لتأكيد الطلب.');
      return;
    }

    // Compose message
    let message = `السلام عليكم متجر TRK 🎮\n`;
    message += `أرغب في تقديم طلب شحن قراند 5 النسخة المحسنة (سوني 5):\n\n`;
    message += `🎮 الآيدي الخاص بي (PSN ID):\n`;
    message += `👉 [ ${psnId.trim()} ]\n\n`;
    message += `📦 تفاصيل الطلب:\n`;

    if (submarineCount > 0) {
      message += `• مهمة الغواصة (كوساتكا): ${submarineCount} غواصات × 3 ريال = ${submarineCost} ريال\n`;
    }

    cartItems.forEach((item) => {
      message += `• سيارة ${item.arabicName} [${item.name}]: عدد ${item.quantity} × ${item.price} ريال = ${item.price * item.quantity} ريال\n`;
    });

    message += `\n💰 الإجمالي الكلي: ${totalCost} ريال سعودي\n\n`;
    message += `أرجو تأكيد الطلب وتزويدي بطريقة الدفع المناسبة للبدء فوراً! وعاشت يدكم.`;

    // Saudi WhatsApp link
    const phoneNumber = '966510610036';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Redirect
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden" dir="rtl">
      {/* Dark Overlay Background */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Cart Container Sheet */}
      <div className="relative w-full max-w-md bg-zinc-950 border-r border-purple-500/20 h-full flex flex-col shadow-2xl z-10">
        
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-purple-900/40 px-6 bg-zinc-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-black text-white">سلة الطلبات</h3>
            <span className="rounded-full bg-purple-900/40 px-2 py-0.5 text-xs font-bold text-purple-400">
              {cartItems.length + (submarineCount > 0 ? 1 : 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Validation Notice Alert */}
          {validationError && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5 text-rose-300 text-xs font-bold text-center leading-relaxed">
              ⚠️ {validationError}
            </div>
          )}

          {/* Section 1: PSN ID Setup */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-3">
            <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider text-right flex items-center gap-1.5">
              <Gamepad2 className="h-4 w-4" />
              <span>معلومات تسليم الحساب</span>
            </h4>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-400 text-right">
                آيدي سوني 5 (PSN ID): <span className="text-purple-500">*</span>
              </label>
              <input
                id="psn-id-input-drawer"
                type="text"
                placeholder="مثال: Player_TRK"
                value={psnId}
                onChange={(e) => {
                  setPsnId(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 px-3.5 text-sm font-semibold text-white placeholder-zinc-700 transition-all focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                dir="ltr"
              />
            </div>
          </div>

          {/* Section 2: Items List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">المواد المختارة</h4>
              {(cartItems.length > 0 || submarineCount > 0) && (
                <button
                  onClick={() => {
                    onClearCart();
                    setSubmarineCount(0);
                  }}
                  className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> مسح السلة
                </button>
              )}
            </div>

            {/* Empty State */}
            {submarineCount === 0 && cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 border border-zinc-900 rounded-2xl bg-zinc-900/10">
                <div className="rounded-full bg-zinc-900 p-4 text-zinc-600">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-bold text-zinc-300">سلتك لا تزال خالية</p>
                  <p className="text-xs text-zinc-500">تصفح خدمات تسييل الغواصات ومواتر اللعبة وأضفها</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-purple-500/20 bg-purple-950/20 px-4 py-2 text-xs font-bold text-purple-400 hover:bg-purple-950/40 hover:text-purple-300 transition-all cursor-pointer"
                >
                  الرجوع لقائمة المنتجات
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Submarine Item Row */}
                {submarineCount > 0 && (
                  <div className="flex items-center gap-3 rounded-xl border border-purple-500/20 bg-purple-950/5 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-900/30 text-purple-400">
                      🕹️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white text-right">مهمة الغواصة كوساتكا (كايو بريكو)</p>
                      <p className="text-[11px] text-zinc-400 text-right">سوني 5 النسخة المحسنة</p>
                      <p className="text-xs font-bold text-purple-400 font-mono text-right mt-1">3 ريال / غواصة</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 p-1">
                        <button
                          onClick={() => setSubmarineCount(Math.max(0, submarineCount - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded bg-zinc-950 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-white font-mono min-w-6 text-center">
                          {submarineCount}
                        </span>
                        <button
                          onClick={() => setSubmarineCount(submarineCount + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-purple-600 text-black hover:bg-purple-500 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-black text-white font-mono">{submarineCost} ريال</span>
                    </div>
                  </div>
                )}

                {/* Cars Items Rows */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-zinc-900 bg-zinc-900/20 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-purple-400 font-bold">
                      🏎️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white text-right truncate">{item.arabicName}</p>
                      <p className="text-[11px] text-zinc-500 text-right truncate uppercase font-mono" dir="ltr">{item.name}</p>
                      <p className="text-xs font-bold text-purple-400 font-mono text-right mt-1">{item.price} ريال</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 p-1">
                        <button
                          onClick={() => onUpdateCartItemQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="flex h-6 w-6 items-center justify-center rounded bg-zinc-950 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-white font-mono min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateCartItemQuantity(item.id, item.quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded bg-purple-600 text-black hover:bg-purple-500 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-black text-white font-mono">{item.price * item.quantity} ريال</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Summary Card */}
        <div className="border-t border-purple-900/40 bg-zinc-950 p-6 space-y-4">
          <div className="space-y-2 border-b border-zinc-900 pb-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>قيمة مهمة الغواصة:</span>
              <span className="font-mono font-bold text-white">{submarineCost} ريال</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>قيمة طقم مواتر قراند:</span>
              <span className="font-mono font-bold text-white">{carItemsCost} ريال</span>
            </div>
            <div className="flex items-center justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-900">
              <span className="flex items-center gap-1 text-purple-400">
                <CreditCard className="h-4 w-4" /> الإجمالي النهائي
              </span>
              <span id="drawer-total-price" className="text-xl font-black text-purple-400 font-mono">{totalCost} ريال سعودي</span>
            </div>
          </div>

          {/* Quick Notice about WhatsApp integration */}
          <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
            عند الضغط على الزر، سيتم فتح محادثة مباشرة مع صاحب متجر TRK عبر الواتساب لإرسال الأي دي والاتفاق على تسليم الفلوس والسيارات.
          </p>

          {/* WhatsApp Button */}
          <button
            id="checkout-whatsapp-btn"
            onClick={handleCheckoutViaWhatsApp}
            disabled={submarineCount === 0 && cartItems.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 text-sm font-extrabold text-black transition-all hover:bg-purple-500 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-purple-600/20 cursor-pointer"
          >
            <Send className="h-4.5 w-4.5 transform rotate-180" />
            <span>طلب وشراء عبر واتساب</span>
          </button>

          <button
            onClick={onClose}
            className="flex w-full items-center justify-center gap-1 py-1 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>مواصلة تصفح المعرض</span>
            <ChevronRight className="h-4 w-4 transform rotate-180 text-zinc-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
