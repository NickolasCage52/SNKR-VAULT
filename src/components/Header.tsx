import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

export default function Header({ cartCount, onCartClick, onSearchClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '#' },
    { name: 'Каталог', href: '#catalog' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#footer' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="bg-accent p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-display text-2xl tracking-wider">SNKR VAULT</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-accent transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={onSearchClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-display text-2xl tracking-wider">SNKR VAULT</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display tracking-widest hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Свяжитесь с нами</p>
              <p className="text-xl font-medium">+7 (999) 123-45-67</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
