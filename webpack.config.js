const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.jsx$/, loader: 'babel-loader'},
      {test: /\.(gif|jpg|png|jpeg|svg)$/, use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8196,
            name: '[name]-aaa.[ext]'
          }
        }
      ]}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin()
  ]
}

if(isDev) {
  config.module.rules.push(
    {test: /\.styl$/, use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          souceMap: true
        }
      },
      'stylus-loader'
    ]}
  )
  config.devtool = '#cheap-module-eval-souce-map',
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {test: /\.styl$/, 
      use: ExtractTextWebpackPlugin.extract(
        {
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                souceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      )
    },
  )
  config.plugins.push(
    new ExtractTextWebpackPlugin('style.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}
 
module.exports = config