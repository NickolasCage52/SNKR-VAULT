import { Zap, Instagram, Twitter, Facebook, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2">
              <div className="bg-accent p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display text-2xl tracking-wider">SNKR VAULT</span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed">
              Ваш надежный проводник в мире эксклюзивных кроссовок. 
              Только оригинал, только стиль.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-xl tracking-widest mb-8">НАВИГАЦИЯ</h4>
            <ul className="space-y-4">
              {['Главная', 'Каталог', 'О нас', 'Доставка', 'Контакты'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xl tracking-widest mb-8">КАТЕГОРИИ</h4>
            <ul className="space-y-4">
              {['Беговые', 'Баскетбольные', 'Лайфстайл', 'Тренировочные', 'Лимитированные'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-accent transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-xl tracking-widest mb-8">КОНТАКТЫ</h4>
            <ul className="space-y-6">
              <li>
                <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Телефон</p>
                <p className="text-lg">+7 (999) 123-45-67</p>
              </li>
              <li>
                <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Email</p>
                <p className="text-lg">hello@snkrvault.ru</p>
              </li>
              <li>
                <p className="text-[10px] uppercase font-bold text-white/20 mb-1 tracking-widest">Адрес</p>
                <p className="text-sm text-white/60">Москва, ул. Тверская, 12, стр. 1</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-20 grayscale" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 opacity-20 grayscale" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.svg" className="h-4 opacity-20 grayscale" alt="MIR" />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/20 text-[10px] uppercase tracking-widest">
              © 2024 SNKR VAULT. Все права защищены.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-privacy'))}
                className="text-[10px] text-white/20 hover:text-accent transition-colors uppercase tracking-widest"
              >
                Политика конфиденциальности
              </button>
              <button 
                onClick={() => alert('Пользовательское соглашение\n\nЭто демонстрационное модальное окно. В реальном приложении здесь был бы полный текст соглашения.')}
                className="text-[10px] text-white/20 hover:text-accent transition-colors uppercase tracking-widest"
              >
                Пользовательское соглашение
              </button>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Наверх
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
