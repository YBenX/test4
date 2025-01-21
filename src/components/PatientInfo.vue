<template>
  <div class="patient-info">
    <h3>患者信息</h3>
    <div class="info-grid">
      <div class="info-item">
        <label>姓名：</label>
        <span>{{ patient.name }}</span>
      </div>
      <div class="info-item">
        <label>性别：</label>
        <span>{{ patient.gender }}</span>
      </div>
      <div class="info-item">
        <label>年龄：</label>
        <span>{{ patient.age }}</span>
      </div>
      <div class="info-item">
        <label>身份证号：</label>
        <span>{{ patient.idNumber }}</span>
      </div>
      <div class="info-item">
        <label>诊疗卡号：</label>
        <span>{{ patient.medicalCardNumber }}</span>
      </div>
    </div>
    <div class="actions">
      <button class="confirm-btn" @click="handleConfirm">确认</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Patient {
  name: string
  gender: string
  age: number
  idNumber: string
  medicalCardNumber: string
}

const patient = ref<Patient>({
  name: '张三',
  gender: '男',
  age: 35,
  idNumber: '110105198801012345',
  medicalCardNumber: 'SP7PPNVS'
})

const handleConfirm = () => {
  const patientInfo = {
    name: patient.value.name,
    gender: patient.value.gender,
    age: patient.value.age,
    idNumber: patient.value.idNumber
  }
  emit('confirm', patientInfo)
}

const emit = defineEmits(['confirm'])
</script>

<style scoped>
.patient-info {
  width: 100%;
}

h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
}

label {
  font-weight: bold;
  color: #666;
  margin-right: 8px;
}

span {
  color: #333;
}

.actions {
  margin-top: 20px;
  text-align: center;
}

.confirm-btn {
  padding: 10px 30px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #66b1ff;
}
</style>
