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
            lineupArray.push({
                id: user._id,
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

            return { code: 0, message: '发表成功'};
        }else{
            return { code: -1, message: '登录后才能join' };
        }
        

        // if (res) {//或者比较返回值的name属性？
        //     await db.post.setPostId(postId)
        //     return { code: 0, message: '发表成功', res: res };
        // } else {
        //     return { code: -1, message: '发表异常' };
        // }
    },
    
}