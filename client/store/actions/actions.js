// import model from '../../model/client-model'
import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../uitl/bus'

const handleError = (err) => {
  // console.log(err)
  if (err.code === 401) {
    notify({
      content: err.message
    })
    bus.$emit('toLogin')
  }
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({commit}) {
    commit('startLoading')
    return model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
        commit('endLoading')
        // return data
      })
      .catch(err => {
        commit('endLoading')
        console.log(err)
        handleError(err)
      })
  },
  updateTodo ({commit}, {id, todo}) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('endLoading')
        commit('doUpdate', {id, todo: data})
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  addTodo ({commit}, todo) {
    commit('startLoading')
    model.addTodo(todo)
      .then(data => {
        commit('endLoading')
        commit('doAddTode', data)
        notify({
          content: '添加了一件事'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('endLoading')
        commit('doDeleteTodo', id)
        notify({
          content: '少了一件事'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  deleteAllCompleted ({commit, state}) {
    commit('startLoading')
    const ids = state.todos.filter(item => item.completed).map(item => item.id)
    model.deleteAllCompleted(ids)
      .then(date => {
        commit('endLoading')
        commit('doDeleteAllCompleted')
        notify({
          content: '清理了所有完成的事'
        })
      })
      .catch(err => {
        commit('endLoading')
        handleError(err)
      })
  },
  login ({commit}, {username, password}) { // 打开参数的对象, 对象的结构赋值
    commit('startLoading')
    // console.log(username, password)
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('endLoading')
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        })
        .catch(err => {
          commit('endLoading')
          handleError(err)
          reject(err)
        })
    })
  }
}
