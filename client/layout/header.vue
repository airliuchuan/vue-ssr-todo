<template>
  <header class="main-header">
    <h1>Ktodo <img src="../assets/images/1128853.png" alt=""></h1>
  </header>
</template>
<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-header{
  text-align center
  h1{
    font-size 100px
    color: rgba(175, 47, 47, 0.4)
    font-weight 100
    margin 20px
    img {
      width 50px
      height 50px
    }
  }
}
</style>
