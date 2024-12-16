import { type Plugin } from "vue"
import LoginDialog from "./LoginDialog.vue";

export const loginDialogPlugin = (): Plugin => {
    // let dialogInstance: App<Element> | null = null;
    // // dialog 元素组件
    // let dialogElement: HTMLElement | null = null;

    return {
        install(app) {
            // 注册全局组件
            app.component('LoginDialog', LoginDialog);
        }
    }
}