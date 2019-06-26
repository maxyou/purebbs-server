// const Service = require('./service')
const {detail:service} = require('../../service')

module.exports = {
    '/detail/post': async (ctx, next) => {

        const postInfo = ctx.request.query.postInfo
        // console.log('JSON.stringify(postInfo):')
        // console.log(JSON.stringify(postInfo))
        var result = await service.detailPostGet(postInfo);//必须parse才能把字符串‘-1’解析为数字‘-1’

        ctx.body=result;
    },
    '/detail/comment/add': async (ctx, next) => {
        console.log('/detail/comment/add----------controller')
        // console.log(JSON.stringify(ctx.request.body))
        var result = await service.detailCommentAdd(ctx.request.body, ctx);
        ctx.body=result;
    },
    '/detail/comment/findByIdAndDelete': async (ctx, next) => {
        var comment = ctx.request.body
        console.log('-----deleteOne get match-------')
        console.log(JSON.stringify(comment))
        var result = await service.findByIdAndDelete(comment);
        ctx.body=result;
    },
    '/detail/comment/findByIdAndUpdate': async (ctx, next) => {
        var comment = ctx.request.body
        console.log('-----/detail/comment/findByIdAndUpdate-------')
        console.log(JSON.stringify(comment))
        var result = await service.findByIdAndUpdate(comment);
        ctx.body=result;
    },
    '/detail/post/findByIdAndUpdate': async (ctx, next) =>{
        // console.log('-----controller findByIdAndUpdate-------')
        var post = ctx.request.body
        var result = await service.postFindByIdAndUpdate(post);
        ctx.body=result;
    },

    '/detail/comment/getByPaginate': async (ctx, next) =>{
        console.log('--------comment getByPaginate------------')
        console.log('page info:')
        // console.log(ctx.request.query.offset)
        // console.log(ctx.request.query.limit)
        // console.log(ctx.request.query.sort)
        // console.log(ctx.request.query.sort._id)
        const pageInfo = ctx.request.query.pageInfo
        console.log(pageInfo)
        var result = await service.getByPaginate(pageInfo);//必须parse才能把字符串‘-1’解析为数字‘-1’
        // var result = await service.getByPaginate(pageInfo);//不行
        console.log('-----comment getByPaginate result------------------')
        // console.log(result)
        ctx.body=result;
    },    

}