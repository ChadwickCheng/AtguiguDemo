// 路由鉴权 路由是否可被访问
import router from '@/router'
import nprogress from 'nprogress' // 进度条
// 进度条插件样式
import 'nprogress/nprogress.css'
import useUserStore from './stores/modules/user'
import settings from './setting'

nprogress.configure({ showSpinner: false }) // 禁用加载动画

// 全局守卫 任意路由皆可触发

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = settings.title + '-' + to.meta.title
  // 访问路由前执行
  // to 将要访问的location
  // from 从哪个location跳转过来
  // next() 放行函数
  nprogress.start() // 开始进度条

  // 在路由守卫内部获取 store 实例
  const userStore = useUserStore()

  // 获取token
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path === '/login') {
      // 如果访问的是登录页，重定向到首页
      next({ path: '/' })
    } else {
      // 如果访问的不是登录页，放行
      // 有用户信息 放行；没有 则守卫发请求获取信息再放行
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next() // 放行
        } catch (error) {
          // 1. token过期 2. 用户手动改token
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } }) // 重定向到登录页
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      // 如果访问的是登录页，放行
      next()
    } else {
      // 如果访问的不是登录页，重定向到登录页
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done() // 结束进度条
})

/*
1. 路由切换显示进度条 nprogress插件
2. 路由鉴权 路由组件访问权限设置
  用户未登录可以访问login，访问其余指向login
  用户登陆成功不可访问login，会指向首页，其余正常访问
  token判断用户是否登录
*/
