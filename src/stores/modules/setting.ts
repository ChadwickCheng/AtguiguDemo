// 关于layout配置
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 是否折叠
      refresh: false, // 是否刷新
    }
  },
})

export default useLayoutSettingStore
