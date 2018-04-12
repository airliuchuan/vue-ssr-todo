const path = require('path')
const createVueLoaderOptions = require('../build/vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public')
    // publicPath: 'http://127.0.0.1:8000/public/' // 这里设置的路径, 需要在devServer中的historyFallback.index属性中加在前边
  },
  module: {
    rules: [
      {test: /\.(vue|js|jsx)$/, loader: 'eslint-loader', exclude: /node_modules/, enforce: 'pre'},
      {test: /\.vue$/, loader: 'vue-loader', options: createVueLoaderOptions(isDev)},
      {test: /\.jsx$/, loader: 'babel-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude:/node_modules/},
      {test: /\.(gif|jpg|png|jpeg|svg)$/, use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8196,
            name: 'resource/[path][name]-[hash:8].[ext]'
          }
        }
      ]}
    ]
  }
}

if (isDev) {
  config.output.publicPath = 'http://127.0.0.1:8000/public/'
}

module.exports = config
