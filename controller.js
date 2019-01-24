const Service = require('./service')
const User = require('./user/user')

module.exports = {
    index: async (ctx, next) => {
        // ctx.response.body = `<h1>index page</h1>`
        // ctx.fmtLog.info('root path is visited')

        let title = 'hello koa2'
        await ctx.render('index',{
            title,
        })
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>HOME page</h1>'
        ctx.log.info('home is visited')
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params)
        ctx.response.body = '<h1>HOME page /:id/:name</h1>'
    },
    'sign-up': async(ctx, next) => {
        await ctx.render('sign-up',{
            title:'Sign up:',
        })
    },
    'sign-in': async(ctx, next) => {
        await ctx.render('sign-in',{
            title:'Sign in:',
        })
    },
    'sign-in/post': async (ctx, next) => {
        let {
            name,
            password
        } = ctx.request.body
        console.log('sign-in/post==============='+name+' '+password)
        let user
        try{
            user = new User({name, password})
        }catch(e){
            console.log(e)
        }
        console.log('create user-----------')
        console.log(user)

        // let data = await Service.login(name, password)
        // ctx.response.body = data
        await ctx.render('sign-in-success',{
            title:'Sign in success',
        })
    },
    'sign-up/post': async (ctx, next) => {
        console.log('sign-up/post===============')
        await ctx.render('sign-up-success',{
            title:'Sign up success!',
        })

        // let {
        //     name,
        //     password
        // } = ctx.request.body
        // let data = await Service.login(name, password)
        // ctx.response.body = data
    }
}