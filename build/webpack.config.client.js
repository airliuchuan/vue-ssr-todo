const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const cdnConfig = require('../app.config').cdn

const isDev = process.env.NODE_ENV === 'development'

// 为什么不直接配置再base里边?因为ssr渲染另需要一个单独的webpack配置
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './template.html')
  }),
  new VueClientPlugin()
]

let config
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  hot: true,
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  }
}
if(isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {test: /\.styl$/, use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]},
      ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]),
    devServer
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: cdnConfig.host
    },
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
    plugins: defaultPlugins.concat([
      new ExtractTextWebpackPlugin('style.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin() // 为webpack打包的文件添加注释命名
    ])
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
