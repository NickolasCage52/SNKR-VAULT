/** Base URL для картинок (поддержка GitHub Pages /SNKR-VAULT/) */
const base = import.meta.env.BASE_URL;

const WM = 'https://upload.wikimedia.org/wikipedia/commons';

/** Фото кроссовок с Wikipedia Commons (отображаются при build и dev) */
const SNEAKER_PHOTOS: Record<number, string> = {
  1: `${WM}/thumb/c/c0/Nike_Zoom_Pegasus_38_running_shoe.jpg/600px-Nike_Zoom_Pegasus_38_running_shoe.jpg`, // Air Max 270
  2: `${WM}/thumb/d/d6/Adidas_Ultra_Boost_2015_model_.jpg/600px-Adidas_Ultra_Boost_2015_model_.jpg`, // Ultraboost 22
  3: `${WM}/thumb/f/f8/1985_Air_Jordan_1s.jpg/600px-1985_Air_Jordan_1s.jpg`, // Air Jordan 1 Retro
  4: `${WM}/thumb/f/fc/New_Balance_custom_574.jpg/600px-New_Balance_custom_574.jpg`, // New Balance 574
  5: `${WM}/thumb/3/3d/A_pair_of_Lee_Cooper_sneakers.jpg/600px-A_pair_of_Lee_Cooper_sneakers.jpg`, // RS-X Reinvention
  6: `${WM}/thumb/1/13/Nike_running_sneakers_2013-10-06_08-34.jpg/600px-Nike_running_sneakers_2013-10-06_08-34.jpg`, // React Infinity Run
  7: `${WM}/thumb/4/43/Adidas_Forum.jpg/600px-Adidas_Forum.jpg`, // Forum Low
  8: `${WM}/thumb/8/8f/2023_Adidas_Yeezy_Boost_350_V2_Sesame.jpg/600px-2023_Adidas_Yeezy_Boost_350_V2_Sesame.jpg`, // Fresh Foam 1080
  9: `${WM}/thumb/4/4b/Adidas_Forum_High_%26_Low.jpg/600px-Adidas_Forum_High_%26_Low.jpg`, // LeBron XX
  10: `${WM}/thumb/7/7c/-01_sneakers.jpg/600px--01_sneakers.jpg`, // Nitro Elite
  11: `${WM}/thumb/d/d3/Adidas_Stan_Smith_wht-blk.jpg/600px-Adidas_Stan_Smith_wht-blk.jpg`, // Stan Smith
  12: `${WM}/thumb/1/15/Adidas_Gazelle_Indoor.jpg/600px-Adidas_Gazelle_Indoor.jpg`, // 990v5
};

export const images = {
  shoe: (id: number) => SNEAKER_PHOTOS[id] ?? `${base}images/shoe${id}.svg`,
  hero: `${WM}/thumb/f/f8/1985_Air_Jordan_1s.jpg/800px-1985_Air_Jordan_1s.jpg`,
  about: `${WM}/thumb/d/d6/Adidas_Ultra_Boost_2015_model_.jpg/800px-Adidas_Ultra_Boost_2015_model_.jpg`,
  avatar: (id: number) => `${base}images/avatar${id}.svg`,
  visa: `${base}images/visa.svg`,
  mastercard: `${base}images/mastercard.svg`,
  mir: `${base}images/mir.svg`,
};
