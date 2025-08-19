/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
     VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mi PWA Ionic",
        short_name: "MiPWA",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3880ff",
        icons: [
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          // Agrega más tamaños (192x192, 512x512, etc.)
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.tudominio\.com\/.*/,
            handler: "NetworkFirst",
          },
        ],
      },
    }),
    legacy()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
