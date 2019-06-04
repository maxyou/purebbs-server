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

    async getByPaginate(query) {

        await time.delay(1000)

        console.log('service comment getByPaginate')
        var res = await db.detail.getByPaginate(JSON.parse(query))//parse才能把字符串‘-1’解析为数字‘-1’
        console.log('service comment getByPaginate----2')
        console.log(res.docs)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },

    async detailCommentAdd(comment) {

        await time.delay(1000)

        // console.log('--------post/index.js-------addUser')
        //增加用户
        var res = await db.detail.detailCommentAdd(comment)

        // console.log('add post ---- after call db')
        // console.log(res)

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '发表成功', res: res };
        } else {
            return { code: -1, message: '发表异常' };
        }
    },
}