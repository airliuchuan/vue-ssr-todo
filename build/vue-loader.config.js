module.exports = isDev => {
  return {
    // 清除template模板的空格
    preserverWhiteSpace: true,
    // 分离.vue文件的css样式到单独文件
    extractCSS: !isDev,
    cssModules: {
      localIndentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false, // 配置热重载
    // loaders: { // 自定义loader

    // }
  }
}