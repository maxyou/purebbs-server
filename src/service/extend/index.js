const db = require('../../db')
const { time, calc } = require('../../tool')

// console.log('--------post/index.js-------')

module.exports = {

    async lineupJoin(post, ctx) {

        await time.delay(100)

        console.log('--------extend/index.js-------lineupJoin')
        console.log(post) //{"anonymous":"","message":""}
        
        if(calc.isLogin(ctx)){
            
            console.log('--------extend/index.js-------calc.isLogin')
            
            var user = calc.getUserData(ctx)
            
            var res = await db.detail.detailPostGet({postId: post.postId}, 'title content postId author extend')
            console.log('--------extend/index.js-------detailPostGet')
            console.log(res)

            var lineupArray = res.extend.lineupData || []

            var someResult = lineupArray.some(function(item, index, array){
                return item._id == user._id
            })

            if(someResult){
                return { code: -1, message: '已经接龙了' };
            }

            lineupArray.push({
                _id: user._id,
                name: user.name,
                anonymous: post.anonymous,
                message: post.message,
            })

            res.extend.lineupData = lineupArray
            console.log('--------extend/index.js-------before update')
            console.log(res)
            
            var updateRes = await db.detail.postFindByIdAndUpdate(res)
            console.log('--------extend/index.js-------after update')
            console.log(updateRes)

            return { code: 0, message: '发表成功'}
        }else{
            return { code: -1, message: '登录后才能join' }
        }
        
    },    

    async lineupQuit(post, ctx) {

        await time.delay(100)

        console.log('--------extend/index.js-------lineupQuit')
        console.log(post) //{"anonymous":"","message":""}
        
        if(calc.isLogin(ctx)){
            
            console.log('--------extend/index.js-------calc.isLogin')
            
            var user = calc.getUserData(ctx)
            
            var res = await db.detail.detailPostGet({postId: post.postId}, 'title content postId author extend')
            console.log('--------extend/index.js-------detailPostGet')
            console.log(res)

            var lineupArray = res.extend.lineupData || []

            var filterResult = lineupArray.filter(function(item, index, array){
                return item._id != user._id
            })

            res.extend.lineupData = filterResult
            console.log('--------extend/index.js-------before update')
            console.log(res)
            
            var updateRes = await db.detail.postFindByIdAndUpdate(res)
            console.log('--------extend/index.js-------after update')
            console.log(updateRes)

            return { code: 0, message: '已经退出'}
        }else{
            return { code: -1, message: '登录后才能join' }
        }
        
    },

    async voteJoin(post, ctx) {

        await time.delay(100)

        console.log('--------extend/index.js-------voteJoin')
        console.log(post) //{"anonymous":"","message":""}
        
        if(0){
            return { code: 0, message: '发表成功'}
        }

        if(calc.isLogin(ctx)){
            
            console.log('--------extend/index.js-------calc.isLogin')
            
            var user = calc.getUserData(ctx)
            
            var res = await db.detail.detailPostGet({postId: post.postId}, 'title content postId author extend')
            console.log('--------extend/index.js-------detailPostGet')
            console.log(res)

            var voteArray = res.extend.voteData
            if(!voteArray){ //或者为空，或者按option数量初始化
                const length = res.extend.addVote.options.length
                for(var i=0;i<length;i++){
                    voteArray.push([])
                }
            }

            /**
             * 在多端登录情况下存在“加入投票，未退出投票，再次加入投票”的情况，所以后端总是允许用户再次投票
             * 每次加入投票之前总是清除该用户所有之前的投票
             * 
             * 在前端控制用户必须先退出投票，然后才能再次投票
             */

            var cleanVoteArray = voteArray.map(function(item, index, array){
                return item.filter(function(itemInner, index, array){
                    return itemInner._id != user._id
                })
            })
            console.log('--------JSON.stringify(voteArray)--------------')
            console.log(JSON.stringify(voteArray))
            console.log('--------JSON.stringify(cleanVoteArray)--------------')
            console.log(JSON.stringify(cleanVoteArray))

            const ifMulti = res.extend.addVote.ifMulti

            switch(ifMulti){
                case 'single':
                        cleanVoteArray[post.singleVote].push({
                        _id: user._id,
                        name: user.name,
                        anonymous: post.anonymous,
                    })
                    break
                case 'multiple':
                    for(var i in post.multiVote){
                        cleanVoteArray[i].push({
                            _id: user._id,
                            name: user.name,
                            anonymous: post.anonymous,
                        })    
                    }
                    break
            }
            

            console.log('--------have not join--------------3')
            console.log(JSON.stringify(cleanVoteArray))

            res.extend.voteData = cleanVoteArray
            console.log('--------extend/index.js-------before update')
            console.log(res)
            
            var updateRes = await db.detail.postFindByIdAndUpdate(res)
            console.log('--------extend/index.js-------after update')
            console.log(updateRes)

            return { code: 0, message: '发表成功'}
        }else{
            return { code: -1, message: '登录后才能join' }
        }
        
    },    

    async voteQuit(post, ctx) {

        await time.delay(100)

        console.log('--------extend/index.js-------voteQuit')
        console.log(post) //{"anonymous":"","message":""}
        
        if(calc.isLogin(ctx)){
            
            console.log('--------extend/index.js-------calc.isLogin')
            
            var user = calc.getUserData(ctx)
            
            var res = await db.detail.detailPostGet({postId: post.postId}, 'title content postId author extend')
            console.log('--------extend/index.js-------detailPostGet')
            console.log(res)

            var voteArray = res.extend.voteData || []

            var filterResult = voteArray.filter(function(item, index, array){
                return item._id != user._id
            })

            res.extend.voteData = filterResult
            console.log('--------extend/index.js-------before update')
            console.log(res)
            
            var updateRes = await db.detail.postFindByIdAndUpdate(res)
            console.log('--------extend/index.js-------after update')
            console.log(updateRes)

            return { code: 0, message: '已经退出'}
        }else{
            return { code: -1, message: '登录后才能join' }
        }
        
    },
    
}