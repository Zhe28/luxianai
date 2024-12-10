<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: Boolean,
  title: String
});

const emit = defineEmits(['update:visible']);

const close = () => {
  emit('update:visible', false);
};
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <div class="modal-header">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <slot>
          <!-- 默认内容 -->
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button @click="close">关闭</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 10px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>