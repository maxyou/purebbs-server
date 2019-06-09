const allowPage = [
    '/login', 
    // '/login/post', 
    '/register',
    // '/register/post', 
    '/logout', 
    // '/logout/post', 
    '/favicon.ico',
    '/tool/verify'
]


module.exports = () => {
    return async (ctx, next) => {

        // console.log('---------url-authen---------------')
        console.log('originalUrl:' + ctx.originalUrl)
        if (ctx.originalUrl == '/favicon.ico') return
        
        console.log('---------url-authen---------------'+allowPage.indexOf(ctx.originalUrl))

        if (allowPage.some(v=>ctx.originalUrl.indexOf(v)>-1)) {
            console.log('====allow page:'+ctx.originalUrl)
        } else if (ctx.session && ctx.session.userinfo && ctx.session.userinfo.isLogin) {
            console.log('====already login 1')
            console.log(JSON.stringify(ctx.session.userinfo))
            // console.log('====already login'+ctx.session.userinfo.result.data.name)
            console.log('====already login 2')
        } else {
            console.log('====redirect to sign-in')
            // ctx.redirect('/login')
        }

        await next()
    }
}
