import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { start, done } from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/appointment',
    name: 'appointment',
    component: () => import('@/views/AppointmentView.vue'),
    meta: {
      title: '预约'
    }
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('@/views/CardView.vue'),
    meta: {
      title: '卡片'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 全局前置守卫
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  start()
  document.title = to.meta.title ? `${to.meta.title} | 我的应用` : '我的应用'
  next()
})

// 全局后置钩子
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  done()
})

export default router
