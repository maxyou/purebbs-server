const db = require('../db')
const config = require('./config')
const crypto = require('crypto');

console.log('--------user/index.js-------')

module.exports = {


    async getUsers() {

        //查询user表的数据
        console.log('--------user/index.js-------1')
        var users = await db.user.getUsers()
        console.log(users)
        console.log('--------user/index.js-------2')

        return users
    },

    async addUser(user) {

        console.log('--------user/index.js-------addUser')

        //查询用户名是否冲突，返回一个数组
        var found = await db.user.searchUserByName({ "name": user.name });

        if (found.length > 0) {
            console.log('add user fail for duplicated name')
            return { code: -1, message: '用户名重复' };
        } else {
            console.log('add user ---- salt')

            user.salt = crypto.randomBytes(32).toString('hex');//32字节，也即256bit

            const hmac = crypto.createHmac('sha256', config.hmackey);

            hmac.update(user.salt + user.password);
            user.hashpwd = hmac.digest('hex');
            user.password = '';


            console.log('add user ---- call db')
            //增加用户
            var res = await db.user.addUser(user)

            console.log('add user ---- after call db')
            console.log(res)

            if (res) {//或者比较返回值的name属性？
                return { code: 0, message: '添加用户成功', res:res };
            } else {
                return { code: -1, message: '添加用户异常' };
            }
        }

    },

    async authenticateUser(user) {

        //查询用户名是否存在，取第一个
        var found = await db.user.searchUserByName({ "name": user.name });

        if (found.length > 0) {

            var userFound = found[0];

            const hmac = crypto.createHmac('sha256', config.hmackey);

            hmac.update(userFound.salt + user.password);
            var hashpwd = hmac.digest('hex');
            if (hashpwd == userFound.hashpwd) {
                return { code: 0, message: '认证成功，欢迎 ' + user.name + ' 登录', res:userFound };
            } else {
                return { code: -1, message: '密码错误' };
            }

        } else {
            return { code: -1, message: '没有找到用户' };
        }

    }
}