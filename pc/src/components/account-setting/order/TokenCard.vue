<script setup lang="ts">
defineProps<{
    tokens: string;
    price: string | number;
}>();

const emit = defineEmits(['purchase']);
</script>

<template>
    <div class="token-card">

        <img data-v-c3263df6=""
            src="data:image/png;base64,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"
            alt="">
        <div class="token-info">
            <div class="token-amount">{{ tokens }}s </div>
            <div class="price-label">价格</div>
        </div>
        <div class="price">
            <span class="amount">{{ price }}</span>
            <span class="unit">元</span>
        </div>
        <button class="purchase-btn" @click="emit('purchase')">
            立即购买
        </button>
    </div>
</template>

<style scoped>
.token-card {
    width: 335px;
    height: 335px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: relative;
}

.token-card img {
    height: 75px;
    width: 75px;
    right: 10%;position: absolute;
}

.token-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.token-amount {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.price-label {
    font-size: 14px;
    color: #999;
}

.price {
    margin: 5px 0;
}

.price .amount {

    font-size: 28px;
    font-weight: bold;
    color: #ff7849;
}

.price .unit {
    font-size: 14px;
    color: #ff7849;
    margin-left: 2px;
}

.purchase-btn {
    width: 100%;
    padding: 10px;
    background: #ffd591;
    border: none;
    border-radius: 6px;
    color: #873800;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.purchase-btn:hover {
    background: #ffc069;
}
</style>