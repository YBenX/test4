<template>
  <div class="patient-info-bar">
    <span class="name">{{ patient.name }}</span>
    <span class="gender">{{ patient.gender }}</span>
    <span class="age">{{ patient.age }}岁</span>
    <span class="id-number">{{ maskedIdNumber }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  patient: {
    type: Object,
    required: true
  }
})

const maskedIdNumber = computed(() => {
  const id = props.patient.idNumber
  return id ? `${id.slice(0, 3)}********${id.slice(-4)}` : ''
})
</script>

<style scoped>
.patient-info-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #333;
}

.patient-info-bar span {
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
