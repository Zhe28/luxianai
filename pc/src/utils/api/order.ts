import { http } from '@/utils/request'

// 获取套餐包
export function getPackages() {
    return http.get<IPackageResponse>('/api/xlx-sso/account/getpackage')
}

// 支付套餐pc端口微信二维码支付
export function wxPayment(data: number) {
    return http.get<PaymentResponse>(`/api/xlx-sso/wxpay/native?tokensPriceId=${data}`)
}
// 支付套餐pc端口支付宝二维码支付
export function paypalPayment(data: number) {
    return http.get<PaymentResponse>(`/api/xlx-sso/alipay/scanPay?tokensPriceId=${data}`)
} 

export function getTokenOrder(orderNo: string){
    return http.get<IOrderResponse>(`/api/xlx-sso/tokensOrder/get?orderNo=${orderNo}`)
}