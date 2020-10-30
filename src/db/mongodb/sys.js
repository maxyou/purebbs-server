const config = require('./config')
// console.log('--------db/mongodb/user.js-------')


/**
 * sys.js 系统性操作，比如查看统计信息
 */

module.exports = {

    async getUsersTopByPostNum(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db getByPaginate pageInfo admin--------------')
        // console.log(query)
        // console.log(options)
        var res = await config.getModel('User').paginate(query, options)
        config.getModel('User').find({}).sort({})
        // console.log('---------db getByPaginate res admin--------------')
        // console.log(res)
        return res;
    },
    async __getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        // console.log('---------db getByPaginate pageInfo admin--------------')
        // console.log(query)
        // console.log(options)
        var res = await config.getModel('User').paginate(query, options)
        // console.log('---------db getByPaginate res admin--------------')
        // console.log(res)
        return res;
    },
    async __getPostId(){
        var postId = await config.getModel('Config').findOne({name:'postId'})
        return parseInt(postId.content)
    },

}