import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa '
  },
  // 组件初始化时候调用, 在此声明周期, dom还未产生
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  // 编译和挂载模板
  beforeMount () {
    // dom为最初始的#root
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    // 模板编译完成并挂载到了#root上
    console.log(this.$el, 'mounted')
  },
  // 数据更新时执行
  beforeUpdate () {
    console.log(this.$el, 'beforeUpdate')
  },
  updated () {
    console.log(this.$el, 'updated')
  },
  // keep-alive 路由缓存时触发
  activated () {
    console.log(this.$el, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this.$el, 'beforeDestory')
  },
  destroyed () {
    console.log(this.$el, 'destroyed')
  },
  // 在编译 如果有template则把template变成一个render函数
  render (h) {
    console.log('render')
    return h('div', {}, this.text)
  },
  // 本组件出现error时候触发
  renderError (h, error) {
    return h('div', {}, error.stack)
  },
  errorCaptured () {
    // 会向上冒泡,可以在开发环境使用, 用来捕获组件错误
  }
})

app.$mount('#root')
setTimeout(() => {
  app.$destroy()
}, 2000)
