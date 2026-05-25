import React from 'react';
import { Gamepad2, Info, Plus, Minus, ShieldCheck, Zap } from 'lucide-react';

interface SubmarineServiceProps {
  psnId: string;
  onChangePsnId: (id: string) => void;
  submarineCount: number;
  onChangeCount: (count: number) => void;
  pricePerSubmarine: number;
}

export default function SubmarineService({
  psnId,
  onChangePsnId,
  submarineCount,
  onChangeCount,
  pricePerSubmarine
}: SubmarineServiceProps) {
  
  const handleDecrement = () => {
    if (submarineCount > 0) {
      onChangeCount(submarineCount - 1);
    }
  };

  const handleIncrement = () => {
    onChangeCount(submarineCount + 1);
  };

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-zinc-950 to-black p-6 md:p-8 shadow-2xl relative overflow-hidden group" dir="rtl">
      {/* Background glowing ambient light */}
      <div className="absolute top-0 right-1/4 -z-10 h-32 w-32 rounded-full bg-purple-600/10 blur-3xl transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-10 -z-10 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Ribbon Tag */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-300">
        <Zap className="h-3 w-3 text-purple-400" />
        <span>سوني 5 (PS5) المحسنة</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
        {/* Texts and Explainers */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">
                خدمة <span className="text-purple-500">مهمة الغواصة</span> (كوساتكا) كايو بريكو
              </h3>
              <p className="text-xs text-zinc-400">طريقة مضمونة وسريعة للحصول على ملايين الدولارات في قراند 5</p>
            </div>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
            هل تبحث عن المال السريع والآمن في <strong className="text-purple-400">GTA V Expanded & Enhanced</strong>؟ 
            نحن نقوم بدعوتك وإنهاء مهمة الغواصة الشهيرة بالكامل معك، ومنحك حصة الـ <strong className="text-purple-400">100%</strong> لتستلم ملايين الدولارات فورا في حسابك ودون الحاجة لأي مجهود أو متطلبات صعبة!
          </p>

          {/* Quick info list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 rounded-xl bg-zinc-900/60 p-3 border border-zinc-800/80">
              <ShieldCheck className="h-5 w-5 text-purple-500 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white text-right">آمن 100%</p>
                <p className="text-zinc-400 text-right">بدون باند أو تصفير حسابات</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-zinc-900/60 p-3 border border-zinc-800/80">
              <Info className="h-5 w-5 text-purple-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white text-right">طريقة اللعب</p>
                <p className="text-zinc-400 text-right">ندعوك وتجمع الفلوس بسهولة</p>
              </div>
            </div>
          </div>

          {/* ID PlayStation Config */}
          <div className="space-y-2 pt-4">
            <label className="block text-sm font-bold text-zinc-300 text-right">
              أدخل الآيدي الخاص بك على سوني 5 (PSN ID) <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <input
                id="psn-id-input"
                type="text"
                value={psnId}
                onChange={(e) => onChangePsnId(e.target.value)}
                placeholder="مثال: Player_TRK"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pr-11 pl-4 text-sm font-semibold text-white placeholder-zinc-600 transition-all focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                dir="ltr"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500">
                <Gamepad2 className="h-5 w-5" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 text-right">يرجى كتابة الآيدي بشكل صحيح للتواصل معك داخل اللعبة بأسرع وقت.</p>
          </div>
        </div>

        {/* Dynamic Calculator & Checkout Side card */}
        <div className="w-full lg:w-80 rounded-2xl border border-purple-500/20 bg-zinc-950 p-5 flex flex-col justify-between space-y-6 shrink-0 relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-600 to-indigo-500 md:rounded-t-2xl" />

          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-bold">تسعيرة خدمات TRK</span>
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-black text-purple-400">3</span>
              <span className="text-sm font-bold text-zinc-300">ريال سعودي / غواصة</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="block text-xs font-black text-center text-zinc-400">حدد عدد الغواصات المطلوبة:</span>
            <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-2">
              <button
                id="sub-minus-btn"
                onClick={handleDecrement}
                disabled={submarineCount === 0}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500 transition-colors disabled:opacity-30 disabled:hover:border-zinc-800 cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span id="sub-count-display" className="text-2xl font-black text-white font-mono min-w-12 text-center">
                {submarineCount}
              </span>

              <button
                id="sub-plus-btn"
                onClick={handleIncrement}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500 transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Pricing and Summary */}
          <div className="border-t border-zinc-800/80 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>الخدمة:</span>
              <span className="font-bold text-white">مهمة الغواصة Cayo</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>العدد المختار:</span>
              <span className="font-bold text-white font-mono">{submarineCount} غواصات</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-zinc-300 pt-1 border-t border-zinc-900">
              <span>الإجمالي:</span>
              <span id="sub-total-price" className="text-purple-400 font-mono text-base">{submarineCount * pricePerSubmarine} ريال</span>
            </div>
          </div>

          {submarineCount > 0 ? (
            <div className="rounded-xl bg-purple-950/20 border border-purple-500/30 p-2.5 text-center text-xs text-purple-300 font-medium">
              ✨ تم إضافة الغواصات تلقائياً إلى سلة المشتريات للتأكيد.
            </div>
          ) : (
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-2.5 text-center text-xs text-zinc-500">
              💡 اختر عدد الغواصات لبدء العملية
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
