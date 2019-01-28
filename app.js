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

  console.log('app ctx.cookies--------------------')
  console.log(ctx.cookies.get('SESSION_ID'))

  if(ctx.session){
    console.log('has session')
    if(ctx.session.isLogin){
      console.log('has session + is login:'+ctx.session.isLogin)
    }
  }

  let url = ctx.originalUrl  
  if(allowPage.indexOf(url) > -1){
    console.log('====allow page:'+url)
    await next()
    return
  }

  if(ctx.session){
    if(ctx.session.isLogin){
      console.log('====is login:'+url)
      await next()
      return
    }
    console.log('is login:'+ctx.session.isLogin)
  } 

  console.log('====redirect:'+url)
  // ctx.session = null
  ctx.redirect('/sign-in')
})

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})