import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // 滚动行为
  scrollBehavior(){
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
