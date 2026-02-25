/**
 * Скрипт для загрузки фото кроссовок в public/images/
 * Запуск: node scripts/download-images.js
 * После загрузки обновите src/utils/images.ts — замените URL на `${base}images/shoe${id}.jpg`
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES = {
  shoe1: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=85',
  shoe2: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&q=85',
  shoe3: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&q=85',
  shoe4: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop&q=85',
  shoe5: 'https://images.unsplash.com/photo-1595950654310-6e9b3a8f3c4e?w=600&h=600&fit=crop&q=85',
  shoe6: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&h=600&fit=crop&q=85',
  shoe7: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop&q=85',
  shoe8: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&q=85',
  shoe9: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop&q=85',
  shoe10: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&q=85',
  shoe11: 'https://images.unsplash.com/photo-1608231387042-c660e9616968?w=600&h=600&fit=crop&q=85',
  shoe12: 'https://images.unsplash.com/photo-1612902377746-fb1bee2dc88c?w=600&h=600&fit=crop&q=85',
  hero: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=90',
  about: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=1000&fit=crop&q=90',
  avatar1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80',
  avatar2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80',
  avatar3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80',
};

const dir = path.join(__dirname, '../public/images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const [name, url] of Object.entries(IMAGES)) {
    try {
      const data = await download(url);
      const ext = url.includes('unsplash') ? '.jpg' : '.png';
      fs.writeFileSync(path.join(dir, name + ext), data);
      console.log('OK:', name);
    } catch (e) {
      console.error('FAIL:', name, e.message);
    }
  }
  console.log('Готово. Файлы в public/images/');
})();
