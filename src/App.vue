<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, provide } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { useErrorStore } from '@/stores/error'

// 获取当前时间
const currentTime = ref('')
const currentDate = ref('')
const currentDay = ref('')

// 状态管理
const loadingStore = useLoadingStore()
const errorStore = useErrorStore()

// 提供全局状态
provide('loading', loadingStore)
provide('error', errorStore)

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})

function updateDateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
  currentDay.value = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()]
} 
</script>

<template>
  <div class="app-container">
    <!-- 顶部幻灯片 -->
    <div class="slideshow">
      <img src="@/assets/logo.png" alt="医院图片">
    </div>

    <!-- 标题栏 -->
    <div class="header">
      <div class="left">
        <img src="@/assets/logo.png" class="logo">
        <span class="hospital-name">XX医院</span>
      </div>
      <div class="right">
        <div class="datetime">
          <div class="time">{{ currentTime }}</div>
          <div class="date">{{ currentDate }} 星期{{ currentDay }}</div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="page-wrapper">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="footer-content">
        <p>设备终端号：001</p>
        <p>技术支持：XXXX公司</p>
        <p>设备状态：正常</p>
      </div>
    </div>

    <!-- 全局状态 -->
    <div v-if="loadingStore.isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>

    <div v-if="errorStore.message" class="error-message">
      {{ errorStore.message }}
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.slideshow {
  width: 100%;
  height: 25vh;
  min-height: 250px;
  background-color: #f0f0f0;
  overflow: hidden;
  background: linear-gradient(135deg, #1e90ff, #8a2be2);
}

.slideshow img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 90px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header .logo {
  width: 48px;
  height: 48px;
}

.header .hospital-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  line-height: 32px;
}

.header .right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.header .datetime {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-align: center;
  height: 100%;
  font-weight: 900;
}

.header .time {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.header .date {
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

.page-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 90px - 40px - 25vh);
  overflow: auto;
  background-color: white; 
}

.footer {
  position: sticky;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #666;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
