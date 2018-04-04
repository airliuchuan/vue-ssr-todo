import axios from 'axios'
import {createError} from './util'

const request = axios.create({
  // ssr会报错, 因为服务端没有同域概念, 必须写清楚host和port
  // 自己想自己发请求可以, 但是拿不到cookie, 判断不了是否登录可以拿到很是太复杂
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333' : '/'
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      if (!data) {
        return createError(400, 'no data')
      } else if (!data.code) {
        return reject(createError(400, data.msg))
      }
      resolve(data.data)
    }).catch(err => {
      // axioscatch的err.response里储存这所有的错误信息
      const errRes = err.response
      if (errRes.status === 401) {
        reject(createError(401, 'need login'))
      }
    })
  })
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  addTodo (todo) {
    return handleRequest(request.post(`/api/todo`, todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', {ids}))
  }
}
