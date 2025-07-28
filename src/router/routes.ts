export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 懒加载
    name: 'Login',
  },
  {
    path:'/',
    component: () => import('@/views/home/index.vue'),
    name: 'Home',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  // 任意路由
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    name: 'Any'
  }
]
