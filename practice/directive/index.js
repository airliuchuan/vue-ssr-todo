import Vue from 'vue'

new Vue({
  el: '#root',
  // v-if: 是增删节点, 从新编译挂载, 造成重绘, 对性能影响大
  // v-show: css的display:none, 性能更好
  // v-for要在dom上绑定:key, 并赋给他唯一个值(不要用index), 如果这个值不变, 就不会重新渲染这个dom
  // 通过v-model可以改变checkbox和radio的选中状态, radio通过v-model的值和value的比较, checkbox只要v-model有值就是selected
  template: `<div>
              <p v-show="!active">Text: {{text}}</p>
              <p v-pre>Text: {{text}} v-pre: 里边的表达式不会解析, 直接显示</p>
              <p v-once>Text: {{text}} v-once: {{}}里面只会执行一次, vue不会检查这个dom节点, 提高性能</p>
              <p v-if="active" v-html="html"></p>
              <p v-else-if="!active">else-if</p>
              <p v-else>{{html}}</p>
              <!-- <input type="text" v-model.number="text"/> -->
              <!-- <input type="text" v-model.trim="text"/> -->
              <input type="text" v-model.lazy="text"/>
              <input type="checkbox" v-model="active"/>
              <div>
                <input type="checkbox" :value="1" v-model="arr">
                <input type="checkbox" :value="2" v-model="arr">
                <input type="checkbox" :value="3" v-model="arr">
              </div>
              <div>
                <input type="radio" value="one" v-model="picked">
                <input type="radio" value="two" v-model="picked">
              </div>
              <ul>
                <li v-for="(item,index) in arr" :key="item">{{item + ' ' + index}}</li>
              </ul>
              <ul>
                <li v-for="(val, key, index) in obj">{{key}}:{{val}}:{{index}}</li>
              </ul>
            </div>`,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: 'abc',
      b: 'bca',
      c: 'cab'
    },
    text: 0,
    active: false,
    html: '<span>这是一个span</span>',
    picked: ''
  }
})
