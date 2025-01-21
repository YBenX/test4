<template>
  <div class="card">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="title">诊疗卡</div>
      <div class="timer">
        剩余时间：{{ formatTime(remainingTime) }}
      </div>
    </div>

    <!-- 步骤条 -->
    <Steps :steps="steps" :current="currentStep" />

    <!-- 步骤1：读卡方式选择 -->
    <div class="card-options" v-if="currentStep === 0">
      <button 
        v-for="option in cardOptions" 
        :key="option.value"
        @click="selectCardOption(option)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- 步骤2：读卡中 -->
    <div class="card-loading" v-if="currentStep === 1">
      <div class="loading-spinner"></div>
      <p>正在读取卡片信息...</p>
    </div>

    <!-- 步骤3：读卡结果展示 -->
    <div class="card-result" v-if="currentStep === 2">
      <h3>诊疗卡信息</h3>
      <div class="info">
        <p>卡类型：{{ selectedCard?.label }}</p>
        <p>卡号：{{ cardNumber }}</p>
        <p>余额：{{ balance }} 元</p>
      </div>
      <button @click="confirmCard">确认使用</button>
    </div>

    <!-- 底部按钮 -->
    <div class="bottom-buttons">
      <button class="back-button" @click="handleBack">
        返回
      </button>
      <button class="home-button" @click="goHome">
        首页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Steps from '@/components/Steps.vue'

const router = useRouter()
const remainingTime = ref(120) // 120秒倒计时

interface CardOption {
  label: string
  value: string
}

const cardOptions = ref<CardOption[]>([
  { label: '身份证', value: 'idCard' },
  { label: '医保卡', value: 'medicalCard' },
  { label: '诊疗卡', value: 'treatmentCard' },
  { label: '电子健康码', value: 'healthCode' }
])

const selectedCard = ref<CardOption | null>(null)
const cardNumber = ref('')
const balance = ref(0)
const steps = ref(['选择读卡方式', '读取卡片信息', '确认使用'])
const currentStep = ref(0)

let timer: number

// 格式化时间显示
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 选择读卡方式
const selectCardOption = (option: CardOption) => {
  selectedCard.value = option
  currentStep.value = 1
  // 模拟读卡结果
  setTimeout(() => {
    cardNumber.value = Math.random().toString(36).substring(2, 10).toUpperCase()
    balance.value = Math.floor(Math.random() * 1000)
    currentStep.value = 2
  }, 2000)
}

// 确认使用诊疗卡
const confirmCard = () => {
  alert('诊疗卡使用成功！')
  router.push({ name: 'home' })
}

// 返回处理
const handleBack = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  } else {
    router.push({ name: 'home' })
  }
}

// 返回首页
const goHome = () => {
  router.push({ name: 'home' })
}

// 倒计时处理
onMounted(() => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      alert('操作超时，请重新开始')
      router.push({ name: 'home' })
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.timer {
  color: #f56c6c;
}

.card-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.card-options button {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

.card-options button:hover {
  background: #f5f5f5;
}

.card-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.card-result {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.card-result h3 {
  margin-top: 0;
}

.card-result button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.card-result button:hover {
  background: #66b1ff;
}

.bottom-buttons {
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  gap: 10px;
}

.back-button,
.home-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.back-button {
  background: #409eff;
  color: white;
}

.home-button {
  background: #67c23a;
  color: white;
}

.back-button:hover {
  background: #66b1ff;
}

.home-button:hover {
  background: #85ce61;
}
</style>
