<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, idx) in $route.matched"
      :key="idx"
      v-show="item.meta.title"
      :to="{ path: item.path }"
    >
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span style="margin: 0px 2px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="LeftTabbar">
/*
$route.matched returns an array of route records that match the current route.
*/
import useLayoutSettingStore from '@/stores/modules/setting'

const LayOutSettingStore = useLayoutSettingStore()

const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped lang="scss"></style>
