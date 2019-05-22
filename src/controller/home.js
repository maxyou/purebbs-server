// const Service = require('./service')
const send = require('koa-send')

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

}