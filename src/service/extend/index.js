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
    
}