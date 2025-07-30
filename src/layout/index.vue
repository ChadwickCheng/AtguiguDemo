<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ 'fold': LayoutSettingStore.fold?true:false }">
      <LeftLogo />
      <!-- 滚动组件放菜单组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="LayoutSettingStore.fold?true:false" background-color="#001529" text-color="white"
        active-text-color="#409eff" :default-active="$route.path">
          <LeftMenu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
      <div class="layout_tabbar" :class="{ 'fold': LayoutSettingStore.fold?true:false }">
        <Tabbar />
      </div>
    <!-- 内容展示区域 -->
      <div class="layout_main" :class="{ 'fold': LayoutSettingStore.fold?true:false }">
        <Main></Main>
      </div>
  </div>
</template>

<script setup lang='ts' name='Layout'>
  import LeftLogo from './logo/index.vue';
  import LeftMenu from './menu/index.vue';
  import useUserStore from '@/stores/modules/user';
  import Main from './main/index.vue';
  import Tabbar from './tabbar/index.vue';
  import useLayoutSettingStore from '@/stores/modules/setting';

  const userStore = useUserStore();
  const LayoutSettingStore = useLayoutSettingStore();


</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
