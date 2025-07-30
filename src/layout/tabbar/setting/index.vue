<template>
  <el-button type="primary" size="small" icon="Refresh" circle></el-button>
  <el-button type="primary" size="small" icon="FullScreen" circle></el-button>
  <el-button type="primary" size="small" icon="Setting" circle></el-button>
  <img
    src="/images/appicon.png"
    style="width: 24px; height: 24px; border-radius: 12px; margin-right: 0px 10px"
    alt="#"
  />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      Kuonji Alice
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="RightTabbar"></script>

<style scoped lang="scss"></style>
