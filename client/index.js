import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
// 引入router和store实例
import createRouter from './config/router'
import createStore from './store/store'

import './assets/css/reset.styl'

// 继承router和vuex
Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 动态注入vuex模块
store.registerModule('c', {
  state: {
    text: 'c'
  }
})
// 解绑vuex模块
store.unregisterModule('c')
// 用来监听state里数据的变化, 第一个参数相当初getters, 第二个回调相当于vue的watch
store.watch(state => state.count + 1, (newCount) => {
  console.log('count变了: ', newCount)
})
// 用来监听目前正被调用的mutations和mutations的参数
// store.subscribe((mutation, state) => {
//   console.log('正被调用的mutations: ', mutation.type)
//   console.log('他的参数是: ', mutation.payload)
// })
// 监听 这在执行的action
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// 路由全局钩子, beforeEach(), beforeResolve(), afterEach()
// 跳转之前触发, 用于判断需要登录的页面登录
// replace: 这次跳转不会记录到history里
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  next()
  // if (to.fullPath === '/login') next()
  // else next({path: '/login', replace: true})
})
// 111
router.beforeResolve((to, from, next) => {
  console.log(to)
  console.log('beforeResolve')
  next()
})
// 跳转之后触发
router.afterEach((to, from) => {
  console.log(to)
  console.log('afterEach')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
