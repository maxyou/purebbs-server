const db = require('../../db')
const { time, calc } = require('../../tool')

// console.log('--------post/index.js-------')

module.exports = {


    async add(post, ctx) {

        await time.delay(100)

        console.log('--------post/index.js-------addUser')
        console.log(post)
        
        var postId = await db.post.getPostId()
        postId++
        post = {...post, 
            postId, 
            author:calc.getUserData(ctx).name,
            authorId:calc.getUserData(ctx)._id,
            avatarFileName:calc.getUserData(ctx).avatarFileName,
            created:Date.now(),
            updated:Date.now(),
            allUpdated:Date.now(),
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

        var totalDocs = await db.post.findAndCount()

        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        const {offset, limit} = paginateQuery.options
        // console.log('=========service post count================0')
        // console.log(offset)
        // console.log(limit)
        // console.log('=========service post count================1')
        var stickTopCount = await db.post.findAndCount({stickTop: {$eq:true}})
        // console.log('=========service post count================2')
        // console.log(stickTopCount)

        /**
         * 判断所需页面里面有没有stickTop的
         * 
         * 没有，也即 offset > stickTopCount
         *      offset减去stickTopCount，然后搜非stickTop的
         * 全是，也即 offset+limit < stickTopCount
         *      搜stickTop的并返回
         * 一部分是，也即 offset < stickTopCount < offset+limit
         *      先搜stickTop部分，从offset到stickTopCount
         *      再搜非stickTop部分，从0到offset+limit-stickTopCount
         * 
         */
        if(offset > (stickTopCount-1)){ //没有stickTop

            // console.log('=========service post offset > stickTopCount, no stick================')
            
            paginateQuery.options = {...paginateQuery.options, offset:offset-stickTopCount}
            paginateQuery.query = {...paginateQuery.query, stickTop: false}
            
            var res = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log('service post getByPaginate----2')
            // console.log(res.docs)
            return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: totalDocs };
                
        }else if((offset+limit-1) <= (stickTopCount-1)){ //全是stickTop

            // console.log('=========service post offset+limit < stickTopCount, all stick================')
            
            paginateQuery.query = {...paginateQuery.query, stickTop: true}

            var res = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log('service post getByPaginate----2')
            // console.log(res.docs)
            return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: totalDocs };
                
        }else{ //一部分是stickTop

            // console.log('=========service post offset < stickTopCount < offset+limit, some stick================')

            paginateQuery.options = {...paginateQuery.options, limit:stickTopCount}
            paginateQuery.query = {...paginateQuery.query, stickTop: true}
            var resStickTop = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log(resStickTop.docs)
            
            paginateQuery.options = {...paginateQuery.options, offset:0, limit:offset+limit-stickTopCount}
            paginateQuery.query = {...paginateQuery.query, stickTop: false}
            var resNoneStickTop = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log(resNoneStickTop.docs)



            // console.log('service post getByPaginate----2')
            // console.log(res.docs)
            
            return { code: 0, message: '获取数据成功', data: resStickTop.docs.concat(resNoneStickTop.docs), totalDocs: totalDocs };
    
        }



    },

    async getByPaginateWithStickTop(query) {

        await time.delay(100)

        // console.log('service post getByPaginate')

        var result = await db.post.findAndCount({stickTop: true})
        console.log(result)

        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },


    async findByIdAndDelete(post, ctx) {

        await time.delay(100)
        
        const user = calc.getUserData(ctx)
        if(user.role=='bm'){
            console.log('-----you are bm-------')
        }else if(user._id==post.authorId){
            console.log('-----you delete your post-------')
        }else{
            console.log('-----you delete failed for authority-------')
            return { code: -2, message: '权限不够' };
        }

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
    // async findByIdAndUpdate(post) {

    //     await time.delay(100)

    //     // console.log('-----service findByIdAndUpdate-------')
    //     // console.log(JSON.stringify(post))

    //     var res = await db.post.findByIdAndUpdate(post)
    //     // console.log('--------update--------')
    //     // console.log(JSON.stringify(res))
    //     // console.log('--------update--------')
    //     return { code: 0, message: 'post findByIdAndUpdate更新数据成功', data: res };
    // }
}