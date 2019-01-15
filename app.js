const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')
const router = require('./router')

const app = new Koa()

app.use(bodyParser())
app.use(staticFiles(path.resolve(__dirname, "./public")))

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})