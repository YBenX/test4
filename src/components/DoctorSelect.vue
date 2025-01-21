<template>
  <div class="doctor-select">
    <!-- 日期选择 -->
    <div class="date-selector">
      <div 
        v-for="(date, index) in dates"
        :key="index"
        class="date-item"
        :class="{ active: selectedDate === date }"
        @click="selectDate(date)"
      >
        <div class="day">{{ formatDay(date) }}</div>
        <div class="date">{{ formatDate(date) }}</div>
      </div>
    </div>

    <!-- 医生列表 -->
    <div class="doctor-list">
      <div 
        v-for="(doctor, index) in filteredDoctors"
        :key="index"
        class="doctor-item"
      >
        <div class="doctor-info">
          <div class="name">{{ doctor.name }}</div>
          <div class="title">{{ doctor.title }}</div>
          <div class="specialty">{{ doctor.specialty }}</div>
          <div class="remaining">剩余号数：{{ getRemainingNumber(doctor) }}</div>
        </div>
        <div class="doctor-actions">
          <button 
            @click="selectDoctor(doctor)"
            :disabled="getRemainingNumber(doctor) === 0"
          >
            {{ getRemainingNumber(doctor) === 0 ? '已满' : '选择' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Doctor {
  id: string
  name: string
  title: string
  specialty: string
  photo?: string
  schedule: {
    date: string
    total: number
    booked: number
  }[]
}

const props = defineProps<{
  doctors: Doctor[]
}>()

const emit = defineEmits<{
  (e: 'select', doctor: Doctor): void
}>()

// 获取未来7天日期
const dates = computed(() => {
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    days.push(date.toISOString().split('T')[0])
  }
  return days
})

const selectedDate = ref(dates.value[0])

// 格式化日期显示
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 格式化星期显示
const formatDay = (dateStr: string) => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date(dateStr)
  return `周${days[date.getDay()]}`
}

// 获取当前日期下的医生列表
const filteredDoctors = computed(() => {
  return props.doctors.filter(doctor => 
    doctor.schedule.some(s => s.date === selectedDate.value)
  )
})

// 获取医生剩余号数
const getRemainingNumber = (doctor: Doctor) => {
  const schedule = doctor.schedule.find(s => s.date === selectedDate.value)
  return schedule ? schedule.total - schedule.booked : 0
}

const selectDate = (date: string) => {
  selectedDate.value = date
}

const selectDoctor = (doctor: Doctor) => {
  emit('select', doctor)
}
</script>

<style scoped>
.doctor-select {
  height: 100%;
  background: white;
}

.date-selector {
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.date-item {
  flex: 1;
  text-align: center;
  padding: 8px;
  margin: 0 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.date-item:hover {
  background: #f5f5f5;
}

.date-item.active {
  background: #228be6;
  color: white;
}

.day {
  font-size: 14px;
  margin-bottom: 4px;
}

.date {
  font-size: 16px;
  font-weight: 500;
}

.doctor-list {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .doctor-list {
    grid-template-columns: 1fr;
  }
}

.doctor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 16px;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.doctor-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.doctor-info {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.title {
  color: #666;
  margin-bottom: 4px;
  font-size: 14px;
}

.specialty {
  color: #999;
  font-size: 14px;
}

.remaining {
  color: #f56c6c;
  font-size: 14px;
  margin-top: 4px;
}

.doctor-actions button {
  padding: 8px 20px;
  border: 1px solid #228be6;
  border-radius: 6px;
  background-color: #fff;
  color: #228be6;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.doctor-actions button:hover {
  background-color: #228be6;
  color: #fff;
}

.doctor-actions button:disabled {
  border-color: #ccc;
  background-color: #f5f5f5;
  color: #ccc;
  cursor: not-allowed;
}
</style>
