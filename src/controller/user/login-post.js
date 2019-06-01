const { user: service } = require('../../service')

module.exports = async (ctx, next) => {
  let {
    name,
    password,
    code
  } = ctx.request.body


  let signin = { name, password, code }

  if (ctx.session && ctx.session.captchaText && ctx.session.captchaText.toUpperCase() == code.toUpperCase()) {

    console.log('sign-in/post:--------2' + name + ' ' + password + ' ' + code)
    var result = await service.authenticateUser(signin);

    if (result && result.code == 0) {
      console.log('authen result:')
      console.log(result)
      ctx.session.userinfo = { isLogin: true, ...result.res._doc };
      console.log('session.userinfo:')
      console.log(ctx.session.userinfo)
      ctx.body = {
        code: 0, message: result.message, data: {//有选择地返回给客户端
          _id: result.res._id,
          name: result.res.name
        }
      }
    } else {
      ctx.body = { code: -1, message: result.message, data: {} }
    }

  } else {//这里也许应该清除ctx.session.captchaText，防止客户端重复利用这个captchaText

    console.log('ctx.session.captchaText.toUpperCase not equ')
    ctx.body = { code: -1, message: '验证码不符' }

  }
}