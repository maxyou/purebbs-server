const { user: service } = require('../../service')

module.exports = async (ctx, next) => { //1，result存session，2，result返回客户端
  let {
    name,
    password,
    code
  } = ctx.request.body
  console.log('sign-up/post:' + name + ' ' + password)

  let signup = { name, password, code }


  if (ctx.session && ctx.session.captchaText && ctx.session.captchaText.toUpperCase() == code.toUpperCase()) {

    let result = await service.addUser(signup)
    console.log('controller sign-up/post return===============1')
    console.log(result)
    console.log('controller sign-up/post return===============2')
    
    if (result && result.code == 0) {
      ctx.session.userinfo = { isLogin: true, result, ...result.data };
      // console.log('ctx.session:')
      // console.log(ctx.session)
      // console.log('result.res:')
      // console.log(result.res)
      // ctx.body = { code: 0, message: result.message, data: result.data}
    } else {
      // console.log('user is invalid')
      // ctx.body = { code: -1, message: result.message, data: {} }
    }
    console.log('controller sign-up/post return===============3')
    ctx.body = result
    console.log('controller sign-up/post return===============4')


  } else {//这里也许应该清除ctx.session.captchaText，防止客户端重复利用这个captchaText

    console.log('ctx.session.captchaText.toUpperCase not equ')
    ctx.body = { code: -1, message: 'captchaText error', data: {} }

  }

}