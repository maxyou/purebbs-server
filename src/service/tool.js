var svgCaptcha = require('svg-captcha'); //引入验证
const crypto = require('crypto');

module.exports = {
    async captcha (){
    
        var captcha = svgCaptcha.create({ 
            size:6,
            fontSize: 50, 
            width: 100, 
            height:40,
            background:"#cc9966" 
          });
    
        return captcha;
      }
}