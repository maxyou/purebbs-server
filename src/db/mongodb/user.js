const config = require('./config')
const fs = require('fs')

// console.log('--------db/mongodb/user.js-------')

module.exports = {

    async uploadAvatar(avatarFileName, _id){
        console.log('db uploadAvatar:')
        console.log(avatarFileName)
        console.log(_id)

        console.log('--------db/mongodb/user.js uploadAvatar-------0')
        // var avatar = {}
        // avatar.data = fs.readFileSync(v)
        // avatar.contentType = 'image/png'
        console.log('--------db/mongodb/user.js uploadAvatar-------1')
        // var res = await config.getModel('User').findByIdAndUpdate(_id, {avatar:avatar})
        var res = await config.getModel('User').findByIdAndUpdate(_id, {avatarFileName:avatarFileName})
        console.log('--------db/mongodb/user.js uploadAvatar-------2')
        // console.log(res)//这里返回的似乎是旧数据
        return
    },
    async getByPaginate(query = {}, options = {offset: 0, limit: 20}) {
        var res = await config.getModel('User').paginate(query, options)
        return res;
    },
    // async getUsers() {
    //     var User = config.getModel('User')
    //     var users = await User.find({});
    //     return users
    // },
    // async findByIdAndUpdate({_id, ...resProps}) {
    async findByIdAndUpdate(user) {
        console.log('-------db user findByIdAndUpdate-----------')
        const {_id, ...resProps} = user
        console.log(_id)
        console.log(resProps)
        var res = await config.getModel('User').findByIdAndUpdate(_id, resProps)
        console.log('-------db user findByIdAndUpdate-----------2')
        return res
    },

    async findByIdAndDelete({_id}) {
        var res = await config.getModel('User').findByIdAndDelete(_id)
        return res
    },

    async addUser(user) {
        
        console.log('--------db/mongodb/user.js-------addUser----role:')
        console.log(user.role)
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

    async findUserByName(user) {

        return await config.getModel('User').find({ "name": user.name });

    },

    async findUserById(_id) {

        return await config.getModel('User').find({ "_id": _id });

    }

}