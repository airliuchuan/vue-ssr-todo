const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-type'] = 'text/html'
  const context = {url: ctx.path, user: ctx.session.user}

  try {
    const appString = await renderer.renderToString(context)
    // 在重定向之前, 并没有必要通过renderToString()渲染html(耗损性能)
    // 使用VueServerRenderer.createBundleRenderer(), 必须传入bundle,只能先渲染 => 弃用
    // 在路由跳转'/login'之前, 重新渲染, 防止出现todo页
    if (context.router.currentRoute.fullPath !== ctx.path) {
     return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const {
      title
    } = context.meta.inject() // 通过inject()获取到meta的title信息

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState()
    })
    ctx.body = html
  } catch (err) {
    console.log('render err', err)
    throw err
  }
}
