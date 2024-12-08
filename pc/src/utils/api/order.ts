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
export function aliPayment(data: number) {
    return http.get<PaymentResponse>(`/api/xlx-sso/alipay/scanPay?tokensPriceId=${data}`)
}

// 查询订单
export function queryOrder(orderNo: string) {
    return http.get<IResponse<IOrderStatus>>(`/api/xlx-sso/tokensOrder/get?orderNo=${orderNo}`)
}