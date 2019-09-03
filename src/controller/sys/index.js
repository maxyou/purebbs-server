// const Service = require('./service')
const {sys:service} = require('../../service')

module.exports = {
    '/oauth/github/callback': async (ctx, next) => {
        console.log('--------/oauth/redirect-----------')
        // console.log(ctx.request.query.code)
        
        var result = await service.oauthGithub(ctx.request.query, ctx);
        // console.log(result)
        ctx.body=result;    
    },
    '/sys/category': async (ctx, next) => {
        console.log('--------/sys/category-----------')
        // console.log(JSON.stringify(ctx.request.body))
        var result = await service.categoryGet(ctx.request.body, ctx);
        // console.log(result)
        ctx.body=result;    
    },
}