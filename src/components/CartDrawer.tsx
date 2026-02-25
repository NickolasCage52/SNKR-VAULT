import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed' }> = {
  WELCOME10: { discount: 10, type: 'percent' },
  SNKR500: { discount: 500, type: 'fixed' },
  VIP15: { discount: 15, type: 'percent' },
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, size: number, delta: number) => void;
  onRemove: (id: number, size: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout 
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: 'percent' | 'fixed' } | null>(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedPromo) {
    discountAmount = appliedPromo.type === 'percent' 
      ? (subtotal * appliedPromo.discount) / 100 
      : Math.min(appliedPromo.discount, subtotal);
  }
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const delivery = afterDiscount > 5000 ? 0 : 500;
  const total = afterDiscount + delivery;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const promo = PROMO_CODES[code];
    if (promo) {
      setAppliedPromo({ code, ...promo });
      setPromoError('');
    } else {
      setPromoError('Промокод не найден');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[120] w-full max-w-md bg-bg border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-display tracking-wider">КОРЗИНА</h2>
                <span className="bg-white/10 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-xl font-display mb-2">КОРЗИНА ПУСТА</p>
                  <p className="text-sm max-w-[200px]">Добавьте что-нибудь из каталога, чтобы начать покупки</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-accent font-bold hover:underline"
                  >
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-card rounded-xl overflow-hidden flex-shrink-0">
                      <LazyImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm truncate pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-white/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-3">
                        Размер: {item.selectedSize} | {item.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-card rounded-lg border border-white/5 p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                            className="p-1 hover:text-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-display text-accent">{(item.price * item.quantity).toLocaleString()}₽</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-card/50">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Сумма</span>
                    <span>{subtotal.toLocaleString()}₽</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-400">
                      <span className="flex items-center gap-1">
                        Промокод {appliedPromo.code}
                        <button onClick={removePromo} className="text-white/40 hover:text-white ml-1">×</button>
                      </span>
                      <span>-{discountAmount.toLocaleString()}₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Доставка</span>
                    <span>{delivery === 0 ? 'Бесплатно' : `${delivery}₽`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-display pt-3 border-t border-white/5">
                    <span>ИТОГО</span>
                    <span className="text-accent">{total.toLocaleString()}₽</span>
                  </div>
                </div>

                {!appliedPromo ? (
                  <div className="flex gap-2 mb-4">
                    <input 
                      type="text" 
                      placeholder="Промокод"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyPromo())}
                      className={`flex-1 bg-card border rounded-lg px-4 text-sm outline-none focus:border-accent/50 ${promoError ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all"
                    >
                      Применить
                    </button>
                  </div>
                ) : null}
                {promoError && <p className="text-red-400 text-xs mb-2">{promoError}</p>}

                <button 
                  onClick={onCheckout}
                  className="w-full h-14 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,61,0,0.2)]"
                >
                  Оформить заказ
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
