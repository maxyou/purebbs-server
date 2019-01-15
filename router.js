const router = require('koa-router')()
const Controller = require('./controller')

module.exports = (app) => {
  router.get( '/', Controller.index )
  
  router.get('/home', Controller.home)
  
  router.get('/home/:id/:name', Controller.homeParams)
  
  router.get('/login', Controller.login)
  
  router.post('/login/user', Controller.user)
  
  app.use(router.routes())
    .use(router.allowedMethods())
}