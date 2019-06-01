const { user: service } = require('../../service')

module.exports = async (ctx, next) => {
  let {
    name,
    password,
    code
  } = ctx.request.body
  console.log('sign-up/post:' + name + ' ' + password)

  let signup = { name, password, code }


  if (ctx.session && ctx.session.captchaText && ctx.session.captchaText.toUpperCase() == code.toUpperCase()) {

    let result = await service.addUser(signup)
    // console.log(result)

    if (result && result.code == 0) {
      ctx.session.userinfo = { isLogin: true, ...result.res._doc };
      // console.log('ctx.session:')
      // console.log(ctx.session)
      // console.log('result.res:')
      // console.log(result.res)
      ctx.body = { code: 0, message: result.message, data: {//有选择地返回给客户端
        _id: result.res._id,
        name: result.res.name
      } }
    } else {
      console.log('user is invalid')
      ctx.body = { code: -1, message: result.message, data: {} }
    }

    console.log('sign-up/post===============3')

  } else {//这里也许应该清除ctx.session.captchaText，防止客户端重复利用这个captchaText

    console.log('ctx.session.captchaText.toUpperCase not equ')
    ctx.body = { code: -1, message: 'captchaText error', data: {} }

  }

}