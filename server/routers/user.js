const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter
  .post('/login', async (ctx) => {
    const user = ctx.request.body
    console.log(user)
    if (user.username === 'kay' && user.password === 'kay123') {
      ctx.session.user = {
        username: 'kay'
      }
      ctx.body = {
        code: 1,
        data: {
          username: 'kay'
        }
      }
    } else {
      ctx.status = 400
      ctx.body = {
        code: 0,
        msg: '用户名或密码错误'
      }
    }
  })

  module.exports = userRouter
