<template>
  <div class="register">
    <!-- 步骤条 -->
    <Steps 
      :steps="steps" 
      :current="currentStep"
      @prev="handleStepBack"
    />

    <!-- 顶部导航栏 -->
    <div class="navbar"> 
      <div class="title">当天挂号</div>
        <PatientInfoBar v-if="patient && currentStep > 0" :patient="patient" />
      <div class="info-timer">
        <div class="timer">
          剩余时间：{{ formatTime(remainingTime) }}
        </div>
      </div>
    </div>

    <!-- 步骤1：读卡 -->
    <CardReader
      v-if="currentStep === 0"
      :options="cardOptions"
      @read="handleCardRead"
    />
    
    <!-- 步骤2：患者信息 -->
    <PatientInfo
      v-if="currentStep === 1 && cardNumber"
      @confirm="handlePatientConfirm"
    />
    
    <!-- 步骤3：选择科室 -->
    <DepartmentSelect
      v-if="currentStep === 2"
      :departments="departments" 
      @select-sub="handleSubDepartmentSelect"
    />

    <!-- 步骤4：选择医生 -->
    <DoctorSelect
      v-if="currentStep === 3"
      :doctors="currentDoctors"
      :selected-date="selectedDate"
      @select="handleDoctorSelect"
      @date-select="handleDateSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import Steps from '@/components/Steps.vue'

interface Department {
  name: string
  code: string
  children?: {
    name: string
    code: string 
  }[]
}

interface PatientInfo {
  name: string
  idCard: string
  phone: string
  gender: 'male' | 'female'
  age: number
}
import CardReader from '@/components/CardReader.vue'
import PatientInfo from '@/components/PatientInfo.vue'
import DepartmentSelect from '@/components/DepartmentSelect.vue'
import DoctorSelect from '@/components/DoctorSelect.vue'
import PatientInfoBar from '@/components/PatientInfoBar.vue'

const router = useRouter()
const remainingTime = ref(120)
const steps = ref(['读卡', '患者信息', '选择科室', '选择医生', '确认挂号'])
const currentStep = ref(0)
const patient = ref<PatientInfo | null>(null)
const selectedDate = ref('')

// 处理患者信息确认
const handlePatientConfirm = (patientInfo: PatientInfo) => {
  patient.value = patientInfo
  currentStep.value = 2
}

// 其他原有方法保持不变...
const handleStepBack = () => {
 if (currentStep.value > 0) {
    currentStep.value--
  }
}

// 处理日期选择
const handleDateSelect = (date: string) => {
  selectedDate.value = date
}

// 科室数据
const departments = ref([
  {
    name: '内科',
    code: 'NK',
    children: [
      { name: '心血管内科', code: 'NK01' },
      { name: '呼吸内科', code: 'NK02' },
      { name: '消化内科', code: 'NK03' },
      { name: '肾内科', code: 'NK04' },
      { name: '内分泌科', code: 'NK05' }
    ]
  },
  {
    name: '外科',
    code: 'WK',
    children: [
      { name: '普通外科', code: 'WK01' },
      { name: '骨科', code: 'WK02' },
      { name: '泌尿外科', code: 'WK03' },
      { name: '神经外科', code: 'WK04' },
      { name: '胸外科', code: 'WK05' }
    ]
  },
  {
    name: '妇产科',
    code: 'FCK',
    children: [
      { name: '妇科', code: 'FCK01' },
      { name: '产科', code: 'FCK02' },
      { name: '计划生育科', code: 'FCK03' }
    ]
  },
  {
    name: '儿科',
    code: 'EK',
    children: [
      { name: '新生儿科', code: 'EK01' },
      { name: '儿童保健科', code: 'EK02' },
      { name: '小儿外科', code: 'EK03' }
    ]
  },
  {
    name: '眼科',
    code: 'YK',
    children: [
      { name: '白内障科', code: 'YK01' },
      { name: '青光眼科', code: 'YK02' },
      { name: '眼底病科', code: 'YK03' }
    ]
  },
  {
    name: '耳鼻喉科',
    code: 'EBH',
    children: [
      { name: '耳科', code: 'EBH01' },
      { name: '鼻科', code: 'EBH02' },
      { name: '咽喉科', code: 'EBH03' }
    ]
  },
  {
    name: '口腔科',
    code: 'KQ',
    children: [
      { name: '牙体牙髓科', code: 'KQ01' },
      { name: '口腔颌面外科', code: 'KQ02' },
      { name: '正畸科', code: 'KQ03' }
    ]
  },
  {
    name: '皮肤科',
    code: 'PF',
    children: [
      { name: '皮肤外科', code: 'PF01' },
      { name: '皮肤病理科', code: 'PF02' },
      { name: '皮肤美容科', code: 'PF03' }
    ]
  },
  {
    name: '中医科',
    code: 'ZY',
    children: [
      { name: '针灸科', code: 'ZY01' },
      { name: '推拿科', code: 'ZY02' },
      { name: '中医内科', code: 'ZY03' }
    ]
  },
  {
    name: '急诊科',
    code: 'JZ',
    children: [
      { name: '急诊内科', code: 'JZ01' },
      { name: '急诊外科', code: 'JZ02' },
      { name: '急诊儿科', code: 'JZ03' }
    ]
  }
])

// 生成14天的排班日期
const generateScheduleDates = () => {
  const dates = []
  for (let i = 0; i < 14; i++) {
    const date = new Date(Date.now() + 86400000 * i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
}

// 医生数据
const doctors = ref([
  {
    id: 'D001',
    name: '张医生',
    title: '主任医师',
    specialty: '心血管疾病',
    departmentCode: 'NK01',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D002',
    name: '李医生',
    title: '副主任医师',
    specialty: '呼吸系统疾病',
    departmentCode: 'NK02',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D003',
    name: '王医生',
    title: '主治医师',
    specialty: '消化系统疾病',
    departmentCode: 'NK03',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D004',
    name: '陈医生',
    title: '副主任医师',
    specialty: '肾脏疾病',
    departmentCode: 'NK04',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D005',
    name: '刘医生',
    title: '主任医师',
    specialty: '内分泌疾病',
    departmentCode: 'NK05',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D006',
    name: '赵医生',
    title: '副主任医师',
    specialty: '普通外科',
    departmentCode: 'WK01',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D007',
    name: '孙医生',
    title: '主治医师',
    specialty: '骨科',
    departmentCode: 'WK02',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D008',
    name: '周医生',
    title: '主任医师',
    specialty: '泌尿外科',
    departmentCode: 'WK03',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D009',
    name: '吴医生',
    title: '副主任医师',
    specialty: '神经外科',
    departmentCode: 'WK04',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  },
  {
    id: 'D010',
    name: '郑医生',
    title: '主治医师',
    specialty: '胸外科',
    departmentCode: 'WK05',
    schedule: generateScheduleDates().map(date => ({
      date,
      total: Math.floor(Math.random() * 20) + 10,
      booked: Math.floor(Math.random() * 10)
    }))
  }
])

const currentDepartmentIndex = ref(0)
const currentSubDepartmentIndex = ref(0)

const currentDoctors = computed(() => {
  const department = departments.value[currentDepartmentIndex.value]
  if (!department?.children?.length) return []
  
  const children = department.children
  if (!children) return []
  
  if (currentSubDepartmentIndex.value < 0 || 
      currentSubDepartmentIndex.value >= children.length) {
    return []
  }
  
  const subDepartment = children[currentSubDepartmentIndex.value]
  if (!subDepartment) return []
  
  const filteredDoctors = doctors.value.map(doctor => ({
    ...doctor,
    departmentCode: subDepartment.code
  }))
  
  if (!selectedDate.value) return filteredDoctors
  
  return filteredDoctors.map(doctor => {
    return {
      ...doctor,
      schedule: doctor.schedule.filter(s => s.date === selectedDate.value)
    }
  }).filter(doctor => doctor.schedule.length > 0)
})

const handleSubDepartmentSelect = (department: Department, subDepartment: { name: string; code: string }) => {
  currentDepartmentIndex.value = departments.value.findIndex(d => d.code === department.code)
  
  const children = department.children
  if (!children?.length) {
    currentSubDepartmentIndex.value = -1
    return
  }
  
  currentSubDepartmentIndex.value = children.findIndex((c: { code: string }) => c.code === subDepartment.code)
  selectedDate.value = ''
  currentStep.value = 3
}

const handleDoctorSelect = (doctor: any) => {
  console.log('Selected doctor:', doctor.code, doctor)
  currentStep.value = 4
}

const cardOptions = ref([
  { label: '身份证', value: 'idCard' },
  { label: '医保卡', value: 'medicalCard' },
  { label: '诊疗卡', value: 'treatmentCard' },
  { label: '电子健康码', value: 'healthCode' },
  { label: '电子社保卡', value: 'socialSecurityCard' },
  { label: '发票号', value: 'invoice' }
])

const cardNumber = ref('')

const handleCardRead = (number: string) => {
  cardNumber.value = number
  currentStep.value = 1
}

const formatTime = (seconds: number) => {
  return `${seconds}秒`
}

let timer: number
const startTimer = () => {
  remainingTime.value = 120
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timer)
      alert('操作超时，请重新开始')
      router.push({ name: 'home' })
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

watch(currentStep, () => {
  startTimer()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 20px 20px 20px;
  gap: 40px;
}

.info-timer {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.timer {
  color: #f56c6c;
}
</style>
