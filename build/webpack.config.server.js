const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin') // vue-server-renderer
const baseConfig = require('./webpack.config.base')


// 为什么不直接配置再base里边?因为ssr渲染另需要一个单独的webpack配置
const isDev = process.env.NODE_ENV === 'development'
let config

const plugins = [
  new ExtractTextWebpackPlugin('style.[contentHash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    'process.env.VUE_ENV': '"server"'
  })
  // isDev ? new VueServerPlugin() : null // 如果在开发环境, 需要bundle, 线上不需要bundleRenderer, webpack不让传null[报错]
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

config = merge(baseConfig, {
  target: 'node', // ssr新加的
  entry: path.join(__dirname, '../client/server-entry.js'), // ssr新加的
  devtool: 'source-map', // ssr新加的
  output: {
    libraryTarget: 'commonjs2', // 以commonjs的规范去打包js文件 ssr新加的
    filename: 'server-entry.js', // ssr新加的
    path: path.join(__dirname, '../server-build') // ssr新加的
  },
  externals: Object.keys(require('../package.json').dependencies), // ssr不需要单独打包vue等库文件, 过滤掉 ssr新加的
  module: {
    rules: [
      {test: /\.styl$/,
        use: ExtractTextWebpackPlugin.extract(
          {
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          }
        )
      },
    ]
  },
  plugins
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
