<script setup lang="ts">
import { markRaw, ref, type Component } from 'vue';
import Account from '@/components/account-setting/Profile.vue';
import Recharge from '@/components/account-setting/Recharge.vue';
import Overview from '@/components/account-setting/Overview.vue';


const activeTab = ref('overview');  // 当前激活的标签

const navTabs = ref([
    {
        key: 'overview',    // 用于标识和切换的key
        label: '总览',      // 显示的文本
        icon: 'home',       // 图标名称
        component: markRaw(Overview)
    },
    {
        key: 'profile',
        label: '账户',
        icon: 'user',
        component: markRaw(Account)
    },
    {
        key: 'recharge',
        label: '充值',
        icon: 'wallet',
        component: markRaw(Recharge)
    }
]);

// 切换标签的方法
function handleTabChange(tabKey: string) {
    activeTab.value = tabKey;
}


</script>

<template>
    <div>
        <h1 class="account-settings">
            账号设置
        </h1>
        <div class="rounded-lg border-2 border-red-500 p-1 text-red-500">禁止发送色情、暴力、政治等敏感信息！违者封号！</div>
        <!-- 导航标签 -->
        <el-tabs v-model="activeTab" @table-click="handleTabChange">
            <el-tab-pane v-for="tab in navTabs" :key="tab.key" :label="tab.label" :name="tab.key">
                <!-- 内容区域 -->
                <keep-alive class="tab-content">
                    <component :is="tab.component" />
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
        <!-- <div class="nav-tabs">
            <span v-for="tab in navTabs" :key="tab.key" :class="['nav-tab', { active: activeTab === tab.key }]"
                @click="activeTab = tab.key">
                <button class="bg-sky-500 p-2 rounded mr-5 text-white">{{ tab.label }}</button>
            </span>
        </div> -->



    </div>
</template>

<style scoped>
.account-settings {
    padding: 10px;
    border-left: 5px solid red;
}
</style>