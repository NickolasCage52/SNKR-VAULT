import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { REVIEWS } from '../constants';

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Счастливых клиентов", value: 10000, suffix: "+" },
    { label: "Моделей в наличии", value: 500, suffix: "+" },
    { label: "Средний рейтинг", value: 4.9, suffix: "" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-6xl font-display text-accent mb-2"
              >
                <Counter value={stat.value} />{stat.suffix}
              </motion.div>
              <p className="text-sm uppercase tracking-widest font-bold text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display mb-4">НАС ВЫБИРАЮТ ТЫСЯЧИ</h2>
            <p className="text-white/40">Реальные отзывы наших покупателей со всей страны</p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card p-10 md:p-16 rounded-[40px] border border-white/5 relative"
              >
                <Quote className="absolute top-10 right-10 w-16 h-16 text-accent/10" />
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent/20 flex-shrink-0">
                    <LazyImage src={REVIEWS[activeIndex].avatar} alt={REVIEWS[activeIndex].name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < REVIEWS[activeIndex].rating ? 'fill-current' : 'opacity-20'}`} />
                      ))}
                    </div>
                    
                    <p className="text-xl md:text-2xl italic leading-relaxed mb-8 text-white/90">
                      "{REVIEWS[activeIndex].text}"
                    </p>
                    
                    <div>
                      <h4 className="text-xl font-display tracking-wide">{REVIEWS[activeIndex].name}</h4>
                      <p className="text-sm text-white/40">{REVIEWS[activeIndex].city} • Купил: {REVIEWS[activeIndex].product}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-10">
              <button 
                onClick={() => setActiveIndex(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${activeIndex === idx ? 'bg-accent w-6' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveIndex(prev => (prev + 1) % REVIEWS.length)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}
