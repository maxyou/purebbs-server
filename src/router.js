const router = require('koa-router')()
const controller = require('./controller')

module.exports = (app) => {

  //---------home-------------------
  // router.get( '/', controller.home.index )
  // router.get( '/home/index', controller.home.index )  
  // router.get('/home/home', controller.home.home)  
  // router.get('/home/:id/:name', controller.home.homeParams)
  
  //---------user--------------------
  //login, register, logout
  // router.get('/register', controller.user['register'])
  // router.post('/register/post', controller.user['register/post'])
  // router.get('/login', controller.user['login'])
  // router.post('/login/post', controller.user['login/post'])
  // router.get('/logout', controller.user['logout'])
  // router.get('/logout/post', controller.user['logout/post'])
  //crud
  // router.get('/user/list', controller.user['user/list'])
  //avatar, photo
  // router.get('/upload/avatar', controller.user['upload/avatar'])
  // router.post('/upload/avatar/post', controller.user['upload/avatar/post'])
  // router.get('/download/photo', controller.user['download/photo'])
  // router.get('/download/photo/download', controller.user['download/photo/download'])

  //-----------tool---------------------
  // router.get('/tool/verify', controller.tool.verify);

  //-----------post--------------------
  router.post('/post/add', controller.post['add']);
  // router.get('/post/get', controller.post['get']);
  router.get('/post/getpages', controller.post['getByPaginate']);
  router.post('/post/findbyidanddelete', controller.post['findByIdAndDelete']);
  router.post('/post/findbyidandupdate', controller.post['findByIdAndUpdate']);

  //-----------private message--------------------
  // router.post('/rbac/access/add', controller.rbac.access.add);
  // router.get('/rbac/access/get', controller.rbac.access.get);
  // router.get('/rbac/access/getpages', controller.rbac.access.getByPaginate);
  // router.post('/rbac/access/findbyidanddelete', controller.rbac.access.findByIdAndDelete);
  // router.post('/rbac/access/findbyidandupdate', controller.rbac.access.findByIdAndUpdate);

  app.use(router.routes())
    .use(router.allowedMethods())
}