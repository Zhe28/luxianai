import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const showLoginDialog = ref(true)
  const isElectron = ref(import.meta.env.RENDERER_VITE_TARGET === 'electron')
  return {
    showLoginDialog,
    isElectron
  }
}, { persist: true })
