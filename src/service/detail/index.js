const db = require('../../db')
const { time } = require('../../tool')

console.log('--------detail/index.js-------')

module.exports = {

    async detailPostGet(v) {        
        await time.delay(100)
        
        const params = JSON.parse(v)
        
        console.log('service params:')
        console.log(params.condition)
        console.log(params.select)
        var res = await db.detail.detailPostGet(params.condition, params.select)
        console.log('service detail post get----')
        console.log(res)
        return { code: 0, message: '获取数据成功', data: res};
    },

    async getByPaginate(query) {

        await time.delay(100)

        console.log('service comment getByPaginate')
        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        var res = await db.detail.getByPaginate(paginateQuery.query, paginateQuery.options)
        console.log('service comment getByPaginate----2')
        console.log(res)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },

    async detailCommentAdd(comment, ctx) {

        await time.delay(100)

        comment = {...comment, 
            author:ctx.session.userinfo.result.data.name,
            authorId:ctx.session.userinfo.result.data._id,
            avatarFileName:ctx.session.userinfo.result.data.avatarFileName
        }
        
        console.log('--------post/index.js-------detailCommentAdd')
        var res = await db.detail.detailCommentAdd(comment)

        // console.log('add post ---- after call db')
        // console.log(res)

        if (res) {//或者比较返回值的name属性？

            console.log('get comment keys-----------------------')
            console.log(Object.keys(comment))
            var project
            Object.keys(comment).forEach((v)=>{
                project = project +' '+v
            })
            console.log(project)

            // var post = await db.detail.detailPostGet({postId:comment.postId}, 'postId content author authorId updated created avatarFileName')            
            var post = await db.detail.detailPostGet({postId:comment.postId}, 'commentNum')
            console.log('update post comment num')
            console.log(post)
            post.commentNum = post.commentNum || 0
            post.commentNum += 1
            await db.detail.postFindByIdAndUpdate(post)

            return { code: 0, message: '发表成功', res: res };
        } else {
            return { code: -1, message: '发表异常' };
        }
    },
    async findByIdAndDelete(comment, ctx) {

        await time.delay(100)

        // console.log('-----service findByIdAndDelete-------')
        // console.log(JSON.stringify(post))

        var res = await db.detail.findByIdAndDelete(comment)
        // console.log('--------delete--------')
        // console.log(JSON.stringify(res))
        // console.log('--------delete--------')

        if (res) {//或者比较返回值的name属性？

            console.log('get comment keys-----------------------')
            console.log(Object.keys(comment))
            var project
            Object.keys(comment).forEach((v)=>{
                project = project +' '+v
            })
            console.log(project)

            // var post = await db.detail.detailPostGet({postId:comment.postId}, 'postId content author authorId updated created avatarFileName')            
            var post = await db.detail.detailPostGet({postId:comment.postId}, 'commentNum')
            console.log('update post comment num')
            console.log(post)
            post.commentNum = post.commentNum || 0
            if(post.commentNum > 0){
                post.commentNum -= 1
            }
            await db.detail.postFindByIdAndUpdate(post)

            return { code: 0, message: '删除成功', res: res };
        } else {
            return { code: -1, message: '删除异常' };
        }

    },
    async findByIdAndUpdate(comment, ctx) {

        await time.delay(100)

        // console.log('-----service findByIdAndUpdate-------')
        // console.log(JSON.stringify(post))

        var res = await db.detail.findByIdAndUpdate(comment)
        // console.log('--------update--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
    async postFindByIdAndUpdate(post, ctx) {

        await time.delay(100)

        // console.log('-----service postFindByIdAndUpdate-------')
        // console.log(JSON.stringify(post))

        var res = await db.detail.postFindByIdAndUpdate(post)
        // console.log('--------update--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
}