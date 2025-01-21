<template>
  <div class="card-reader">
    <!-- 选择读卡方式 -->
    <div v-if="!selectedCard" class="card-selector">
      <div class="card-options">
        <button 
          v-for="option in options" 
          :key="option.value"
          @click="selectCard(option)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- 读卡界面 -->
    <div v-else>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>正在读取{{ selectedCard.label }}信息...</p>
      </div>
      
      <div v-else-if="result" class="result">
        <PatientInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PatientInfo from './PatientInfo.vue'
interface CardOption {
  label: string
  value: string
}

const props = defineProps<{
  options: CardOption[]
}>()

const emit = defineEmits<{
  (e: 'read', cardNumber: string): void
}>()

const selectedCard = ref<CardOption | null>(null)
const loading = ref(false)
const result = ref(false)

const selectCard = (card: CardOption) => {
  selectedCard.value = card
  startReading()
}

const startReading = () => {
  loading.value = true
  result.value = false
  
  // 模拟读卡过程
  setTimeout(() => {
    const cardNumber = Math.random().toString(36).substring(2, 10).toUpperCase()
    emit('read', cardNumber)
    loading.value = false
    result.value = true
  }, 2000)
}

// 确保组件挂载时重置状态
onMounted(() => {
  selectedCard.value = null
  loading.value = false
  result.value = false
})
</script>

<style scoped>
.card-reader {
  margin: 20px 0;
}

.card-selector {
  margin-bottom: 20px;
}

.card-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
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

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
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

.result {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  text-align: center;
}
</style>
