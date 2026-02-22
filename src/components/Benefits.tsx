import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function Benefits() {
  const benefits = [
    {
      icon: Truck,
      title: "Быстрая доставка",
      desc: "Доставка по всей России от 2-х дней. Бесплатно при заказе от 5000₽."
    },
    {
      icon: ShieldCheck,
      title: "Гарантия оригинала",
      desc: "Все товары проходят строгую проверку на подлинность перед отправкой."
    },
    {
      icon: RotateCcw,
      title: "Легкий возврат",
      desc: "Не подошел размер? Вернем деньги или обменяем в течение 14 дней."
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      desc: "Наши менеджеры всегда на связи и готовы помочь с выбором."
    }
  ];

  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300, delay: index * 0.08 }}
              className="p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/30 transition-all group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <item.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-display tracking-wide mb-3">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
