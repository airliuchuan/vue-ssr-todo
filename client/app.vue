<template>
 <div id="app">
  <div id="cover"></div>
  <div id="loading" v-show="loading">
    <loading></loading>
  </div>
  <Header></Header>
  <!-- <p>全局getters: {{fullName}} - 全局state: {{counter}}</p> -->
  <!-- <p> - a模块的state: {{textA}} - 全局State和a的state的组合: {{textPlus}} - textC: {{textC}}</p> -->
  <!-- <todo></todo> -->
  <!-- <router-link to="/app">app</router-link>
  <router-link to="/login">login</router-link> -->
  <transition name="fade" mode="out-in">
    <router-view/>
  </transition>
  <!-- <Notification content="test"/> -->
  <!-- <button @click="notify">点我1</button> -->
  <Footer></Footer>
 </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'
export default {
  metaInfo: {
    title: 'kay\'的todo'
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify'
      })
    },
    ...mapActions(['updateCountAsync']), // , 'a/add', 'a/addGlobal', 'b/toA'
    ...mapMutations(['updateCount']) // , 'a/updateText'
  },
  components: {
    Header,
    Footer,
    Loading
    // Todo
  },
  data () {
    return {

    }
  },
  computed: {
    // babel-preset-env不支持...语法, babel-preset-stage-1: 支持所有包括提案的
    // ...mapState(['count']), // 1, 数组直接传state的count
    // ...mapState({           // 2, 传对象
    //   counter: 'count'
    // }),
    // 3, 传state参数的函数
    ...mapState({
      loading: 'loading'
      // counter: state => state.count
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }),
    // ...mapGetters(['fullName']) // 1, 数组直接传getters的fullName
    // 添加namespaced的模块, 需要以 a/xxx 的模式获取, 如果是方法就得: this[a/xxx]() 这样调用
    ...mapGetters({
      fullName: 'fullName'
      // textPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted () {
    // console.log(this.$route)
    // this.$store.dispatch('updateCountAsync', {num: 5, time: 2000})
    this.updateCountAsync({num: 5, time: 2000}) // 在methods通过...mapActions([''])就可以通过this调用了, 下同理
    // this.updateCount(10)
    // this['a/updateText']('改了a')
    // this['a/add']()
    // this['a/addGlobal']()
    // this['b/toA']()
  }
}
</script>
<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
.fade-enter-active, .fade-leave-active {
  transition all 0.3s ease-in-out
}
.fade-enter, .fade-leave-active {
  opacity 0
}
</style>
