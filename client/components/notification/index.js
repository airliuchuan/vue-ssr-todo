import Notification from './notification.vue'
import notify from './function'

// 1. 将notification组件注册到全局组件Vue.component(name, component) 2.
export default Vue => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
