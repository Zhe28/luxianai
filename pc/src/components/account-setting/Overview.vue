<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue'

// const userAvatar = ref('/path/to/default/avatar.png')
const wechatStatus = ref('已绑定')
const wechatBound = ref(true)
const phoneNumber = ref('')

const handleWechatBind = () => {
  // 处理微信绑定逻辑
}

const handlePhoneBind = () => {
  // 处理手机绑定逻辑
}

const handlePasswordModify = () => {
  // 处理密码修改逻辑
}

const handleAccountDelete = () => {
  // 处理账号注销逻辑
}
</script>

<template>
  <div class="overview-container">
    <div class="warning-banner">
      禁止发送色情、暴力、政治等敏感信息!违者封号!
    </div>
    
    <div class="content">
      <div class="avatar-section">
        <span class="label">头像</span>
        <div class="avatar">
          <img :src="useUserStore().userInfo?.logo" alt="用户头像" />
        </div>
      </div>

      <div class="account-section">
        <h1 class="section-title">账号绑定</h1>
        <p class="section-desc">绑定手机号和微信，账号更安全且登录方便。</p>
        
        <div class="bind-item">
          <div class="bind-info">
            <i class="wechat-icon"></i>
            <span>绑定微信：</span>
            <span class="status">{{ wechatStatus }}</span>
          </div>
          <button class="bind-btn" :class="{ 'is-bound': wechatBound }" @click="handleWechatBind">
            {{ wechatBound ? '已绑定' : '绑定' }}
          </button>
        </div>

        <div class="bind-item">
          <div class="bind-info">
            <i class="phone-icon"></i>
            <span>绑定手机号：</span>
            <span class="status">{{ phoneNumber }}</span>
          </div>
          <button class="bind-btn" @click="handlePhoneBind">
            更换
          </button>
        </div>
      </div>

      <div class="password-section">
        <div class="password-header">
          <h1 class="section-title">密码设置</h1>
          <p class="section-desc">设置密码，账号更安全。为保证账号安全，设置密码需进行二次验证。</p>
        </div>
        <div class="password-item">
          <div class="password-info">
            <i class="lock-icon"></i>
            <span>密码：</span>
            <span class="status">******</span>
          </div>
          <button class="modify-btn" @click="handlePasswordModify">
            修改
          </button>
        </div>
      </div>

      <div class="account-delete">
        <div class="delete-info">
          <i class="warning-icon"></i>
          <span class="delete-title">注销账号</span>
          <span class="warning-text">您的账号一旦被注销成功将不可恢复</span>
        </div>
        <button class="delete-btn" @click="handleAccountDelete">
          注销
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview-container {
  padding: 0 20px;
}

.warning-banner {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  padding: 8px 12px;
  border-radius: 4px;
  color: #ff4d4f;
  margin-bottom: 20px;
}

.nav-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.tab {
  padding: 8px 0;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #333;
  font-weight: 500;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #333;
}

.content {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.label {
  font-size: 14px;
  color: #333;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #eee;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section-title {
  font-size: 16px;
  font-weight: normal;
  color: #333;
  margin-bottom: 8px;
}

.section-desc {
  color: #999;
  font-size: 14px;
  margin-bottom: 20px;
}

.bind-item, .password-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.bind-info, .password-info {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;
}

.status {
  color: #666;
}

.bind-btn, .modify-btn {
  padding: 4px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.bind-btn.is-bound {
  border-color: transparent;
  cursor: default;
}

.account-delete {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.delete-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.delete-title {
  color: #333;
}

.warning-text {
  color: #999;
  font-size: 14px;
}

.delete-btn {
  padding: 4px 12px;
  border: none;
  background: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 14px;
}

.delete-btn:hover {
  text-decoration: underline;
}
</style>