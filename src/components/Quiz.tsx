import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, User, Phone, Check } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface QuizProps {
  onAddToCart: (product: Product, size: number) => void;
  onProductClick: (product: Product) => void;
}

export default function Quiz({ onAddToCart, onProductClick }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: '',
    budget: '',
    style: '',
    brand: '',
    name: '',
    phone: ''
  });
  const [results, setResults] = useState<Product[]>([]);

  const steps = [
    {
      id: 1,
      title: "Цель: для чего вам нужны кроссовки?",
      field: 'purpose',
      options: [
        { id: 'running', label: 'Бег', icon: '🏃' },
        { id: 'lifestyle', label: 'Лайфстайл', icon: '👟' },
        { id: 'basketball', label: 'Баскетбол', icon: '🏀' },
        { id: 'training', label: 'Тренировки', icon: '💪' },
        { id: 'walking', label: 'Прогулки', icon: '🚶' },
      ]
    },
    {
      id: 2,
      title: "Бюджет: на какую сумму рассчитываете?",
      field: 'budget',
      options: [
        { id: 'до5000', label: 'До 5 000₽', icon: '💸' },
        { id: '5000-10000', label: '5 000 - 10 000₽', icon: '💰' },
        { id: '10000-20000', label: '10 000 - 20 000₽', icon: '💎' },
        { id: '20000+', label: 'От 20 000₽', icon: '✨' },
      ]
    },
    {
      id: 3,
      title: "Стиль: что вам ближе?",
      field: 'style',
      options: [
        { id: 'minimalist', label: 'Минимализм', icon: '⚪' },
        { id: 'bold', label: 'Яркий и дерзкий', icon: '🔥' },
        { id: 'classic', label: 'Классика', icon: '🏛️' },
        { id: 'futuristic', label: 'Футуризм', icon: '🚀' },
      ]
    },
    {
      id: 4,
      title: "Бренд: есть ли предпочтения?",
      field: 'brand',
      options: [
        { id: 'nike', label: 'Nike / Jordan', icon: '✔️' },
        { id: 'adidas', label: 'Adidas', icon: '📐' },
        { id: 'newbalance', label: 'New Balance', icon: 'NB' },
        { id: 'puma', label: 'Puma', icon: '🐆' },
        { id: 'no-preference', label: 'Без предпочтений', icon: '🤝' },
      ]
    }
  ];

  const handleOptionSelect = (field: string, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const getQuizResults = (ans: any) => {
    const scored = PRODUCTS.map(product => {
      let score = 0;
      if (product.quizTags.purpose.includes(ans.purpose)) score += 40;
      if (product.quizTags.budget.includes(ans.budget)) score += 30;
      if (product.quizTags.style.includes(ans.style)) score += 20;
      if (product.quizTags.brand.includes(ans.brand)) score += 10;
      return { ...product, matchScore: score };
    });

    const threshold = scored.filter(p => (p.matchScore || 0) >= 40);
    const sorted = (threshold.length > 0 ? threshold : scored)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 3);
    
    return sorted;
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalResults = getQuizResults(answers);
    setResults(finalResults);
    
    // Save to localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('quizLeadName', answers.name);
    localStorage.setItem('quizLeadPhone', answers.phone);
    
    setStep(6);
  };

  return (
    <section id="quiz" className="py-24 bg-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {step < 6 && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display mb-4 uppercase tracking-wider">Подберём кроссовки за 1 минуту</h2>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden max-w-md mx-auto mb-4">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
            <span className="px-4 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full uppercase tracking-widest">
              Шаг {step} из 5
            </span>
          </div>
        )}

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step <= 4 && (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-display text-center mb-10">{steps[step-1].title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {steps[step-1].options.map((opt) => {
                    const isSelected = (answers as any)[steps[step-1].field] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(steps[step-1].field, opt.id)}
                        className={`p-6 rounded-2xl border flex items-center gap-4 transition-all text-left relative group ${
                          isSelected 
                            ? 'bg-accent/10 border-accent shadow-[0_0_20px_rgba(255,61,0,0.1)]' 
                            : 'bg-card border-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className="text-4xl">{opt.icon}</span>
                        <span className="font-bold text-lg">{opt.label}</span>
                        {isSelected && (
                          <div className="ml-auto bg-accent rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-center gap-4 mt-12">
                  {step > 1 && (
                    <button 
                      onClick={() => setStep(prev => prev - 1)}
                      className="px-8 py-3 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" /> Назад
                    </button>
                  )}
                  <button 
                    disabled={!(answers as any)[steps[step-1].field]}
                    onClick={() => setStep(prev => prev + 1)}
                    className="px-10 py-3 bg-accent disabled:opacity-50 text-white rounded-full font-bold hover:bg-accent/90 transition-all flex items-center gap-2 shadow-[0_10px_20px_rgba(255,61,0,0.2)]"
                  >
                    Продолжить <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="max-w-md mx-auto"
              >
                <h3 className="text-3xl font-display text-center mb-10">Почти готово! Как с вами связаться?</h3>
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-2">Ваше имя</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input 
                        required
                        type="text" 
                        placeholder="Александр"
                        value={answers.name}
                        onChange={e => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-14 bg-card border border-white/10 rounded-xl pl-12 pr-4 focus:border-accent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-2">Телефон</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input 
                        required
                        type="tel" 
                        pattern="\+7\d{10}"
                        placeholder="+79991234567"
                        value={answers.phone}
                        onChange={e => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full h-14 bg-card border border-white/10 rounded-xl pl-12 pr-4 focus:border-accent outline-none transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-white/20 ml-2">Формат: +7XXXXXXXXXX</p>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-8 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                    >
                      Назад
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 h-14 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,61,0,0.2)]"
                    >
                      Получить подборку
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-5xl font-display mb-4 tracking-wider">Ваша идеальная подборка готова! 🔥</h3>
                <p className="text-white/50 mb-12 max-w-xl mx-auto">На основе ваших ответов мы подобрали лучшие варианты, которые максимально соответствуют вашим критериям.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {results.map((product) => (
                    <div key={product.id} className="relative">
                      <div className="absolute -top-3 -right-3 z-10 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                        Совпадение {product.matchScore}%
                      </div>
                      <ProductCard 
                        product={product} 
                        onClick={() => onProductClick(product)}
                        onAddToCart={onAddToCart}
                      />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-accent hover:text-white transition-all uppercase tracking-widest shadow-xl"
                >
                  Смотреть весь каталог
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
