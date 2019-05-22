const db = require('../db')

module.exports = {
    async searchByNamePwd({ name, password }) {
        console.log('this is searchByNamePwd:'+name+' '+password)
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