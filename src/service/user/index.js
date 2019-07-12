const db = require('../../db')
const config = require('./config')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const fs = require('fs')
const { calc, time } = require('../../tool')

// console.log('--------user/index.js-------')

module.exports = {

    async findByIdAndUpdate(user, ctx) {

        await time.delay(100)
        
        console.log('--------service user update--------')

        // if(isAdmin(ctx)){

        // }else{
        //     return { code: 0, message: '需要admin权限', data: {}}
        // }

        var res = await db.user.findByIdAndUpdate(user)
        // console.log(JSON.stringify(res))
        console.log('--------user update--------2')
        return { code: 0, message: 'user findByIdAndUpdate更新数据成功', data: res };
    },

    async uploadAvatar(avatarFileName, ctx) {

        console.log(avatarFileName)
        
        //查询user表的数据
        console.log('--------service user/uploadAvatar-------1')
        await db.user.uploadAvatar(avatarFileName, calc.getUserData(ctx)._id)
        console.log('--------service user/uploadAvatar-------2')
        
        //删除旧头像
        if(calc.getUserData(ctx).avatarFileName){
            console.log('upload/user/avatar/'+calc.getUserData(ctx).avatarFileName)

            var b = fs.existsSync('upload/user/avatar/'+calc.getUserData(ctx).avatarFileName)
            if(b){
                await fs.unlinkSync('upload/user/avatar/'+calc.getUserData(ctx).avatarFileName)
            }

            // try{
            // }catch(e){
            //     console.log(e)
            // }
        }

        console.log('--------update session-------'+avatarFileName)
        ctx.session.userinfo.result.data.avatarFileName = avatarFileName

        // console.log(users)
        console.log('--------service user/uploadAvatar-------2')

        return
    },

    async getUsers() {

        //查询user表的数据
        console.log('--------user/index.js-------1')
        var users = await db.user.getUsers()
        // console.log(users)
        console.log('--------user/index.js-------2')

        return users //这里需过滤，防止返回密码等信息
    },

    async addUser(user) {

        /**
         * 建议策略
         *  1，管理员：admin
         *  2，版主或普通用户的名字必须都是英文，并且长度超过6个字母
         */


        console.log('--------user/index.js-------addUser')

        //查询用户名是否冲突，返回一个数组
        var found = await db.user.searchUserByName({ "name": user.name });

        if (found.length > 0) {
            console.log('add user fail for duplicated name')
            return { code: -1, message: '用户名重复', data:{} };
        } else {
            console.log('add user ---- salt')

            user.salt = crypto.randomBytes(32).toString('hex');//32字节，也即256bit

            const hmac = crypto.createHmac('sha256', config.hmackey);

            hmac.update(user.salt + user.password);
            user.hashpwd = hmac.digest('hex');
            user.password = '';

            user.uuid = uuidv1()

            console.log('add user ------------- call db')
            console.log(user)
            
            //增加用户
            if(user.name == 'admin'){
                user.role = 'admin'
                // console.log('add admin ----------'+user.role)
            }else if(user.name.length < 6){
                return { code: -1, message: '用户名需6个字符或以上', data:{} };
            }
            // console.log(user.name)
            // console.log(user.role)
            var res = await db.user.addUser(user)

            console.log('add user ---- after call db')
            console.log(res)

            if (res) {//或者比较返回值的name属性？
                return { code: 0, message: '添加用户成功', 
                    data:{
                        _id:res._id,
                        uuid:res.uuid,
                        name:res.name,
                        email:res.email,
                        role:res.role,
                        updated:res.updated,
                        created:res.created,
                    } 
                }
            } else {
                return { code: -1, message: '添加用户异常', data:{} };
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
                // console.log('userFound:')
                // console.log(userFound)
                return { code: 0, message: '认证成功', 
                    data:{
                        _id: userFound._id,
                        uuid: userFound.uuid,
                        name: userFound.name,
                        email: userFound.email,
                        role: userFound.role,
                        updated: userFound.updated,
                        created: userFound.created,
                        avatarFileName:userFound.avatarFileName,
                    } 
                }
            } else {
                return { code: -1, message: '密码错误' };
            }

        } else {
            return { code: -1, message: '没有找到用户' };
        }

    }
}