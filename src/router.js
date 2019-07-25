const router = require('koa-router')()
const controller = require('./controller')

module.exports = (app) => {

  //---------user--------------------
  //login, register, logout
  router.get('/user/avatar/:id', controller.user['/user/avatar'])
  router.get('/user/status', controller.user['/user/status'])
  router.get('/user/other/info', controller.user['/user/other/info'])
  router.post('/user/register', controller.user['/user/register/post'])
  router.post('/user/login', controller.user['/user/login/post'])
  router.post('/user/logout', controller.user['/user/logout/post'])
  //crud
  router.get('/user/list', controller.user['/user/list'])
  //avatar, photo
  // router.get('/upload/avatar', controller.user['upload/avatar'])
  router.post('/user/upload/avatar', controller.user['upload/avatar/post'])
  router.post('/user/update', controller.user['/user/update/post'])
  router.post('/user/password/change', controller.user['/user/password/change'])
  router.post('/user/password/reset', controller.user['/user/password/reset'])
  router.post('/user/password/new', controller.user['/user/password/new'])
  // router.get('/download/photo', controller.user['download/photo'])
  // router.get('/download/photo/download', controller.user['download/photo/download'])

  //-----------admin--------------------
  router.post('/admin/add', controller.admin['/admin/add']);
  // router.get('/post/get', controller.post['get']);
  router.get('/admin/getpage', controller.admin['/admin/getByPaginate']);
  router.post('/admin/findbyidanddelete', controller.admin['/admin/findByIdAndDelete']);
  router.post('/admin/findbyidandupdate', controller.admin['/admin/findByIdAndUpdate']);
  router.post('/admin/findbyidandupdateavatar', controller.admin['/admin/findByIdAndUpdateAvatar']);

  //-----------post--------------------
  router.post('/post/add', controller.post['/post/add']);
  // router.get('/post/get', controller.post['get']);
  router.get('/post/getpage', controller.post['/post/getByPaginate']);
  router.post('/post/findbyidanddelete', controller.post['/post/findByIdAndDelete']);
  // router.post('/post/findbyidandupdate', controller.post['/post/findByIdAndUpdate']);

  //-----------detail--------------------
  router.get('/detail/post', controller.detail['/detail/post']);  
  router.post('/detail/comment/add', controller.detail['/detail/comment/add']);
  router.post('/detail/comment/findbyidanddelete', controller.detail['/detail/comment/findByIdAndDelete']);
  router.post('/detail/comment/findbyidandupdate', controller.detail['/detail/comment/findByIdAndUpdate']);
  router.post('/detail/post/findbyidandupdate', controller.detail['/detail/post/findByIdAndUpdate']);
  router.get('/detail/comment/getpage', controller.detail['/detail/comment/getByPaginate']);

  //-----------extend--------------------
  router.post('/extend/lineup/join', controller.extend['/extend/lineup/join']);
  router.post('/extend/lineup/quit', controller.extend['/extend/lineup/quit']);
  router.post('/extend/vote/join', controller.extend['/extend/vote/join']);
  router.post('/extend/vote/quit', controller.extend['/extend/vote/quit']);
  

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