const db = require('../db')
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

    },

    async authenticateUser(user) {


    }



    // async searchByNamePwd({ name, password }) {
    //     console.log('this is searchByNamePwd:'+name+' '+password)
    //     console.log(db)
    //     console.log('--------searchByNamePwd-------1')
    //     var m = db.updateUser({name:'Admin', password:'pwd'})
    //     console.log('--------searchByNamePwd-------2')
    //     console.log(m)
    //     console.log('--------searchByNamePwd-------3')

    //     return '[]'
    // },

    // async searchByName({ name, password }) {
    //     console.log('this is searchByName:'+name+' '+password)
    //     return '[]'
    // },

    // async addUser({ name, password }) {
    //     console.log('this is addUser:'+name+' '+password)
    //     return '[]'
    // },

    // async updateUser({ name, password }) {

    // }

}