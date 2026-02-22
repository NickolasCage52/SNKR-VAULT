import { useState } from 'react';
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number) => void;
  onOneClickBuy?: (product: Product, size: number) => void;
}

export default function ProductModal({ product, onClose, onAddToCart, onOneClickBuy }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'chars' | 'reviews'>('desc');

  if (!product) return null;

  const allImages = [product.image, ...(product.images || [])];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300, duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-card rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Gallery */}
          <div className="w-full md:w-1/2 bg-[#121212] p-6 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img 
                src={allImages[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              <button 
                onClick={() => setActiveImage(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveImage(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 ml-auto">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{product.rating}</span>
                  <span className="text-white/40 text-xs">({product.reviews} отзывов)</span>
                </div>
              </div>
              <h2 className="text-4xl font-display tracking-wide mb-2">{product.name}</h2>
              <p className="text-white/40 text-sm">Артикул: SV-{product.id}00{product.brand.charAt(0)}</p>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-display text-accent">{product.price.toLocaleString()}₽</span>
              <span className="text-xl font-display text-white/30 line-through mb-1">{product.oldPrice.toLocaleString()}₽</span>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-white/60">Выберите размер (EU)</span>
                <button className="text-accent text-xs hover:underline">Таблица размеров</button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl text-sm font-bold border transition-all flex items-center justify-center ${
                      selectedSize === size 
                        ? 'bg-accent border-accent text-white shadow-[0_0_15px_rgba(255,61,0,0.3)]' 
                        : 'border-white/10 text-white/60 hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                disabled={!selectedSize}
                onClick={() => selectedSize && onAddToCart(product, selectedSize)}
                className="flex-1 h-14 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                В корзину
              </button>
              <button 
                disabled={!selectedSize}
                onClick={() => selectedSize && (onOneClickBuy ? onOneClickBuy(product, selectedSize) : onAddToCart(product, selectedSize))}
                className="flex-1 h-14 border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all"
              >
                Купить в 1 клик
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 flex gap-8 mb-6">
              {(['desc', 'chars', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {tab === 'desc' ? 'Описание' : tab === 'chars' ? 'Характеристики' : 'Отзывы'}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-white/60 text-sm leading-relaxed min-h-[100px]">
              {activeTab === 'desc' && (
                <p>{product.description} Кроссовки выполнены из высококачественных материалов, обеспечивающих долговечность и комфорт при носке. Уникальный дизайн подчеркнет вашу индивидуальность.</p>
              )}
              {activeTab === 'chars' && (
                <ul className="space-y-2">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Бренд</span>
                    <span className="text-white">{product.brand}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Материал верха</span>
                    <span className="text-white">Текстиль, Кожа</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Подошва</span>
                    <span className="text-white">Резина, Пена</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Сезон</span>
                    <span className="text-white">Демисезон</span>
                  </li>
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Иван П.</span>
                      <div className="flex text-yellow-500"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                    </div>
                    <p className="text-xs">Кроссовки супер! Размер подошел идеально. Доставка быстрая.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
  );
}
