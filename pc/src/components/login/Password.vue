<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
    username: '',
    password: '',
})

function loginHandler() {}
</script>

<template>
    <el-form :model="form">
        <el-form-item>
            <el-input v-model="form.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped></style>