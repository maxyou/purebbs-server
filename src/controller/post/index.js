// const Service = require('./service')
const {post} = require('../../service')

module.exports = {
    'add': async (ctx, next) => {
        console.log(JSON.stringify(ctx.request.body))
        var result = await post.add(ctx.request.body);
        ctx.body=result;
    },
    // 'deleteOne': async (ctx, next) => {
    //     var match = ctx.request.body
    //     console.log('-----deleteOne get match-------')
    //     console.log(JSON.stringify(match))
    //     var result = await post.deleteOne(match);
    //     ctx.body=result;
    // },
    'findByIdAndDelete': async (ctx, next) => {
        var post = ctx.request.body
        console.log('-----deleteOne get match-------')
        console.log(JSON.stringify(post))
        var result = await post.findByIdAndDelete(post);
        ctx.body=result;
    },
    'findByIdAndUpdate': async (ctx, next) =>{
        var post = ctx.request.body
        var result = await post.findByIdAndUpdate(post);
        ctx.body=result;
    },
    // 'update': async (ctx, next) =>{
    // },
    // 'get': async (ctx, next) =>{
    //     var result = await post.get();
    //     ctx.body=result;
    // },
    'getByPaginate': async (ctx, next) =>{
        console.log('--------post getByPaginate------------')
        console.log('page info:')
        console.log(ctx.request.query.offset)
        console.log(ctx.request.query.limit)
        var result = await post.getByPaginate({
            offset: ctx.request.query.offset,
            limit: ctx.request.query.limit,
        });
        console.log('-----getByPaginate result------------------')
        console.log(result)
        ctx.body=result;
    },    

}