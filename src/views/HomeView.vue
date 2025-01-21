<template>
  <div class="home">
    <!-- 菜单网格 -->
    <div class="menu">
      <div class="menu-grid">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name" 
          :to="item.path"
          class="menu-item"
        >
          <div class="menu-content">
            <span class="menu-text">{{ item.text }}</span>
            <span class="menu-subtext">{{ item.subText }}</span>
          </div>
          <img :src="item.icon" class="menu-icon">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import logoIcon from '@/assets/logo.png'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const menuItems = [
      { name: 'register', text: '挂号/预约', subText: '快速挂号就诊', path: '/register', icon: logoIcon }, 
      { name: 'card', text: '自助办卡', subText: '办理就诊卡', path: '/card', icon: logoIcon },
      { name: 'payment', text: '自助缴费', subText: '门诊住院缴费', path: '/payment', icon: logoIcon },
      { name: 'fee', text: '门诊费用清单', subText: '查询门诊费用', path: '/fee', icon: logoIcon },
      { name: 'price', text: '物价查询', subText: '医疗服务价格', path: '/price', icon: logoIcon },
      { name: 'test-report', text: '检验报告打印', subText: '打印检验结果', path: '/test-report', icon: logoIcon },
      { name: 'exam-report', text: '检查报告打印', subText: '打印检查结果', path: '/exam-report', icon: logoIcon },
      { name: 'deposit', text: '住院押金', subText: '住院预交金', path: '/deposit', icon: logoIcon },
      { name: 'list', text: '住院清单打印', subText: '住院费用明细', path: '/list', icon: logoIcon },
      { name: 'hospital', text: '医院介绍', subText: '医院概况', path: '/hospital', icon: logoIcon },
    ] 

    return {
      menuItems
    }
  }
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
} 

.menu {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-sizing: border-box;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0;
  width: 80%;
  max-width: 960px;
  margin: 20px auto 0;
  box-sizing: border-box;
  align-self: flex-start;
}

.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  color: white;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 120px;
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 40px;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.05));
  z-index: 1;
}

.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.menu-text {
  font-size: 1.8rem;
  text-align: left;
  font-weight: 600;
  z-index: 2;
  margin-bottom: 12px;
}

.menu-subtext {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 4px;
  z-index: 2;
  line-height: 1.4;
}

.menu-icon {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 12px;
  bottom: 12px;
  opacity: 0.8;
  z-index: 2;
}

/* 新橙紫蓝色系 */
.menu-item:nth-child(1) { background-color: #ff7f50; } /* 珊瑚橙 */
.menu-item:nth-child(2) { background-color: #8a2be2; } /* 蓝紫 */
.menu-item:nth-child(3) { background-color: #1e90ff; } /* 道奇蓝 */
.menu-item:nth-child(4) { background-color: #ff4500; } /* 橙红 */
.menu-item:nth-child(5) { background-color: #9400d3; } /* 深紫罗兰 */
.menu-item:nth-child(6) { background-color: #4169e1; } /* 皇室蓝 */
.menu-item:nth-child(7) { background-color: #ff8c00; } /* 深橙 */
.menu-item:nth-child(8) { background-color: #9932cc; } /* 深兰花紫 */
.menu-item:nth-child(9) { background-color: #00bfff; } /* 深天蓝 */
.menu-item:nth-child(10) { background-color: #ff6347; } /* 番茄红 */
.menu-item:nth-child(11) { background-color: #7b68ee; } /* 中紫罗兰蓝 */

.menu-subtext {
  color: rgba(255, 255, 255, 0.8);
}
</style>
