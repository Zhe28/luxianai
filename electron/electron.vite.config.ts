import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      target: 'node22'
    }
  },
  preload: {
    plugins: [
      externalizeDepsPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router']
      }),
      Component({
        resolvers: [ElementPlusResolver()]
      })
    ],
    build: {
      target: 'node22'
    }
  },
  renderer: {
    base: './',
    build: {
      target: ['chrome131']
    },
    resolve: {
      alias: {
        '@': resolve('..', 'pc', 'src'),
        '@renderer': resolve('src', 'renderer', 'src'),
        '@shared': resolve('..', 'shared'),
        '@shared-components': resolve('..', 'shared', 'components'),
        '@shared-utils': resolve('..', 'shared', 'utils')
      }
    },
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: 'http://39.100.86.70:8088',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' }
      }
    }
  }
})
