import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()

    if (context.user) {
      store.state.user = context.user
    }
    router.push(context.url)

    // 只会在ssr渲染才会用到
    router.onReady(() => {
      // 拿到路由匹配的组件,是组件实例的数组
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then(data => {
        console.log(data)
        // 把client里的meta信息传到服务器
        context.meta = app.$meta()
        context.state = store.state
        context.router = router
        resolve(app)
      })
    })
  })
}
