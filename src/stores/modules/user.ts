import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 常量路由
import { constantRoutes } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes, // 初始路由
      username: '',
      avatar: '',
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
    async userInfo() {
      const res = await reqUserInfo()
      // 获取成功存储信息
      if(res.code === 200){
        this.username = res.data.username
        this.avatar = res.data.avatar || ''
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message || 'Failed to get user info'))
      }
    },
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    }
  },
  getters: {},
})

export default useUserStore
