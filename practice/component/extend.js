import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  data () {
    return {
      text: 0
    }
  },
  template: `
    <div>
      <input type="text" v-model="text"/>
      <span @click="handleChange">{{propOne}} {{test}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('com mounted')
  }
}

// extend的第一种用法: 拓展Vue实例类似于webpack-merge
// const CompVue = Vue.extend(component)
// // propsData用来通过extend方法提供props
// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     test: 'test'
//   },
//   mounted () {
//     console.log('instanced mounted')
//   }
// })

const parent = new Vue({
  name: 'parent'
})

// extend的第二种用法, 用在子组件中
const component2 = {
  extends: component,
  data () {
    return {
      text: 1,
      test: 'AAAA'
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
    // 在子组件的内部可以通过$parent来改变父附件的data(但是强烈建议不要这么做)
    // parent只能用在Vue实例里, 而且建议只通过this.$parent查看数据
    this.$parent.text = 54321
  }
}

new Vue({
  parent: parent,
  // vue会把name属性挂载到$options上, 直接通过Vue实例是无法访问到的
  name: 'root',
  el: '#root',
  components: {
    ComInp: component2
  },
  data: {
    text: 123123
  },
  template: `
  <div>
  <span>{{text}}</span>
  <com-inp></com-inp>
  </div>
  `,
  mounted () {
    console.log(this.$parent.$options.name)
  }
})
