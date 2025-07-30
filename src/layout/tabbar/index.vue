<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <LeftTabbar />
    </div>
    <div class="tabbar_right">
      <RightTabbar />
    </div>
  </div>
</template>

<script setup lang="ts" name="Tabbar">
import LeftTabbar from './breadcrumb/index.vue'
import RightTabbar from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, #f0f2f5, #e6e9ef);

  &_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  &_right {
    display: flex;
    align-items: center;
  }
}
</style>
