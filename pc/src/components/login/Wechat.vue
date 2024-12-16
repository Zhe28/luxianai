<script setup lang="ts">
import { onMounted } from "vue";
import { getWechatLoginParam } from '@/utils/api/login'

let wxELement: HTMLScriptElement | null = null
onMounted(async () => {

    // 加载微信登录js
    if (!wxELement) {
        wxELement = document.createElement('script');
        wxELement.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
        document.body.appendChild(wxELement);
    }

    wxELement.onload = async () => {
        let { data } = await getWechatLoginParam();
        console.log(`get wechat login param: `, data);
        const { redirectUri: redirect_uri, appid, scope, state } = data;

        let res = new WxLogin({
            // self_redirect: false,
            id: "login_container",
            appid,
            scope,
            redirect_uri,
            state,
            style: "",
            href: ""
        })

        console.log(`this is wxlogin log: `, res);
    }
})
</script>

<template>
    <div id="login_container" class="flex justify-center">

    </div>
</template>

<style lang="scss" scoped></style>