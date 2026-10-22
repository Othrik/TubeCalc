const sharp = require('sharp');
const out = 'public/icons/';
(async () => {
  await sharp('public/icons/icon.svg', { density: 300 }).resize(512, 512).png().toFile(out + 'icon-512.png');
  await sharp('public/icons/icon.svg', { density: 150 }).resize(192, 192).png().toFile(out + 'icon-192.png');
  await sharp('public/icons/icon.svg', { density: 40 }).resize(32, 32).png().toFile(out + 'favicon-32.png');
  await sharp('public/icons/maskable.svg', { density: 300 }).resize(512, 512).png().toFile(out + 'maskable-512.png');
  await sharp('public/icons/icon.svg', { density: 120 }).resize(180, 180).png().toFile(out + 'apple-touch-icon.png');
  console.log('icons done');
})();
