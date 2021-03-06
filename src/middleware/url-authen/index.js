const { calc } = require('../../tool')

const allowUrl = [
    '/login',
    '/register',
    '/logout',
    '/user/password/reset',
    '/user/password/new',
    '/user/avatar',
    '/user/status',
    '/user/other/info',
    '/user/list',
    '/favicon.ico',
    '/tool/verify',
    '/post/getpage',
    '/detail/post',
    '/extend',
    '/sys',
    '/oauth',
    '/detail/comment/getpage',
    '/graphql',
]


module.exports = () => {
    return async (ctx, next) => {

        // console.log('---------url-authen---------------')
        console.log('originalUrl:' + ctx.originalUrl)
        if (ctx.originalUrl == '/favicon.ico'){
            return
        } 

        // console.log('---------url-authen---------------' + allowUrl.indexOf(ctx.originalUrl))

        if (allowUrl.some(v => ctx.originalUrl.indexOf(v) > -1)) {
            console.log('====allow page:' + ctx.originalUrl)
            console.log('====await next()')
            // ctx.log.info(`from ctx.log:${ctx.originalUrl}`)
            ctx.fmtLog.info(`allowed url`)
            return await next()
        }

        if (calc.isLogin(ctx)) {
            // console.log('====already login 1')
            // console.log(JSON.stringify(ctx.session.userinfo))
            // console.log('====already login'+ctx.session.userinfo.result.data.name)
            // console.log('====already login 2')
            // console.log('====await next()')
            return await next()
        }

        console.log('==== not allowed url =====')
        ctx.fmtLog.warn('not allowed url !')
        // ctx.redirect('/login')
        ctx.body = { code: -2, message: '权限不够' }
        return

    }
}
