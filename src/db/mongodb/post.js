const config = require('./config')
// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getByPaginate(pageInfo = {offset: 0, limit: 20}) {

        console.log('---------db getByPaginate pageInfo --------------')
        console.log(pageInfo)
        var res = await config.getModel('Post').paginate({ }, pageInfo)
        // console.log('---------db getByPaginate res --------------')
        // console.log(res)
        return res;
    },
    
    async add(post) {
        
        console.log('--------db/mongodb/user.js-------addUser')

        var postIncIdLast = await config.getModel('Config').findOne({name:'postIncId'})
        console.log(postIncIdLast)
        var postIncIdLastNew = parseInt(postIncIdLast.content)
        postIncIdLastNew++
        await config.getModel('Config').findOneAndUpdate({name:'postIncId'}, {content:''+postIncIdLastNew})

        var postWithIncId = {...post, incId:postIncIdLastNew}
        var Model = config.getModel('Post')
        // console.log('--------db/mongodb/user.js-------addUser---getModel')
        //增加用户
        return await new Model(postWithIncId).save(
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
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndUpdate(_id, resProps)
        return res
    },

    async findByIdAndDelete({_id}) {

        // console.log('-----db findByIdAndUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndDelete(_id)
        return res
    },

}