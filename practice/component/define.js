import Vue from 'vue'

const component = {
  props: {
    propOne: {
      type: String,
      default: 'propOne'
    },
    active: {
      type: Boolean,
      default: false
    },
    propObj: {
      type: Object,
      default () {
        return {
          a: 'propObj.a'
        }
      }
    },
    validators: {
      // validator函数可以自定义验证props
      validator (value) {
        return typeof value === 'boolean'
      }
    }
  },
  template: `
      <div>
        <input type="text" v-model="text">
        <span>{{text}}</span>
        <span @click="changePropOne">{{propOne}}</span>
        <span v-show="active">是否展示看active</span>
        <span>{{propObj.a}}</span>
      </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    changePropOne () {
      console.log(1)
      this.$emit('change')
    }
  }
}

new Vue({
  el: '#root',
  template: `<com-inp :prop-one="propNew" validators="true" :active="true" @change="changePropOne"></com-inp>`,
  components: {
    ComInp: component
  },
  data: {
    propNew: '爹爹'
  },
  methods: {
    changePropOne () {
      this.propNew += 1
    }
  }
})
