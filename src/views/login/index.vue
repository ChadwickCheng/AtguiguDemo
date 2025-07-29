<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>Welcome to the Tutti!</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Login">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

const router = useRouter()
const useStore = useUserStore()

const loading = ref(false)

const loginForms = ref()

const loginForm = reactive({
  username: '',
  password: '',
})

const login = async () => {
  /*
    1. 通知仓库登录
    2. 成功展示数据
    3. 失败提示错误信息
    */
  await loginForms.value.validate()
  //  开始加载状态
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      title: `${getTime()}, 欢迎回来`,
      message: '欢迎回来！',
      type: 'success',
      duration: 3000,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      title: '登录失败',
      message: (error as Error).message || '请检查用户名和密码',
      type: 'error',
      duration: 3000,
    })
  }
}

// 表单校验
const validatorUserName = (
  rule: Record<string, unknown>,
  value: string,
  callback: (error?: Error) => void,
) => {
  // rule 规则校验对象； value 表单值； callback 回调函数
  if (/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名必须是3-20个字符的字母、数字或下划线'))
  }
}

const rules = {
  username: [
    // { required: true, message: '请输入用户名', trigger: 'blur' },
    // { required: true, min: 3, max: 20, message: '用户名长度在3-20个字符之间', trigger: 'blur' },
    { trigger: 'change', validator: validatorUserName }, // el默认校验有局限 可以使用自定义校验
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { required: true, min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('/images/shirobako.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('/images/cover.jpg') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
      height: 40px;
      background-color: #409eff;
    }
  }
}
</style>
