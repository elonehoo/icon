import type { App, Plugin } from 'vue'

import { iconPlugin } from './icon'

const pickPlugin: Plugin = {
  install(app: App) {
    iconPlugin.install?.(app)
  },
}

export default pickPlugin

export * from './icon'
