
module.exports = async (ctx, next) => {
    
    console.log('logout/post===============')
    // let user = new User({ name, password })

    // console.log(ctx.request.method)
    // if(ctx.session.userinfo){
    //     ctx.session.userinfo.isLogin = false
    // }
    ctx.session = null

    ctx.body = {code:0, message:'logout success'}
}