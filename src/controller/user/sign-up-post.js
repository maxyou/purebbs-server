const {user} = require('../../service')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-up/post:' + name + ' ' + password)

    let signup = { name, password }
    let a = await user.addUser(signup)
    console.log(a)
    if(a.code==0){

        ctx.session = {isLogin: true, user: name, count: 1}

        await ctx.render('sign-up-success',{title:'user is added'})
    }else{
        await ctx.render('sign-error',{title:'user add failed'})
    }

    console.log('sign-up/post===============3')
        
}