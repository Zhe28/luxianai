import { http } from "../request"
// 获取微信登录参数
export const getWechatLoginParam = () => {
    return http.get<IGetLoginParam>('/api/xlx-sso/oauth/wechat/getLoginParam')
}

// 获取用户信息
export const getUserInfo = () => {
    return http.post<IUserInfoRes>('/api/xlx-sso/user/getInfo')
}
// 绑定微信
// export function bindWechat(phone: string) {
//     return http.post<IResponse<IWechatDate>>('/api/xlx-sso/user/getImageCode', { phone })
// }
// 获取图片验证码
export function getImageCode(phone: string) {
    return http.post<IResponse<IImageCode>>(`/api/xlx-sso/user/getImageCode`, { phone })
}

// 验证图片验证码
export function verifyImageCode(phone: string, movePosX: number) {
    return http.post<IResponse<IVerifyImageCode>>(`/api/xlx-sso/user/verifyImageCode`, { phone, movePosX })
}

// 短信验证码
export function loginVerification(phone: string, verificationCode: string, password?: string) {
    return http.post<IResponse<ILoginVerification>>(`/api/xlx-sso/user/loginVerification`, { phone, verificationCode, password })
}

// 密码登录
export function login(mobile: string , password: string){
    return http.post<IResponse<ILogin>>('/api/xlx-sso/user/login', { password, mobile })
}