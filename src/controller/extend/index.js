// const Service = require('./service')
const {extend:service} = require('../../service')

module.exports = {
    '/extend/lineup/join': async (ctx, next) => {
        console.log('--------/extend/lineup/join-----------')
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.lineupJoin(ctx.request.body, ctx);
        ctx.body=result;    
    },
    '/extend/lineup/quit': async (ctx, next) => {
        console.log('--------/extend/lineup/quit-----------')
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.lineupQuit(ctx.request.body, ctx);
        ctx.body=result;    
    },
    '/extend/vote/join': async (ctx, next) => {
        console.log('--------/extend/vote/join-----------')
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.voteJoin(ctx.request.body, ctx);
        ctx.body=result;    
    },
    '/extend/vote/quit': async (ctx, next) => {
        console.log('--------/extend/vote/quit-----------')
        console.log(JSON.stringify(ctx.request.body))
        var result = await service.voteQuit(ctx.request.body, ctx);
        ctx.body=result;    
    },
}