// 单个套餐包的接口定义
declare interface PackageItem {
    id: number;             // 套餐包ID
    tokensTitle: string;     // 充值标题
    detail: string | null;   // 详情
    price: number;          // 充值金额
    amount: number;         // 充值量
    stock: number;          // 库存
    status: 1 | 2 | 3;      // 状态: 1-在售 2-下架 3-删除
    applyProductId?: string; // 苹果支付产品ID，可选
    createTime: string;     // 创建时间
    updateTime: string;     // 更新时间
}

declare interface IResponse<T> {
    host: string | null;
    code: number;
    errorMessage: string;
    data: T;
}

// 图片验证码
declare interface IImageCode {
    bigWidth: number;
    bigHeight: number;
    bigImageBase64: string;
    bigImage: null;
    posY: number;
    posX: number;
    smallWidth: number;
    smallHeight: number;
    smallImageBase64: string;
    smallImage: null;
}

// 验证码登录
declare interface ILoginVerification{
    token: string; 
    isNew: boolean
}
// 验证图像
declare type IVerifyImageCode = boolean

// 手机验证码
declare type IPhoneCode = null

// 订单详情接口
declare interface IOrderStatus {
    "orderNo": string;
    "userId": number;
    "payment": number;
    "paymentType": number;
    "tokensPriceId": number;
    "status": number; //  订单状态:0-已取消-10-未付款，20-已付款 30-交易关闭
    "paymentTime": string;
    "endTime": string;
    "closeTime": string | null;
    "createTime": string;
    "updateTime": string;
    "wxCodeUrl": string;
}

// API 响应的接口定义
declare interface IPackageResponse {
    host: string | null;
    code: number;
    errorMessage: string;
    data: PackageItem[];
}

declare interface PaymentResponse {
    host: null;
    code: number;
    errorMessage: string;
    data: {
        codeUrl: string;
        orderNo: string;
    };
}


declare enum OrderStatus {
    Cancelled = 0,
    Unpaid = 10,
    Paid = 20,
    Closed = 30
}