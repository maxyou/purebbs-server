const db = require('../db')
console.log('--------user/index.js-------')

module.exports = {
    async searchByNamePwd({ name, password }) {
        console.log('this is searchByNamePwd:'+name+' '+password)
        console.log(db)
        console.log('--------searchByNamePwd-------1')
        var m = db.updateUser({name:'Admin', password:'pwd'})
        console.log('--------searchByNamePwd-------2')
        console.log(m)
        console.log('--------searchByNamePwd-------3')
        // console.log(JSON.stringify(m))

        return '[]'
        // return db.query(
        //     `SELECT * FROM ${db.config.tbUsers} WHERE name='${name}' AND password='${password}'`,
        //     []
        // )
    },

    async searchByName({ name, password }) {
        console.log('this is searchByName:'+name+' '+password)
        return '[]'
        // return db.query(
        //     `SELECT * FROM ${db.config.tbUsers} WHERE name='${name}'`,
        //     []
        // )
    },

    async addUser({ name, password }) {
        console.log('this is addUser:'+name+' '+password)
        return '[]'
        // return db.query(
        //     `INSERT INTO ${db.config.tbUsers} (name, password) VALUES ('${name}','${password}')`,
        //     []
        // )
    },

    async updateUser({ name, password }) {

    }

}