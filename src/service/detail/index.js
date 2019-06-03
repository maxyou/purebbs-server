const db = require('../../db')
const { time } = require('../../tool')

console.log('--------detail/index.js-------')

module.exports = {


    async detailPostGet(id) {
        
        console.log('service detail post get----')
        await time.delay(1000)

        var res = await db.detail.detailPostGet(id)
        // console.log(res)
        return { code: 0, message: '获取数据成功', data: res};

    },

}