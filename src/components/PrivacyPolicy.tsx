import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 bg-bg min-h-screen"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <button 
          onClick={onBack}
          className="mb-12 px-6 py-2 border border-white/10 rounded-full text-sm font-bold hover:bg-white/5 transition-all flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Назад
        </button>

        <h1 className="text-5xl font-display mb-12 tracking-wider">Политика конфиденциальности SNKR VAULT</h1>
        <p className="text-white/40 text-sm mb-12">Дата последнего обновления: {currentYear}</p>

        <div className="space-y-12 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">1. Общие положения</h2>
            <p>Настоящая Политика конфиденциальности описывает, как SNKR VAULT (далее — «Магазин», «мы», «нас») собирает, использует и защищает персональные данные пользователей (далее — «Пользователь», «вы») при использовании сайта snkrvault.ru.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">2. Какие данные мы собираем</h2>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Имя и фамилия</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Номер телефона</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Адрес электронной почты</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Адрес доставки</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Данные о заказах и предпочтениях</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Технические данные: IP-адрес, тип браузера, cookie-файлы</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">3. Цели обработки данных</h2>
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Обработка и доставка заказов</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Связь с пользователем по вопросам заказа</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Персонализация рекомендаций товаров</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Отправка информационных и рекламных материалов (с согласия)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Улучшение работы сайта и пользовательского опыта</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">4. Правовое основание</h2>
            <p>Обработка персональных данных осуществляется в соответствии с Федеральным законом №152-ФЗ «О персональных данных» от 27.07.2006.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">5. Хранение и защита данных</h2>
            <p>Данные хранятся в защищённых системах. Мы применяем технические и организационные меры для предотвращения несанкционированного доступа. Данные не передаются третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законом (службы доставки, платёжные системы).</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">6. Cookie-файлы</h2>
            <p>Мы используем cookie для улучшения работы сайта. Вы можете отключить cookie в настройках браузера, однако это может повлиять на функциональность сайта.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">7. Права пользователя</h2>
            <p>Вы имеете право:</p>
            <ul className="list-none space-y-2 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Запросить доступ к своим данным</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Потребовать исправления или удаления данных</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Отозвать согласие на обработку данных</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Подать жалобу в Роскомнадзор</span>
              </li>
            </ul>
          </section>

          <section className="bg-card p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-display text-accent mb-6 tracking-widest uppercase">8. Контакты</h2>
            <div className="space-y-4 text-sm">
              <p><span className="text-white/40 uppercase tracking-widest font-bold mr-2">Email:</span> privacy@snkrvault.ru</p>
              <p><span className="text-white/40 uppercase tracking-widest font-bold mr-2">Телефон:</span> +7 (800) 555-35-35</p>
              <p><span className="text-white/40 uppercase tracking-widest font-bold mr-2">Адрес:</span> г. Москва, ул. Арбат, д. 1, оф. 100</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display text-accent mb-4 tracking-widest uppercase">9. Изменения в политике</h2>
            <p>Мы оставляем за собой право вносить изменения в настоящую политику. Актуальная версия всегда доступна на данной странице.</p>
          </section>
        </div>
      </div>
    </motion.section>
  );
}
