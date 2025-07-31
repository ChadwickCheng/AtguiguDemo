<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
import useLayoutSettingStore from '@/stores/modules/setting';
import { ref, watch, nextTick } from 'vue';

const layoutSettingStore = useLayoutSettingStore();

const flag = ref(true);

watch(() => layoutSettingStore.refresh, () => {
  // 点刷新销毁路由 nextTick保证响应数据变化后dom更新完毕
  flag.value = !flag.value;
  nextTick(() => {
    flag.value = true; // 恢复路由
  });
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
