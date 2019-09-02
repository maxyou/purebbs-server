const axios = require('axios')
const { time, calc } = require('../tool')
const appConfig = require('../../config')
console.log('before querystring require')
const querystring = require('querystring');
console.log('after querystring require')
const db = require('../db')
const uuidv1 = require('uuid/v1')

module.exports = {

    async oauthGithub(query, ctx) {

        let code = query.code
        console.log('------- service oauthGithub ----------')
        console.log(code)
        console.log('------- service oauthGithub ----------1')
        console.log(appConfig.oauth_github.client_id)
        console.log(appConfig.oauth_github.client_secret)

        var resAccessToken = await axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token?' +
              `client_id=${appConfig.oauth_github.client_id}&` +
              `client_secret=${appConfig.oauth_github.client_secret}&` +
              `code=${code}`,
            headers: {
              accept: 'application/json'
            }
          });


        console.log('------- service oauthGithub ----------2')
        // console.log(res)
        console.log(resAccessToken.data)
        console.log(resAccessToken.data.access_token)
        console.log('------- service oauthGithub ----------3')
        // let query = querystring.parse(res.data)
        // console.log(query)
        // console.log(JSON.stringify(query))


        const resOauthUserData = await axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
              accept: 'application/json',
              Authorization: `token ${resAccessToken.data.access_token}`
            }
          });

        console.log('------- service oauthGithub ----------4')
        console.log(resOauthUserData.data)
        // return { code: 0, message: '获取数据成功', data: {data:result.data} };

        let oauthUserData = resOauthUserData.data
        console.log('------- service oauthGithub ----------5')

        let oauthInfo = {
          oauthName:'github',
          login:oauthUserData.login,
          id:oauthUserData.id,
          type:oauthUserData.type,
          name:oauthUserData.name,
          avatarUrl:oauthUserData.avatar_url,
          homepageUrl:oauthUserData.html_url,
          email:oauthUserData.email,
        }
        let user = {
          uuid:uuidv1(),
          name:oauthUserData.login + '@github',
          source: 'oauth',
          oauth:oauthInfo
        }
        console.log('------- service oauthGithub ----------6')
        let found = await db.user.findUserByName({name:user.name})
        console.log('------- service oauthGithub ----------7')
        if(found.length > 0){
          console.log('------- service oauthGithub ----------8')
          //如果之前登录过，更新
          user = {...user, _id:found[0]._id}
          db.user.findByIdAndUpdate(user)
        }else{
          console.log('------- service oauthGithub ----------9')
          //如果之前没有登录过，直接写入
          let resAddUser = db.user.addUser(user)
          user = {...user, _id:resAddUser._id}
        }

        console.log('------- service oauthGithub ----------10')
        console.log(user)

        //写入session
        ctx.session.userinfo = { isLogin: true, result:{
          code: 0,
          message: 'github login success',
          data: user
        }};

        console.log('------- service oauthGithub ----------11')

        return `
        <html>
        <head>
        <meta http-equiv="Content-Language" content="zh-CN">
        <meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gb2312">
        <meta http-equiv="refresh" content="5;url=http://localhost:3000">
        <title>html网页自动跳转代码--西农大网站</title>
        </head>
        <body>
    
        will jump to homepage soon ......
    
        </body>
        </html>  
        `

    },
    async categoryGet(query, ctx) {

        await time.delay(1)
        
        return { code: 0, message: '获取数据成功', data: {category: appConfig.category} };

    },


}