<script setup lang="ts">
import { ref } from 'vue';
import TokenCard from './order/TokenCard.vue';
import { getPackages, wxPayment, paypalPayment } from '@/utils/api/order';
import { toDataURL } from 'qrcode';

const packages = ref<PackageItem[]>([]);
const showPayDialog = ref(false);
const selectedPackage = ref<PackageItem | null>(null);
const payType = ref({
    type: 'wechat',
    url: '',
    status: ''
}); // 支付方式：wechat 或 alipay
const countdown = ref(600); // 10分钟倒计时
let timer: NodeJS.Timeout | null = null;

// 获取套餐包数据
getPackages().then(res => {
    packages.value = res.data;
});

// 处理购买点击
function handlePurchase(pkg: PackageItem) {
    selectedPackage.value = pkg;
    // console.log(selectedPackage.value);
    wxPayment(selectedPackage.value.id).then((res: PaymentResponse) => {
        if (res.data.codeUrl) {
            payType.value.url = res.data.codeUrl;
            generateQRCode(res.data.codeUrl);
        }
    });
    showPayDialog.value = true;
    startCountdown();
}

// 开始倒计时
function startCountdown() {
    countdown.value = 600;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            if (timer) clearInterval(timer);
        }
    }, 1000);
}

// 格式化倒计时
function formatCountdown() {
    const minutes = Math.floor(countdown.value / 60);
    const seconds = countdown.value % 60;
    return `${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`;
}

// 关闭弹窗
function closeDialog() {
    showPayDialog.value = false;
    if (timer) clearInterval(timer);
}

// 选择支付方式
function selectPayType(type: 'wechat' | 'alipay') {
    payType.value.type = type;
    if (!selectedPackage.value?.id) return;

    switch (type) {
        case 'wechat':
            wxPayment(selectedPackage.value.id).then((res: PaymentResponse) => {
                if (res.data.codeUrl) {
                    payType.value.url = res.data.codeUrl;
                    generateQRCode(res.data.codeUrl);
                }
            });
            break;
        case 'alipay':
            paypalPayment(selectedPackage.value.id).then((res: PaymentResponse) => {
                if (res.data.codeUrl) {
                    payType.value.url = res.data.codeUrl;
                    generateQRCode(res.data.codeUrl);
                }
            });
            break;
    }
}
function generateQRCode(codeUrl: string) {
    toDataURL(codeUrl, {
        width: 200,
    }, (e, url) => {
        payType.value.url = url;
    })
}


</script>

<template>
    <div class="recharge-container">
        <h2 class="section-title">额度介绍</h2>
        <div class="token-cards">
            <TokenCard v-for="pkg in packages" :key="pkg.id" :tokens="pkg.tokensTitle" :price="pkg.price"
                @purchase="handlePurchase(pkg)" />
        </div>

        <!-- 支付弹窗 -->
        <dialog :open="showPayDialog" class="pay-dialog">
            <div class="dialog-header">
                <h2>请选择支付方式</h2>
                <button class="close-btn" @click="closeDialog">✕</button>
            </div>

            <div class="pay-options">
                <div class="pay-option" :class="{ active: payType.type === 'wechat' }" @click="selectPayType('wechat')">
                    <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="微信支付">
                    <span>微信支付</span>
                </div>
                <div class="pay-option" :class="{ active: payType.type === 'alipay' }" @click="selectPayType('alipay')">
                    <img src="https://os.alipayobjects.com/rmsportal/JxAjrvPKriKOpjf.png" alt="支付宝支付">
                    <span>支付宝支付</span>
                </div>
            </div>

            <div class="qr-section">
                <div class="qr-code">
                    <img v-if="payType.url" :src="payType.url" alt="支付二维码">
                </div>
                <div class="price-info">
                    <span class="symbol">￥</span>
                    <span class="amount">{{ selectedPackage?.price }}</span>
                </div>
                <div class="countdown">
                    充值倒计时：{{ formatCountdown() }}
                </div>
                <div class="agreement">
                    请使用"支付宝"支付，充值即代表同意《<a href="#" class="agreement-link">鹿线AI用户协议</a>》
                </div>
            </div>
        </dialog>
    </div>
</template>

<style lang="scss" scoped>
.recharge-container {
    padding: 20px;

    .section-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }

    .token-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(335px, 1fr));
        gap: 20px;
        padding: 20px 0;
    }
}

.pay-dialog {
    border: none;
    border-radius: 12px;
    padding: 0;
    min-width: 400px;
    background: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-80%, -50%);

    &::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;

        h2 {
            margin: 0;
            font-size: 18px;
        }

        .close-btn {
            border: none;
            background: none;
            font-size: 20px;
            cursor: pointer;
            color: #999;
        }
    }

    .pay-options {
        display: flex;
        padding: 20px;
        gap: 20px;

        .pay-option {
            flex: 1;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;

            &.active {
                border-color: #1890ff;
                background: #e6f7ff;
            }

            img {
                width: 24px;
                height: 24px;
            }

            span {
                font-size: 14px;
            }
        }
    }

    .qr-section {
        padding: 20px;
        text-align: center;

        .qr-code {
            width: 200px;
            height: 200px;
            margin: 0 auto 20px;
            background: #f5f5f5;
        }

        .price-info {
            margin-bottom: 15px;

            .symbol {
                font-size: 16px;
                color: #333;
            }

            .amount {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
        }

        .countdown {
            color: #666;
            margin-bottom: 15px;
        }

        .agreement {
            font-size: 12px;
            color: #666;

            .agreement-link {
                color: #1890ff;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>