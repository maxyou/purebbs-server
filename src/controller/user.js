// const Service = require('./service')
const User = require('./user/') //last slash means dir
const send = require('koa-send')

module.exports = {
    'sign-up': async (ctx, next) => {
        await ctx.render('sign-up', {
            title: 'Sign up:',
        })
    },
    'sign-up/post': User.signUpPost,
    'sign-in': async (ctx, next) => {
        console.log('----sign in page-----')
        console.log(ctx.session)

        // ctx.response.body = '<h1>sign-in page</h1>'
        await ctx.render('sign-in', {
            title: 'Sign in:',
        })
    },
    'sign-in/post': User.signInPost,
    'sign-out': async (ctx, next) => {
        await ctx.render('sign-out', {
            title: 'Sign out:',
        })
    },
    'sign-out/post': User.signOutPost,
    'upload-avatar': async (ctx, next) => {
        console.log('----upload-avatar-----')
        await ctx.render('upload-avatar', {
            title: 'Please pick your avatar:',
        })
    },
    'upload-avatar/post': User.uploadAvatarPost,
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

}