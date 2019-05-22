const db = require('../db')

module.exports = {
    searchByNamePwd({ name, password }) {
        console.log('this is searchByNamePwd:'+name+' '+password)
        return '[]'
        // return db.query(
        //     `SELECT * FROM ${db.config.tbUsers} WHERE name='${name}' AND password='${password}'`,
        //     []
        // )
    },

    searchByName({ name, password }) {
        console.log('this is searchByName:'+name+' '+password)
        return '[]'
        // return db.query(
        //     `SELECT * FROM ${db.config.tbUsers} WHERE name='${name}'`,
        //     []
        // )
    },

    addUser({ name, password }) {
        console.log('this is addUser:'+name+' '+password)
        return '[]'
        // return db.query(
        //     `INSERT INTO ${db.config.tbUsers} (name, password) VALUES ('${name}','${password}')`,
        //     []
        // )
    },

    updateUser({ name, password }) {

    }

}