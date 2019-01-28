const Koa = require('koa')
const router = require('./router')
const views = require('koa-views')
const path = require('path')
const middleware = require('./middleware')

const app = new Koa()

app.use(views(path.join(__dirname, './view'),{
  extension: 'ejs'
}))

const allowPage = ['/sign-in','/sign-in/post','/favicon.ico']

middleware(app)

app.use(async (ctx, next) => {

  if(ctx.originalUrl=='/favicon.ico') return

  // console.log('app ctx.cookies--------------------')
  // console.log(ctx.cookies.get('SESSION_ID'))

  if(allowPage.indexOf(ctx.originalUrl) > -1){
    // console.log('====allow page:'+url)
  }else if(ctx.session && ctx.session.isLogin){
    // console.log('====already login:'+url)
  }else{
    // console.log('====redirect:'+url)
    ctx.redirect('/sign-in')
  }

  await next()
})

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})