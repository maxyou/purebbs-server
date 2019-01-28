const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')
const logger = require('./logger')
const session = require('./session')
const httpError = require('./httpError')

module.exports = (app) => {
  
  app.use(bodyParser())
  app.use(logger())
  app.use(httpError())
  app.use(staticFiles(path.resolve(__dirname, "../public")))
  app.use(session(app))

  // 增加错误的监听处理
//   app.on("error", (err, ctx) => {
//     if (ctx && !ctx.headerSent && ctx.status < 500) {
//       ctx.status = 500
//     }
//     if (ctx && ctx.log && ctx.log.error) {
//       if (!ctx.state.logged) {
//         ctx.log.error(err.stack)
//       }
//     }
//   }) 
}