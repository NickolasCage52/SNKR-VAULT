import { motion } from 'motion/react';
import { Target, Users, Heart } from 'lucide-react';
import LazyImage from './LazyImage';
import { images } from '../utils/images';

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Наша миссия",
      desc: "Мы стремимся сделать эксклюзивную обувь доступной для каждого ценителя стиля в России."
    },
    {
      icon: Users,
      title: "Наша команда",
      desc: "Коллектив профессионалов и фанатов сникер-культуры, которые знают о кроссовках всё."
    },
    {
      icon: Heart,
      title: "Наши ценности",
      desc: "Честность, аутентичность и безупречный сервис — фундамент нашего бизнеса."
    }
  ];

  return (
    <section id="about" className="py-24 bg-card/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display mb-8">ИСТОРИЯ SNKR VAULT</h2>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                SNKR VAULT зародился в 2018 году как небольшое сообщество коллекционеров. 
                Сегодня мы — один из ведущих маркетплейсов эксклюзивной обуви в стране.
              </p>
              <p>
                Мы понимаем, что кроссовки — это не просто обувь, это способ самовыражения. 
                Поэтому мы тщательно отбираем каждую модель, представленную в нашем каталоге.
              </p>
              <p>
                Наша главная гордость — доверие более 10 000 постоянных клиентов, 
                которые выбирают нас за гарантию подлинности и премиальный уровень обслуживания.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
              {values.map((v, idx) => (
                <div key={idx}>
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-bold text-sm mb-2 uppercase tracking-widest">{v.title}</h4>
                  <p className="text-xs text-white/40">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10">
              <LazyImage 
                src={images.about} 
                alt="Магазин SNKR VAULT"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl hidden md:block">
              <p className="text-5xl font-display text-accent mb-1">7 ЛЕТ</p>
              <p className="text-xs uppercase font-bold tracking-widest">на рынке</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
