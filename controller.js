const Service = require('./service')
const User = require('./user')

module.exports = {
    index: async (ctx, next) => {
        // ctx.response.body = `<h1>index page</h1>`
        // ctx.fmtLog.info('root path is visited')

        console.log('----session index-----')
        console.log(ctx.session)
        ctx.session.count++

        let title = 'hello koa2'
        await ctx.render('index', {
            title,
        })
    },
    home: async (ctx, next) => {
        console.log('----session home-----')
        console.log(ctx.session)
        // console.log(ctx.request.query)
        // console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
        ctx.log.info('home is visited')
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    'sign-up': async (ctx, next) => {
        await ctx.render('sign-up', {
            title: 'Sign up:',
        })
    },
    'sign-up/post': User.signUpPost,
    'sign-in': async (ctx, next) => {
        console.log('----sign in-----')
        console.log(ctx.session)

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

}