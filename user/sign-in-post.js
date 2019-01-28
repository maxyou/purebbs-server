const User = require('./user')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-in/post===============' + name + ' ' + password)
    let user = new User({ name, password })
    let searchResult = await user.searchByNamePwd()
    let searchResultObject = JSON.parse(JSON.stringify(searchResult))

    if (searchResultObject.length > 0) {
        console.log('user is valid')
        await ctx.render('sign-in-success', {
            title: 'Sign in success',
        })
    } else {
        console.log('user is invalid')
        await ctx.render('sign-error',{
            title:'Sign in failed',
        })
    }
    console.log(user)

    // let data = await Service.login(name, password)
    // ctx.response.body = data

}