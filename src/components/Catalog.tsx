import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface CatalogProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, size: number) => void;
}

export default function Catalog({ onProductClick, onAddToCart }: CatalogProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'basketball' | 'lifestyle' | 'training'>('all');

  const tabs = [
    { id: 'all', name: 'Все' },
    { id: 'running', name: 'Бег' },
    { id: 'basketball', name: 'Баскетбол' },
    { id: 'lifestyle', name: 'Лайфстайл' },
    { id: 'training', name: 'Тренинг' },
  ];

  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section id="catalog" className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        >
          <h2 className="text-5xl font-display mb-4">КАТАЛОГ ТОВАРОВ</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Исследуйте нашу коллекцию премиальных кроссовок от ведущих мировых брендов. 
            Найдите свою идеальную пару прямо сейчас.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(255,61,0,0.3)]' 
                  : 'bg-card text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300, delay: idx * 0.03 }}
              >
                <ProductCard 
                  product={product} 
                  onClick={() => onProductClick(product)}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
