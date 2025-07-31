import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/stores/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期，请重新登录'
        break
      case 403:
        message = '没有权限访问该资源'
        break
      case 404:
        message = '请求的资源不存在'
        break
      case 500:
        message = '服务器内部错误，请稍后再试'
        break
      default:
        message = '未知错误，请稍后再试'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default request
