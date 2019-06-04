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
    async getByPaginate(query = {}, options = {offset: 0, limit: 20}) {

        console.log('---------db comment getByPaginate pageInfo --------------')
        console.log(query)
        console.log(options)
        var res = await config.getModel('Comment').paginate(query, options)
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

    async detailPostUpdate(post) {

        console.log('-----db detailPostUpdate-------post:')
        console.log(post)

        const _id = post._id
        // const resProps = {...post}
        console.log('-----db detailPostUpdate-------_id:'+_id)
        // console.log(resProps)

        var res = await config.getModel('Post').findByIdAndUpdate(_id, post)
        return res
    },



}