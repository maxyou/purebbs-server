// const Service = require('./service')
const {post:service} = require('../../service')

module.exports = {
    '/post/add': async (ctx, next) => {
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.add(ctx.request.body, ctx);
        ctx.body=result;

        // for(var i=0;i<100;i++){
        //     await service.add({title:i, content:i});
        // }
    },
    // 'deleteOne': async (ctx, next) => {
    //     var match = ctx.request.body
    //     console.log('-----deleteOne get match-------')
    //     console.log(JSON.stringify(match))
    //     var result = await post.deleteOne(match);
    //     ctx.body=result;
    // },
    '/post/findByIdAndDelete': async (ctx, next) => {
        var post = ctx.request.body
        console.log('-----deleteOne get match-------')
        console.log(JSON.stringify(post))
        var result = await service.findByIdAndDelete(post);
        ctx.body=result;
    },
    '/post/findByIdAndUpdate': async (ctx, next) =>{
        // console.log('-----controller findByIdAndUpdate-------')
        var post = ctx.request.body
        var result = await service.findByIdAndUpdate(post);
        ctx.body=result;
    },
    // 'update': async (ctx, next) =>{
    // },
    // 'get': async (ctx, next) =>{
    //     var result = await post.get();
    //     ctx.body=result;
    // },
    '/post/getByPaginate': async (ctx, next) =>{
        console.log('--------post getByPaginate------------')
        console.log('page info:')
        // console.log(ctx.request.query.offset)
        // console.log(ctx.request.query.limit)
        // console.log(ctx.request.query.sort)
        // console.log(ctx.request.query.sort._id)
        const pageInfo = ctx.request.query.pageInfo
        // console.log(pageInfo)
        var result = await service.getByPaginate(pageInfo);
        // var result = await service.getByPaginate(pageInfo);//不行
        console.log('-----getByPaginate result------------------')
        // console.log(result)
        ctx.body=result;
    },    

}