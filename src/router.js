const router = require('koa-router')()
const controller = require('./controller')

module.exports = (app) => {

  //---------user--------------------
  //login, register, logout
  router.get('/user/status', controller.user['/user/status'])
  router.post('/user/register', controller.user['/user/register/post'])
  router.post('/user/login', controller.user['/user/login/post'])
  router.post('/user/logout', controller.user['/user/logout/post'])
  //crud
  router.get('/user/list', controller.user['/user/list'])
  //avatar, photo
  router.get('/upload/avatar', controller.user['upload/avatar'])
  router.post('/upload/avatar/post', controller.user['upload/avatar/post'])
  router.get('/download/photo', controller.user['download/photo'])
  router.get('/download/photo/download', controller.user['download/photo/download'])

  //-----------post--------------------
  router.post('/post/add', controller.post['/post/add']);
  // router.get('/post/get', controller.post['get']);
  router.get('/post/getpages', controller.post['/post/getByPaginate']);
  router.post('/post/findbyidanddelete', controller.post['/post/findByIdAndDelete']);
  router.post('/post/findbyidandupdate', controller.post['/post/findByIdAndUpdate']);

  //-----------detail--------------------
  router.get('/detail', controller.detail['/detail']);  
  router.post('/detail/comment/add', controller.detail['/detail/comment/add']);
  // router.get('/detail/comment/getpages', controller.detail['/detail/comment/getByPaginate']);


  //-----------private message--------------------
  // router.post('/rbac/access/add', controller.rbac.access.add);
  // router.get('/rbac/access/get', controller.rbac.access.get);
  // router.get('/rbac/access/getpages', controller.rbac.access.getByPaginate);
  // router.post('/rbac/access/findbyidanddelete', controller.rbac.access.findByIdAndDelete);
  // router.post('/rbac/access/findbyidandupdate', controller.rbac.access.findByIdAndUpdate);


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
  router.get('/tool/verify', controller.tool.verify);

  app.use(router.routes())
    .use(router.allowedMethods())
}