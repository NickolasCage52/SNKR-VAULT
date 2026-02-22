import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,61,0,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20"
          >
            Exclusive Drop 2024
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl font-display leading-[0.9] mb-6">
            НОСИ ТО, ЧТО <br />
            <span className="text-accent text-glow">ВЫДЕЛЯЕТ</span>
          </h1>
          
          <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
            Добро пожаловать в SNKR VAULT — место, где кроссовки становятся искусством. 
            Только оригинальные модели и лимитированные коллекции.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="#catalog"
              className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Смотреть каталог
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="#quiz"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white rounded-lg font-bold transition-all duration-300 hover:bg-white/5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Пройти квиз
            </motion.a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-50">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-widest">14-Day Return</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Original Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-widest">10k+ Clients</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full" />
          <img 
            src="https://picsum.photos/seed/hero-shoe/800/800" 
            alt="Hero Sneaker"
            className="w-full h-auto relative z-10 animate-float drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
          />
          
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-10 glass p-4 rounded-2xl z-20"
          >
            <p className="text-xs font-bold text-accent mb-1">Top Rated</p>
            <p className="text-sm font-display">Jordan 1 Retro</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 -right-10 glass p-4 rounded-2xl z-20"
          >
            <p className="text-xs font-bold text-green-500 mb-1">In Stock</p>
            <p className="text-sm font-display">Air Max 270</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
