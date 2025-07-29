import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

export const reqLogin = (data: loginForm): Promise<loginResponseData> => {
  return request.post(API.LOGIN_URL, data)
}

export const reqUserInfo = (): Promise<userResponseData> => {
  return request.get(API.USERINFO_URL)
}
