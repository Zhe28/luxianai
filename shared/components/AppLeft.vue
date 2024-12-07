<script setup lang="ts">

import { ref, onMounted, onUnmounted } from "vue";
import profileIcon from "./icons/profile.vue"
import securityIcon from "./icons/security.vue"
import { useAppStore } from "@/stores/useAppStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";

const menuItems = [
    {
        title: "智能对话",
        icon: profileIcon
    }, {
        title: "",
        icon: securityIcon
    }, {
        title: "",
        icon: securityIcon
    }
]


function btnLoginHandler() {
    if (token) {
        return showLoginList.value = true
    }
    const showLoginDialog = useAppStore().showLoginDialog;
    useAppStore().showLoginDialog = !showLoginDialog;
}
/** 账号设置 */
function accountSettingsHandler() {
    router.push({
        path: '/account-settings',
        query: {
            // token: token
        }
    });
}

/**
 * 退出登录
 * @returns {void}
 */
function logoutHandler() {
    userStore.logout();
    router.push('/');
}

const router = useRouter();
const showLoginList = ref(false);
const userStore = useUserStore();
const token = userStore.token;
const loginBtnRef = ref<HTMLElement | null>(null);

// 点击其他地方关闭下拉菜单
function handleClickOutside(event: MouseEvent) {
    if (loginBtnRef.value && !loginBtnRef.value.contains(event.target as Node)) {
        showLoginList.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="app-left w-44 h-screen flex flex-col justify-between">
        <div></div>
        <!-- <div>隐私政策</div> -->
        <div class="flex flex-col justify-center align-center items-center relative bottom-8">
            <div>隐私政策</div>

            <!-- 登录状态 -->
            <div class="login-btn flex flex-row justify-center items-center relative" ref="loginBtnRef"
                @click.stop="btnLoginHandler">
                <!-- 未登录 -->
                <div v-if="!token">
                    <span class="icon"></span>
                    <span>登录</span>
                </div>
                <!-- 已登陆 -->
                <div v-else class="flex flex-row flex-nowrap">
                    <span class="avatar"><img class="rounded-lg w-6" :src="userStore.userInfo?.logo" alt="" />
                    </span>
                    <span>{{ userStore.userInfo?.nickName }}</span>
                    <dialog class="login-list" :open="showLoginList">
                        <div class="settings" @click="accountSettingsHandler">账号设置</div>
                        <div class="exit" @click="logoutHandler">退出</div>
                    </dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@/assets/style.scss" as *;

.app-left {
    background-color: white;
    width: 117px;
    border-radius: 0;
}

.login-btn {
    width: 106px;
    height: 37px;
    background-color: red;
    border-radius: 19px;
    cursor: pointer;

    .login-list {
        position: absolute;
        z-index: 100;
        top: -150%;
        left: 100%;
        width: 151px;
        padding: 10px 0;
        border: none;
        background: #c90000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        border-radius: 9px;
        color: #fff;

        &::backdrop {
            background: transparent;
        }

        .settings, 
        .exit {
            padding: 8px 20px;
            text-align: center;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }

        .settings {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }

    .avatar {
        margin-right: 8px;
        
        img {
            width: 24px;
            height: 24px;
            object-fit: cover;
        }
    }
}

.icon {
    margin-right: 4px;
}
</style>