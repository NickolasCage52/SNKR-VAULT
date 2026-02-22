/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import Quiz from './components/Quiz';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SocialProof from './components/SocialProof';
import About from './components/About';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SearchOverlay from './components/SearchOverlay';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  // State
  const [view, setView] = useState<'home' | 'privacy'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen for custom events to open privacy policy
  useEffect(() => {
    const handleOpenPrivacy = () => {
      setView('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('open-privacy', handleOpenPrivacy);
    return () => window.removeEventListener('open-privacy', handleOpenPrivacy);
  }, []);

  // Update document title based on view
  useEffect(() => {
    document.title = view === 'privacy' 
      ? 'Политика конфиденциальности — SNKR VAULT' 
      : 'SNKR VAULT — Магазин премиальных кроссовок';
  }, [view]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('snkr_vault_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('snkr_vault_cart', JSON.stringify(cart));
  }, [cart]);

  // Handlers
  const handleAddToCart = (product: Product, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    
    showToast(`Товар ${product.name} добавлен в корзину!`);
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (id: number, size: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number, size: number) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    showToast('Заказ успешно оформлен! Проверьте почту.');
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <Benefits />
            <Catalog 
              onProductClick={setSelectedProduct} 
              onAddToCart={handleAddToCart}
            />
            <Quiz 
              onAddToCart={handleAddToCart}
              onProductClick={setSelectedProduct}
            />
            <SocialProof />
            <About />
          </>
        ) : (
          <PrivacyPolicy onBack={() => setView('home')} />
        )}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <ProductModal 
            key={selectedProduct.id}
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onOneClickBuy={(product, size) => {
              handleAddToCart(product, size);
              setSelectedProduct(null);
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onSuccess={handleOrderSuccess}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={setSelectedProduct}
      />

      <Toast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />
    </div>
  );
}
