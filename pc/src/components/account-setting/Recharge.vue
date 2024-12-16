<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import TokenCard from './order/TokenCard.vue'
import { getPackages, wxPayment, aliPayment, queryOrder } from '@/utils/api/order'
import { toDataURL } from 'qrcode'
import { ElNotification } from 'element-plus'

// 套餐包数据
const packages = ref<PackageItem[]>([])
// 支付弹窗显示状态
const showPayDialog = ref(false)
// 当前选择的套餐包
// const selectedPackage = ref<PackageItem | null>(null)
// 支付方式：wechat 或 alipay
const payType = ref<'wechat' | 'alipay'>('wechat')
// 加载状态
const loading = ref({
  qrcode: false
})

// 倒计时类：管理支付倒计时逻辑
class CountdownTimer {
  private timer: NodeJS.Timeout | null = null // 倒计时定时器
  private time: Ref<number> // 倒计时时间（秒）
  private initialTime: number

  /**
   * 初始化倒计时器
   * @param initialTime 初始时间，默认600秒（10分钟）
   */
  constructor(initialTime: number = 600) {
    this.initialTime = initialTime
    this.time = ref(initialTime)
  }

  /**
   * 开始倒计时
   * 重置时间为初始时间并开始计时
   * 如果已有定时器则先停止
   */
  start() {
    this.time.value = this.initialTime
    if (this.timer) this.stop()

    this.timer = setInterval(() => {
      if (this.time.value > 0) {
        this.time.value--
      } else {
        this.stop()
      }
    }, 1000)
  }

  /**
   * 停止倒计时
   * 清除定时器并重置状态
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  /**
   * 格式化倒计时时间
   * @returns 格式化后的时间字符串，例如："09分 59秒"
   */
  format(): string {
    const minutes = Math.floor(this.time.value / 60)
    const seconds = this.time.value % 60
    return `${String(minutes).padStart(2, '0')}分 ${String(seconds).padStart(2, '0')}秒`
  }

  /**
   * 获取当前剩余时间（秒）
   */
  get currentTime(): number {
    return this.time.value
  }

  /**
   * 检查是否超时，如果超时则执行回调函数
   * @param callback 超时后执行的回调函数
   */
  overdue(callback: () => void) {
    watch(this.time, (newValue) => {
      if (newValue <= 0) {
        callback()
      }
    }, { immediate: true, once: true })
  }
}

/**
 * 支付类：处理支付相关的所有逻辑
 */
class Payment {
  package: PackageItem | undefined // 当前选择的套餐
  type: 'wechat' | 'alipay' = 'wechat' // 支付方式
  response: Ref<PaymentResponse['data'] | null> = ref(null) // 支付接口返回数据
  status: 'success' | 'fail' | 'pending' = 'pending' // 支付状态
  pay: (data: number) => Promise<PaymentResponse> = wxPayment // 支付方法
  timer: NodeJS.Timeout | null = null // 查询订单状态的定时器
  private countdown: CountdownTimer // 倒计时实例

  /**
   * 初始化支付实例
   * @param type 支付方式，默认微信支付
   */
  constructor(type: 'wechat' | 'alipay' = 'wechat') {
    this.type = type
    this.updatePayMethod(type)
    this.countdown = new CountdownTimer()
  }

  /**
   * 更新支付方式
   * @param type 支付方式：wechat 或 alipay
   */
  private updatePayMethod(type: 'wechat' | 'alipay') {
    this.pay = type === 'wechat' ? wxPayment : aliPayment
  }

  /**
   * 重新生成订单
   * 停止旧的查询，生成新的二维码，重置倒计时
   */
  regenerateOrder() {
    this.exitQueryOrder()
    this.generateOrderQRCode()
    this.countdown.start()
  }

  /**
   * 开始支付流程
   * @param pkg 选择的套餐包
   */
  startPayment(pkg: PackageItem) {
    if (import.meta.env.RENDERER_VITE_TARGET === 'electron') {
      window.electron.ipcRenderer.invoke('payment', pkg.applyProductId)
      return
    }
    this.package = pkg
    showPayDialog.value = true
    this.generateOrderQRCode()
    this.countdown.start()
  }

  /**
   * 生成订单信息和二维码
   */
  generateOrderQRCode() {
    payType.value = this.type
    loading.value.qrcode = true

    if (this.pay && this.package) {
      this.pay(this.package.id).then((res: PaymentResponse) => {
        if (res.data.codeUrl) {
          this.response = ref(res.data)
          this.generateQRCode(res.data.codeUrl)

          // 注册超时回调：订单超时自动关闭
          this.countdown.overdue(() => {
            ElNotification({
              title: '提示',
              message: '订单已超时',
              type: 'warning'
            })
            this.exitQueryOrder()
            this.countdown.stop()
            showPayDialog.value = false
          })
        }
      }).finally(() => {
        loading.value.qrcode = false
      })
    }
  }

  /**
   * 定时查询订单状态
   * 每2秒查询一次，根据状态执行相应操作
   */
  queryOrderStatus() {
    this.timer = setInterval(() => {
      this.response.value && queryOrder(this.response.value.orderNo).then((res) => {
        switch (res.data.status) {
          case 0:
            // 订单取消
            ElNotification({
              title: '提示',
              message: '订单已取消',
              type: 'warning'
            })
            break
          case 10:
            // 订单未付款，倒计时结束时重新生成二维码
            if (this.countdown.currentTime <= 0) {
              this.regenerateOrder()
            }
            break
          case 20:
            // 订单已付款，关闭所有定时器和弹窗
            ElNotification({
              title: '提示',
              message: '订单已付款',
              type: 'success'
            })
            this.exitQueryOrder()
            this.countdown.stop()
            showPayDialog.value = false
            break
          case 30:
            // 交易关闭
            ElNotification({
              title: '提示',
              message: '交易关闭',
              type: 'warning'
            })
            break
        }
      })
    }, 2000)
  }

  /**
   * 停止查询订单
   * 清除查询定时器
   */
  exitQueryOrder() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  /**
   * 切换支付方式
   * @param type 新的支付方式
   */
  switchPayType(type: 'wechat' | 'alipay') {
    this.type = type
    this.updatePayMethod(type)
    this.regenerateOrder()
  }

  /**
   * 生成支付二维码
   * @param codeUrl 二维码URL
   */
  private generateQRCode(codeUrl: string) {
    this.queryOrderStatus()
    toDataURL(codeUrl, {
      width: 200
    }, (e, url) => {
      if (e) {
        console.error(`generate qr code error: `, e)
        return
      }
      this.response.value!.codeUrl = url
    })
  }

  /**
   * 获取格式化的倒计时
   */
  formatCountdown(): string {
    return this.countdown.format()
  }

  /**
   * 清理所有定时器
   * 在组件销毁或关闭弹窗时调用
   */
  cleanup() {
    this.exitQueryOrder()
    this.countdown.stop()
  }
}

// 获取套餐包数据
getPackages().then(res => {
  packages.value = res.data
})

// 初始化支付实例
const payment = new Payment('wechat')

// 关闭弹窗
function closeDialog() {
  showPayDialog.value = false
  payment.cleanup()
}
</script>

<template>
  <div class="recharge-container">
    <h2 class="section-title">额度介绍</h2>
    <div class="token-cards">
      <TokenCard v-for="pkg in packages" :key="pkg.id" :tokens="pkg.tokensTitle" :price="pkg.price"
                 @purchase="payment.startPayment(pkg)" />
    </div>

    <!-- 支付弹窗 -->
    <dialog :open="showPayDialog" class="pay-dialog">
      <div class="dialog-header">
        <h2>请选择支付方式</h2>
        <button class="close-btn" @click="closeDialog">✕</button>
      </div>

      <div class="pay-options">
        <div class="pay-option" :class="{ active: payment.type === 'wechat' }"
             @click="payment.switchPayType('wechat')">
          <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="微信支付">
          <span>微信支付</span>
        </div>
        <div class="pay-option" :class="{ active: payment.type === 'alipay' }"
             @click="payment.switchPayType('alipay')">
          <img src="https://os.alipayobjects.com/rmsportal/JxAjrvPKriKOpjf.png" alt="支付宝支付">
          <span>支付宝支付</span>
        </div>
      </div>

      <div class="qr-section">
        <div class="qr-code">
          <div v-loading="loading.qrcode" class="qr-wrapper">
            <img v-if="payment.response?.value?.codeUrl" :src="payment.response?.value?.codeUrl"
                 alt="支付二维码">
          </div>
        </div>
        <div class="price-info">
          <span class="symbol">￥</span>
          <span class="amount">{{ payment.package?.price }}</span>
        </div>
        <div class="countdown">
          充值倒计时：{{ payment.formatCountdown() }}
        </div>
        <div class="agreement">
          请使用{{ payment.type === 'wechat' ? '微信' : '支付宝' }}支付，充值即代表同意《<a href="#"
                                                                                          class="agreement-link">鹿线AI用户协议</a>》
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
  transform: translate(-50%, -50%);

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
    }

    .qr-wrapper {
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
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