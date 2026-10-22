// 图标管线：微软 Fluent Emoji 3D 试管（MIT）+ 品牌蓝渐变底板
const sharp = require('sharp');
const out = 'public/icons/';
const tileSvg = (rx) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#3aa0ff"/><stop offset="1" stop-color="#0a6fe0"/>
</linearGradient></defs>
<rect width="512" height="512" rx="${rx}" fill="url(#bg)"/>
</svg>`;
(async () => {
  const trimmed = await sharp('icons-src/tube-3d.png').trim().toBuffer();
  const tube = async (size) => sharp(trimmed).resize(size, size).png().toBuffer();
  const rounded = await sharp(Buffer.from(tileSvg(116)), { density: 300 }).resize(512, 512).png().toBuffer();
  const fullBleed = await sharp(Buffer.from(tileSvg(0)), { density: 300 }).resize(512, 512).png().toBuffer();
  // 主图标：圆角底板 + 试管 375（与定稿对比图一致）
  await sharp(rounded).composite([{ input: await tube(375), top: 69, left: 69 }]).png().toFile(out + 'icon-512.png');
  // maskable / apple-touch：全出血 + 试管 345（安全区内）
  const fbBuf = await sharp(fullBleed).composite([{ input: await tube(345), top: 84, left: 84 }]).png().toBuffer();
  await sharp(fbBuf).toFile(out + 'maskable-512.png');
  await sharp(fbBuf).resize(180, 180).png().toFile(out + 'apple-touch-icon.png');
  await sharp(out + 'icon-512.png').resize(192, 192).png().toFile(out + 'icon-192.png');
  await sharp(out + 'icon-512.png').resize(32, 32).png().toFile(out + 'favicon-32.png');
  console.log('icons done (Fluent 3D)');
})();
