<script setup lang="ts">

import { getCurrentInstance, inject } from "vue";
import profileIcon from "./icons/profile.vue"
import securityIcon from "./icons/security.vue"
import { useAppStore } from "@/stores/useAppStore";

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
    const showLoginDialog = useAppStore().showLoginDialog;
    useAppStore().showLoginDialog = !showLoginDialog;
}
</script>

<template>
    <div class="app-left w-44 h-screen flex flex-col justify-around">
        <div>隐私政策</div>
        <div class="flex flex-col justify-center align-center items-center">
            <div>隐私政策</div>
            <div class="login-btn flex flex-row justify-center items-center " @click="btnLoginHandler">
                <span class="icon"></span>
                <span>登录</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.app-left {
    background-color: white;
    width: 117px;
    border-radius: 0;

    @include response-to(1024px) {
        background-color: red;
    }
}

.login-btn {
    width: 106px;
    height: 37px;
    background-color: red;
    border-radius: 19px
}
</style>