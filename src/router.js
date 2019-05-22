const router = require('koa-router')()
const Controller = require('./controller')

module.exports = (app) => {
  router.get( '/', Controller.home.index )
  router.get( '/index', Controller.home.index )
  
  router.get('/home', Controller.home.home)
  
  router.get('/home/:id/:name', Controller.home.homeParams)
  
  router.get('/sign-in', Controller.user['sign-in'])
  router.get('/sign-up', Controller.user['sign-up'])
  
  router.post('/sign-in/post', Controller.user['sign-in/post'])
  router.post('/sign-up/post', Controller.user['sign-up/post'])

  router.get('/sign-out', Controller.user['sign-out'])
  router.post('/sign-out/post', Controller.user['sign-out/post'])

  router.get('/upload-avatar', Controller.user['upload-avatar'])
  router.post('/upload-avatar/post', Controller.user['upload-avatar/post'])

  router.get('/download-photo', Controller.user['download-photo'])
  router.get('/download-photo/download', Controller.user['download-photo/download'])

  router.get('/user/list', Controller.user['user/list'])

  app.use(router.routes())
    .use(router.allowedMethods())
}