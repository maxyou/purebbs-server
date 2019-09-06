const db = require('../../db')
const { time, calc } = require('../../tool')
const { command } = require('../common')
const ObjectId = require('mongodb').ObjectID

// console.log('--------detail/index.js-------')

module.exports = {

    async detailPostGet(v, ctx) {
        await time.delay(1)

        const params = JSON.parse(v)

        // console.log('service params:')
        // console.log(params.condition)
        // console.log(params.select)

        params.select = calc.addSecuritySelect(params.select)
        // var position = params.select.indexOf('anonymous')
        // if(position > -1){

        // }else{
        //     params.select = params.select.concat(' anonymous')
        // }

        // console.log('after add anonymous:')
        // console.log(params.select)

        var res = await db.detail.detailPostGet(params.condition, params.select)
        // console.log('service detail post get----')
        // console.log(res)

        if (res) {

        } else {
            return { code: -1, message: '获取数据失败' };
        }

        //extend过滤匿名数据
        var user = calc.getUserData(ctx)
        if (res && res.extend) {
            switch (res.extend.addChoice) {
                case 'lineup':
                    var hasCtxUser = false
                    console.log(user)
                    var afterFilter = res.extend.lineupData.map((v) => {

                        console.log('v:')
                        console.log(v)

                        if (v._id == user._id) {
                            console.log('hasCtxUser = true')
                            hasCtxUser = true
                        }
                        if (v.anonymous) {
                            return {
                                // ...v,
                                _id: 'anonymous',
                                name: 'anonymous',
                                source: 'register',
                                oauth: undefined,
                                avatarFileName: 'anonymous.png',
                                anonymous: true,
                            }
                        } else {
                            return v
                        }
                    })
                    res.extend.hasCtxUser = hasCtxUser
                    res.extend.lineupData = afterFilter
                    break
                case 'vote':
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
                                    // ...v,
                                    _id: 'anonymous',
                                    name: 'anonymous',
                                    source: 'register',
                                    oauth: undefined,
                                    avatarFileName: 'anonymous.png',
                                    anonymous: true,
                                }
                            } else {
                                return v
                            }
                        })
                    })
                    res.extend.hasCtxUser = hasCtxUser
                    res.extend.voteData = afterFilter
                    break
            }
            // if (res.extend.lineupData) {
            // }
            // if (res.extend.voteData) {
            // }
        }

        if (res.authorId == user._id || res.anonymous === false) {
            // console.log('-----------------res.authorId == user._id || !res.anonymous-------------------')
            // console.log(res.anonymous)
            // console.log(!res.anonymous)
        } else {
            // console.log('-----------------else-------------------')
            // console.log(res.anonymous)
            // console.log(!res.anonymous)

            res.authorId = 'anonymous'
            res.author = 'anonymous'
            res.source = 'register'
            res.oauth = undefined
            res.avatarFileName = 'anonymous.png'
            // if (res.fromUser) {
            //     res.fromUser[0]._id = 'anonymous'
            // }
        }

        // console.log('----------detail post get like user-------------')
        // console.log(res.likeUser)
        if (res.likeUser) {
            // console.log('----------res.likeUser-------------')
            res.likeHasCurrentUser = res.likeUser.some((v) => {
                return v._id == user._id
            })
            // console.log(res.likeHasCurrentUser)
        } else {
            res.likeHasCurrentUser = false
            // console.log(res.likeHasCurrentUser)
        }

        // console.log('----------after filter-------------')
        // console.log(res)


        return { code: 0, message: '获取数据成功', data: res };
    },

    async getByPaginate(query, ctx) {

        await time.delay(1)

        // console.log('service comment getByPaginate')
        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        // console.log('service comment getByPaginate--------------')
        // console.log(paginateQuery)

        /**
         * 要求必须读出anonymous这样的安全属性。客户端访问时有可能漏掉，在这里强制加上
         */
        if (paginateQuery && paginateQuery.options) {

            paginateQuery.options.select = calc.addSecuritySelect(paginateQuery.options.select)

        } else {
            return { code: -1, message: '获取数据失败，没有指定所需字段' }
        }

        // console.log('-----service comment getByPaginate paginateQuery-------after add anonymous:')
        // console.log(paginateQuery)


        var res = await db.detail.getByPaginate(paginateQuery.query, paginateQuery.options)
        // console.log('service comment getByPaginate--------------2')
        // console.log(res)

        /**
         * 计算点赞中有没有当前用户
         * 客户端不方便计算，所以放在服务器端
         */
        let user = calc.getUserData(ctx)
        let data = res.docs.map((v) => {

            // console.log('comment get return:')
            // console.log(v)

            /**
             * 什么情况下不屏蔽author信息？
             * 1，作者自己读取
             * 2，其他人读取，并且anonymous明确是false。如果是undefined则当成true处理
             * 
             */
            // console.log('------------------------------------------------------')

            if (v.authorId == user._id || v.anonymous === false) {
                // console.log('-----------------v.authorId == user._id || !v.anonymous-------------------')
                // console.log(v.anonymous)
                // console.log(!v.anonymous)
            } else {
                // console.log('-----------------else-------------------')
                // console.log(v.anonymous)
                // console.log(!v.anonymous)

                v.authorId = 'anonymous'
                v.author = 'anonymous'
                v.avatarFileName = 'anonymous.png'
                v.source = 'register'
                v.oauth = undefined
                // if (v.fromUser) {
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
            // console.log(v.content)
            // console.log(user.name)
            // console.log(likeHasCurrentUser)
            return v
        })
        // try{
        // }catch(e){
        //     console.log(e)
        // }
        // console.log(data)
        return { code: 0, message: '获取数据成功', data: data, totalDocs: res.totalDocs };

    },

    async detailCommentAdd(comment, ctx) {

        await time.delay(1)

        var commentWithAuthor = {
            ...comment,
            author: calc.getUserData(ctx).name,
            authorId: calc.getUserData(ctx)._id,
            avatarFileName: calc.getUserData(ctx).avatarFileName,
            source:calc.getUserData(ctx).source,
            oauth:calc.getUserData(ctx).oauth,
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
            // console.log('update post comment num')
            // console.log(post)
            post.commentNum = post.commentNum || 0
            post.commentNum += 1

            console.log('update post lastReply')
            post.lastReplyId = commentWithAuthor.anonymous ? 'anonymous' : commentWithAuthor.authorId
            post.lastReplyName = commentWithAuthor.anonymous ? 'anonymous' : commentWithAuthor.author
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

        await time.delay(1)

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
            // console.log('update post comment num')
            // console.log(post)
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

        await time.delay(1)

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

        await time.delay(1)

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
        // 暂定不更新到allUpdated
        // post.allUpdated = Date.now()

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
    async postFindByIdAndAttach(cmd, ctx) {

        await time.delay(1)

        if (!calc.isLogin(ctx)) {
            return { code: -1, message: '需要登录' };
        }

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
        // console.log(JSON.stringify(cmd))
        // console.log(cmd._id)

        /**
         * 有的cmd直接写post，有的需要先读出post，修改后再写入
         */

        var res
        switch (cmd.attachCmd) {
            case command.ATTACH_ACTION.ATTACH_STICK_TOP_SET:
                if (user.role == 'bm') {

                } else {
                    break
                }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_SET)
                var post = { _id: cmd._id, stickTop: true }
                console.log(post)
                res = await db.detail.postFindByIdAndUpdate(post)
                break
            case command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL:
                if (user.role == 'bm') {

                } else {
                    break
                }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_STICK_TOP_CANCEL)
                var post = { _id: cmd._id, stickTop: false }
                console.log(post)
                res = await db.detail.postFindByIdAndUpdate(post)
                break
            case command.ATTACH_ACTION.ATTACH_LIKE_SET:
                // if (!user.isLogin) {
                //     break
                // }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_LIKE_SET)
                var post = await db.detail.detailPostGet({ _id: ObjectId(cmd._id) }, '_id likeUser')
                // console.log(post)
                post.likeUser = post.likeUser || []
                if (post.likeUser.some((v) => {
                    return v._id == user._id
                })) {

                } else {
                    post.likeUser.push({ _id: user._id, name: user.name })
                }
                res = await db.detail.postFindByIdAndUpdate(post)
                break
            case command.ATTACH_ACTION.ATTACH_LIKE_CANCEL:
                // if (!user.isLogin) {
                //     break
                // }
                console.log('--------attach-----------:' + command.ATTACH_ACTION.ATTACH_LIKE_CANCEL)
                var post = await db.detail.detailPostGet({ _id: ObjectId(cmd._id) }, '_id likeUser')
                post.likeUser = post.likeUser || []
                post.likeUser = post.likeUser.filter((v) => {
                    return v._id != user._id
                })
                res = await db.detail.postFindByIdAndUpdate(post)
                break
            default:
        }

        // var res = await db.detail.postFindByIdAndUpdate(post)
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
    async commentFindByIdAndAttach(cmd, ctx) {

        await time.delay(1)

        if (!calc.isLogin(ctx)) {
            return { code: -1, message: '需要登录' };
        }

        const user = calc.getUserData(ctx)
        // if (user.role == 'bm') {
        //     console.log('-----you are bm-------')
        // } else if (user._id == post.authorId) {
        //     console.log('-----you update your post-------')
        // } else {
        //     console.log('-----you update failed for authority-------')
        //     return { code: -2, message: '权限不够' };
        // }

        console.log('--------attach------------------------comment:')
        // console.log(JSON.stringify(cmd))
        // console.log(cmd._id)

        /**
         * 有的cmd直接写post，有的需要先读出post，修改后再写入
         */

        var res
        switch (cmd.attachCmd) {

            case command.ATTACH_ACTION.ATTACH_LIKE_SET:

                console.log('--------attach comment-----------:' + command.ATTACH_ACTION.ATTACH_LIKE_SET)
                var comment = await db.detail.commentFindById({ _id: ObjectId(cmd._id) }, '_id likeUser')
                console.log(comment)
                comment.likeUser = comment.likeUser || []
                if (comment.likeUser.some((v) => {
                    return v._id == user._id
                })) {

                } else {
                    comment.likeUser.push({ _id: user._id, name: user.name })
                }
                res = await db.detail.findByIdAndUpdate(comment)
                break
            case command.ATTACH_ACTION.ATTACH_LIKE_CANCEL:
                // if (!user.isLogin) {
                //     break
                // }
                console.log('--------attach comment-----------:' + command.ATTACH_ACTION.ATTACH_LIKE_CANCEL)
                var comment = await db.detail.commentFindById({ _id: ObjectId(cmd._id) }, '_id likeUser')
                comment.likeUser = comment.likeUser || []
                comment.likeUser = comment.likeUser.filter((v) => {
                    return v._id != user._id
                })
                res = await db.detail.findByIdAndUpdate(comment)
                break
            default:
        }

        // var res = await db.detail.postFindByIdAndUpdate(post)
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')

        if (res) {//或者比较返回值的name属性？
            return { code: 0, message: '更改成功', res: res };
        } else {
            return { code: -1, message: '更改异常' };
        }

    },
}