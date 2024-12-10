<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin';
import { useAppStore } from '@/stores/useAppStore';
import { login } from '@/utils/api/login';
import { reactive } from 'vue';

const form = reactive({
    username: '',
    password: '',
})

async function loginHandler() {
    const res = await login(form.username, form.password);

    // 请求成功，进行持久化，写入token
    if(res.code === 0){
        useLogin(res.data.token);
        useAppStore().showLoginDialog = false
    }else{
        // 异常代码进行提示
        alert(res.errorMessage);
    }
}
</script>

<template>
    <el-form :model="form">
        <el-form-item>
            <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped></style>