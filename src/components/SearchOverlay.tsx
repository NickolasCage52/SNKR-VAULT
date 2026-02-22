import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export default function SearchOverlay({ isOpen, onClose, onProductClick }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl p-6 md:p-20"
      >
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-10 h-10" />
        </button>

        <div className="max-w-4xl mx-auto pt-20">
          <div className="relative mb-12">
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 text-accent" />
            <input 
              autoFocus
              type="text" 
              placeholder="Поиск по названию или бренду..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/10 py-6 pl-16 text-4xl md:text-6xl font-display outline-none focus:border-accent transition-all"
            />
          </div>

          <div className="space-y-4">
            {results.map((product) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  onProductClick(product);
                  onClose();
                }}
                className="w-full p-6 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center gap-6 transition-all group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{product.brand}</p>
                  <h3 className="text-2xl font-display">{product.name}</h3>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <span className="text-2xl font-display">{product.price.toLocaleString()}₽</span>
                  <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-accent transition-all group-hover:translate-x-2" />
                </div>
              </motion.button>
            ))}

            {query.trim().length > 1 && results.length === 0 && (
              <p className="text-center text-white/40 text-xl py-20">Ничего не найдено по вашему запросу</p>
            )}

            {query.trim().length <= 1 && (
              <div className="pt-10">
                <p className="text-white/20 uppercase tracking-widest font-bold text-xs mb-6">Популярные запросы</p>
                <div className="flex flex-wrap gap-3">
                  {['Jordan 1', 'Air Max', 'Yeezy', 'New Balance 550', 'Nike Dunk'].map(q => (
                    <button 
                      key={q}
                      onClick={() => setQuery(q)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
