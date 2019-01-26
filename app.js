const Koa = require('koa')
const router = require('./router')
const views = require('koa-views')
const path = require('path')
const middleware = require('./middleware')


const app = new Koa()

app.use(views(path.join(__dirname, './view'),{
  extension: 'ejs'
}))

middleware(app)

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})