const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticFiles = require('koa-static')
const logger = require('./logger')
const session = require('./session')
const httpError = require('./httpError')
const urlAuthen = require('./url-authen')
const views = require('koa-views')
const nunjucks = require('koa-nunjucks-2')
const { ApolloServer } = require('apollo-server-koa');
const { typeDefs, resolvers } = require('./graphql');

module.exports = (app) => {
  
  app.use(bodyParser())
  // app.use(koaBody({multipart:true}))
  app.use(logger())
  app.use(httpError())
  app.use(staticFiles(path.resolve(__dirname, "../public")))
  app.use(session(app))
  app.use(urlAuthen()) //must after session middleware

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // app.use(views(path.join(__dirname, './view'),{
  //   extension: 'ejs'
  // }))  
  app.use(nunjucks({
    ext: 'nj',
    path: path.join(__dirname, '../view'),// 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义 防Xss
    }
  }));
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