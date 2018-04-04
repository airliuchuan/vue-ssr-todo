const Router = require('koa-router')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
// const MemoryFS = require('memory-fs') // 和原生的fs一样(还有些扩展), 区别: 不写入磁盘, 效率高 // --- 放弃mfs
const webpack = require('webpack')
// 两个nodejs原生模块, 隐藏比较深
// const NativeModule = require('module') // 用来给js代码模块化(套个func(require, exports, module)) // --- 放弃mfs
// const vm = require('vm') // 将字符串转化为可执行的代码 // --- 放弃mfs
// 两个nodejs原生模块, 隐藏比较深
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render-no-bundle')

// 1.拿到webpack配置文件
const serverConfig = require('../../build/webpack.config.server')
// 2. 编译webpack
const serverCompiler = webpack(serverConfig)
// 3. 指定webpackCompiler的输出目录在memoryFs里
// const mfs = new MemoryFS() // --- 放弃mfs
// serverCompiler.outputFileSystem = mfs // --- 放弃mfs
//
let bundle

serverCompiler.watch({}, (err, stats) => {
  // 监控并打印webpack打包时和eslint的错误
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))
  // 读取, 打包的文件
  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js' // 这是webpack配置中 VueServerPlugin自动生成的文件名, 可以通过.filename更改
  )
  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry').default
  // --- 放弃mfs
  // try {
  //   // 只用于开发模式下
  //   // 如果使用异步加载路由, 会报错找不到文件, 因为用到mfs只是把js存到内存中了, 异步架子需要请求文件, 解决方法1, 放弃异步路由, 2, 放弃mfs
  //   const m = {exports: {}}
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (err) {
  //   console.error('no-bundle-dev-ssr:', err)
  // }

  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '请稍等'
    return
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )
  // 使用createRenderer() 方法性能更高, 并且可以控制流程, createRenderer()读取的是入口js文件
  const renderer = VueServerRenderer.createRenderer({
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
