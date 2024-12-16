import "./assets/tailwind.css"
import "./assets/main.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter } from './router'
import { loginDialogPlugin } from "./plugins/loginDialog"
import {createPersistedState} from "pinia-plugin-persistedstate"
import useElementPlus from "element-plus"
const app = createApp(App)

app.use(createPinia().use(createPersistedState()))
app.use(createRouter())
// 导入登录dialog插件
app.use(loginDialogPlugin());
app.use(useElementPlus)
app.mount('#app')
