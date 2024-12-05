import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src', 'renderer', 'src'),
        "@shared": resolve(__dirname, "..", "shared"),
        "@shared-components": resolve(__dirname, "..", "shared", "components")
      }
    },
    plugins: [vue()]
  }
})
