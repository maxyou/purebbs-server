// const Service = require('./service')
const fs = require('fs')
const path = require('path')
const send = require('koa-send')
const loginPost = require('./login-post')
const registerPost = require('./register-post')
const logoutPost = require('./logout-post')
const uploadAvatarPost = require('./upload-avatar-post-multer')
const {user:service} = require('../../service')
const { calc } = require('../../tool')

module.exports = {
    '/user/password/new': async (ctx, next) => {
        console.log('-----controller /user/password/new-------')
        var userNewPassword = ctx.request.body
        console.log(JSON.stringify(userNewPassword))
        var result = await service.userResetPasswordNew(userNewPassword, ctx);
        ctx.body=result;
    },
    '/user/password/reset': async (ctx, next) => {
        console.log('-----controller /user/password/reset-------')
        var userResetPassword = ctx.request.body
        console.log(JSON.stringify(userResetPassword))
        var result = await service.userResetPassword(userResetPassword, ctx);
        ctx.body=result;
    },
    '/user/password/change': async (ctx, next) => {
        console.log('-----controller /user/password/change-------')
        var userChangePassword = ctx.request.body
        console.log(JSON.stringify(userChangePassword))
        var result = await service.userChangePassword(userChangePassword, ctx);
        ctx.body=result;
    },
    '/user/update/post': async (ctx, next) => {
        console.log('-----controller /user/update/post-------')
        var user = ctx.request.body
        console.log(JSON.stringify(user))
        var result = await service.findByIdAndUpdate(user, ctx);
        ctx.body=result;
    },
    '/user/avatar': async (ctx, next) => {

        var id = ctx.params.id
        console.log('avatar id: '+id)

        var b = await fs.existsSync(path.join('upload/user/avatar', id))
        // console.log('statSync:-----------1.1'+b)
        if(b){
            await send(ctx, id, {root: 'upload/user/avatar'}) //当前项目根目录下的download目录
            // console.log('statSync:-----------1.1')
        }else{                
            await send(ctx, 'default.png', {root: 'upload/user/avatar'}) //当前项目根目录下的download目录
            // console.log('statSync:-----------1.2')
        }
    },
    '/user/status': async (ctx, next) => {
        if(calc.isLogin(ctx)){
            
            // ctx.body=ctx.session.userinfo.result //返回之前登录或注册时的result

            var data = calc.getUserData(ctx)
            if(data._id){
                var result = await service.getUserInfoById(data._id)
                ctx.session.userinfo = { isLogin: true, result }
                ctx.body=ctx.session.userinfo.result
        }else{
                ctx.body={code:-1,message:'未登录', data:{}};
            }

        }else{
            ctx.body={code:-1,message:'未登录', data:{}};
        }
    },
    '/user/other/info': async (ctx, next) => {
        
        console.log('/user/other/info')
        
        const user = ctx.request.query.user

        console.log('/user/other/info 2-----')
        
        var result = await service.getOtherInfo(user)

        if(result){            
            ctx.body=result
        }else{
            ctx.body={code:-1,message:'not fount', data:{}};
        }
    },
    '/user/register': async (ctx, next) => {
        await ctx.render('user/register/register', {
            title: 'Sign up:',
        })
    },
    '/user/register/post': registerPost,

    '/user/login': async (ctx, next) => {
        console.log('----sign in page-----')
        console.log(ctx.session)

        // ctx.response.body = '<h1>sign-in page</h1>'
        await ctx.render('user/login/login', {
            title: 'Sign in:',
        })
    },
    '/user/login/post': loginPost,

    '/user/logout': async (ctx, next) => {
        await ctx.render('user/logout/logout', {
            title: 'Sign out:',
        })
    },
    '/user/logout/post': logoutPost,
        
    '/user/list': async (ctx, next) => {
        
        console.log('----render user/list----------1')
        var users = await service.getUsers()
        console.log(users.length)
        console.log('----render user/list----------2')
        await ctx.render('user/userlist', {
            title: 'user list',
            users
        })
        console.log('----render user/list----------3')
    },

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

}