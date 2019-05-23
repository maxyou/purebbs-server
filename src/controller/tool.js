const service = require('../service')


module.exports = {
    async verify(ctx, next) {
        console.log('tool verify')
    
        var captcha=await service.tool.captcha();  //服务里面的方法
        
        ctx.session.captchaText = captcha.text;   /*验证码上面的信息*/
    
        ctx.response.type = 'image/svg+xml';   /*指定返回的类型*/
    
        ctx.body=captcha.data;      /*给页面返回一张图片*/
    
      }

}