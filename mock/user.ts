function createUserList() {
  return [
    {
      userId: 1,
      avatar:'https://tutti.fan/api/statics/KuonjiWeb/author_avatar/1751958895104-v2fv5C9mO.jpg',
      username: 'admin',
      password: '123456',
      desc: 'Administrator',
      roles: ['admin'],
      buttons: ['add', 'edit', 'delete', 'view'],
      routes: ['home'],
      token: 'admin token'
    }
  ]
}

export default [
  // Mock user login
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const userList = createUserList()
      const user = userList.find(user => user.username === username && user.password === password)

      if (user) {
        return {
          code: 200,
          message: 'Login successful',
          data: {
            token: user.token,
            userInfo: {
              userId: user.userId,
              avatar: user.avatar,
              username: user.username,
              desc: user.desc,
              roles: user.roles,
              buttons: user.buttons,
              routes: user.routes
            }
          }
        }
      } else {
        return {
          code: 401,
          message: 'Invalid username or password'
        }
      }
    }
  },
  // Mock user info retrieval
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ query }) => {
      const { token } = query
      const userList = createUserList()
      const user = userList.find(user => user.token === token)

      if (user) {
        return {
          code: 200,
          message: 'User info retrieved successfully',
          data: {
            userId: user.userId,
            avatar: user.avatar,
            username: user.username,
            desc: user.desc,
            roles: user.roles,
            buttons: user.buttons,
            routes: user.routes
          }
        }
      } else {
        return {
          code: 401,
          message: 'Invalid token'
        }
      }
    }
  }
]
