import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {(phase: string) => import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    // Menghasilkan website statis (HTML lengkap) di folder /out
    // -> ramah SEO dan bisa di-upload ke hosting biasa (cPanel/Apache).
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    // `npm run dev` memakai folder kerja sendiri (.next-dev), sehingga
    // `npm run build` bisa dijalankan saat dev masih menyala tanpa saling merusak.
    ...(phase === PHASE_DEVELOPMENT_SERVER ? { distDir: '.next-dev' } : {}),
    // Izinkan membuka mode dev dari HP di jaringan Wi-Fi yang sama (mis. http://172.20.10.8:3000)
    allowedDevOrigins: ['172.20.10.8', '192.168.*.*', '10.*.*.*', '172.*.*.*'],
  };
}
