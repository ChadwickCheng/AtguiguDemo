import SvgIcon from '@/components/SvgIcon/index.vue'
import type { Component } from 'vue'
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: { [key: string]: Component } = {
  SvgIcon,
}

export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 注册 Element Plus 图标为全局
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
