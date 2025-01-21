<template>
  <div class="appointment">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="back" @click="goBack">
        <span>返回</span>
      </div>
      <div class="title">预约挂号</div>
      <div class="timer">
        剩余时间：{{ formatTime(remainingTime) }}
      </div>
    </div>

    <!-- 科室选择 -->
    <div class="department-select">
      <label for="department">选择科室：</label>
      <select id="department" v-model="selectedDepartment">
        <option 
          v-for="dept in departments" 
          :key="dept.value"
          :value="dept.value"
        >
          {{ dept.label }}
        </option>
      </select>
    </div>

    <!-- 医生列表 -->
    <div class="doctor-list">
      <div 
        class="doctor-card"
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        @click="selectDoctor(doctor)"
      >
        <div class="doctor-info">
          <h3>{{ doctor.name }}</h3>
          <p>{{ doctor.title }}</p>
          <p>{{ doctor.department }}</p>
        </div>
        <div class="available-time">
          <p>可预约时间：</p>
          <ul>
            <li v-for="time in doctor.availableTimes" :key="time.getTime()">
              <strong>{{ formatDate(time) }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 确认预约 -->
    <div class="confirm-appointment" v-if="selectedDoctor">
      <h3>预约信息</h3>
      <div class="info">
        <p>医生：{{ selectedDoctor.name }}</p>
        <p>科室：{{ selectedDoctor.department }}</p>
        <p>预约时间：<strong>{{ formatDate(new Date(selectedTime)) }}</strong></p>
      </div>
      <button @click="confirmAppointment">确认预约</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

let timer: number

const router = useRouter()
const remainingTime = ref(120) // 120秒倒计时

interface Department {
  value: string
  label: string
}

interface Doctor {
  id: number
  name: string
  title: string
  department: string
  availableTimes: Date[]
}

const departments = ref<Department[]>([
  { value: 'internal', label: '内科' },
  { value: 'surgery', label: '外科' },
  { value: 'pediatrics', label: '儿科' },
  { value: 'obstetrics', label: '妇产科' },
  { value: 'orthopedics', label: '骨科' },
  { value: 'ophthalmology', label: '眼科' }
])

const doctors = ref<Doctor[]>([
  {
    id: 1,
    name: '张医生',
    title: '主任医师',
    department: '内科',
    availableTimes: [
      new Date(2023, 9, 15, 9, 0),
      new Date(2023, 9, 15, 10, 0),
      new Date(2023, 9, 15, 14, 0)
    ]
  },
  {
    id: 2,
    name: '李医生',
    title: '副主任医师',
    department: '外科',
    availableTimes: [
      new Date(2023, 9, 15, 10, 30),
      new Date(2023, 9, 15, 13, 0),
      new Date(2023, 9, 15, 15, 0)
    ]
  },
  {
    id: 3,
    name: '王医生',
    title: '主治医师',
    department: '儿科',
    availableTimes: [
      new Date(2023, 9, 15, 9, 30),
      new Date(2023, 9, 15, 11, 0),
      new Date(2023, 9, 15, 14, 30)
    ]
  }
])

const selectedDepartment = ref('internal')
const selectedDoctor = ref<Doctor | null>(null)
const selectedTime = ref('')

const filteredDoctors = computed(() => {
  return doctors.value.filter(
    doctor => doctor.department === selectedDepartment.value
  )
})

// 格式化时间显示
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 格式化日期显示
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 选择医生
const selectDoctor = (doctor: Doctor) => {
  selectedDoctor.value = doctor
  selectedTime.value = doctor.availableTimes[0].toISOString()
}

// 确认预约
const confirmAppointment = () => {
  alert('预约成功！')
  router.push({ name: 'home' })
}

// 返回上一页
const goBack = () => {
  router.go(-1)
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
.appointment {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back {
  cursor: pointer;
  color: #409eff;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.timer {
  color: #f56c6c;
}

.department-select {
  margin-bottom: 20px;
}

.department-select label {
  margin-right: 10px;
}

.department-select select {
  padding: 8px;
  border-radius: 4px;
}

.doctor-list {
  display: grid;
  gap: 15px;
}

.doctor-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
}

.doctor-card:hover {
  background: #f5f5f5;
}

.doctor-info h3 {
  margin-top: 0;
}

.available-time {
  margin-top: 10px;
}

.available-time ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.available-time li strong {
  font-weight: bold;
}

.confirm-appointment {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.confirm-appointment h3 {
  margin-top: 0;
}

.confirm-appointment button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.confirm-appointment button:hover {
  background: #66b1ff;
}
</style>
