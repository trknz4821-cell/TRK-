import React, { useState } from 'react';
import { Star, MessageSquare, Check, User, PlusCircle } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [author, setAuthor] = useState('');
  const [psnId, setPsnId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Computations
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 
    ? parseFloat((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1))
    : 0;

  // Star distributions
  const starDistribution = [0, 0, 0, 0, 0]; // index 0 = 1 star, item 4 = 5 star
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      starDistribution[r.rating - 1]++;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview({
      author: author.trim(),
      psnId: psnId.trim() || undefined,
      rating,
      comment: comment.trim(),
      verifiedPurchase: true
    });

    // Reset Form
    setAuthor('');
    setPsnId('');
    setRating(5);
    setComment('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div id="reviews" className="space-y-8" dir="rtl">
      {/* Section Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 px-3.5 py-1 text-xs font-bold text-purple-400">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>آراء ومراجعات عملائنا</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white">
          ماذا يقولون عن <span className="text-purple-500">متجر TRK</span>؟
        </h3>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          ثقة وسرعة وأمان. تجارب حقيقية من لاعبين في قراند 5 على جهاز سوني 5.
        </p>
      </div>

      {/* Grid of reviews and stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Rating and Stats Panel */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between space-y-6">
          <div className="text-center space-y-2">
            <span className="text-sm font-bold text-zinc-400">التقييم العام للمتجر</span>
            <div className="text-5xl font-black text-white font-mono">{averageRating}</div>
            
            {/* Stars display */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-5 w-5 ${
                    s <= Math.round(averageRating) 
                      ? 'fill-purple-500 text-purple-500' 
                      : 'text-zinc-700'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-500">استناداً إلى {totalReviewsCount} تقييم حقيقي من عملائنا</p>
          </div>

          {/* Stars breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starDistribution[stars - 1];
              const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-zinc-400 w-3">{stars}</span>
                  <Star className="h-3.5 w-3.5 fill-purple-500 text-purple-500 shrink-0" />
                  <div className="flex-1 h-2 rounded-full bg-zinc-900 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-purple-600" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-mono text-zinc-500 w-6 text-left">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Leave Review Action Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-purple-500/30 bg-purple-950/20 py-3 text-xs font-extrabold text-purple-400 hover:bg-purple-950/40 hover:text-purple-300 transition-all cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>إضافة تعليقك وتجربتك</span>
            </button>
          )}
        </div>

        {/* Reviews List & Forms Area */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Write comment Form Container */}
          {showForm && (
            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-950/10 to-zinc-950 p-6 space-y-4 relative">
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>

              {formSuccess ? (
                <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-black">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-white text-lg">تم إرسال تعليقك بنجاح!</h4>
                  <p className="text-xs text-zinc-400">شكراً لك على تقييم متجر TRK ودعمنا المستمر.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-bold text-white text-lg">أخبرنا عن تجربة شحنك في قراند 5</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-zinc-400 text-right">الإسم كعميل <span className="text-purple-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="مثال: تركي العنزي"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 px-3.5 text-sm font-semibold text-white placeholder-zinc-700 transition-all focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-zinc-400 text-right">آيدي سوني 5 (اختياري)</label>
                      <input
                        type="text"
                        value={psnId}
                        onChange={(e) => setPsnId(e.target.value)}
                        placeholder="مثال: TRK_510"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 px-3.5 text-sm font-semibold text-white placeholder-zinc-700 transition-all focus:border-purple-500 focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Rating selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-zinc-400 text-right">التقييم بالنجوم</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-7 w-7 ${
                              star <= rating 
                                ? 'fill-purple-500 text-purple-500' 
                                : 'text-zinc-700 hover:text-purple-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-zinc-400 text-right">ما هو رأيك في الخدمة؟ <span className="text-purple-500">*</span></label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      placeholder="صف لنا سرعة الاستجابة، تعامل الدعم، أو الفلوس التي حصلت عليها..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 px-3.5 text-sm font-semibold text-white placeholder-zinc-700 transition-all focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-purple-600 py-3 text-xs font-extrabold text-black hover:bg-purple-500 transition-colors tracking-wide cursor-pointer"
                  >
                    نشر التعليق الآن
                  </button>
                </form>
              )}
            </div>
          )}

          {/* List of comments */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 space-y-3 transition-colors hover:border-purple-500/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/60 text-purple-400 border border-purple-500/10">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-neutral-100">{rev.author}</h4>
                        {rev.verifiedPurchase && (
                          <span className="rounded-full bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-400 flex items-center gap-0.5">
                            ✓ عميل موثق
                          </span>
                        )}
                      </div>
                      {rev.psnId && (
                        <p className="text-[10px] text-zinc-500 font-mono text-right" dir="ltr">@{rev.psnId}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3 w-3 ${
                            s <= rev.rating 
                              ? 'fill-purple-500 text-purple-500' 
                              : 'text-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-500">{rev.date}</span>
                  </div>
                </div>

                <p className="text-zinc-300 text-xs leading-relaxed text-right md:text-sm">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
