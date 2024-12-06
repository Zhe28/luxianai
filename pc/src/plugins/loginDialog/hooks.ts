import { createApp, onMounted, ref, type App } from "vue";
import LoginDialog from "./LoginDialog.vue";

let dialogInstance: App<Element> | null = null;
let dialogElement: HTMLElement | null = null;

export function useLoginDialogHook() {
    const showLoginDialog = ref(false);

    if (!dialogElement) {
        dialogElement = document.createElement('div');
        document.body.appendChild(dialogElement);
        dialogInstance = createApp(LoginDialog)
        dialogInstance.mount(dialogElement);
    }

    onMounted(() => {
        if (dialogElement && dialogInstance) {
            // 销毁组件，移除html节点
            dialogInstance.unmount();
            document.body.removeChild(dialogElement);
            dialogElement = null;
            dialogInstance = null;
        }
    })
    return {
        showLoginDialog
    }
}