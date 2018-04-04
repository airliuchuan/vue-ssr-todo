import Tab from './tab.vue'
import Tabs from './tabs.vue'

export default (Vue) => {
  Vue.component(Tabs.name, Tabs)
  Vue.component(Tab.name, Tab)
}
