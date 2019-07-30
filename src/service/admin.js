const db = require('../db')
const { time, calc } = require('../tool')

// console.log('--------post/index.js-------')

function isAdmin(ctx){
    if (calc.isLogin(ctx) 
            && calc.getUserData(ctx).name=='admin'
            && calc.getUserData(ctx).role=='admin'
            ) {
        console.log('-----admin service findByIdAndUpdate-------you are admin')
        return true
    }else{
        console.log('-----admin service findByIdAndUpdate-------need admin authen')
        return false
    }
}

module.exports = {

    async add(post) {

        await time.delay(1)

        // console.log('--------post/index.js-------addUser')
        var postId = await db.admin.getPostId()
        postId++
        post = {...post, postId}
        var res = await db.admin.add(post)

        // console.log('add post ---- after call db')
        // console.log(res)

        if (res) {//或者比较返回值的name属性？
            await db.admin.setPostId(postId)
            return { code: 0, message: '发表成功', res: res };
        } else {
            return { code: -1, message: '发表异常' };
        }
    },
    
    async getByPaginate(query, ctx) {

        await time.delay(1)

        if(isAdmin(ctx)){

        }else{
            return { code: 0, message: '需要admin权限', data: {}}
        }

        console.log('service admin getByPaginate')
        var paginateQuery = JSON.parse(query)//parse才能把字符串‘-1’解析为数字‘-1’
        console.log('service admin getByPaginate----1')
        var res = await db.admin.getByPaginate(paginateQuery.query, paginateQuery.options)
        console.log('service admin getByPaginate----2')
        console.log(res.docs)
        return { code: 0, message: '获取数据成功', data: res.docs, totalDocs: res.totalDocs };

    },


    async findByIdAndDelete(user) {

        await time.delay(1)

        if(isAdmin(ctx)){

        }else{
            return { code: 0, message: '需要admin权限', data: {}}
        }
        // console.log('-----service findByIdAndUpdate-------')
        // console.log(JSON.stringify(user))

        var res = await db.admin.findByIdAndDelete(user)
        // console.log('--------update--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')
        return { code: 0, message: 'findByIdAndDelete更新数据成功', data: res };

    },
    async findByIdAndUpdate(user, ctx) {

        await time.delay(1)

        if(isAdmin(ctx)){

        }else{
            return { code: 0, message: '需要admin权限', data: {}}
        }


        /**
         * 1，禁止修改admin账号
         * 2，禁止将其他账号升级为admin
         */
        if(user.name == 'admin' || user.role == 'admin'){
            console.log('-----admin service findByIdAndUpdate-------can not set user as admin')
            return { code: 0, message: '不能修改admin账户，或者不能将用户升级为admin'}
        }

        console.log('-----admin service findByIdAndUpdate-------')
        // console.log(JSON.stringify(post))

        var res = await db.admin.findByIdAndUpdate(user)
        console.log('--------admin update--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')
        return { code: 0, message: 'admin findByIdAndUpdate更新数据成功', data: res };
    },

    async findByIdAndUpdateAvatar(filename, _id) {

        await time.delay(1)

        console.log('-----service findByIdAndUpdateAvatar-------')
        // console.log(JSON.stringify(post))

        var res = await db.admin.findByIdAndUpdateAvatar(filename, _id)
        console.log('--------update avatar--------')
        // console.log(JSON.stringify(res))
        // console.log('--------update--------')
        return { code: 0, message: 'admin findByIdAndUpdateAvatar更新数据成功', data: res };
    }
}