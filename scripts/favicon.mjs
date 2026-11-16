// Membuat ikon situs sesuai pedoman Google (ukuran kelipatan 48px) dari public/logo.png
// Jalankan: node scripts/favicon.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const SRC = 'public/logo.png';

// Logo dimasukkan ke kanvas persegi berlatar putih agar tetap jelas di tema terang maupun gelap
const persegi = async (size, pad = 0.04) => {
  const inner = Math.round(size * (1 - pad * 2));
  const logo = await sharp(SRC).resize(inner, inner, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
    .composite([{ input: logo, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
};

// app/icon.png -> <link rel="icon"> (192 = 4 x 48)
fs.writeFileSync('app/icon.png', await persegi(192));
// app/apple-icon.png -> ikon layar HP (180, standar Apple)
fs.writeFileSync('app/apple-icon.png', await persegi(180, 0.06));

// app/favicon.ico berisi 48, 32, 16 px (format ICO dengan PNG di dalamnya)
const sizes = [48, 32, 16];
const pngs = await Promise.all(sizes.map((s) => persegi(s, 0.02)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync('app/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));

for (const f of ['app/icon.png', 'app/apple-icon.png', 'app/favicon.ico']) console.log(f, fs.statSync(f).size, 'byte');
