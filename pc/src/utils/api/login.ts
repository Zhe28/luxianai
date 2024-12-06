import { http } from "../request"
// 获取微信登录参数
export const getWechatLoginParam = () => {
    return http.get<IGetLoginParam>('/api/xlx-sso/oauth/wechat/getLoginParam')
}

// 获取用户信息
export const getUserInfo = () => {
    return http.post<IUserInfoRes>('/api/xlx-sso/user/getInfo')
}