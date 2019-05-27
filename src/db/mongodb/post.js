const config = require('./config')
console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getByPaginate(pageInfo = {offset: 0, limit: 20}) {

        var res = await config.getModel('Post').paginate({ }, pageInfo)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };
    },
    
    async add(post) {
        
        console.log('--------db/mongodb/user.js-------addUser')
        var Model = config.getModel('Post')
        console.log('--------db/mongodb/user.js-------addUser---getModel')
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

    async searchUserByName(user) {

        return await config.getModel('User').find({ "name": user.name });

    }

}