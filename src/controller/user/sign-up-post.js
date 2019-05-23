const {user} = require('../../service')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-up/post:' + name + ' ' + password)

    let signup = { name, password }
    let result = await user.addUser(signup)
    console.log(result)
    if(result.code==0){

        // ctx.session = {isLogin: true, user: name, count: 1}
        ctx.session.userinfo = {isLogin:true, ...result.res};

        await ctx.render('sign-up-success',{title:'user is added'})
    }else{
        await ctx.render('sign-error',{title:'user add failed'})
    }

    console.log('sign-up/post===============3')
        
}