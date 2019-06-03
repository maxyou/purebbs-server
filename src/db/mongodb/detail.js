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
    

}