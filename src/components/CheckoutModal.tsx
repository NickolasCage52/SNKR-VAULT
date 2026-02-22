import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, Truck, MapPin, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    delivery: 'courier',
    address: '',
    payment: 'card'
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      onSuccess();
      setStep(4); // Success step
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-bg rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          {step < 4 && (
            <>
              <div className="flex items-center gap-4 mb-10">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s ? 'bg-accent text-white scale-110' : step > s ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'
                    }`}>
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-8 h-0.5 rounded-full ${step > s ? 'bg-green-500' : 'bg-white/10'}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h2 className="text-3xl font-display mb-6">КОНТАКТНЫЕ ДАННЫЕ</h2>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">ФИО</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Иван Иванов"
                        className="w-full h-14 bg-card border border-white/10 rounded-xl px-4 focus:border-accent outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Телефон</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+7 (___) ___-__-__"
                          className="w-full h-14 bg-card border border-white/10 rounded-xl px-4 focus:border-accent outline-none"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Email</label>
                        <input 
                          required
                          type="email" 
                          placeholder="example@mail.com"
                          className="w-full h-14 bg-card border border-white/10 rounded-xl px-4 focus:border-accent outline-none"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex items-start gap-3">
                      <input 
                        required
                        type="checkbox" 
                        id="privacy-consent"
                        className="mt-1 w-4 h-4 accent-accent"
                      />
                      <label htmlFor="privacy-consent" className="text-xs text-white/60 leading-relaxed">
                        Я согласен(а) с <button type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('open-privacy')); }} className="text-accent hover:underline">Политикой конфиденциальности</button> и обработкой персональных данных
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h2 className="text-3xl font-display mb-6">СПОСОБ ДОСТАВКИ</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, delivery: 'courier'})}
                        className={`p-6 rounded-2xl border transition-all text-left ${
                          formData.delivery === 'courier' ? 'bg-accent/5 border-accent' : 'bg-card border-white/5 hover:border-white/20'
                        }`}
                      >
                        <Truck className={`w-6 h-6 mb-4 ${formData.delivery === 'courier' ? 'text-accent' : 'text-white/40'}`} />
                        <p className="font-bold">Курьер</p>
                        <p className="text-xs text-white/40">До двери</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, delivery: 'pickup'})}
                        className={`p-6 rounded-2xl border transition-all text-left ${
                          formData.delivery === 'pickup' ? 'bg-accent/5 border-accent' : 'bg-card border-white/5 hover:border-white/20'
                        }`}
                      >
                        <MapPin className={`w-6 h-6 mb-4 ${formData.delivery === 'pickup' ? 'text-accent' : 'text-white/40'}`} />
                        <p className="font-bold">Пункт выдачи</p>
                        <p className="text-xs text-white/40">СДЭК / Почта</p>
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Адрес доставки</label>
                      <textarea 
                        required
                        placeholder="Город, улица, дом, квартира"
                        className="w-full h-32 bg-card border border-white/10 rounded-xl p-4 focus:border-accent outline-none resize-none"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <h2 className="text-3xl font-display mb-6">ОПЛАТА</h2>
                    <div className="space-y-3">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, payment: 'card'})}
                        className={`w-full p-6 rounded-2xl border transition-all flex items-center gap-4 ${
                          formData.payment === 'card' ? 'bg-accent/5 border-accent' : 'bg-card border-white/5 hover:border-white/20'
                        }`}
                      >
                        <CreditCard className={`w-6 h-6 ${formData.payment === 'card' ? 'text-accent' : 'text-white/40'}`} />
                        <div className="text-left">
                          <p className="font-bold">Картой онлайн</p>
                          <p className="text-xs text-white/40">Visa, Mastercard, МИР</p>
                        </div>
                        {formData.payment === 'card' && <Check className="w-5 h-5 text-accent ml-auto" />}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, payment: 'cash'})}
                        className={`w-full p-6 rounded-2xl border transition-all flex items-center gap-4 ${
                          formData.payment === 'cash' ? 'bg-accent/5 border-accent' : 'bg-card border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center font-bold ${formData.payment === 'cash' ? 'text-accent' : 'text-white/40'}`}>₽</div>
                        <div className="text-left">
                          <p className="font-bold">При получении</p>
                          <p className="text-xs text-white/40">Наличными или картой</p>
                        </div>
                        {formData.payment === 'cash' && <Check className="w-5 h-5 text-accent ml-auto" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <button 
                      type="button"
                      onClick={() => setStep(prev => prev - 1)}
                      className="h-14 px-8 border border-white/10 hover:bg-white/5 text-white rounded-xl font-bold transition-all"
                    >
                      Назад
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="flex-1 h-14 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold transition-all active:scale-95"
                  >
                    {step === 3 ? 'Подтвердить заказ' : 'Продолжить'}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-5xl font-display mb-4 tracking-wider">ЗАКАЗ ПРИНЯТ!</h2>
              <p className="text-white/60 mb-8 max-w-sm">
                Номер вашего заказа <span className="text-white font-bold">#SV-{Math.floor(Math.random() * 10000)}</span>. 
                Мы свяжемся с вами в ближайшее время для подтверждения.
              </p>
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-white text-black rounded-xl font-bold hover:bg-accent hover:text-white transition-all"
              >
                Вернуться в магазин
              </button>
            </motion.div>
          )}
        </div>

        {/* Right: Summary */}
        {step < 4 && (
          <div className="w-full md:w-[350px] bg-card p-8 md:p-10 border-l border-white/5">
            <h3 className="text-xl font-display mb-8 tracking-widest">ВАШ ЗАКАЗ</h3>
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8 scrollbar-hide">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Размер: {item.selectedSize}</p>
                    <p className="text-xs text-accent mt-1">{item.price.toLocaleString()}₽ x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm text-white/40">
                <span>Сумма</span>
                <span>{subtotal.toLocaleString()}₽</span>
              </div>
              <div className="flex justify-between text-sm text-white/40">
                <span>Доставка</span>
                <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee}₽`}</span>
              </div>
              <div className="flex justify-between text-2xl font-display pt-4">
                <span>ИТОГО</span>
                <span className="text-accent">{total.toLocaleString()}₽</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-xl flex gap-3">
              <ShoppingBag className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-[10px] text-white/60 leading-relaxed">
                Бесплатная доставка при заказе от 5000₽. Гарантия возврата 14 дней.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
