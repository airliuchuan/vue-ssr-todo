const Router = require('koa-router')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const MemoryFS = require('memory-fs') // 和原生的fs一样(还有些扩展), 区别: 不写入磁盘, 效率高
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')

// 1.拿到webpack配置文件
const serverConfig = require('../../build/webpack.config.server')
// 2. 编译webpack
const serverCompiler = webpack(serverConfig)
// 3. 指定webpackCompiler的输出目录在memoryFs里
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
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
    'vue-ssr-server-bundle.json' // 这是webpack配置中 VueServerPlugin自动生成的文件名, 可以通过.filename更改
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
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
  // 使用createRenderer() 方法性能更高, 并且可以控制流程
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
