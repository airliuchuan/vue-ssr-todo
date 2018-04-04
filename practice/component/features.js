import Vue from 'vue'

const SunZi = {
  template: `
    <div>我是孙子组件: {{data.value}}</div>
  `,
  // inject接收来自祖宗组件的provide里的各选项为一个数组, 之后子组件可以用this调用
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.yeye, this.value)
  }
}

const component = {
  components: {
    SunZi
  },
  template: `
    <div :style="style">
      具名插槽slot
      slot-scope传值
      <slot name="header" value="123" aaa="222"></slot>
      <slot name="body"></slot>
      <sun-zi></sun-zi>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        backgroundColor: 'red'
      }
    }
  }
}

new Vue({
  // provide属性可以向其子组件的子组件的子组件的等等传值
  // 但是必须是一个函数返回一个匿名的组件
  // provide默认不提供reactive(双向绑定), 但是通过Object.defineProperty(data, 'value', {get, enumerable})的get方法(不推荐使用)
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: 123
    }
  },
  components: {
    ComVue: component
  },
  // slot通过slot-scope属性往父组件里传东西, slot里的属性都会作为slot-scope上的值
  template: `
  <div>
    <com-vue ref="comp">
      <p ref="p" slot="header" slot-scope="msg">我是header{{msg.value}}{{msg.aaa}}</p>
      <p slot="body">我是con</p>
    </com-vue>
    <input type="text" v-model="value"/>
  </div>
  `,
  mounted () {
    // ref写在dom上返回的是dom节点, 写在组件上, 返回的是组件实例(不推荐用)
    console.log(this.$refs.p, this.$refs.comp)
  }
})
