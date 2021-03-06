const config = require('./config')
// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db getByPaginate pageInfo admin--------------')
        // console.log(query)
        // console.log(options)
        var res = await config.getModel('User').paginate(query, options)
        // console.log('---------db getByPaginate res admin--------------')
        // console.log(res)
        return res;
    },
    async getPostId(){
        var postId = await config.getModel('Config').findOne({name:'postId'})
        return parseInt(postId.content)
    },
    async setPostId(postIdNum){
        return await config.getModel('Config').findOneAndUpdate({name:'postId'}, {content:''+postIdNum})
    },
    async add(post) {
        
        // console.log('--------db/mongodb/user.js-------addUser')

        // var postIdLast = await config.getModel('Config').findOne({name:'postId'})
        // console.log(postIdLast)
        // var postIdLastNew = parseInt(postIdLast.content)
        // postIdLastNew++
        // await config.getModel('Config').findOneAndUpdate({name:'postId'}, {content:''+postIdLastNew})

        // var postWithId = {...post, postId:postIdLastNew}

        var Model = config.getModel('Post')
        // console.log('--------db/mongodb/user.js-------addUser---getModel')
        //增加用户
        return await new Model(post).save(
            //注意，如果添加这个callback，那么await就返回undefined
            // function (err, res) {
            //   console.log(res)
            //   console.log(err)//成功时返回null          
            //   if (err) {
            //     console.log('mongoose save with err')        
            //   } else {
            //     console.log('mongoose save without err')
            //   }
            // }
        );
    },

    async findByIdAndUpdate({_id, ...resProps}) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        console.log(resProps)

        var res = await config.getModel('User').findByIdAndUpdate(_id, resProps)
        return res
    },
    
    async findByIdAndUpdateAvatar(fileName, _id) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('User').findByIdAndUpdate(_id, {avatarFileName:fileName})
        return res
    },

    async findByIdAndDelete({_id}) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndDelete(_id)
        return res
    },

}