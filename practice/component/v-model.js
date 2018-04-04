import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input type="text" @input="handleChange" :value="value1"/>
    </div>
  `,
  methods: {
    handleChange (e) {
      // input
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    ComOne: component
  },
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <com-one :value1="value" @input="value = arguments[0]"/>
      <com-one v-model="value" />
    </div>
  `
})
