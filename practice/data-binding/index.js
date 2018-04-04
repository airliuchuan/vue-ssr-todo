import Vue from 'vue'

new Vue({
  el: '#root',
  // 双花括号可以调全局对象比如 Date Array等和Vue实例绑定的data, methods
  // template: `<div :id="a" @click="handleClick">
  //             {{isActive ? 'active' : 'not active'}}
  //           </div>`,

  // 动态class和动态style: 都可以接受[] 或  {}
  template: `<div :class="[{abc: !isActive}, !isActive ? 'active' : '']"
                  :style="[styles, style2]">
              {{isActive ? 'active' : 'not active'}}
              <p>{{joinArr(arr)}} 不推荐这种方式, 推荐computed</p>
              <p>appearance: none清除浏览器默认样式</p>
            </div>`,
  data: {
    isActive: false,
    a: 'name',
    arr: [1, 2, 3],
    styles: {
      color: 'red',
      fontSize: '20px',
      appearance: 'none'
    },
    style2: {
      border: '1px solid #000'
    }
  },
  methods: {
    handleClick () {
      console.log('hhhh')
    },
    joinArr (arr) {
      return arr.join(' ')
    }
  }
})
