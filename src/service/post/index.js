const db = require('../../db')

console.log('--------post/index.js-------')

module.exports = {


    async add(post) {

        console.log('--------post/index.js-------addUser')
            //增加用户
            var res = await db.post.add(post)

            console.log('add post ---- after call db')
            console.log(res)

            if (res) {//或者比较返回值的name属性？
                return { code: 0, message: '发表成功', res:res };
            } else {
                return { code: -1, message: '发表异常' };
            }


    },
    async getByPaginate(query) {
        console.log('service post getByPaginate')
        var res = await db.post.getByPaginate(query)
        console.log('service post getByPaginate----2')
        console.log(res.docs)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };
        
    },


    async findByIdAndDelete(post) {


    },
    async findByIdAndUpdate(post) {


    }
}