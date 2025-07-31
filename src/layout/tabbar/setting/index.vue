<template>
  <el-button type="primary" size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button type="primary" size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-button type="primary" size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 48px; height: 48px; border-radius: 12px; margin-right: 0px 10px"
    alt="#"
  />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="RightTabbar">
import useLayoutSettingStore from '@/stores/modules/setting'
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'

const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  const full = document.fullscreenElement;
  if (full) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

const logout = async () => {
  /*
  1. 服务器请求退出登录接口
  2. 清空仓库
  3. 跳转到登录页面
  */
  userStore.userLogout()
  await router.push({ path: '/login', query: { redirect: route.path } }) // 跳转到登录页面
}
</script>

<style scoped lang="scss"></style>
