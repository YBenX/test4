<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  steps: string[]
  current: number
}>()

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'prev'): void
}>()

const handleNext = () => {
  emit('next')
}

const handleBack = () => {
  if (props.current === 0) {
    router.push('/')
  } else {
    emit('prev')
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        :class="['step', { active: index === current }]"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-title">{{ step }}</div>
        <div v-if="index < steps.length - 1" class="step-line"></div>
      </div>
    </div>
    
    <div class="button-container">
      <button @click="handleBack">返回</button>
      <button @click="goHome">首页</button>
    </div>
  </div>
</template>

<style scoped>
.steps-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 20px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.step.active .step-number {
  background-color: #1890ff;
  color: white;
  transform: scale(1.1);
  border-color: #1890ff;
  box-shadow: 0 0 0 4px rgba(24, 144, 255, 0.2);
}

.step-title {
  font-size: 14px;
  color: #666;
  text-align: center;
  transition: all 0.3s ease;
}

.step.active .step-title {
  color: #1890ff;
  font-weight: 500;
  transform: scale(1.05);
}

.step-line {
  position: absolute;
  top: 15px;
  left: calc(50% + 15px);
  right: calc(-50% + 15px);
  height: 2px;
  background-color: #e0e0e0;
}

.step.active ~ .step .step-line {
  background-color: #e0e0e0;
}

.step.active .step-line {
  background-color: #1890ff;
}
.button-container {
  position: fixed;
  left: 20px;
  bottom: 60px; /* 增加底部距离 */
  display: flex;
  gap: 10px;
  z-index: 1000; /* 添加z-index确保按钮在最上层 */
}

.button-container button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-container button:hover {
  background: #f5f5f5;
}

.button-container button:active {
  transform: scale(0.95);
}
</style>
