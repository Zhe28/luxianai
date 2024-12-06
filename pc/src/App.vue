<script setup lang="ts">
import AppLeft from '@shared-components/AppLeft.vue'
import { useAppStore } from './stores/useAppStore'
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLogin } from './hooks/useLogin';

const appStore = useAppStore();

// 监听地址栏变动
const route = useRoute();
watch(() => route.path, () => {
  // const token = route.query.token;
  // console.log(token);
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const openId = params.get('openid');
  const isPhone = params.get('isPhone');
  const type = params.get('type');
  const name = params.get('name');

  if (token) {
    useLogin(token);
    // 含有token， 说明是微信登录，不再弹出登录框
    appStore.showLoginDialog = false

  }

}, { immediate: true })
</script>

<template>
  <div class="h-screen w-screen flex align-center justify-center">
    <app-left></app-left>
    <router-view></router-view>
  </div>

  <!-- 登录dialog -->
  <Teleport to="body" v-if="appStore.showLoginDialog">
    <LoginDialog></LoginDialog>
  </Teleport>
</template>

<style scoped></style>