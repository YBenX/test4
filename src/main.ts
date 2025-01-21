import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 全局样式
import './style.css'

const app = createApp(App)
const pinia = createPinia()

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err)
  // 这里可以添加错误上报逻辑
}

// 性能监控
if (import.meta.env.MODE === 'development') {
  console.log('Development mode enabled')
}

app.use(pinia)
app.use(router)

app.mount('#app')
