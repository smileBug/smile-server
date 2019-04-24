const Koa = require('koa')
const koaBody = require('koa-body');
const cors = require('koa-cors')
const useRouter = require('./routers/user')

const app = new Koa()

app.use(cors()) //解决跨域问题
app.use(koaBody()) // 获取请求body

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  console.log(ctx.request.path + ':' + ctx.request.method)
  await next()
})
app.use(useRouter.routes())

app.listen(8001)

console.log('app started at port 8001...')
