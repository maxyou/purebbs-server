const config = require('./config')
const crypto = require('crypto');
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

        //查询用户名是否冲突，返回一个数组
        var found = await config.getModel('User').find({ "name": user.name });

        if (found.length > 0) {
            // console.log('add user fail for duplicated name')
            return { code: -1, message: '用户名重复' };
        } else {

            user.salt = crypto.randomBytes(32).toString('hex');//32字节，也即256bit

            const hmac = crypto.createHmac('sha256', config.hmackey);

            hmac.update(user.salt + user.password);
            user.hashpwd = hmac.digest('hex');
            user.password = '';


            //增加用户
            var res = await new config.getModel('User')(user).save(
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

            // console.log(res)

            if (res) {//或者比较返回值的name属性？
                return { code: 1, message: '添加用户成功' };
            } else {
                return { code: -1, message: '添加用户异常' };
            }
        }
    },

    async authenticateUser(user) {

        //查询用户名是否存在，取第一个
        var found = await config.getModel('User').find({ "name": user.name });

        if (found.length > 0) {

            var userFound = found[0];

            const hmac = crypto.createHmac('sha256', config.hmackey);

            hmac.update(userFound.salt + user.password);
            var hashpwd = hmac.digest('hex');
            if (hashpwd == userFound.hashpwd) {
                return { code: 0, message: '欢迎 ' + user.name + ' 登录', userFound };
            } else {
                return { code: -1, message: '密码错误' };
            }

        } else {
            return { code: -1, message: '没有找到用户' };
        }

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