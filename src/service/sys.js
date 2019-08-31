const axios = require('axios')
const { time, calc } = require('../tool')
const appConfig = require('../../config')
console.log('before querystring require')
const querystring = require('querystring');
console.log('after querystring require')

module.exports = {

    async oauthGithub(query, ctx) {

        let code = query.code
        console.log('------- service oauthGithub ----------')
        console.log(code)
        console.log('------- service oauthGithub ----------1')
        console.log(appConfig.oauth_github.client_id)
        console.log(appConfig.oauth_github.client_secret)

        // var res = await axios.post('https://github.com/login/oauth/access_token', {
        //     client_id: appConfig.oauth_github.client_id,
        //     client_secret: appConfig.oauth_github.client_secret,
        //     code:code,
        //     // redirect_uri:'http://localhost:3000',
        //     redirect_uri:'http://localhost:3001/oauth/redirect',
        //     state:'123456'
        // })

        var res = await axios({
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
        console.log(res.data)
        console.log(res.data.access_token)
        console.log('------- service oauthGithub ----------3')
        // let query = querystring.parse(res.data)
        // console.log(query)
        // console.log(JSON.stringify(query))


        const result = await axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
              accept: 'application/json',
              Authorization: `token ${res.data.access_token}`
            }
          });

        console.log('------- service oauthGithub ----------4')
        console.log(result.data)
        return { code: 0, message: '获取数据成功', data: {data:result.data} };

    },
    async categoryGet(query, ctx) {

        await time.delay(1)
        
        return { code: 0, message: '获取数据成功', data: {category: appConfig.category} };

    },


}