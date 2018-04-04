<template>
  <section class="real-app">
    <div class="tab-container">
      <!-- <tabs :value="tabValue" @change="handleChangeTab">
        <tab label="tab1" index="1">
          <span>{{vInput}}</span>
        </tab>
        <tab index="2">
          <span slot="label" style="color: red">tab2</span>
          <span>content2{{vInput}}</span>
        </tab>
        <tab label="tab3" index="3">
          <span>content3</span>
        </tab>
      </tabs> -->
      <tabs :value="filter" @change="handleChangeTab">
        <tab v-for="item in states" :key="item" :label="item" :index="item"></tab>
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要去做什么"
      @keyup.enter="handleAdd">
    <todo-item
      @del="deleteTodo"
      @toggle="handleToggle"
      v-for="todo in filterTodos "
      :key="todo.id"
      :todo="todo"></todo-item>
    <helper
      @clear="clearAllCompleted"
      @select="selectFilter"
      :todos="todos"
      :filter="filter"></helper>
  </section>
</template>
<script>
import TodoItem from './item.vue'
import Helper from './helper.vue'
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  // 用于服务器端渲染调用接口的数据
  // ssr时候是不会执行到mounted
  asyncData ({store, router}) {
    console.log('--------', store.state.user)
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login ')
    return Promise.resolve()
  },
  // 用于seo, 可以修改head标签里的相关信息
  metaInfo: {
    title: 'todo主页'
  },
  // 组件内的路由钩子, 路由钩子的调用顺序是, 全局钩子>路由内钩子>组件内钩子>beforeResolve()
  beforeRouteEnter (to, from, next) {
    console.log('todoRouteEnter')
    // 在这个钩子里是拿不到vue实例的
    // next() 里可以传个带vue实例为参数的回调函数
    next(vm => {
      console.log(vm.filter)
    })
  },
  // /app/:id 类似于这样的路由, 跳不同id页面是会触发update, 可以进行请求数据操作, 不能卸载mounted里它只会执行一次
  beforeRouteUpdate (to, from, next) {
    console.log('todoRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todoRouteLeave')
    // if (global.confirm('确定离开吗?')) next()
    next()
  },
  props: ['id'],
  components: {
    TodoItem,
    Helper
  },
  data () {
    return {
      filter: 'all',
      // tabValue: '1',
      states: ['all', 'active', 'completed']
      // vInput: ''
    }
  },
  mounted () {
    if (this.todos && !this.todos.length) {
      this.fetchTodos()
    }
  },
  computed: {
    ...mapState(['todos']),
    filterTodos () {
      switch (this.filter) {
        case 'all':
          return this.todos
        case 'active':
          return this.todos.filter(item => item.completed === false)
        case 'completed':
          return this.todos.filter(item => item.completed === true)
        default:
          return this.todos
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleChangeTab (index) {
      this.filter = index
      // this.tabValue = index
    },
    handleAdd (e) {
      let content = e.target.value
      if (!content.trim()) {
        this.$notify({
          content: '请输入要做的事'
        })
        return
      }
      this.addTodo({
        content: content.trim(),
        completed: false
      })
      e.target.value = ''
    },
    // handleDeleteTodo (id) {
    //   console.log(id)
    //   // 一下两种方法都可以, 一个是通过filter返回一个剔除id所在项, 另一个是通过findeIndex找到对应下标, 在通过splice直接删除
    //   // this.todos = this.todos.filter(item => item.id !== id)
    //   this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
    // },
    handleToggle (todo) {
      // Object.assign(): 可以拷背对象
      // 通过...扩展符 Object.assign({}, {...todo, completed: !todo.completed})
      // 通过Object.assign本身: Object.assign({}, todo, {completed: !todo.completed})
      this.updateTodo({id: todo.id, todo: Object.assign({}, {...todo, completed: !todo.completed})})
    },
    selectFilter (filter) {
      this.filter = filter
      console.log(filter)
    },
    clearAllCompleted () {
      // this.todos = this.todos.filter(item => item.completed === false)
      this.deleteAllCompleted()
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-container
  background: #ffffff
  padding: 0 15px
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
