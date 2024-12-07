import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    let token = ref<string>('');
    let userInfo = ref<IUserInfo>();

    function isLogin(_token: string) {
        if (_token) token.value = _token
    }

    function setUserInfo(_userInfo: IUserInfo) {
        if (token.value) {
            userInfo.value = _userInfo
        }
    }

    function logout() {
        token.value = ''
        userInfo.value = undefined
    }
    return {
        token,
        userInfo,
        isLogin,
        setUserInfo,
        logout
    }
}, {
    persist: true
})