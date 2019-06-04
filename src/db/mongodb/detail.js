const config = require('./config')
// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async detailPostGet(condition, select) {

        console.log('---------db detail get--------------')
        
        var res = await config.getModel('Post').findOne(condition, select)
        console.log('---------db detail post get res --------------')
        console.log(res)
        return res;
    },
    
    async getByPaginate(pageInfo = {offset: 0, limit: 20}) {

        console.log('---------db getByPaginate pageInfo --------------')
        console.log(pageInfo)
        var res = await config.getModel('Comment').paginate({ }, pageInfo)
        // console.log('---------db getByPaginate res --------------')
        // console.log(res)
        return res;
    },
    
    async detailCommentAdd(comment) {
        

        var Model = config.getModel('Comment')
        // console.log('--------db/mongodb/user.js-------addUser---getModel')

        return await new Model(comment).save(
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
}