export interface loginForm{
  username: string;
  password: string;
}

// 用户信息类型定义
export interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
}

// 登录响应数据类型定义
export interface loginResponseData {
  code: number;
  message: string;
  data: {
    token: string;
    userInfo: userInfo;
  };
}

// 返回用户信息
export interface userResponseData {
  code: number;
  message: string;
  data: userInfo;
}
