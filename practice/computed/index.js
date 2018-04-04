import Vue from 'vue'

new Vue({
  el: '#root',
  template: `<div>
              <p>fullName: {{fullName}}</p>
              <p>fullName: {{getName()}}</p>
              <p>{{number}}</p>
              <input type="text" v-model.number="number"/>
              <p>obj.a: <input type="text" v-model="obj.a" /></p>
            </div>`,
  data: {
    firstName: 'zhang',
    lastName: 'xuekai',
    number: 0,
    obj: {
      a: '123'
    }
  },
  // computed会缓存数据, 在组件更新的时候, 数据不变, 就不会调用, 性能高
  computed: {
    // computed里边, 不要修改任何属性, 会导致watch监听死循环
    fullName () {
      console.log('new name')
      return this.firstName + this.lastName
    }
  },
  methods: {
    // 每次组件更新都会进行调用, 性能低
    getName () {
      console.log('get name')
      return this.firstName + this.lastName
    }
  },
  watch: {
    // 监听数据变化, 在处理发请求什么的
    // 可以在字符串中去监听对象的深入调用
    'obj.a': {
      handler () {
        console.log('obj.a 变了')
      },
      immediate: true // 用来立刻出发watch
      // deep: true // 不加deep: true是不会触发obj的变化的, watch只监听obj的引用, 并不会监听内层的变化, deep会遍历obj的所有内层, 性能开销大, 不用deep, 吧obj改成 'obj.a'就能监听到a的变化了
    }
  }
})
