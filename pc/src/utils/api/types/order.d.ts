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
        orderNo: number;
    };
}


declare enum OrderStatus {
    Cancelled = 0,
    Unpaid = 10,
    Paid = 20,
    Closed = 30
}

// 订单详情接口
declare interface OrderDetail {
    orderNo: number;
    userId: number;
    payment: number;
    paymentType: number;
    tokensPriceId: number;
    status: OrderStatus;
    paymentTime: string;
    endTime: string;
    closeTime: string | null;
    createTime: string;
    updateTime: string;
    wxCodeUrl: string;
}

declare interface IOrderResponse {
    host: null;
    code: number;
    errorMessage: string;
    data: OrderDetail;
}