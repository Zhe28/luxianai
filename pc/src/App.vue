<script setup lang="ts">
import AppLeft from '@shared-components/AppLeft.vue'
import { useAppStore } from '@/stores/useAppStore'
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLogin } from '@/hooks/useLogin';
import LoginDialog from '@/plugins/loginDialog/LoginDialog.vue';
const appStore = useAppStore();

// 监听地址栏变动
const route = useRoute();
watch(() => route.path, () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  // const openId = params.get('openid');
  // const isPhone = params.get('isPhone');
  // const type = params.get('type');
  // const name = params.get('name');

  if (token) {
    useLogin(token);
    // 含有token， 说明是微信登录，不再弹出登录框
    appStore.showLoginDialog = false
  }

}, { immediate: true })
</script>

<template>
  <div class="h-screen w-screen flex flex-row justify-start">
    <app-left></app-left>
    <router-view class="bg-green-500 h-screen w-full"></router-view>
  </div>

  <!-- 登录dialog -->

  <el-dialog v-model="appStore.showLoginDialog" width="35%" style="min-width: 480px;" :append-to-body="true">
     <login-dialog></login-dialog>
  </el-dialog>
</template>

<style scoped></style>