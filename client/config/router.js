// import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

// Vue.use(Router)

// export default 不能直接导出一个实例
export default () => {
  return new Router({
    routes,
    // 在history模式下, 如果不在webpack-dev-Server中配置historyApiFallback刷新之后就会cannot get
    // 如果使用base, 刷新后会报找不到文件路径的错误, 但是使用router-link和$router.push就不会出问题
    mode: 'history',
    // base: '/base/'
    // active和exact-active的区别: exact会完全匹配路由, 如果路由在/login/exact to="/login/exact" -> 两个active都有; 如果to="/login"就只会有active
    // linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
    scrollBehavior (to, from, savedPosition) {
      // to: 目标路由 from: 从哪里来路由, to from是一个route对象
      // savedPosition 记录上一次滚动的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
    // 默认为true,对不支持h5History的自动转hash, false的话ie9下会刷新页面
    // fallback: true
  })
}

// export default router // 服务器渲染时候不可以这样做, 要导出一个匿名的实例, 否则会导致内存溢出
