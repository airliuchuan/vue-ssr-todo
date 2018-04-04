// 配合服务器渲染加载meta元信息
import createApp from './create-app'
import bus from './uitl/bus'

const {app, router, store} = createApp()

// 把通过ssr取出来的state直接赋值非state
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('toLogin', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
