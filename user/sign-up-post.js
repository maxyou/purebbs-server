const User = require('./user')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-up/post===============' + name + ' ' + password)

    let user = new User({ name, password })
    let exist = await user.exist()
    console.log('=====exist ='+exist)
    if (exist) {
        console.log('user is exist already')
        await ctx.render('sign-error', {
            title: 'user is exist already',
        })
    } else {
        user.insert()
        console.log('user is added')
        await ctx.render('sign-up-success', {
            title: 'Sign up success',
        })
    }

}