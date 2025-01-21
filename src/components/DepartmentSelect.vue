<template>
  <div class="department-select">
    <div class="primary-department-container">
      <div class="primary-department-list">
        <div class="pagination-controls">
          <button 
            v-if="currentPage > 0"
            class="pagination-button"
            @click="prevPage"
          >
            &uarr;
          </button>
        </div>
        <div 
          v-for="(department, index) in visibleDepartments" 
          :key="index"
          :class="['primary-department-item', { active: activeDepartmentIndex === index + currentPage * itemsPerPage }]"
          @click="selectDepartment(index)"
        >
          {{ department.name }}
        </div>
        <div class="pagination-controls">
          <button 
            v-if="currentPage < totalPages - 1"
            class="pagination-button"
            @click="nextPage"
          >
            &darr;
          </button>
        </div>
      </div>
    </div>
    <div class="secondary-department-container">
      <div class="secondary-department-list">
        <div 
          v-if="departments[activeDepartmentIndex]?.children"
          class="secondary-department-grid"
        >
          <div
            v-for="(subDepartment, subIndex) in departments[activeDepartmentIndex].children"
            :key="subIndex"
            class="secondary-department-card"
            @click="selectSubDepartment(activeDepartmentIndex, subIndex)"
          >
            <div class="card-content">
              {{ subDepartment.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Department {
  name: string
  code: string
  children?: {
    name: string
    code: string 
  }[]
}

const props = defineProps<{
  departments: Department[]
}>()

const departments = ref<Department[]>([])
onMounted(() => {
  departments.value = props.departments
})

const itemsPerPage = 5
const currentPage = ref(0)
const activeDepartmentIndex = ref(0)
const activeSubDepartmentIndex = ref(0)

const visibleDepartments = computed(() => {
  const start = currentPage.value * itemsPerPage
  return departments.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => 
  Math.ceil(departments.value.length / itemsPerPage)
)

const selectDepartment = (index: number) => {
  activeDepartmentIndex.value = index + currentPage.value * itemsPerPage
  activeSubDepartmentIndex.value = -1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits<{
  (e: 'select-sub', department: Department, subDepartment: Department['children'][number]): void
}>()

const selectSubDepartment = (departmentIndex: number, subIndex: number) => {
  activeDepartmentIndex.value = departmentIndex
  activeSubDepartmentIndex.value = subIndex
  
  const department = departments.value[departmentIndex]
  const subDepartment = department?.children?.[subIndex]
  
  if (department && subDepartment) {
    emit('select-sub', department, subDepartment)
    return true
  }
  return false
}
</script>

<style scoped>
.department-select {
  display: flex;
  height: 100%;
  padding: 16px;
  gap: 16px;
}

.primary-department-container {
  width: 240px;
  border-right: 1px solid #e0e0e0;
  padding-right: 16px;
}

.primary-department-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.secondary-department-container {
  flex: 1;
  padding-left: 16px;
}

.primary-department-item {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-department-item:hover {
  background-color: #f5f5f5;
}

.primary-department-item.active {
  border-color: #409eff;
  background-color: #409eff;
  color: white;
  font-weight: bold;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin: 8px 0;
}

.pagination-button {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  box-sizing: border-box;
}

.secondary-department-list {
  flex: 1;
  overflow-y: auto;
}

.secondary-department-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  padding: 8px;
}

.secondary-department-card {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-department-card:hover {
  background-color: #f5f5f5;
}

.card-content {
  text-align: center;
}
</style>
