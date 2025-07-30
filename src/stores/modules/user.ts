import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 常量路由
import { constantRoutes } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes, // 初始路由
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const res = await reqLogin(data)
      // 成功得token 失败报错
      if (res.code === 200) {
        this.token = res.data.token
        SET_TOKEN(res.data.token)
        // async函数返回成功promise
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message || 'Login failed'))
      }
    },
  },
  getters: {},
})

export default useUserStore
