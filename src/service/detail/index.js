const db = require('../../db')
const { time, calc } = require('../../tool')
const { command } = require('../common')

// console.log('--------detail/index.js-------')

module.exports = {

    async detailPostGet(v, ctx) {
        await time.delay(100)

        const params = JSON.parse(v)

        console.log('service params:')
        console.log(params.condition)
        console.log(params.select)
        var res = await db.detail.detailPostGet(params.condition, params.select)
        // console.log('service detail post get----')
        // console.log(res)

        //过滤匿名数据
        var user = calc.getUserData(ctx)
        if (res && res.extend) {
            if (res.extend.lineupData) {
                var hasCtxUser = false
                var afterFilter = res.extend.lineupData.map((v) => {
                    if (v._id == user._id) {
                        hasCtxUser = true
                    }
                    if (v.anonymous) {
                        return {
                            ...v,
                            _id: 'anonymous',
                            name: 'anonymous',
                            anonymous: 'anonymous',
                        }
                    } else {
                        return v
                    }
                })
                res.extend.hasCtxUser = hasCtxUser
                res.extend.lineupData = afterFilter
            }
            if (res.extend.voteData) {
                var hasCtxUser = false
                var afterFilter = res.extend.voteData.map((vv) => {
                    console.log('vv:')
                    console.log(vv)
                    return vv.map((v) => {
                        console.log('v:')
                        console.log(v)
                        if (v._id == user._id) {
                            hasCtxUser = true
                        }
                        if (v.anonymous) {
                            return {
                                ...v,
                                _id: 'anonymous',
                                name: 'anonymous',
                                anonymous: 'anonymous',
                            }
                        } else {
                            return v
                        }
                    })
                    // if(vv){
                    // }else{
                    //     return vv
                    // }
                })
                res.extend.hasCtxUser = hasCtxUser
                res.extend.voteData = afterFilter
            }
        }

        console.log('----------after filter-------------')
        // console.log(res)


        return { code: 0, message: '获取数据成功', data: res };
    },

    async getByPaginate(query) {

        await time.delay(100)

        // console.log('service comment getByPaginate')
        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        var res = await db.detail.getByPaginate(paginateQuery.query, paginateQuery.options)
        // console.log('service comment getByPaginate----2')
        // console.log(res)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },

    async detailCommentAdd(comment, ctx) {

        await time.delay(100)

        var commentWithAuthor = {
            ...comment,
            author: calc.getUserData(ctx).name,
            authorId: calc.getUserData(ctx)._id,
            avatarFileName: calc.getUserData(ctx).avatarFileName,
            created: Date.now(),
            updated: Date.now(),
        }

        // console.log('--------post/index.js-------detailCommentAdd')
        var res = await db.detail.detailCommentAdd(commentWithAuthor)

        // console.log('add post ---- after call db')
        // console.log(res)

        if (res) {//或者比较返回值的name属性？

            // console.log('get comment keys-----------------------')
            // console.log(Object.keys(comment))
            // var project
            // Object.keys(comment).forEach((v)=>{
            //     project = project +' '+v
            // })
            // console.log(project)

            // var post = await db.detail.detailPostGet({postId:comment.postId}, 'postId content author authorId updated created avatarFileName')            
            var post = await db.detail.detailPostGet({ postId: comment.postId }, 'commentNum')
            console.log('update post comment num')
            console.log(post)
            post.commentNum = post.commentNum || 0
            post.commentNum += 1

            console.log('update post lastReply')
            post.lastReplyId = commentWithAuthor.authorId
            post.lastReplyName = commentWithAuthor.author
            post.lastReplyTime = Date.now()
            post.allUpdated = Date.now()
            console.log('update post lastReply 2')

            await db.detail.postFindByIdAndUpdate(post)

            return { code: 0, message: '发表成功', res: res };
        } else {
            return { code: -1, message: '发表异常' };
        }
    },
    async findByIdAndDelete(comment, ctx) {

        await time.delay(100)

        const user = calc.getUserData(ctx)
        if (user.role == 'bm') {
            console.log('-----you are bm-------')
        } else if (user._id == comment.authorId) {
            console.log('-----you delete your comment-------')
        } else {
            console.log('-----you delete failed for authority-------')
            return { code: -2, message: '权限不够' };
        }


        // console.log('-----service findByIdAndDelete-------')
        // console.log(JSON.stringify(post))

        var res = await db.detail.findByIdAndDelete(comment)
        // console.log('--------delete--------')
        // console.log(JSON.stringify(res))
        // console.log('--------delete--------')

        if (res) {//或者比较返回值的name属性？

            // console.log('get comment keys-----------------------')
            // console.log(Object.keys(comment))
            // var project
            // Object.keys(comment).forEach((v)=>{
            //     project = project +' '+v
            // })
            // console.log(project)

            // var post = await db.detail.detailPostGet({postId:comment.postId}, 'postId content author authorId updated created avatarFileName')            
            var post = await db.detail.detailPostGet({ postId: comment.postId }, 'commentNum')
            console.log('update post comment num')
            console.log(post)
            post.commentNum = post.commentNum || 0
            if (post.commentNum > 0) {
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

        const user = calc.getUserData(ctx)
        if (user.role == 'bm') {
            console.log('-----you are bm-------')
        } else if (user._id == comment.authorId) {
            console.log('-----you update your comment-------')
        } else {
            console.log('-----you update failed for authority-------')
            return { code: -2, message: '权限不够' };
        }

        comment.updatedById = user._id
        comment.updatedByName = user.name
        comment.updated = Date.now() //但是post的allUpdated不更新

        var res = await db.detail.findByIdAndUpdate(comment)

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
    async postFindByIdAndUpdate(post, ctx) {

        await time.delay(100)

        const user = calc.getUserData(ctx)
        if (user.role == 'bm') {
            console.log('-----you are bm-------')
        } else if (user._id == post.authorId) {
            console.log('-----you update your post-------')
        } else {
            console.log('-----you update failed for authority-------')
            return { code: -2, message: '权限不够' };
        }

        // console.log('-----service postFindByIdAndUpdate-------')
        // console.log(JSON.stringify(post))

        post.updatedById = user._id
        post.updatedByName = user.name
        post.updated = Date.now()
        post.allUpdated = Date.now()

        var res = await db.detail.postFindByIdAndUpdate(post)
        console.log('--------update------------------------stickTop:' + post.stickTop)
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
    async postFindByIdAndAttach(post, ctx) {

        await time.delay(100)

        const user = calc.getUserData(ctx)
        // if (user.role == 'bm') {
        //     console.log('-----you are bm-------')
        // } else if (user._id == post.authorId) {
        //     console.log('-----you update your post-------')
        // } else {
        //     console.log('-----you update failed for authority-------')
        //     return { code: -2, message: '权限不够' };
        // }

        console.log('--------attach------------------------post:')
        console.log(JSON.stringify(post))
        console.log(post.postId)
        console.log(post._id)

        console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_SET)
        console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL)

        switch (post.attachCmd) {
            case command.ATTACH_ACTION.ATTACH_STICK_TOP_SET:
                if (user.role == 'bm') {

                } else {
                    break
                }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_SET)
                post.stickTop = true
                break
            case command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL:
                if (user.role == 'bm') {

                } else {
                    break
                }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL)
                post.stickTop = false
                break
            default:
        }

        console.log(JSON.stringify(post))

        var res = await db.detail.postFindByIdAndUpdate(post)
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
}