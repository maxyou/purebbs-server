const db = require('../../db')
const { time } = require('../../tool')

console.log('--------detail/index.js-------')

module.exports = {


    async detailPostGet(v) {
        
        console.log('service detail post get----')
        await time.delay(1000)

        const params = JSON.parse(v)

        console.log('service params:')
        console.log(params.condition)
        console.log(params.select)
        var res = await db.detail.detailPostGet(params.condition, params.select)
        // console.log(res)
        return { code: 0, message: '获取数据成功', data: res};

    },

}