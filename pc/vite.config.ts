import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Component from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
    }),
    Component({
      resolvers: [ElementPlusResolver()]
    })
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
  server: {
    proxy: {
      '/api': {
        target: 'http://39.100.86.70:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,

      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    }
  }
})
