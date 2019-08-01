// const Service = require('./service')
const {sys:service} = require('../../service')

module.exports = {
    '/sys/category': async (ctx, next) => {
        console.log('--------/sys/category-----------')
        // console.log(JSON.stringify(ctx.request.body))
        var result = await service.categoryGet(ctx.request.body, ctx);
        console.log(result)
        ctx.body=result;    
    },
}