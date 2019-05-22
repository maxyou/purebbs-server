const {user} = require('../../service')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-in/post===============' + name + ' ' + password)
    let signin = { name, password }
    let searchResult = await user.searchByNamePwd(signin)
    let searchResultObject = JSON.parse(JSON.stringify(searchResult))

    if (searchResultObject.length > 0) {
        
        // ctx.session = {isLogin: true, user: name, count: 1}
        ctx.session = {...ctx.session, isLogin: true, user: name, count: 1}
        console.log('user is valid')
        await ctx.render('sign-in-success', {
            title: 'Sign in success',
        })
        // console.log('----session-----')
        // console.log(ctx.session)
        // console.log(ctx.request.method)
    } else {
        console.log('user is invalid')
        await ctx.render('sign-error',{
            title:'Sign in failed',
        })
    }
    // console.log(user)

    // let data = await Service.login(name, password)
    // ctx.response.body = data

}