const config = require('./config')
console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getUsers() {

        //查询user表的数据
        // console.log('--------db/mongodb/user.js-------1')
        var User = config.getModel('User')
        // console.log('--------db/mongodb/user.js-------2')
        var users = await User.find({});
        // console.log(users)
        // console.log('--------db/mongodb/user.js-------3')
        return users
        // return await config.getModel('User').find({});
    },
    
    async addUser(user) {
        
        console.log('--------db/mongodb/user.js-------addUser')
        var Model = config.getModel('User')
        console.log('--------db/mongodb/user.js-------addUser---getModel')
        //增加用户
        return await new Model(user).save(
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