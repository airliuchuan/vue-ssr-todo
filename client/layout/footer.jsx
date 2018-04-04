import '../assets/css/footer.styl'
export default {
  data () {
    return {
      name: 'kay'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>create by {this.name}</span>
      </div>
    )
  }
}
