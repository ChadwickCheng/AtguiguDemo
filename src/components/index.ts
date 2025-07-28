import SvgIcon from '@/components/SvgIcon/index.vue'

import type { Component } from 'vue'
const allGlobalComponent: { [key: string]: Component } = {
  SvgIcon,
}

import type { App } from 'vue'

export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
