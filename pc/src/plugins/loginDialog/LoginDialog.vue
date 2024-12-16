<script setup lang="ts">
import Password from "@/components/login/Password.vue";
import Phone from '@/components/login/Phone.vue';
import Wechat from '@/components/login/Wechat.vue';
import { markRaw, ref, type Component } from 'vue';

type tTableItem = {
    label: string
    comp: Component
}

type tTables = tTableItem[]

const menu: tTables = [
    {
        label: "扫码登录",
        comp: markRaw(Wechat)
    },
    {
        label: "验证码登录",
        comp: markRaw(Phone)
    },
    {
        label: "密码登录",
        comp: markRaw(Password)
    }
]
const comp = ref(menu[0].comp);


function changeLoginMode(item: tTableItem, index: number) {
    index;
    comp.value = item.comp;
}

</script>

<template>
<!--     <div class="modal-backdrop fixed top-0 z-100 left-0 bottom-0 right-0 bg-black opacity-75">

    </div> -->
    <div class="login bg-white z-200 height-auto box-border">
        <!-- <div class="exit" @click="useAppStore().showLoginDialog = false">关闭</div> -->
        <ul class="loginTypes">
            <li v-for="(item, index) in menu" :key="item.label" @click="changeLoginMode(item, index)"
                :class="{ active: comp === item.comp }">
                {{ item.label }}
            </li>
        </ul>
        <keep-alive>
            <component :is="comp" />
        </keep-alive>
    </div>
</template>

<style lang="scss" scoped>
.login {
    width: 457px;
    line-height: 115px;
    padding: 25px 39px 30px 40px;

    .exit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: right;
        margin-left: 11px;
        cursor: pointer;
    }

    .loginTypes {
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 9px;
        background: #faf0f0cc;
        margin-top: 25px;

        li {
            flex: 1;
            height: 49px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 9px;
            font-weight: 400;
            font-size: 16px;
            color: #232323;

            &.active {
                background-color: #c90000;
                height: 49px;
                color: #fff
            }
        }

    }
}
</style>