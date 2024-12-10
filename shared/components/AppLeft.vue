<template>
  <div class="app-left w-44 h-screen flex flex-col justify-between">
    <div class="logo">
      <Logo />
      <logo-title />
    </div>
    <ul class="menu">
      <li v-for="item in menuItems" :key="item.title" class="menu-item">
        <component :is="item.icon" class="icon" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <div class="footer">
      <div class="privacy-policy">
        <component :is="securityIcon" class="icon" />
        <span>隐私政策</span>
      </div>
      <!-- 登录状态 -->
      <div class="login-btn flex flex-row justify-center items-center relative" ref="loginBtnRef"
        @click="btnLoginHandler">
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

<script setup lang="ts">
import Logo from "./icons/Logo.vue";
import LogoTitle from "./icons/LogoTitle.vue";
import { ref, onMounted, onUnmounted } from "vue";
import ChatIcon from "./icons/ChatIcon.vue";
import SmartChatIcon from "./icons/SmartChatIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import PracticeIcon from "./icons/PracticeIcon.vue";
import securityIcon from "./icons/security.vue"
import { useAppStore } from "@/stores/useAppStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";

const menuItems = [
  {
    title: "智能对话",
    icon: ChatIcon
  },
  {
    title: "模拟面试",
    icon: SmartChatIcon
  },
  {
    title: "程序员",
    icon: UserIcon
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
  showLoginList.value = false
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
  showLoginList.value = true
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

<style scoped>
.app-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 200px;
  box-sizing: border-box;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.icon {
  margin-right: 10px;
}

.footer {
  margin-top: auto;
  text-align: center;
  width: 100%;
}

.login-btn {
  background-color: red;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.login-btn img {
  margin-right: 10px;
}

.login-btn .avatar {
  margin-right: 8px;
}

.login-btn .avatar img {
  width: 24px;
  height: 24px;
  object-fit: cover;
}

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
}

.login-list::backdrop {
  background: transparent;
}

.login-list .settings,
.login-list .exit {
  padding: 8px 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-list .settings:hover,
.login-list .exit:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.login-list .settings {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>