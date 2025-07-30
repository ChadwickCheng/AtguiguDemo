<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 一个以上子路由 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <LeftMenu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="LeftMenu">
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

defineProps(['menuList'])

const router = useRouter()
// 获取当前组件实例，用于递归调用
const LeftMenu = getCurrentInstance()?.type

const goRoute = (vc: { index: string }) => {
  // vc.index is the path of the route
  router.push(vc.index)
}
</script>

<style scoped></style>
