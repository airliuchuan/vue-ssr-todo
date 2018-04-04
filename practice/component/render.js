import Vue from 'vue'

const component = {
  props: ['prop1'],
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  methods: {
    // handleClick () {
    //   this.$emit('click')
    // }
  },
  render () {
    // 不具名就写default, 具名就写对应的name值
    return this.$createElement('div', {style: this.style}, [this.$slots.header, this.prop1])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        background: 'red'
      },
      value: 'component value'
    }
  }
}
// $createElement() vue用来创建节点的函数
new Vue({
  el: '#root',
  components: {
    ComPon: component
  },
  data () {
    return {
      value: 123
    }
  },
  methods: {
    handleClick () {
      console.log('handleClick')
    }
  },
  // template: `
  //   <div>
  //     <com-pon ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </com-pon>
  //   </div>
  // `,
  // 如果没有传createElement参数, 则需要用this.$createElement('节点', {标签属性}, 标签内容(子节点需要包在数组里, 如果不是节点, 不需要数组))
  render (createElement) {
    return createElement('com-pon', {
      ref: 'comp',
      props: {prop1: '我是prop1'},
      on: {
        click: this.handleClick
      },
      // nativeOn: 直接吧事件绑定到组件跟节点, 不用$emit去派发
      nativeOn: {
        click: this.handleClick
      }
    }, [createElement('span', {ref: 'span', slot: 'header', attrs: {id: 'test'}, domProps: {innerHTML: '<span>lalal</span>'}}, this.value)]) // solt: 将节点绑定到固定的具名slot上
  }
})
