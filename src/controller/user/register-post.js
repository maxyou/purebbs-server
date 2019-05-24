const {user} = require('../../service')

module.exports = async (ctx, next) => {
    let {
        name,
        password,
        code
    } = ctx.request.body
    console.log('sign-up/post:' + name + ' ' + password)

    let signup = { name, password, code }

    if(code.toUpperCase()!=ctx.session.captchaText.toUpperCase()){
        console.log('ctx.session.captchaText.toUpperCase not equ')
        return await ctx.render('public/message', {
          title:'error',
          message:'captchaText error',
          delay:'3',
          redirectUrl:'/login'
        });    
      }

    let result = await user.addUser(signup)
    console.log(result)

    if (result && result.code == 0) {
        ctx.session.userinfo = { isLogin: true, ...result.res._doc };
        console.log('ctx.session:')
        console.log(ctx.session)
        await ctx.render('user/register/submit', {
          title: 'register success',
          code: result.code,
          message: result.message,
        })
      } else {
        console.log('user is invalid')
        await ctx.render('user/register/submit', {
          title: 'register failed',
          code: result.code,
          message: result.message,
        })
      }
    console.log('sign-up/post===============3')
        
}