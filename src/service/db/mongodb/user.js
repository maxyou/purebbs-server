const config = require('./config')
console.log('--------db/mongodb/user.js-------')

module.exports = {

    async getUsers() {

        //查询user表的数据
        console.log('--------db/mongodb/user.js-------1')
        var User = config.getModel('User')
        console.log('--------db/mongodb/user.js-------2')
        var users = await User.find({});
        console.log(users)
        console.log('--------db/mongodb/user.js-------3')
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

    },
    async authenticateUser(user) {

        //查询用户名是否存在，取第一个
        var found = await config.getModel('User').find({ "name": user.name });

        // if (found.length > 0) {

        //     var userFound = found[0];

        //     const hmac = crypto.createHmac('sha256', config.hmackey);

        //     hmac.update(userFound.salt + user.password);
        //     var hashpwd = hmac.digest('hex');
        //     if (hashpwd == userFound.hashpwd) {
        //         return { code: 0, message: '欢迎 ' + user.name + ' 登录', userFound };
        //     } else {
        //         return { code: -1, message: '密码错误' };
        //     }

        // } else {
        //     return { code: -1, message: '没有找到用户' };
        // }

    }

    // async searchByNamePwd({ name, password }) {
    //     return []
    // },

    // async searchByName({ name, password }) {
    //     console.log('this is searchByName:'+name+' '+password)
    //     return []
    // },

    // async addUser({ name, password }) {
    //     console.log('this is addUser:'+name+' '+password)
    //     return []
    // },

    // async updateUser({ name, password }) {
    //     console.log('this is updateUser:'+name+' '+password)
    //     return []
    // }

}