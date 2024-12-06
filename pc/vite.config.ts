import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      "@shared": resolve(__dirname, "..", "shared"),
      "@shared-components": resolve(__dirname, "..", "shared", "components"),
      "@hooks": resolve(__dirname, "src", "hooks"),
      "@utils": resolve(__dirname, "src", "utils"),
      "@store": resolve(__dirname, "src", "store"),
    },
  },
  server:{ 
    proxy: {
      '/api': {
        target: 'http://39.100.86.70:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,

      }
    }
  }
})
