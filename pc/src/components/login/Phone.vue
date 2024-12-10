<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin';
import { getImageCode, loginVerification, verifyImageCode } from '@/utils/api/login';
import { computed, reactive, ref } from 'vue';

// 鼠标移动状态管理
const mouseMove = ref({
    dragging: false,    // 是否正在拖动
    startX: 0,         // 开始拖动时的X坐标
    currentX: 0,       // 当前拖动的X坐标
    distance: computed((): number => {
        const dist = mouseMove.value.currentX - mouseMove.value.startX;
        return Math.max(0, Math.min(dist, 350)); // 限制滑动范围在0-350px之间
    }),
})

// 表单数据
const form = reactive({
    phone: '',  // 手机号
    phoneCode: '',   // 验证码
    password: '',   // 密码
    verify: true,          // 图片验证状态
    isNew: false         // 新用户
})

// 处理鼠标按下事件
function handleMouseDown(e: MouseEvent) {
    mouseMove.value.dragging = true;
    // 记录起始位置，考虑当前已经移动的距离
    mouseMove.value.startX = e.clientX - mouseMove.value.distance;
    // 添加全局鼠标事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// 处理鼠标移动事件
function handleMouseMove(e: MouseEvent) {
    if (!mouseMove.value.dragging) return;
    mouseMove.value.currentX = e.clientX;
}

// 处理鼠标释放事件
function handleMouseUp() {
    if (!mouseMove.value.dragging) return;
    mouseMove.value.dragging = false;
    // 移除全局事件监听
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    console.log(`mouse move distance: `, mouseMove.value.distance);

    // 验证滑动位置是否正确
    verifyImageCode(form.phone, mouseMove.value.distance).then(res => {
        console.log(`verify message: `, res.code, '. verify ' + (res.code === 0 ? 'success' : 'fail'));
        form.verify = res.code === 0 ? true : false;

        // 检测是否是新用户
        form.isNew = res.data
        if (form.verify) {
            // 验证成功，1秒后关闭弹窗
            setTimeout(() => {
                showPayDialog.value = false;
            }, 1000);
        } else {
            // 验证失败，重置位置并刷新验证码
            mouseMove.value.currentX = mouseMove.value.startX;
            refreshImageCode();
        }
    })
}

// 刷新验证码
async function refreshImageCode() {
    const res = await getImageCode(form.phone);
    imageCode.value = res;
    // 重置滑块位置
    mouseMove.value.currentX = 0;
    mouseMove.value.startX = 0;
}

// 验证码相关状态
const imageCode = ref<IResponse<IImageCode>>()
const showPayDialog = ref(false)

// 发送验证码
async function sendCodeHandler() {
    showPayDialog.value = true;
    await refreshImageCode();
}

// 登录处理
async function loginHandler() {
    const res = await loginVerification(form.phone, form.phoneCode, form.password);

    // 登录成功，进行持久化，写入token
    if (res.code === 0) {
        useLogin(res.data.token);
    }
}
</script>

<template>
    <el-form :model="form">
        <el-form-item>
            <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
            <el-input v-model="form.phoneCode" placeholder="请输入验证码">
                <template #append>
                    <el-button @click="sendCodeHandler">获取验证码</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item v-if="form.isNew">
            <el-input v-model="form.password" placeholder="检测到新用户，请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginHandler">登录</el-button>
        </el-form-item>
    </el-form>

    <Teleport to="body">
        <el-dialog v-model="showPayDialog" title="请验证验证码" width="400px">
            <div class="image-verify">
                <img v-if="imageCode" :src="imageCode.data.bigImageBase64" class="background-image" />
                <img v-if="imageCode" :src="imageCode.data.smallImageBase64" class="slider-image"
                    :style="{ transform: `translateX(${mouseMove.distance}px)` }" />
            </div>
            <div class="progress">
                <div class="bar"></div>
                <div class="slider" :style="{ transform: `translateX(${mouseMove.distance}px)` }"
                    @mousedown="handleMouseDown">
                    <el-icon>

                    </el-icon>
                </div>
            </div>
        </el-dialog>
    </Teleport>
</template>

<style lang="scss" scoped>
.image-verify {
    position: relative;
    height: 300px;
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 4px;

    .background-image {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .slider-image {
        position: absolute;
        height: 100%;
        width: 60px;
        object-fit: cover;
        pointer-events: none;
    }
}

.progress {
    position: relative;
    height: 40px;
    width: 100%;
    user-select: none;

    .bar {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 4px;
        width: 100%;
        background-color: #e4e7eb;
        border-radius: 2px;
    }

    .slider {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 34px;
        width: 34px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #409eff;

        &:hover {
            background-color: #f5f5f5;
        }
    }
}
</style>