const allowPage = [
    '/login', 
    '/login/post', 
    '/register',
    '/register/post', 
    '/logout', 
    '/logout/post', 
    '/favicon.ico'
]

module.exports = () => {
    return async (ctx, next) => {

        console.log('---------url-authen---------------')
        console.log('originalUrl:' + ctx.originalUrl)
        if (ctx.originalUrl == '/favicon.ico') return
        
        console.log('---------url-authen---------------1')

        if (allowPage.indexOf(ctx.originalUrl) > -1) {
            console.log('====allow page:'+ctx.originalUrl)
        } else if (ctx.session && ctx.session.userinfo && ctx.session.userinfo.isLogin) {
            console.log('====already login'+ctx.session.userinfo.name)
        } else {
            console.log('====redirect to sign-in')
            ctx.redirect('/login')
        }

        await next()
    }
}
