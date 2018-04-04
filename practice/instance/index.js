import Vue from 'vue'
const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})
app.$mount('#root')
let i = 0
setInterval(() => {
  i++
  app.text++
  app.obj.a = i
  console.log(app.obj.a)
}, 1000)
// Vue属性
// console.log(app.$data)
// console.log(app.$options)
// console.log(app.$el)
// app.$options.render = h => {
//   return h('p', {}, 'hello ')
// }
// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slot)
// console.log(app.$scopedSlots)
// console.log($ref)
// console.log(app.$isServer) // 用来判断是否ssr

// Vue方法
// 数据监听, 和写在实例里的watch一样, 在实例中, 当组件被销毁,watch监听也会被销毁
// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// 时间监听on和once
// app.$once('test', (a, b) => {
//   console.log('test emit' + a + b)
// })
// 派发事件
// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)
// 强制渲染
// app.$forceUpdate()
// tip: 在data内没有声明的变量是无发进行reactive(双向绑定)的, 比如data里声明里一个对象, 但是没声明对象里的内容, 再去添加的话是无法reactive, 1,app.$forceUpdate()可以解决, 但是很容易造成性能问题, 2. app.$set(app.obj, 'a', i)
// app.$set(app.obj, 'a', i) // 添加属性
// app.$delete() // 删除属性
app.$nextTick(() => {}) // dom在循环更新后再执行, 当data更新了,但是拿不到dom节点时候, 可以试着在nextTick的回调里写
