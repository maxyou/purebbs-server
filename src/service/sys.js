const db = require('../db')
const { time, calc } = require('../tool')
const appConfig = require('../../config')



module.exports = {

    async categoryGet(query, ctx) {

        await time.delay(1)
        
        return { code: 0, message: '获取数据成功', data: {category: appConfig.category} };

    },


}