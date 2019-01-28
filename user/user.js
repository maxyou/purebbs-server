const db = require('../db')

class User {

    constructor(obj) {
        this.props = { ...obj }
        console.log(this.props)
    }

    searchByNamePwd(){
        return db.query(
            `SELECT * FROM ${db.config.tbUsers} WHERE name='${this.props.name}' AND password='${this.props.password}'`,
            []
        )
    }

    searchByName() {
        return db.query(
            `SELECT * FROM ${db.config.tbUsers} WHERE name='${this.props.name}'`,
            []
        )
    }    

    addUser() {
        return db.query(
            `INSERT INTO ${db.config.tbUsers} (name, password) VALUES ('${this.props.name}','${this.props.password}')`,
            []
        )
    }

    updateUser() {

    }
}

module.exports = User