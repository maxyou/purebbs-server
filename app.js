const Koa = require('koa')
const router = require('./router')
const views = require('koa-views')
const path = require('path')
const middleware = require('./middleware')

const app = new Koa()

app.use(views(path.join(__dirname, './view'),{
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  console.log('app ctx.cookies--------------------')
  console.log(ctx.cookies.get('SESSION_ID'))
  await next()
})

middleware(app)

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})