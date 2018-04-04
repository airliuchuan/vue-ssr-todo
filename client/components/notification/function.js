import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

// 存放通知实例
const instances = []
// 记录实例的id
let seed = 1

// 删除通知节点
const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => instance.id === item.id)
  instances.splice(index, 1)

  if (len <= 1) return
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - instance.vm.height - 16
  }
}

const notify = options => {
  // ssr没有dom操作, 避免报错 return
  if (Vue.prototype.$isServer) return
  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    // 接受options作为props
    propsData: {
      ...rest
    },
    data () {
      return {
        autoClose: autoClose === undefined ? 3000 : autoClose
      }
    }
  })

  // 确定每个实例的id
  const id = `notification_${seed++}`
  // 为每个实例添加id属性
  instance.id = id
  // $mount()里没有参数的时候, 只是生成了一个$el对象(所谓的dom节点类似于createElement), 并没有插入到document中
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el) // 如何获取$mount生成的dom???
  instance.visible = true
  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  // 为实例添加verticalOffset数据
  instance.verticalOffset = verticalOffset
  // 添加到实例数组里
  instances.push(instance)
  instance.vm.$on('closed', () => {
    console.log('closed')
    removeInstance(instance)
    // $destory()不会删除dom节点, 只会删除组件的事件绑定, 数据监听等
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  return instance.vm
}

export default notify
