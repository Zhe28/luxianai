import { useUserStore } from "@/stores/useUserStore";
import { getUserInfo } from "@/utils/api/login";

export async function useLogin(token: string){
    // token 存在的话， 进行持久化存储
    if(token){
        useUserStore().isLogin(token)
        // 获取用户信息
        let res = await getUserInfo();
        console.log(`user info: `,res);
        useUserStore().setUserInfo(res.data)
    }

}