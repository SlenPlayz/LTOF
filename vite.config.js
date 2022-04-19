import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'LiteType',
        short_name: 'LT',
        description: 'Simple offline fast notetaking app',
        theme_color: '#323232',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '260x260',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '260x260',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '260x260',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
