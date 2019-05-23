// const Service = require('./service')
const send = require('koa-send')
const signInPost = require('./sign-in-post')
const signUpPost = require('./sign-up-post')
const signOutPost = require('./sign-out-post')
const uploadAvatarPost = require('./upload-avatar-post-multer')
const {user} = require('../../service')

module.exports = {

    'sign-up': async (ctx, next) => {
        await ctx.render('user/register/register', {
            title: 'Sign up:',
        })
    },
    'sign-up/post': signUpPost,
    'sign-in': async (ctx, next) => {
        console.log('----sign in page-----')
        console.log(ctx.session)

        // ctx.response.body = '<h1>sign-in page</h1>'
        await ctx.render('user/login/login', {
            title: 'Sign in:',
        })
    },
    'sign-in/post': signInPost,
    'sign-out': async (ctx, next) => {
        await ctx.render('sign-out', {
            title: 'Sign out:',
        })
    },
    'sign-out/post': signOutPost,
    'upload-avatar': async (ctx, next) => {
        console.log('----upload-avatar-----')
        await ctx.render('upload-avatar', {
            title: 'Please pick your avatar:',
        })
    },
    'upload-avatar/post': uploadAvatarPost,
    'download-photo': async (ctx, next) => {
        let title = 'welcom download photo'
        await ctx.render('download-photo', {
            title,
        })
    },
    'download-photo/download': async (ctx, next) => {
        console.log('----download-photo/download-----')
        await send(ctx, 'img/coffee.jpg', {root: __dirname + '/resource'})
        console.log('----download-photo/download-----end')
    },
    
    'user/list': async (ctx, next) => {
        
        console.log('----render user/list----------1')
        var users = await user.getUsers()
        console.log(users)
        console.log('----render user/list----------2')
        
        await ctx.render('user-list', {
            title: 'user list',
            users
        })
        console.log('----render user/list----------3')
    },

}