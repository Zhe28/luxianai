import { defineStore } from "pinia"
import { ref } from "vue"

export const useAppStore = defineStore('app', () => {

    const showLoginDialog = ref(true)
    return {
        showLoginDialog
    }
},{persist: true})
