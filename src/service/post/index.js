const db = require('../../db')
const { time, calc } = require('../../tool')

// console.log('--------post/index.js-------')

module.exports = {


    async add(post, ctx) {

        await time.delay(100)

        // console.log('--------post/index.js-------addUser')
        var postId = await db.post.getPostId()
        postId++
        post = {...post, 
            postId, 
            author:calc.getUserData(ctx).name,
            authorId:calc.getUserData(ctx)._id,
            avatarFileName:calc.getUserData(ctx).avatarFileName
        }
        var res = await db.post.add(post)

        // console.log('add post ---- after call db')
        // console.log(res)

        if (res) {//或者比较返回值的name属性？
            await db.post.setPostId(postId)
            return { code: 0, message: '发表成功', res: res };
        } else {
            return { code: -1, message: '发表异常' };
        }
    },
    
    async getByPaginate(query) {

        await time.delay(100)

        // console.log('service post getByPaginate')
        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        var res = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
        // console.log('service post getByPaginate----2')
        // console.log(res.docs)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },


    async findByIdAndDelete(post) {

        await time.delay(100)

        console.log('-----service findByIdAndUpdate-------')
        // console.log(JSON.stringify(post))
        
        var res = await db.post.findByIdAndDelete(post)
        console.log('-----service findByIdAndUpdate-------1')
        
        if(res){
            await db.post.findCommentByPostIdAndDelete(post)
            console.log('-----service findByIdAndUpdate-------2')
        }
        
        console.log('-----service findByIdAndUpdate-------3')
        return { code: 0, message: '删除数据成功', data: res };

    },
    async findByIdAndUpdate(post) {

        await time.delay(100)

        // console.log('-----service findByIdAndUpdate-------')
        // console.log(JSON.stringify(post))

        var res = await db.post.findByIdAndUpdate(post)
        // console.log('--------update--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')
        return { code: 0, message: 'post findByIdAndUpdate更新数据成功', data: res };
    }
}