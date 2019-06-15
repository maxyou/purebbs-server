// const Service = require('./service')
const {admin:service} = require('../service')

module.exports = {
    '/admin/add': async (ctx, next) => {
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.add(ctx.request.body);
        ctx.body=result;
    },
    '/admin/findByIdAndDelete': async (ctx, next) => {
        var post = ctx.request.body
        console.log('-----deleteOne get match-------')
        console.log(JSON.stringify(post))
        var result = await service.findByIdAndDelete(post);
        ctx.body=result;
    },
    '/admin/findByIdAndUpdate': async (ctx, next) =>{
        // console.log('-----controller findByIdAndUpdate-------')
        var post = ctx.request.body
        var result = await service.findByIdAndUpdate(post);
        ctx.body=result;
    },
    '/admin/getByPaginate': async (ctx, next) =>{
        console.log('--------admin getByPaginate------------')
        console.log('page info:')
        // console.log(ctx.request.query.offset)
        // console.log(ctx.request.query.limit)
        // console.log(ctx.request.query.sort)
        // console.log(ctx.request.query.sort._id)
        const pageInfo = ctx.request.query.pageInfo
        // console.log(pageInfo)
        var result = await service.getByPaginate(pageInfo);
        // var result = await service.getByPaginate(pageInfo);//不行
        console.log('-----admin getByPaginate result------------------')
        // console.log(result)
        ctx.body=result;
    },    

}