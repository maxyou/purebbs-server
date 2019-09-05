const db = require('../../db')
const { time, calc } = require('../../tool')

// console.log('--------post/index.js-------')

module.exports = {


    async add(post, ctx) {

        await time.delay(1)

        // console.log('--------post/index.js-------addUser')
        // console.log(post)
        
        var postId = await db.post.getPostId()
        postId++
        post = {...post, 
            postId, 
            author:calc.getUserData(ctx).name,
            authorId:calc.getUserData(ctx)._id,
            avatarFileName:calc.getUserData(ctx).avatarFileName,
            source:calc.getUserData(ctx).source,
            oauth:calc.getUserData(ctx).oauth,
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
    
    async getByPaginate(query, ctx) {

        await time.delay(1)

        let user = calc.getUserData(ctx)

        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        // console.log('-----service post getByPaginate paginateQuery-------')
        // console.log(paginateQuery)


        /**
         * 要求必须读出anonymous这样的安全属性。客户端访问时有可能漏掉，在这里强制加上
         */
        if(paginateQuery && paginateQuery.options){
            
            paginateQuery.options.select = calc.addSecuritySelect(paginateQuery.options.select)
            
        }else{
            return { code: -1, message: '获取数据失败，没有指定所需字段'}
        }

        // console.log('-----service post getByPaginate paginateQuery-------after add anonymous:')
        // console.log(paginateQuery)

        var totalDocs = await db.post.findAndCount(paginateQuery.query)
        // console.log('-----service post getByPaginate findAndCount totalDocs-------')
        // console.log(totalDocs)


        const {offset, limit} = paginateQuery.options
        // console.log('=========service post count================0')
        // console.log(offset)
        // console.log(limit)
        // console.log('=========service post count================1')
        var stickTopCount = await db.post.findAndCount({...paginateQuery.query, stickTop: {$eq:true}})
        // console.log('service post stickTopCount:')
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

        var docs
        if(offset > (stickTopCount-1)){ //没有stickTop

            // console.log('=========service post offset > stickTopCount, no stick================')
            
            paginateQuery.options = {...paginateQuery.options, offset:offset-stickTopCount}
            paginateQuery.query = {...paginateQuery.query, stickTop: false}            
            
            var res = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log('service post getByPaginate----2')
            // console.log(res.docs)
            
            docs = res.docs
            // return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: totalDocs };
                
        }else if((offset+limit-1) <= (stickTopCount-1)){ //全是stickTop

            // console.log('=========service post offset+limit < stickTopCount, all stick================')
            
            paginateQuery.query = {...paginateQuery.query, stickTop: true}

            var res = await db.post.getByPaginate(paginateQuery.query, paginateQuery.options)
            // console.log('service post getByPaginate----2')
            // console.log(res.docs)

            docs = res.docs
            // return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: totalDocs };
                
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
            
            docs = resStickTop.docs.concat(resNoneStickTop.docs)

            // return { code: 0, message: '获取数据成功', data: resStickTop.docs.concat(resNoneStickTop.docs), totalDocs: totalDocs };
    
        }


        let docsWithCurrentLike = docs.map((v) => {


            /**
             * 什么情况下不屏蔽author信息？
             * 1，作者自己读取
             * 2，其他人读取，并且anonymous明确是false。如果是undefined则当成true处理
             * 
             */
            // console.log('------------------------------------------------------')

            if(v.authorId == user._id || v.anonymous === false ){
                // console.log('-----------------v.authorId == user._id || !v.anonymous-------------------')
                // console.log(v.anonymous)
                // console.log(!v.anonymous)
            }else{
                // console.log('-----------------else-------------------')
                // console.log(v.anonymous)
                // console.log(!v.anonymous)

                v.authorId = 'anonymous'
                v.author = 'anonymous'
                v.avatarFileName = 'anonymous.png'
                v.source = 'register'
                v.oauth = undefined
                // if(v.fromUser){
                //     v.fromUser[0]._id = 'anonymous'
                //     v.fromUser[0].avatarFileName = 'anonymous.png'
                // }
            }


            let likeHasCurrentUser = false
            if (v.likeUser) {
                likeHasCurrentUser = v.likeUser.some((vv) => {
                    return vv._id == user._id
                })
            }
            v.likeHasCurrentUser = likeHasCurrentUser
            return v
        })

        return { code: 0, message: '获取数据成功', data: docsWithCurrentLike, totalDocs: totalDocs };
    },

    // async getByPaginateWithStickTop(query) {

    //     await time.delay(1)

    //     // console.log('service post getByPaginate')

    //     var result = await db.post.findAndCount({stickTop: true})
    //     console.log(result)

    //     return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    // },


    async findByIdAndDelete(post, ctx) {

        await time.delay(1)
        
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

    //     await time.delay(1)

    //     // console.log('-----service findByIdAndUpdate-------')
    //     // console.log(JSON.stringify(post))

    //     var res = await db.post.findByIdAndUpdate(post)
    //     // console.log('--------update--------')
    //     // console.log(JSON.stringify(res))
    //     // console.log('--------update--------')
    //     return { code: 0, message: 'post findByIdAndUpdate更新数据成功', data: res };
    // }
}