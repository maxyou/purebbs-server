const allowPage = ['/sign-in', '/sign-in/post', '/favicon.ico']

module.exports = () => {
    return async (ctx, next) => {

        if (ctx.originalUrl == '/favicon.ico') return

        // console.log('app ctx.cookies--------------------')
        // console.log(ctx.cookies.get('SESSION_ID'))

        if (allowPage.indexOf(ctx.originalUrl) > -1) {
            // console.log('====allow page:'+url)
        } else if (ctx.session && ctx.session.isLogin) {
            // console.log('====already login:'+url)
        } else {
            // console.log('====redirect:'+url)
            ctx.redirect('/sign-in')
        }

        await next()
    }
}
