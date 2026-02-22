import { useState } from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (product: Product, size: number) => void;
}

export default function ProductCard({ product, onClick, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div 
      onClick={() => onClick()}
      className="group bg-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] card-glow cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#121212]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-accent text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            -{product.discount}%
          </span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            {product.brand}
          </span>
        </div>

        {/* Quick Actions Overlay - click anywhere to view */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors pointer-events-none">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl tracking-wide truncate pr-2">{product.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-xs text-white/40 mb-4 line-clamp-1">{product.description}</p>

        {/* Size Selection - stopPropagation to avoid opening modal when selecting size */}
        <div className="mb-6" onClick={(e) => e.stopPropagation()}>
          <p className="text-[10px] uppercase font-bold text-white/30 mb-2 tracking-widest">Выберите размер</p>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 5).map(size => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`w-8 h-8 rounded-lg text-[10px] font-bold border transition-all ${
                  selectedSize === size 
                    ? 'bg-accent border-accent text-white' 
                    : 'border-white/10 text-white/60 hover:border-white/30'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span className="w-8 h-8 flex items-center justify-center text-[10px] text-white/30">...</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-white/30 text-xs line-through">{product.oldPrice.toLocaleString()}₽</p>
            <p className="text-xl font-display text-accent">{product.price.toLocaleString()}₽</p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (selectedSize) {
                onAddToCart(product, selectedSize);
              } else {
                onClick();
              }
            }}
            className="w-10 h-10 bg-white/5 hover:bg-accent text-white rounded-xl flex items-center justify-center transition-all group/btn"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
