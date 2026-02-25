import { Product } from './types';
import { images } from './utils/images';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Air Max 270",
    brand: "nike",
    category: "lifestyle",
    price: 12990,
    oldPrice: 16990,
    discount: 23,
    rating: 4.8,
    reviews: 234,
    sizes: [38,39,40,41,42,43,44,45],
    colors: ["#000000","#FFFFFF","#FF3D00"],
    image: images.shoe(1),
    description: "Максимальный комфорт для повседневной носки. Инновационная вставка Air обеспечивает мягкую амортизацию при каждом шаге.",
    quizTags: {
      purpose: ["lifestyle","walking"],
      budget: ["10000-20000"],
      style: ["bold"],
      brand: ["nike","no-preference"]
    }
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "adidas",
    category: "running",
    price: 17490,
    oldPrice: 21990,
    discount: 20,
    rating: 4.9,
    reviews: 412,
    sizes: [39,40,41,42,43,44],
    colors: ["#FFFFFF","#000000"],
    image: images.shoe(2),
    description: "Энергия, которая возвращается. Кроссовки для бега с технологией Boost для максимальной отдачи.",
    quizTags: {
      purpose: ["running"],
      budget: ["10000-20000","20000+"],
      style: ["minimalist","futuristic"],
      brand: ["adidas","no-preference"]
    }
  },
  {
    id: 3,
    name: "Air Jordan 1 Retro",
    brand: "jordan",
    category: "basketball",
    price: 22990,
    oldPrice: 27990,
    discount: 18,
    rating: 4.9,
    reviews: 876,
    sizes: [40,41,42,43,44,45],
    colors: ["#FF3D00","#000000","#FFFFFF"],
    image: images.shoe(3),
    description: "Легенда баскетбольных площадок. Классический силуэт, который никогда не выйдет из моды.",
    quizTags: {
      purpose: ["basketball","lifestyle"],
      budget: ["20000+"],
      style: ["bold","classic"],
      brand: ["nike","no-preference"]
    }
  },
  {
    id: 4,
    name: "New Balance 574",
    brand: "newbalance",
    category: "lifestyle",
    price: 8990,
    oldPrice: 11990,
    discount: 25,
    rating: 4.7,
    reviews: 198,
    sizes: [37,38,39,40,41,42,43],
    colors: ["#808080","#FFFFFF"],
    image: images.shoe(4),
    description: "Винтажный стиль 80-х. Идеальный выбор для тех, кто ценит классику и комфорт.",
    quizTags: {
      purpose: ["lifestyle","walking"],
      budget: ["5000-10000"],
      style: ["classic","minimalist"],
      brand: ["newbalance","no-preference"]
    }
  },
  {
    id: 5,
    name: "RS-X Reinvention",
    brand: "puma",
    category: "lifestyle",
    price: 7490,
    oldPrice: 9990,
    discount: 25,
    rating: 4.5,
    reviews: 143,
    sizes: [38,39,40,41,42,43],
    colors: ["#FF3D00","#000000"],
    image: images.shoe(5),
    description: "Футуристичный дизайн и передовые технологии амортизации для интенсивных тренировок.",
    quizTags: {
      purpose: ["lifestyle"],
      budget: ["5000-10000"],
      style: ["futuristic","bold"],
      brand: ["puma","no-preference"]
    }
  },
  {
    id: 6,
    name: "React Infinity Run",
    brand: "nike",
    category: "running",
    price: 14990,
    oldPrice: 18490,
    discount: 19,
    rating: 4.8,
    reviews: 321,
    sizes: [39,40,41,42,43,44,45],
    colors: ["#000000","#FFFFFF"],
    image: images.shoe(6),
    description: "Максимальная поддержка и амортизация для ежедневных пробежек.",
    quizTags: {
      purpose: ["running","training"],
      budget: ["10000-20000"],
      style: ["minimalist","futuristic"],
      brand: ["nike","no-preference"]
    }
  },
  {
    id: 7,
    name: "Forum Low",
    brand: "adidas",
    category: "lifestyle",
    price: 9490,
    oldPrice: 12490,
    discount: 24,
    rating: 4.6,
    reviews: 167,
    sizes: [37,38,39,40,41,42,43,44],
    colors: ["#FFFFFF","#000000"],
    image: images.shoe(7),
    description: "Баскетбольная классика 80-х с характерным ремешком для фиксации стопы.",
    quizTags: {
      purpose: ["lifestyle","walking"],
      budget: ["5000-10000"],
      style: ["classic"],
      brand: ["adidas","no-preference"]
    }
  },
  {
    id: 8,
    name: "Fresh Foam 1080",
    brand: "newbalance",
    category: "running",
    price: 16990,
    oldPrice: 20990,
    discount: 19,
    rating: 4.9,
    reviews: 289,
    sizes: [40,41,42,43,44,45],
    colors: ["#000000","#808080"],
    image: images.shoe(8),
    description: "Премиальные кроссовки для бега с исключительной амортизацией.",
    quizTags: {
      purpose: ["running"],
      budget: ["10000-20000","20000+"],
      style: ["minimalist"],
      brand: ["newbalance","no-preference"]
    }
  },
  {
    id: 9,
    name: "LeBron XX",
    brand: "nike",
    category: "basketball",
    price: 24990,
    oldPrice: 29990,
    discount: 17,
    rating: 4.8,
    reviews: 201,
    sizes: [41,42,43,44,45],
    colors: ["#FF3D00","#000000"],
    image: images.shoe(9),
    description: "Самые легкие кроссовки в линейке Леброна, созданные для скорости и мощи.",
    quizTags: {
      purpose: ["basketball"],
      budget: ["20000+"],
      style: ["bold","futuristic"],
      brand: ["nike","no-preference"]
    }
  },
  {
    id: 10,
    name: "Nitro Elite",
    brand: "puma",
    category: "training",
    price: 6990,
    oldPrice: 8990,
    discount: 22,
    rating: 4.6,
    reviews: 119,
    sizes: [38,39,40,41,42,43],
    colors: ["#FFFFFF","#FF3D00"],
    image: images.shoe(10),
    description: "Легкость и отзывчивость для ваших лучших тренировок.",
    quizTags: {
      purpose: ["training","running"],
      budget: ["5000-10000"],
      style: ["bold","minimalist"],
      brand: ["puma","no-preference"]
    }
  },
  {
    id: 11,
    name: "Stan Smith",
    brand: "adidas",
    category: "lifestyle",
    price: 4990,
    oldPrice: 6990,
    discount: 29,
    rating: 4.7,
    reviews: 542,
    sizes: [36,37,38,39,40,41,42,43,44],
    colors: ["#FFFFFF"],
    image: images.shoe(11),
    description: "Легендарный теннисный силуэт, ставший иконой уличного стиля.",
    quizTags: {
      purpose: ["lifestyle","walking"],
      budget: ["до5000","5000-10000"],
      style: ["minimalist","classic"],
      brand: ["adidas","no-preference"]
    }
  },
  {
    id: 12,
    name: "990v5",
    brand: "newbalance",
    category: "lifestyle",
    price: 19990,
    oldPrice: 24990,
    discount: 20,
    rating: 4.9,
    reviews: 378,
    sizes: [39,40,41,42,43,44,45],
    colors: ["#808080","#FFFFFF","#000000"],
    image: images.shoe(12),
    description: "Золотой стандарт комфорта и качества ручной работы.",
    quizTags: {
      purpose: ["lifestyle","walking","running"],
      budget: ["10000-20000","20000+"],
      style: ["classic","minimalist"],
      brand: ["newbalance","no-preference"]
    }
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Александр",
    city: "Москва",
    rating: 5,
    text: "Лучший магазин кроссовок! Заказал Jordan 1, привезли на следующий день. Оригинал 100%, проверил по всем чекам.",
    product: "Jordan 1 Retro High",
    avatar: images.avatar(1)
  },
  {
    id: 2,
    name: "Мария",
    city: "Санкт-Петербург",
    rating: 5,
    text: "Очень удобный квиз, помог выбрать кроссовки для бега. Ultraboost просто космос, ноги не устают совсем.",
    product: "Ultraboost 22",
    avatar: images.avatar(2)
  },
  {
    id: 3,
    name: "Дмитрий",
    city: "Екатеринбург",
    rating: 4,
    text: "Хороший выбор и цены. Единственное, коробка была немного помята при доставке, но сами кроссовки в идеале.",
    product: "New Balance 550",
    avatar: images.avatar(3)
  }
];
