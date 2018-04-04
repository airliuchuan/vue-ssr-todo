// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

// 路由内钩子beforeEnter, 调用顺序在beforeEach和beforeResolve之间
// 异步路由组件: component参数接收一个函数
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props: true, // 好处是组件和路由的解耦, 推荐开启props: true后, 参数:id会被当成props传进组件, 必须在组件中声明id这个props, props还可以接收一个函数(route) => ({id: route.query.b}), 这个route就相当于组件内的$route
    // component: Todo,
    component: () => import(/* webpackChunkName: 'todo-view */ '../views/todo/todo.vue'), // 要支持import()这种语法需要引入一个babel插件: babel-plugin-syntax-dynamic-import, 在.babelrc下添加次插件
    // name 可以用来路由跳转, meta用来传递数据
    name: 'app',
    meta: {
      title: 'this is a title',
      description: 'dadsfd'
    },
    beforeEnter (to, from, next) {
      console.log('beforeEnter')
      next()
    }
  },
  {
    path: '/login',
    // component: Login
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue') // 正式环境webpack会单独打包每个route并异步加载, 默认用id取名, 不利于缓存, 加上这个注释可以自定义命名利于缓存,
  }
]
