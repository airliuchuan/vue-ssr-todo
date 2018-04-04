import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// 用于ssr的meta信息注入
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
import Notification from './components/notification/index'
import Tabs from './components/tabs/index'

import './assets/css/reset.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
// use之后就可以直接在组件里添加metaInfo属性
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  const store = createStore()
  const router = createRouter()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {app, router, store}
}
