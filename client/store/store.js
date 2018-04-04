import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
// 服务器端渲染, 必须每次渲染都生成一个新的实例, 就不能按照下边注释的写法 new Vuex.Store()
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 只能用于开发环境, 直接修改state会发出warning
    state: defaultState,
    // 更新state
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('store的plugin开始工作')
        // 可以使用store的方法比如subscribe() subscribAction()
      }
    ]
    // modules: {
    //   a: {
    //     namespaced: true, // 添加nameSpace后, 就不会把mutations泄露到全局, 默认是把所有的mutations添加到全局
    //     state: {
    //       text: 'a'
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log(state, 'module a')
    //         state.text = text
    //       }
    //     },
    //     actions: {
    //       add ({state, commit, rootState}) {
    //         commit('updateText', rootState.count)
    //       },
    //       // 子模块dispatch全局mutations需要在commit()里加第三个参数 {root: true}
    //       addGlobal ({state, commit, rootState}) {
    //         commit('updateCount', rootState.count + 'root', {root: true})
    //       }
    //     },
    //     getters: {
    //       textPlus: (state, getters, rootState) => state.text + rootState.count + rootState.b.text
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 'b'
    //     },
    //     mutations: {},
    //     actions: {
    //       toA ({state, commit, rootState}) {
    //         commit('a/updateText', 'b改的a111', {root: true})
    //       }
    //     },
    //     getters: {}
    //   }
    // }
  })

  // vuex数据更新热加载实现方法: 利用module.hot.accept([], () => { store.hotUpdate({}) })
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }

  return store
}
// 需要在实例化Vuex之前use一下
// Vue.use(Vuex)

// const store = new Vuex({
//   state: {
//     count: 0
//   },
//   // 更新state
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })
// export default store
