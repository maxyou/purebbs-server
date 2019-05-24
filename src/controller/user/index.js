// const Service = require('./service')
const send = require('koa-send')
const loginPost = require('./login-post')
const registerPost = require('./register-post')
const logoutPost = require('./logout-post')
const uploadAvatarPost = require('./upload-avatar-post-multer')
const {user} = require('../../service')

module.exports = {

    'register': async (ctx, next) => {
        await ctx.render('user/register/register', {
            title: 'Sign up:',
        })
    },
    'register/post': registerPost,

    'login': async (ctx, next) => {
        console.log('----sign in page-----')
        console.log(ctx.session)

        // ctx.response.body = '<h1>sign-in page</h1>'
        await ctx.render('user/login/login', {
            title: 'Sign in:',
        })
    },
    'login/post': loginPost,

    'logout': async (ctx, next) => {
        await ctx.render('user/logout/logout', {
            title: 'Sign out:',
        })
    },
    'logout/post': logoutPost,
    
    'upload/avatar': async (ctx, next) => {
        console.log('----upload-avatar-----')
        await ctx.render('user/upload/upload-avatar', {
            title: 'Please pick your avatar:',
        })
    },
    'upload/avatar/post': uploadAvatarPost,
    'download/photo': async (ctx, next) => {
        let title = 'welcom download photo'
        await ctx.render('user/download/download-photo', {
            title,
        })
    },
    'download/photo/download': async (ctx, next) => {
        console.log('----download-photo/download-----')
        // await send(ctx, 'img/coffee.jpg', {root: __dirname + '/download'})
        await send(ctx, 'img/coffee.jpg', {root: 'download'}) //当前项目根目录下的download目录
        console.log('----download-photo/download-----end')
    },
    
    'user/list': async (ctx, next) => {
        
        console.log('----render user/list----------1')
        var users = await user.getUsers()
        console.log(users.length)
        console.log('----render user/list----------2')
        await ctx.render('user/userlist', {
            title: 'user list',
            users
        })
        console.log('----render user/list----------3')
    },

}