const axios = require('axios')
const { time, calc } = require('../tool')
const appConfig = require('../../config')



module.exports = {

    async oauthGithub(query, ctx) {

        let code = query.code
        console.log('------- service oauthGithub ----------')
        console.log(code)
        console.log('------- service oauthGithub ----------1')
        console.log(appConfig.oauth_github.client_id)
        console.log(appConfig.oauth_github.client_secret)

        var res = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: appConfig.oauth_github.client_id,
            client_secret: appConfig.oauth_github.client_secret,
            code:code,
            // redirect_uri:'http://localhost:3000',
            redirect_uri:'http://localhost:3001/oauth/redirect',
            state:'123456'
        })
        console.log('------- service oauthGithub ----------2')
        console.log(res)
        console.log('------- service oauthGithub ----------3')
        console.log(res.data.access_token)
        return { code: 0, message: '获取数据成功', data: {} };

    },
    async categoryGet(query, ctx) {

        await time.delay(1)
        
        return { code: 0, message: '获取数据成功', data: {category: appConfig.category} };

    },


}