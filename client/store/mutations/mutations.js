export default {
  // mutations里边只能传两个参数第一个, 如果想传多个参数, 可以合并成一个obj
  updateCount (state, num) {
    state.count = num
  },
  fillTodos (state, data) {
    state.todos = data
  },
  doUpdate (state, {id, todo}) {
    state.todos.splice(
      state.todos.findIndex(item => item.id === id),
      1,
      todo
    )
  },
  doAddTode (state, todo) {
    state.todos.unshift(todo)
  },
  doDeleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(item => item.id === id),
      1
    )
  },
  doDeleteAllCompleted (state) {
    state.todos = state.todos.filter(item => !item.completed)
  },
  doLogin (state, userInfo) {
    state.user = userInfo
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
