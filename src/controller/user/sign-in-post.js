const {user} = require('../../service')

module.exports = async (ctx, next) => {
    let {
        name,
        password
    } = ctx.request.body
    console.log('sign-in/post===============' + name + ' ' + password)
    let signin = { name, password }

    var result = await user.authenticateUser(signin);
  
      if(result && result.code==0){      
        ctx.session.userinfo = {isLogin:true, ...result.res._doc};
        console.log('ctx.session:')
        console.log(ctx.session)
        await ctx.render('sign-in-success', {
            title: 'Sign in success',
        })
      }else{
        console.log('user is invalid')
        await ctx.render('sign-error',{
            title:'Sign in failed',
        })
      }



}