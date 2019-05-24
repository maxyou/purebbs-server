const router = require('koa-router')()
const Controller = require('./controller')

module.exports = (app) => {

  //---------home-------------------
  router.get( '/', Controller.home.index )
  router.get( '/home/index', Controller.home.index )  
  router.get('/home/home', Controller.home.home)  
  router.get('/home/:id/:name', Controller.home.homeParams)
  
  //---------user--------------------
  //login, register, logout
  router.get('/register', Controller.user['register'])
  router.post('/register/post', Controller.user['register/post'])
  router.get('/login', Controller.user['login'])
  router.post('/login/post', Controller.user['login/post'])
  router.get('/logout', Controller.user['logout'])
  router.get('/logout/post', Controller.user['logout/post'])
  //crud
  router.get('/user/list', Controller.user['user/list'])
  //avatar, photo
  router.get('/upload/avatar', Controller.user['upload/avatar'])
  router.post('/upload/avatar/post', Controller.user['upload/avatar/post'])
  router.get('/download/photo', Controller.user['download/photo'])
  router.get('/download/photo/download', Controller.user['download/photo/download'])

  //-----------tool---------------------
  router.get('/tool/verify', Controller.tool.verify);

  app.use(router.routes())
    .use(router.allowedMethods())
}