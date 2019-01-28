const User = require('./user')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-out/post===============' + name + ' ' + password)
    // let user = new User({ name, password })

    // console.log(ctx.request.method)
    ctx.session = null
    ctx.redirect('/sign-in')
}