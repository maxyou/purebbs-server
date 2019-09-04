const { user: service } = require('../../service')

module.exports = async (ctx, next) => {

    console.log('logout/post===============')
    let {
        language,
        postPageSize,
        commentPageSize,
    } = ctx.request.body

    let setting = {
        language,
        postPageSize,
        commentPageSize
    }

    let res = await service.logout(setting, ctx)
    // console.log(ctx.request.method)
    // if(ctx.session.userinfo){
    //     ctx.session.userinfo.isLogin = false
    // }
    ctx.session = null

    ctx.body = { code: 0, message: 'logout success', data: {} }
}