const router = require('koa-router')()
const Controller = require('./controller')

module.exports = (app) => {
  router.get( '/', Controller.index )
  router.get( '/index', Controller.index )
  
  router.get('/home', Controller.home)
  
  router.get('/home/:id/:name', Controller.homeParams)
  
  router.get('/sign-in', Controller['sign-in'])
  router.get('/sign-up', Controller['sign-up'])
  
  router.post('/sign-in/post', Controller['sign-in/post'])
  router.post('/sign-up/post', Controller['sign-up/post'])

  router.get('/sign-out', Controller['sign-out'])
  router.post('/sign-out/post', Controller['sign-out/post'])

  router.get('/upload-avatar', Controller['upload-avatar'])
  router.post('/upload-avatar/post', Controller['upload-avatar/post'])

  router.get('/download-photo', Controller['download-photo'])
  router.get('/download-photo/download', Controller['download-photo/download'])

  app.use(router.routes())
    .use(router.allowedMethods())
}