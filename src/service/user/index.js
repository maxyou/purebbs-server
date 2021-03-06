const db = require('../../db')
const appConfig = require('../../../config')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const fs = require('fs')
const { calc, time } = require('../../tool')
const nodemailer = require("nodemailer")
const path = require('path')

// console.log('--------user/index.js-------')

module.exports = {

    async logout(setting, ctx) {

        await time.delay(1)

        console.log('--------service user logoutSaveSetting--------')

        let user = {
            _id: calc.getUserData(ctx)._id,
            setting: setting
        }
        console.log(user)
        var res = await db.user.findByIdAndUpdate(user)
        console.log('--------user update--------2------must filter important info')
        console.log(JSON.stringify(res))
        console.log('--------user update--------3')
        return { code: 0, message: 'user findByIdAndUpdate更新数据成功' };
    },
    async findByIdAndUpdate(user, ctx) {

        await time.delay(1)

        console.log('--------service user update--------')

        // console.log(calc.getUserData(ctx)._id)
        // console.log(user._id)

        if (calc.getUserData(ctx)._id == user._id) {

        } else {
            return { code: -1, message: '登录用户只能修改自己的资料', data: {} }
        }

        // if(isAdmin(ctx)){

        // }else{
        //     return { code: 0, message: '需要admin权限', data: {}}
        // }

        var res = await db.user.findByIdAndUpdate(user)
        console.log('--------user update--------2------must filter important info')
        // console.log(JSON.stringify(res))
        console.log('--------user update--------3')
        return { code: 0, message: 'user findByIdAndUpdate更新数据成功' };
    },

    async uploadAvatar(newAvatar, ctx) {

        // await time.delay(1)

        /**
         * 之前版本是直接使用新文件，以及新文件的文件名，这导致avatarFileName改变，导致系统复杂度升高
         * 现在改为新文件替换旧文件，使用旧文件名，也即用户的avatarFileName是永远不变的，这样系统无需做任何其他修改，
         * 同时post及comment也可以直接保存用户的avatarFileName，不用在查询post/comment时再查询一遍user
         * 
         * 所以流程是
         *  如果用户旧头像是系统头像
         *      在数据库中更新用户为新头像
         *  如果用户旧头像是之前上传的头像
         *      删除旧头像，将新头像文件名改为旧头像文件名
         * 
         * 注意
         *  如果头像文件名不改变的话，客户端的缓存不会刷新
         *  解决方案是，客户端自行reload page
         */

        console.log('-------servive uploadAvatar---------------')

        let avatarFileName = calc.getUserData(ctx).avatarFileName //获取旧文件名

        if(!avatarFileName){ //新注册用户始终有 头像文件名 这个字段，老用户可能没有，所以这里兼容一下，新部署时可以删除 todo

            avatarFileName = '' + calc.getUserData(ctx)._id + '.blob' //这样的用户暂时使用id作为文件名
            await db.user.uploadAvatar(avatarFileName, calc.getUserData(ctx)._id) //更新到数据库
    
            console.log('-------servive uploadAvatar---------------2.3')
            ctx.session.userinfo.result.data.avatarFileName = avatarFileName //更新到session
        }

        var avatarPath = path.join(calc.getUploadUserAvatarDir(), avatarFileName)        
        if (fs.existsSync(avatarPath)) { //存在旧文件则删除
            await fs.unlinkSync(avatarPath)
            console.log('uploadAvatar remove old avatar complete!');
        }
        
        console.log('-------servive uploadAvatar---------------2.2')
        var newAvatarPath = path.join(calc.getUploadUserAvatarDir(), newAvatar)        
        fs.rename(newAvatarPath, avatarPath, (err) => { //新文件改为旧文件名
            if (err) {
                console.log(`uploadAvatar rename error! ${newAvatarPath} ${avatarPath}`);
                ctx.log.error(`uploadAvatar rename error! ${newAvatarPath} ${avatarPath}`);
                // throw err;
            }
            console.log('uploadAvatar rename new to old avatar filename!');
        });        
        
        console.log('-------servive uploadAvatar---------------2.4')

        return { code: 0, message: 'upload success' }
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
        var found = await db.user.findUserByName({ "name": user.name });

        if (found.length > 0) {
            console.log('add user fail for duplicated name')
            return { code: -1, message: '用户名重复', data: {} };
        } else {
            console.log('add user ---- salt')

            user.salt = crypto.randomBytes(32).toString('hex');//32字节，也即256bit

            const hmac = crypto.createHmac('sha256', appConfig.user.hmackey);

            hmac.update(user.salt + user.password);
            user.hashpwd = hmac.digest('hex');
            user.password = '';

            user.uuid = uuidv1()

            console.log('add user ------------- call db')
            console.log(user)

            //增加用户
            if (user.name == 'admin') {
                user.role = 'admin'
                // console.log('add admin ----------'+user.role)
            } else if (user.name.length < 6) {
                return { code: -1, message: '用户名需6个字符或以上', data: {} };
            }
            // console.log(user.name)
            // console.log(user.role)

            user.avatarFileName = user.uuid + '.blob' //客户端上传的头像文件的后缀是blob

            var res = await db.user.addUser(user)

            console.log('add user ---- after call db')
            console.log(res)

            if (res) {//或者比较返回值的name属性？
                return {
                    code: 0, message: '添加用户成功',
                    data: {
                        _id: res._id,
                        uuid: res.uuid,
                        name: res.name,
                        email: res.email,
                        role: res.role,
                        avatarFileName: res.avatarFileName,
                        updated: res.updated,
                        created: res.created,
                    }
                }
            } else {
                return { code: -1, message: '添加用户异常', data: {} };
            }
        }

    },

    async getUserInfoById(_id) {

        await time.delay(1)

        console.log('--------service getSessionInfo by id--------')


        var allFound = await db.user.findUserById(_id)//mongodb返回的user可能不支持“...”的结构分解
        // console.log(JSON.stringify(allFound))

        var res = allFound[0]
        if (res) {

            // console.log('--------user service getUserInfoById---------')
            // console.log(res)

            //这里必须过滤掉敏感信息，如同login时的处理
            return {
                code: 0, message: '获取用户信息成功',
                data: {
                    _id: res._id,
                    uuid: res.uuid,
                    name: res.name,
                    email: res.email,
                    role: res.role,
                    updated: res.updated,
                    created: res.created,
                    avatarFileName: res.avatarFileName,
                    source: res.source,
                    oauth: res.oauth,
                    setting: res.setting,
                }
            }
        } else {
            return { code: -1, message: '用户未找到', data: {} }
        }

    },

    async getOtherInfo(other) {

        console.log('--------service getOtherInfo by user--------')

        await time.delay(1)

        const user = JSON.parse(other)

        if (user._id == 'anonymous') {
            return {
                code: 0, message: '获取用户信息成功',
                data: {
                    _id: 'anonymous',
                    name: 'anonymous',
                    // email: res.email,
                    role: 'anonymous',
                    // updated: res.updated,
                    created: Date.now(),
                    avatarFileName: 'anonymous.png',
                }
            }
        }

        var allFound = await db.user.findUserById(user._id)//mongodb返回的user可能不支持“...”的结构分解
        // console.log(JSON.stringify(allFound))

        var res = allFound[0]
        if (res) {
            //看别人可以看到什么信息？在这里过滤
            return {
                code: 0, message: '获取用户信息成功',
                data: {
                    _id: res._id,
                    name: res.name,
                    // email: res.email,
                    role: res.role,
                    // updated: res.updated,
                    created: res.created,
                    avatarFileName: res.avatarFileName,
                    source: res.source,
                    oauth: res.oauth,
                }
            }
        } else {
            return { code: -1, message: '用户未找到', data: {} }
        }

    },

    async authenticateUser(user) {

        //查询用户名是否存在，取第一个
        var found = await db.user.findUserByName({ "name": user.name });//mongodb返回的user可能不支持“...”的结构分解

        if (found.length > 0) {

            var userFound = found[0];
            console.log('----------------authenticateUser--------------------')
            console.log(appConfig)
            console.log(appConfig.user)
            console.log(appConfig.user.hmackey)
            const hmac = crypto.createHmac('sha256', appConfig.user.hmackey);
            console.log('----------------authenticateUser--------------------1')

            hmac.update(userFound.salt + user.password);
            var hashpwd = hmac.digest('hex');
            if (hashpwd == userFound.hashpwd) {
                // console.log('userFound:')
                // console.log(userFound)
                return {
                    code: 0, message: '认证成功',
                    data: {
                        _id: userFound._id,
                        uuid: userFound.uuid,
                        name: userFound.name,
                        email: userFound.email,
                        role: userFound.role,
                        updated: userFound.updated,
                        created: userFound.created,
                        avatarFileName: userFound.avatarFileName,
                        setting: userFound.setting,
                    }
                }
            } else {
                return { code: -1, message: '密码错误' };
            }

        } else {
            return { code: -1, message: '没有找到用户' };
        }

    },

    async userChangePassword(userChangePassword, ctx) {

        if (calc.getUserData(ctx)._id == userChangePassword._id) {

        } else {
            return { code: -1, message: '登录用户只能修改自己的密码', data: {} }
        }


        var allFound = await db.user.findUserById(userChangePassword._id)
        // console.log(JSON.stringify(allFound))

        var userFound = allFound[0]

        // console.log('----------userFound--------------0')
        // console.log(userFound)
        // console.log('----------userFound--------------1')
        // var seperate = {...userFound._doc, hashpwd:'123456'}
        // console.log(seperate)
        // console.log('----------userFound--------------2')
        // console.log(seperate)
        // console.log('----------userFound--------------3')

        if (userFound) {

            //核对旧密码
            const hmac = crypto.createHmac('sha256', appConfig.user.hmackey);
            hmac.update(userFound.salt + userChangePassword.oldPwd);
            var hashpwd = hmac.digest('hex');
            if (hashpwd == userFound.hashpwd) {
                console.log('旧密码正确')

                // user.salt = crypto.randomBytes(32).toString('hex');//salt大概不能更新，担心salt也用于pwd之外其他项目

                const newHmac = crypto.createHmac('sha256', appConfig.user.hmackey);

                newHmac.update(userFound.salt + userChangePassword.newPwd);
                newHashpwd = newHmac.digest('hex');

                console.log('--------user userChangePassword--------1')

                var res = await db.user.findByIdAndUpdate({ _id: userFound._id, hashpwd: newHashpwd })
                // console.log(JSON.stringify(res))
                console.log('--------user userChangePassword--------2')
                return { code: 0, message: 'user findByIdAndUpdate更新数据成功' };

            } else {
                console.log('--------user userChangePassword--------old pwd error')
                return { code: -1, message: '密码错误' };
            }

        } else {
            return { code: -1, message: '用户未找到', data: {} }
        }

    },

    async userResetPassword(userResetPassword, ctx) {

        console.log('----------userResetPassword-------------')
        console.log(userResetPassword)

        var allFound = await db.user.findUserByName({ "name": userResetPassword.name })
        // console.log(JSON.stringify(allFound))

        var userFound = allFound[0]

        if (userFound && userFound.email) {
            //生成重置code及时间
            resetPasswordCode = crypto.randomBytes(32).toString('hex');//32字节，也即256bit
            resetPasswordTime = Date.now()

            var res = await db.user.findByIdAndUpdate({
                _id: userFound._id,
                resetPasswordCode: resetPasswordCode,
                resetPasswordTime: resetPasswordTime,
            })

            if (res) { } else { return { code: -1, message: '禁止修改密码' } }

            try {
                let transporter = nodemailer.createTransport({

                    host: appConfig.smtp.host,
                    // host: "smtp.126.com",
                    port: appConfig.smtp.port,
                    // port: process.env.SMTP_PORT,
                    secure: appConfig.smtp.secure, // true for 465, false for other ports
                    // secure: process.env.SMTP_SECURE, // true for 465, false for other ports

                    auth: {
                        user: appConfig.smtp.auth.user,
                        pass: appConfig.smtp.auth.pass,
                    }
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `"${appConfig.smtp.nickName}" <${appConfig.smtp.email}>`, // sender address
                    // from: '"Hyyou Work" <hyyouwork@126.com>', // sender address
                    to: userFound.email, // list of receivers
                    subject: "Hello, welcome to reset your password ~~~~", // Subject line
                    // text: "Hello text world?", // plain text body
                    html: "Welcome to reset password ~~~<br />" // html body
                        + `Please click to reset page, or copy url to your browser:
                            <a href="${appConfig.smtp.url_domain}/#/resetpwd/newpwd/${resetPasswordCode}">goto reset password page</a> 
                        `
                });

                // console.log(JSON.stringify(info))
                console.log(info)

            } catch (e) {
                console.log(e)
                return { code: -1, message: '发送邮件失败' }
            }

            console.log('已发送邮件，请查收')
            return { code: 0, message: '已发送邮件，请查收', data: {} }
        } else {
            console.log('用户未找到或用户未设置电邮')
            return { code: -1, message: '用户未找到或用户未设置电邮' }
        }

    },

    async userResetPasswordNew(userNewPassword, ctx) {

        console.log('----------userResetPasswordNew-------------')
        console.log(userNewPassword)

        var allFound = await db.user.findUserByResetPasswordCode({ "resetPasswordCode": userNewPassword.resetPasswordCode })
        // console.log(JSON.stringify(allFound))

        var userFound = allFound[0]

        if (userFound) {
            //判断时间是否过期
            //resetPasswordTime = Date.now
            console.log('compare date time:')
            console.log(Date.now())
            console.log(userFound.resetPasswordTime.getTime())

            if ((Date.now() - userFound.resetPasswordTime.getTime()) > (24 * 60 * 60 * 1000)) { //1天后过期
                return { code: -1, message: '链接已经过期' }
            }

            const newHmac = crypto.createHmac('sha256', appConfig.user.hmackey);
            newHmac.update(userFound.salt + userNewPassword.password);
            newHashpwd = newHmac.digest('hex');

            console.log('--------user userResetPasswordNew--------1')

            var res = await db.user.findByIdAndUpdate({
                _id: userFound._id,
                hashpwd: newHashpwd,
                resetPasswordCode: '',
                resetPasswordTime: null
            })
            // console.log(JSON.stringify(res))
            console.log('--------user userResetPasswordNew--------2')
            return { code: 0, message: '用户修改密码成功' };

        } else {
            return { code: -1, message: '用户未找到' }
        }

    },

    async graphql_getUserPosts(id, length, ctx) {

        await time.delay(1)
        
        console.log('service user getByPaginate----2')
        // console.log(ctx)

        let query
        if(calc.getUserData(ctx)._id == id){
            console.log('look myself')
            query = {authorId:id}
        }else{
            //只能看他人的公开post
            console.log('look other')
            query = {authorId:id, anonymous:false}
        }
        var res = await db.user.getPostByPaginate(query, {offset: 0, limit: length, sort:{postId:-1}})
        // console.log(res.docs)
        return res.docs;
        // return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };
    }
}