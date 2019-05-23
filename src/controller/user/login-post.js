const { user } = require('../../service')

module.exports = async (ctx, next) => {
  let {
    name,
    password,
    code
  } = ctx.request.body

  console.log('sign-in/post:' + name + ' ' + password + ' ' + code)
  console.log('ctx.session.captchaText.toUpperCase:'+ctx.session.captchaText.toUpperCase())
  console.log('sign-in/post:--------1' + name + ' ' + password + ' ' + code)
  
  let signin = { name, password, code }
  
  if(code.toUpperCase()!=ctx.session.captchaText.toUpperCase()){
    console.log('ctx.session.captchaText.toUpperCase not equ')
    return await ctx.render('public/message', {
      title:'error',
      message:'captchaText error',
      delay:'3',
      redirectUrl:'/sign-in'
    });    
  }
  console.log('sign-in/post:--------2' + name + ' ' + password + ' ' + code)
  
  var result = await user.authenticateUser(signin);

  if (result && result.code == 0) {
    ctx.session.userinfo = { isLogin: true, ...result.res._doc };
    console.log('ctx.session:')
    console.log(ctx.session)
    await ctx.render('user/login/submit', {
      title: 'Sign in success',
      code: result.code,
      message: result.message,
    })
  } else {
    console.log('user is invalid')
    await ctx.render('user/login/submit', {
      title: 'Sign in failed',
      code: result.code,
      message: result.message,
    })
  }



}