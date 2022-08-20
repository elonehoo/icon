import type { App, Plugin } from 'vue'
import icon from './icon.vue'

export const iconPlugin: Plugin = {
  install(app: App) {
    app.component('icon', icon)
  },
}

export { icon }
